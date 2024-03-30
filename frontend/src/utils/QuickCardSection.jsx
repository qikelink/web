"use client";

import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import {
  Card,
  CardContent,
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
import {
  CreateBookmark,
  getImageUrl,
  getQuickMentors,
  isUserValid,
} from "../../../backend/src/pocketbase";
import { useToast } from "@/components/ui/use-toast";
import { EmptyBookmarkIcon, EmptyIcon } from "@/icons/EmptyIcon";
import { GoDotFill } from "react-icons/go";
import QuickModal from "./QuickModal";

const HomeCardSection = () => {
  const { quickMentors, setQuickMentors, isLoading } = useUser();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmark, setBookmark] = useState([]);

  useEffect(() => {
    if (quickMentors.length > 0) {
      getQuickMentors()
        .then((res) => {
          setQuickMentors(res);
        })
        .catch((error) => {
          console.error("Error fetching Quickmentors data:", error);
        });
    }
  }, [quickMentors]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <KeywordBar data={dataset} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full mt-2">
          {isLoading && quickMentors.length === 0
            ? list.map((item, index) => (
                <Skeleton key={index} className="h-52 w-64 rounded-lg" />
              ))
            : quickMentors.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Avatar>
                          <AvatarImage
                            src={getImageUrl(
                              item.expand.users.collectionId,
                              item.expand.users.id,
                              item.expand.users.avatar
                            )}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col gap-1 items-start justify-center">
                          <p className="text-sm font-semibold leading-none text-default-600">
                            {item.username}
                          </p>
                          <span className="text-sm tracking-tight text-default-400 flex align-middle justify-center">
                            {item.rating}{" "}
                            <FaStar
                              className="ml-1"
                              color="#FFC72C"
                              size={16}
                            />
                          </span>
                        </div>
                      </div>

                      <Toggle aria-label="Toggle italic" variant="outline">
                        <GoDotFill color="green" size={20} />
                        <p className="py-2">Active</p>
                      </Toggle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-small text-default-400">
                    <div className="flex gap-2 ">
                      {item && item.interests
                        ? item.interests.split(",").map((interest, index) => (
                            <Badge key={index} variant="outline">
                              {interest.trim()}
                            </Badge>
                          ))
                        : "N/A"}
                    </div>
                    <div className="mt-2 ">{item.bio}</div>

                    <Separator className="my-2 -mb-4" />
                  </CardContent>
                  <CardFooter className="flex justify-between ">
                    <BookModal buttonName="Request" data={item} />
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
              ))}
        </div>

        {!isLoading && quickMentors.length === 0 && (
          <div className="flex flex-col  items-center w-full h-full mt-32">
            <EmptyIcon size={150} />
            <p className="text-center text-xl font-medium text-darktext">
              No available mentor to show for now.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeCardSection;
