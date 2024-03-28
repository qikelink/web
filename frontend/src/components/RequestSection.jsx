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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "./ui/skeleton";
import { getImageUrl } from "../../../backend/src/pocketbase";
import { BookmarkEmpty } from "./emptystate/bookmarkEmpty";
import { useUser } from "@/contexts/user-context";

const data = [1, 2, 3];

const RequestSection = () => {
  const { isLoadingUserData, meetingRequests } = useUser();

  return (
    <div className="py-2">
      <div className="flex justify-between items-center">
        <h2 className="text-base">Meeting Requests</h2>
      </div>
      {isLoadingUserData ? (
        <div className="grid grid-cols-1 gap-3 w-full mt-2">
          {/* Skeleton loaders */}
          {data.map((item, index) => (
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
                {item.expand.owner.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <AlertTitle>
                {item.organization.length > 0
                  ? item.expand.organization.org_name
                  : item.expand.owner.username}
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
                        ? item.expand.organization.org_name
                        : item.expand.owner.username}
                    </DialogDescription>
                  </DialogHeader>
                  <div>{item.purpose}</div>
                  <DialogFooter>
                    <Button className="bg-red" type="submit">
                      Reject
                    </Button>
                    <Button className="bg-green-500" type="submit">
                      Accept
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Alert>
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          {/* Render Empty when no organization exist */}
          <BookmarkEmpty />
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
