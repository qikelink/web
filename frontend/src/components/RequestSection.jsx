import React, { useEffect } from "react";
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
import { useToast } from "./ui/use-toast";
import { EmptyIcon } from "@/icons/EmptyIcon";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";

const RequestSection = () => {
  const {
    user,
    isLoadingUserData,
    meetingRequests,
    setMeetingRequests,
    setNotifications,
  } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/");
  };

  function trimToCharacters(str) {
    if (str.length <= 70) {
      return str; // If the string length is 70 or less, return the original string
    } else {
      return str.substring(0, 70) + ".."; // Otherwise, return the substring of the first 70 characters
    }
  }

  useEffect(() => {
    if (user != undefined) {
      getMeetingRequests(user.id)
        .then((res) => {
          setMeetingRequests(res);
        })
        .catch((error) => {
          console.error("Error fetching updated meeting request data:", error);
        });
    }
  }, [meetingRequests]);

  const acceptRequest = (item) => {
    const successMessageSender = `🎉 You've approved a session with ${
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
    } has been approved. 🥳`;

    updateSession(item.id, true)
      .then(() => {
        toast({
          title: "🥳 Meeting request accepted",
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
          "Session Approved",
          successMessageSender,
          successMessageReceiver,
          undefined,
          item.expand.owner.id,
          orgId
        );
      });
  };

  const rejectRequest = (item) => {
    const rejectMessageSender = `😔 You rejected a session with 
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
    } has been rejected. 😔`;

    updateSession(item.id, false, true)
      .then(() => {
        toast({
          title: "😔 Meeting request rejected",
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
          "Session Rejected",
          rejectMessageSender,
          rejectMessageReceiver,
          undefined,
          item.expand.owner.id,
          orgId
        );
      });
  };

  return (
    <div className="p-2">
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
            className="my-2 flex gap-3 items-center justify-between"
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
            <div>
              <AlertTitle>
                {item.organization.length > 0
                  ? item.expand.organization.username
                  : item.expand.owner.name}
              </AlertTitle>
              <AlertDescription className="line-clamp-2 hidden md:block">
                {item.organization.length > 0
                  ? trimToCharacters(item.expand.organization.org_about)
                  : trimToCharacters(item.expand.owner.bio)}
              </AlertDescription>
            </div>
            <div className="flex-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Meeting Details</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl">
                      Session Request
                    </DialogTitle>
                    <DialogDescription>
                      🎉{""} Hello, you have received a session request!
                    </DialogDescription>
                  </DialogHeader>
                  <div className="text-darktext font-medium">
                    <Label className="text-lg font-semibold">
                      Session Details
                    </Label>
                    <p>
                      {" "}
                      Session host:{" "}
                      {item.organization.length > 0
                        ? item.expand.organization.username
                        : item.expand.owner.name}
                    </p>
                    {}
                    <p>
                      {" "}
                      Session date: {item.sessionDate.split("T")[0]} -{" "}
                      {item.sessionTime}{" "}
                      {item.sessionTime.split(":")[0] < 12 ? "AM" : "PM"}
                    </p>

                    <p className="font-semibold text-lg mt-3 "> Message</p>
                    <p className="text-lg "> {item.purpose}</p>
                  </div>
                  <DialogFooter>
                    <div className="flex justify-center space-x-3 ">
                      <Button
                        onClick={() => rejectRequest(item)}
                        className="bg-red-500 w-full"
                        type="submit"
                      >
                        Reject
                      </Button>
                      <Button
                        onClick={() => acceptRequest(item)}
                        className="bg-green-500 w-full"
                        type="submit"
                      >
                        Accept
                      </Button>
                    </div>
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
          <Button
            size="xl"
            className="bg-blue rounded-lg text-lg mt-3 "
            type="button"
            onClick={handleNavigate}
          >
            Browse mentors
          </Button>
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
