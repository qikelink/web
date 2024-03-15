"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ModalBox from "./ModalBox";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import KeywordBar from "@/utils/KeywordBar";
import { dataset, list } from "@/dummy_api/dataSet";

const HomeCardSection = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [value, onChange] = useState(new Date());

  return (
    <>
      <div>
        <KeywordBar data={dataset} />
        <div className="grid grid-cols-2 gap-3 w-full py-2">
          <Card>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>

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
                        {item.name}
                      </h4>
                      <span className="text-sm tracking-tight text-default-400 flex align-middle justify-center">
                        {item.rating}{" "}
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
                  {item.bio}
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
                {item.rate != "free" ? (
                  <Badge
                    variant="outline"
                    className="flex gap-1 rounded-full bg-green-500"
                  >
                    <p className="font-semibold text-primary text-secondary">
                      {item.rate}
                    </p>
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="flex gap-1 rounded-full bg-red"
                  >
                    <p className="font-semibold text-primary text-secondary">
                      Free
                    </p>
                  </Badge>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeCardSection;
