import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
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
import { getAllSessions, getImageUrl } from "../../../backend/src/pocketbase";
import { useToast } from "./ui/use-toast";
import { EmptyIcon } from "@/icons/EmptyIcon";
import { Label } from "./ui/label";
import { BsHeadsetVr } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { createRoom } from "@/utils/createRoom";

const UpcomingSection = () => {
  const { user, isLoadingUserData, allSessions, setAllSessions } = useUser();
  const [isSpinning, setIsSpinning] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  function trimToCharacters(str) {
    if (str.length <= 70) {
      return str; // If the string length is 70 or less, return the original string
    } else {
      return str.substring(0, 70) + ".."; // Otherwise, return the substring of the first 70 characters
    }
  }

  useEffect(() => {
    if (user != undefined) {
      getAllSessions(user.id, user.email)
        .then((res) => {
          setAllSessions(res);
        })
        .catch((error) => {
          console.error("Error fetching updated session data:", error);
        });
    }
  }, [allSessions]);

  const createMeet = async () => {
    setIsSpinning(true);
    const roomId = await createRoom();
    window.open(`https://meet.qikelink.com/${roomId}`, '_blank');
  };

  const isNowSession = (sessionDate, sessionTime) => {
    const currentDate = new Date();
    const currentDateTime = currentDate.getTime();
    const [currentHour, currentMinute] = [
      currentDate.getHours(),
      currentDate.getMinutes(),
    ];

    const [hour, minute] = sessionTime.split(":").map(Number);

    // Convert sessionDate to local date object
    const sessionDateTimeUTC = new Date(sessionDate); // Parse sessionDate as UTC
    const sessionDateTime = new Date(
      sessionDateTimeUTC.getTime() +
        sessionDateTimeUTC.getTimezoneOffset() * 60000
    ); // Convert UTC to local timezone
    sessionDateTime.setHours(hour, minute, 0, 0);

    // Check if the session date matches the current date
    const isSameDate =
      currentDate.toDateString() === sessionDateTime.toDateString();

    const sessionEndTime = sessionDateTime.getTime() + 30 * 60 * 1000;

    return (
      isSameDate &&
      currentDateTime >= sessionDateTime.getTime() &&
      currentDateTime <= sessionEndTime
    );
  };

  const isPastSession = (sessionDate, sessionTime) => {
    const currentDate = new Date();
    const currentDateTime = currentDate.getTime();

    const [hour, minute] = sessionTime.split(":").map(Number);

    const sessionDateTimeUTC = new Date(sessionDate);
    const sessionDateTime = new Date(
      sessionDateTimeUTC.getTime() +
        sessionDateTimeUTC.getTimezoneOffset() * 60000
    ); // Convert UTC to local timezone
    sessionDateTime.setHours(hour, minute, 0, 0);

    const sessionEndTime = sessionDateTime.getTime() + 30 * 60 * 1000;

    return currentDateTime > sessionEndTime;
  };

  const filteredSessions = allSessions.filter((item) => {
    return (
      (!item.done &&
        item.approved &&
        !isPastSession(item.sessionDate, item.sessionTime)) ||
      isNowSession(item.sessionDate, item.sessionTime)
    );
  });

  const handleMeet = (item) => {
    if (isNowSession(item.sessionDate, item.sessionTime)) {
      createMeet();
    } else {
      toast({
        title: "Uh oh not yet session time",
        description: "Sorry you can't join session as it's not yet time.",
        variant: "default",
      });
    }
  };

  const handleNavigate = () => {
    router.push("/");
  };

  return (
    <div className="p-2">
      {filteredSessions.length > 0 && (
        <div className="flex justify-between items-center">
          <h2 className="text-lg lg:text-xl">Upcoming sessions</h2>
        </div>
      )}
      {isLoadingUserData ? (
        <div className="grid grid-cols-1 gap-3 w-full mt-2">
          {/* Skeleton loaders */}
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-md" />
          ))}
        </div>
      ) : filteredSessions.length > 0 ? (
        filteredSessions.map((item, index) => (
          <Alert
            key={index}
            className="my-2 flex gap-3 items-center justify-between"
          >
            {" "}
            <div className="flex space-x-4 items-center">
              <Avatar>
                <AvatarImage
                  src={
                    user.id === item.owner
                      ? getImageUrl(
                          item.expand.mentor.expand.users.collectionId,
                          item.expand.mentor.expand.users.id,
                          item.expand.mentor.expand.users.avatar
                        ) ||
                        getImageUrl(
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
              <div className="">
                <AlertTitle>
                  {user.id === item.owner
                    ? item.expand.mentor.username ||
                      item.expand.organization.username
                    : item.expand.owner.name}
                </AlertTitle>
                <AlertDescription className="line-clamp-2 hidden md:block">
                  {user.id !== item.owner
                    ? trimToCharacters(item.expand.owner.bio) ||
                      trimToCharacters(item.expand.organization.org_about)
                    : trimToCharacters(item.expand.mentor.bio)}
                </AlertDescription>
              </div>
            </div>
            <div className="">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Session details</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-left">
                      Session information
                    </DialogTitle>
                    {/* <DialogDescription className='text-left'>
                      Joining details for meet session
                    </DialogDescription> */}
                  </DialogHeader>
                  <div className="text-darktext font-medium">
                    <Label className="text-lg font-semibold">Details</Label>
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

                  <Button
                    size="xl"
                    onClick={() => handleMeet(item)}
                    className={`bg-blue flex space-x-2 items-center mt-4 `}
                    // disabled={!isNowSession(item.sessionDate, item.sessionTime)}
                  >
                    <p className=""> Join Meeting </p>
                    <BsHeadsetVr
                      size={20}
                      className={`text-current ${
                        isSpinning ? "animate-spin" : ""
                      }`}
                    />
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </Alert>
        ))
      ) : (
        <div className="flex flex-col  items-center w-full h-full mt-32">
          <EmptyIcon size={150} />
          <p className="text-center text-xl font-medium text-darktext">
            No upcoming session.
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

export default UpcomingSection;
