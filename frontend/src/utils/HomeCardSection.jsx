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
import BookModal from "./BookModal";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import KeywordBar from "@/utils/KeywordBar";
import { dataset, list } from "@/dummy_api/dataSet";
import Image from "next/image";
import pic4 from "../../images/pic4.gif";
import pic5 from "../../images/pic6.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/contexts/user-context";

const HomeCardSection = () => {
  const { mentors, isLoading } = useUser();

  return (
    <>
      <div>
        <KeywordBar data={dataset} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full py-2">
          <Card className="lg:hidden w-full">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>First card</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card className="hidden flex justify-center item-center bg-black ">
            <Image
              src={pic4}
              width={450}
              height={450}
              className="rounded-md"
              alt="Picture of the author"
            />
          </Card>
          <Card className="hidden flex justify-center item-center bg-gray-200">
            <Image
              src={pic5}
              width={450}
              height={450}
              className="rounded-md"
              alt="Picture of the author"
            />
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full mt-2">
          {isLoading ? (
            list.map((item, index) => (
              <Skeleton key={index} className="h-52 w-64 rounded-lg" />
            ))
          ) : mentors.length > 0 ? (
            mentors.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?u=${index}`}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          {item.username}
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
                    {/* <BookModal buttonName="Request" /> */}
                  </div>
                </CardHeader>
                <CardContent className="text-small text-default-400">
                  <div className=" ">{item.bio}</div>

                  <Separator className="my-2 -mb-4" />
                </CardContent>
                <CardFooter className="flex justify-between ">
                  <BookModal buttonName="Request" />
                  {item.rate != "free" ? (
                    <Badge
                      variant="outline"
                      className="flex gap-1 rounded-full bg-green-200"
                    >
                      <p className="font-semibold  text-green-700">
                        {item.rate}
                      </p>
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="flex gap-1 rounded-full bg-red-100"
                    >
                      <p className="font-semibold  text-red-500">Free</p>
                    </Badge>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <div>
              <p>Failed to load network issues Bah blah ..</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeCardSection;
