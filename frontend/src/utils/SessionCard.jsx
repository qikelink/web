"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Calendar from "react-calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ModalBox from "./BookModal";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import KeywordBar from "@/utils/KeywordBar";
import { status } from "@/dummy_api/dataSet";
import { IoBook } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BsHeadsetVr } from "react-icons/bs";

const SessionCard = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [value, onChange] = useState(new Date());
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const createRoom = async () => {
    const res = await fetch("/api/room");
    const data = await res.json();
    if (data.roomId) {
      router.push(`/${data.roomId}`);
    }
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
    // Add more objects as
  ];

  return (
    <>
      <div>
        <KeywordBar data={status} />

        <div className="grid grid-cols-3 gap-3 w-full">
          {list.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-row justify-between text-sm">
                  <span>Session Status</span>
                  <Badge
                    variant="outline"
                    className={`rounded-full ${
                      item.status === "Now"
                        ? "bg-green-700 text-green-200"
                        : item.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100"
                    }`}
                  >
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-small text-default-400">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarImage
                        src={`https://i.pravatar.cc/150?u=${index}`}
                      />
                      <AvatarFallback>
                        {item.sessionWith.charAt(0)}
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
                  <IoBook color="#0096FF" className="mr-2" size={20} /> Purpose:{" "}
                  {item.purpose}
                </div>
                <span className="py-2 flex items-center">
                  <FaBookmark color="#0096FF" className="mr-2" size={20} />{" "}
                  SessionDate: {item.sessionDate}
                </span>
                <Separator className="my-2 -mb-4" />
              </CardContent>
              <CardFooter className="flex justify-between ">
                {item.status === "Now" ? (
                  <Button
                    onClick={createRoom}
                    className="bg-blue flex justify-around gap-2 item-center"
                  >
                    Join Meeting{" "}
                    <BsHeadsetVr size={20} className="text-current" />
                  </Button>
                ) : (
                  <ModalBox
                    buttonName="View booking details"
                    blue="text-blue"
                  />
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default SessionCard;
