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
      <div>
        <KeywordBar data={dataset} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full py-2">
          <Card className="hidden flex justify-center item-center bg-black ">
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
          </Card>
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
                    <div className="flex gap-2 flex-wrap item-center">
                      <Badge variant="outline">
                        <GrTag color="green" />
                      </Badge>{" "}
                      {item && item.interests
                        ? item.interests.split(",").map((interest, index) => (
                            <Badge key={index} variant="outline">
                              {trimToSevenCharacters(interest.trim())}
                            </Badge>
                          ))
                        : "N/A"}
                    </div>
                    <div className="mt-1 line-clamp-4 ">{item.bio}</div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t py-2">
                    <BookModal buttonName="LinkUp" data={item} />
                    {item.rate != "Free" ? (
                      <Badge
                        variant="outline"
                        className=" gap-1  text-white rounded-full bg-[#FFC72C]"
                      >
                        <p className="flex ">
                          20 <AiOutlineFire size={14} /> || {item.rate}
                        </p>
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="flex gap-1 rounded-full bg-green-200"
                      >
                        <p className="flex text-green-600">
                          {" "}
                          2 <AiOutlineFire size={14} /> || Free
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
