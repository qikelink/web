"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import KeywordBar from "@/utils/KeywordBar";
import { status } from "@/dummy_api/dataSet";
import { IoBook } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BsHeadsetVr } from "react-icons/bs";
import { createRoom } from "./createRoom";
import { useUser } from "@/contexts/user-context";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyBookmarkIcon } from "@/icons/EmptyBookmarkIcon";
import { Item } from "@radix-ui/react-dropdown-menu";
import { getImageUrl } from "../../../backend/src/pocketbase";

const SessionCard = () => {
  const router = useRouter();
  const { selectedButtons, allSessions, isLoadingUserData } = useUser();
  const [isSpinning, setIsSpinning] = useState(false);

  const createMeet = async () => {
    setIsSpinning(true);
    const roomId = await createRoom();
    router.push(`/${roomId}`);
  };

  const list = [
    {
      status: "Now",
      sessionWith: "Zoey Lang",
      rating: "4.3/5.0",
      purpose: "Enterprise Consulting",
      sessionDate: "4th July, 2024 - 4pm WAT",
    },
    {
      status: "Approved",
      sessionWith: "John Doe",
      rating: "4.8/5.0",
      purpose: "Financial Planning",
      sessionDate: "5th July, 2024 - 3pm WAT",
    },
    {
      status: "Pending",
      sessionWith: "Jane Smith",
      rating: "4.5/5.0",
      purpose: "Marketing Strategy",
      sessionDate: "6th July, 2024 - 10am WAT",
    },

    {
      status: "Past",
      sessionWith: "Alice Johnson",
      rating: "4.6/5.0",
      purpose: "Software Development",
      sessionDate: "7th July, 2024 - 2pm WAT",
    },
  ];

  const currentDate = new Date();

  const filteredSessions = allSessions.filter((item) => {
    if (selectedButtons === "Pending") {
      return !item.approved && !item.done;
    } else if (selectedButtons === "Approved") {
      return !item.done && item.approved;
    } else if (selectedButtons === "Past") {
      return item.done && item.approved;
    } else {
     
      const sessionDate = new Date(item.sessionDate);
      return (
        sessionDate.getDate() === currentDate.getDate() &&
        sessionDate.getMonth() === currentDate.getMonth() &&
        sessionDate.getFullYear() === currentDate.getFullYear() &&
        item.approved &&
        !item.done
      );
    }
  });

  return (
    <>
      <div>
        <KeywordBar data={status} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full mt-2">
          {isLoadingUserData ? (
            list.map((item, index) => (
              <Skeleton className="h-60 w-80 rounded-lg" key={index}></Skeleton>
            ))
          ) : filteredSessions.length > 0 ? (
            filteredSessions.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex flex-row justify-between text-sm">
                    <span>Session Status</span>
                    <Badge
                      variant="outline"
                      className={`rounded-full ${
                        selectedButtons === "Pending"
                          ? "bg-yellow-100"
                          : selectedButtons === "Approved"
                          ? "bg-green-100 text-green-700"
                          : selectedButtons === "Past"
                          ? "bg-red text-white"
                          : "bg-green-700 text-green-200"
                      }`}
                    >
                      {selectedButtons}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-small text-default-400">
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarImage
                         src={getImageUrl(
                          item.collectionId,
                          item.id,
                          item.avatar
                        )}
                        />
                        <AvatarFallback>
                          {/* {item.sessionWith.charAt(0)} */} CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          {item.sessionWith}
                        </h4>
                        <span className="text-sm tracking-tight text-default-400 flex align-middle justify-center">
                          {item.rating} <FaStar color="yellow" size={18} />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 flex items-center ">
                    <IoBook color="#0096FF" className="mr-2" size={20} />{" "}
                    Purpose: {item.purpose}
                  </div>
                  <span className="py-2 flex items-center">
                    <FaBookmark color="#0096FF" className="mr-2" size={20} />{" "}
                    SessionDate: {item.sessionDate}
                  </span>
                  <Separator className="my-2 -mb-4" />
                </CardContent>
                <CardFooter className="flex justify-between ">
                  {selectedButtons === "Now" ? (
                    <Button
                      onClick={() => createMeet()}
                      className="bg-blue flex justify-around gap-2 item-center"
                    >
                      Join Meeting{" "}
                      <BsHeadsetVr
                        size={20}
                        className={`text-current ${
                          isSpinning ? "animate-spin" : ""
                        }`}
                      />
                    </Button>
                  ) : (
                    <SessionModal data={item}
                      buttonName="View booking details"
                      blue="text-blue"
                     
                    />
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            // change to be an empty state that shows no sesssion to show for now
            <div className="flex justify-center items-center">
              <EmptyBookmarkIcon />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SessionCard;
