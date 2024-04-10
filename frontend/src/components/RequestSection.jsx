import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUser } from "@/contexts/user-context";
import { Skeleton } from "./ui/skeleton";
import {
  createNotification,
  getImageUrl,
  getMeetingRequests,
  getNotifications,
  updateSession,
} from "../../../backend/src/pocketbase";
import { BookmarkEmpty } from "./emptystate/bookmarkEmpty";
import { useToast } from "./ui/use-toast";
import { EmptyIcon } from "@/icons/EmptyIcon";

const RequestSection = () => {
  const {
    user,
    isLoadingUserData,
    meetingRequests,
    setMeetingRequests,
    setNotifications,
  } = useUser();
  const { toast } = useToast();

  const acceptRequest = (item) => {
    const successMessageSender = `You've approved a session with ${
      item.expand.organization != undefined
        ? item.expand.organization.username
        : item.expand.owner.name
    }.`;

    const successMessageReceiver = `Hello, your session with ${
      item.expand.mentor.id.length > 0
        ? item.expand.mentor.username
        : item.expand.mentor.username
    } requested as ${
      item.expand.organization != undefined
        ? item.expand.organization.username
        : item.expand.owner.name
    } has been approved.`;

    updateSession(item.id, true)
      .then(() => {
        toast({
          title: "Meeting request accepted",
          description: "Meeting request accepted successfully! .",
          variant: "default",
        });
        // Update the meeting requests state after accepting the request
        setMeetingRequests((prevMeetingRequests) =>
          prevMeetingRequests.filter((request) => request.id !== item.id)
        );
      })
      .catch((error) => {
        toast({
          title: "Failed to accept request",
          description: "Sorry an error just occurred! please try again.",
          variant: "destructive",
        });
        console.error("updated meeting request error:", error);
      })
      .finally(() => {
        const orgId =
          item.expand.organization != undefined
            ? item.expand.organization.id
            : undefined;
        createNotification(
          "Request Approved",
          successMessageSender,
          successMessageReceiver,
          undefined,
          item.expand.owner.id,
          orgId
        );
        getNotifications(user.id, user.email)
          .then((res) => {
            setNotifications(res);
          })
          .catch((error) => {
            console.error("Error fetching notifications data:", error);
          });
      });
  };

  const rejectRequest = (item) => {
    const rejectMessageSender = `You rejected a session with 
      ${
        item.expand.organization != undefined
          ? item.expand.organization.username
          : item.expand.owner.name
      }.`;

    const rejectMessageReceiver = `Sorry, your session with ${
      item.expand.mentor.id.length > 0
        ? item.expand.mentor.username
        : item.expand.mentor.username
    } requested as ${
      item.expand.organization != undefined
        ? item.expand.organization.username
        : item.expand.owner.name
    } has been rejected.`;

    updateSession(item.id, false, true)
      .then(() => {
        toast({
          title: "Meeting request rejected",
          description: "Meeting request rejected .",
          variant: "default",
        });
        // Update the meeting requests state after rejecting the request
        setMeetingRequests((prevMeetingRequests) =>
          prevMeetingRequests.filter((request) => request.id !== item.id)
        );
      })
      .catch((error) => {
        toast({
          title: "Failed to reject request",
          description: "Sorry an error just occurred! please try again.",
          variant: "destructive",
        });
        console.error("updated meeting request error:", error);
      })
      .finally(() => {
        const orgId =
          item.expand.organization != undefined
            ? item.expand.organization.id
            : undefined;

        createNotification(
          "Request Rejected",
          rejectMessageSender,
          rejectMessageReceiver,
          undefined,
          item.expand.owner.id,
          orgId
        );
        getNotifications(user.id, user.email)
          .then((res) => {
            setNotifications(res);
          })
          .catch((error) => {
            console.error("Error fetching notifications data:", error);
          });
      });
  };

  return (
    <div className="py-2">
      {meetingRequests.length > 0 && (
        <div className="flex justify-between items-center">
          <h2 className="text-lg lg:text-xl">Meeting Requests</h2>
        </div>
      )}
      {isLoadingUserData ? (
        <div className="grid grid-cols-1 gap-3 w-full mt-2">
          {/* Skeleton loaders */}
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-md" />
          ))}
        </div>
      ) : meetingRequests.length > 0 ? (
        meetingRequests.map((item, index) => (
          <Alert
            key={index}
            className="my-2 flex gap-3 item-center justify-between"
          >
            <Avatar>
              <AvatarImage
                src={
                  item.organization.length > 0
                    ? getImageUrl(
                        item.expand.organization.collectionId,
                        item.expand.organization.id,
                        item.expand.organization.avatar
                      )
                    : getImageUrl(
                        item.expand.owner.collectionId,
                        item.expand.owner.id,
                        item.expand.owner.avatar
                      )
                }
                alt="@shadcn"
              />
              <AvatarFallback>
                {item.expand.owner.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <AlertTitle>
                {item.organization.length > 0
                  ? item.expand.organization.org_name
                  : item.expand.owner.name}
              </AlertTitle>
              <AlertDescription>
                {item.organization.length > 0
                  ? item.expand.organization.org_about
                  : item.expand.owner.bio}
              </AlertDescription>
            </div>
            <div className="flex-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Meeting Details</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Meeting Request</DialogTitle>
                    <DialogDescription>
                      Host:{" "}
                      {item.organization.length > 0
                        ? item.expand.organization.username
                        : item.expand.owner.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div>{item.purpose}</div>
                  <DialogFooter>
                    <Button
                      onClick={() => rejectRequest(item)}
                      className="bg-red-500"
                      type="submit"
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => acceptRequest(item)}
                      className="bg-green-500"
                      type="submit"
                    >
                      Accept
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Alert>
        ))
      ) : (
        <div className="flex flex-col  items-center w-full h-full mt-32">
          <EmptyIcon size={150} />
          <p className="text-center text-xl font-medium text-darktext">
            No request to show for now.
          </p>
        </div>
      )}

      <div className="flex flex-end hidden">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default RequestSection;
