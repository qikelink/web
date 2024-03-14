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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ModalBox from "./ModalBox";
import { Button } from "@/components/ui/button";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import KeywordBar from "@/utils/KeywordBar";
import { dataset } from "@/dummy_api/dataSet";

const HomeCardSection = () => {
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
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <>
      <div>
        <KeywordBar data={dataset} />

        <div className="grid grid-cols-3 gap-3 w-full">
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
                        4.3/5.0 <FaStar className="ml-1" color="#FFC72C" size={16} />
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <BsJournalBookmarkFill />
                  </Button>
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
                  className="flex gap-1 rounded-full bg-green-200">
                  <p className="font-semibold text-default-400 text-small">
                    $40 /
                  </p>
                  <p className="text-default-400 text-small">session</p>
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeCardSection;
