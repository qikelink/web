"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaStar } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import BookModal from "./BookModal";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import KeywordBar from "@/utils/KeywordBar";
import { dataset, list } from "@/dummy_api/dataSet";
import Image from "next/image";
import pic4 from "../../images/banner.png";
import pic5 from "../../images/banner2.png";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/contexts/user-context";
import {
  CreateBookmark,
  getImageUrl,
  getMentors,
  isUserValid,
} from "../../../backend/src/pocketbase";
import { useToast } from "@/components/ui/use-toast";
import { AiOutlineFire } from "react-icons/ai";
import { GrTag } from "react-icons/gr";

const HomeCardSection = () => {
  const { mentor, mentors, setMentors, isLoading } = useUser();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmark, setBookmark] = useState([]);

  useEffect(() => {
    if (mentor) {
      getMentors()
        .then((res) => {
          setMentors(res);
        })
        .catch((error) => {
          console.error("Error fetching mentors data:", error);
        });
    }
  }, [mentor]);

  const handleBookmarkToggle = (mentor) => {
    if (!isUserValid) {
      toast({
        title: "Sign in to save bookmark",
        description: "Please Sign in or create account to save bookmark!",
        variant: "default",
      });
      return;
    }

    CreateBookmark(
      mentor.username,
      mentor.rate,
      mentor.bio,
      mentor.awards,
      mentor.interests,
      mentor.rating,
      mentor.id
    )
      .then(() => {
        toast({
          title: "Added to bookmarks",
          description: "Added to bookmarks successfully!",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to add to bookmarks",
          description: "An error occurred while adding to bookmarks.",
          variant: "destructive",
        });
        console.error("Bookmark addition error:", error);
      });
  };

  function trimToSevenCharacters(str) {
    if (str.length <= 6) {
      return str; // If the string length is 6 or less, return the original string
    } else {
      return str.substring(0, 6) + ".."; // Otherwise, return the substring of the first 6 characters
    }
  }

  return (
    <>
      <div className="px-2">
        <KeywordBar data={dataset} />
        <div className=" py-2">
          <img
            src="/banner.png"
            alt="banner image"
            className="rounded-xl mx-auto w-full hidden md:block"
          />
          <img
            src="/banner2.png"
            alt="banner image"
            className="rounded-xl mx-auto w-full md:hidden"
          />
          {/* <Card className="hidden flex justify-center item-center bg-black ">
            <Image
              src={pic4}
              width={450}
              height={450}
              className="rounded-md hidden md:block"
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
          </Card> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full mt-2">
          {isLoading
            ? list.map((item, index) => (
                <Skeleton key={index} className="h-52 w-full rounded-lg" />
              ))
            : mentors.length > 0 &&
              mentors.map((item, index) => (
                <Card key={index} className="flex flex-col item-center">
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
                      <div className="flex space-x-2 items-center">
                        <Toggle
                          aria-label="Toggle italic"
                          variant="outline"
                          onClick={() => handleBookmarkToggle(item)}
                        >
                          <BsJournalBookmarkFill />
                        </Toggle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-small text-default-400 ">
                    <div className="flex items-center space-x-1">
                      <Badge variant="outline" className="py-1">
                        <GrTag color="green" />
                      </Badge>{" "}
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap flex space-x-1">
                        {item && item.interests
                          ? item.interests.split(",").map((interest, index) => (
                              <span key={index} className="inline-block">
                                <Badge variant="outline">
                                  {trimToSevenCharacters(interest.trim())}
                                </Badge>
                              </span>
                            ))
                          : "N/A"}
                      </div>
                    </div>
                    <div className="mt-1 line-clamp-4 text-sm font-light ">
                      {item.bio}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t py-2">
                    <BookModal buttonName="Request" data={item} />
                    {item.rate != "Free" ? (
                      <Badge
                        variant="outline"
                        className=" gap-1  text-black rounded-full border-2 border-[#FFC72C]"
                      >
                        <p className="flex ">{item.rate}/per Week</p>
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="flex gap-1 rounded-full bg-green-600"
                      >
                        <p className="flex text-green-100"> Free</p>
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
