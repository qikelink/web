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
import ModalBox from "./BookModal";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";

const BookmarkCard = () => {
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
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    
  ];

  return (
    <>
      <div className="min-h-screen">
        <div className="grid grid-cols-3 gap-3 w-full mt-6">
          {list.map((item, index) => (
            <Card key={index}>
              <CardHeader>
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
                        4.3/5.0{" "}
                        <FaStar className="ml-1" color="#FFC72C" size={16} />
                      </span>
                    </div>
                  </div>
                  <Toggle aria-label="Toggle italic">
                    <BsJournalBookmarkFill />
                  </Toggle>
                  {/* <ModalBox buttonName="Request" /> */}
                </div>
              </CardHeader>
              <CardContent className="text-small text-default-400">
                <div className=" ">
                  Frontend developer and UI/UX.
                  <br /> Join me on this coding adventure!
                </div>
                <span className="pt-2">
                  #FrontendWithZoey
                  <span className="py-2" aria-label="computer" role="img">
                    💻
                  </span>
                </span>
                <Separator className="my-2 -mb-4" />
              </CardContent>
              <CardFooter className="flex justify-between ">
                <ModalBox buttonName="Request" />
                <Badge
                  variant={"outline"}
                  className="flex gap-1 rounded-full bg-primary"
                >
                  <p className="font-semibold text-secondary text-small">
                    $40 /
                  </p>
                  <p className="text-secondary text-small">session</p>
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookmarkCard;
