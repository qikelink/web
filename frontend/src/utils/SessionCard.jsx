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
import ModalBox from "./ModalBox";
import { Button } from "@/components/ui/button";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import KeywordBar from "@/utils/KeywordBar";
import { status } from "@/dummy_api/dataSet";
import { IoBook } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa6";

const SessionCard = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [value, onChange] = useState(new Date());

  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
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
                  <span>Session With</span>
                  <Badge
                    variant="outline"
                    className="rounded-full bg-yellow-100">
                    Inprogress
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-small text-default-400">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        Zoey Lang
                      </h4>
                      <span className="text-sm tracking-tight text-default-400 flex align-middle justify-center">
                        4.3/5.0 <FaStar color="yellow" size={18} />
                      </span>
                    </div>
                  </div>

                  {/* <ModalBox buttonName="Request" /> */}
                </div>
                <div className="py-2 flex items-center ">
                  <IoBook color="#0096FF" className="mr-2" size={20} /> Purpose:
                  Enterprise
                </div>
                <span className="py-2 flex items-center">
                  <FaBookmark color="#0096FF" className="mr-2" size={20} />{" "}
                  SessionDate: 4th July, 2024 - 4pm WAT
                </span>
                <Separator className="my-2 -mb-4" />
              </CardContent>
              <CardFooter className="flex justify-between ">
                <ModalBox buttonName="View booking details" blue="text-blue" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default SessionCard;
