"use client";

import React from "react";
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
} from "../../../backend/src/pocketbase";
import { useToast } from "@/components/ui/use-toast";


const HomeCardSection = () => {
  const { mentors, isLoading } = useUser();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmark, setBookmark] = useState([]);

  const handleBookmarkToggle = (mentor) => {
    CreateBookmark(
      mentor.username,
      mentor.rate,
      mentor.bio,
      mentor.awards,
      mentor.interests,
      mentor.rating
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

    // toggle functionality incase  we need it
    // if (isBookmarked && bookmark.length > 0) {
    //   // Check if bookmark is not empty
    //   RemoveBookmark(bookmark[0].id)
    //     .then(() => {
    //       toast({
    //         title: "Removed from bookmarks",
    //         description: "Removed from bookmarks successfully!",
    //         variant: "default",
    //       });
    //       setIsBookmarked(false); // Update state to reflect removal
    //     })
    //     .catch((error) => {
    //       toast({
    //         title: "Failed to remove from bookmarks",
    //         description: "An error occurred while removing from bookmarks.",
    //         variant: "destructive",
    //       });
    //       console.error("Bookmark removal error:", error);
    //     });
    // } else {
    //   CreateBookmark(
    //     mentors[0].fullName,
    //     mentors[0].username,
    //     mentors[0].phoneNumber,
    //     mentors[0].bio,
    //     mentors[0].awards,
    //     mentors[0].businessName,
    //     mentors[0].contact,
    //     mentors[0].account
    //   )
    //     .then(() => {
    //       toast({
    //         title: "Added to bookmarks",
    //         description: "Added to bookmarks successfully!",
    //         variant: "default",
    //       });
    //       setIsBookmarked(true);
    //     })
    //     .catch((error) => {
    //       toast({
    //         title: "Failed to add to bookmarks",
    //         description: "An error occurred while adding to bookmarks.",
    //         variant: "destructive",
    //       });
    //       console.error("Bookmark addition error:", error);
    //     })
    //     .finally(() => {
    //       getBookmarks()
    //         .then((res) => {
    //           setBookmark(res);
    //         })
    //         .catch((error) => {
    //           console.error("Error fetching bookmarks data:", error);
    //           setBookmark([]); // Set bookmark state to empty array in case of error
    //         });
    //     });
    // }
  };

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
                <Skeleton key={index} className="h-52 w-64 rounded-lg" />
              ))
            : mentors.length > 0 &&
              mentors.map((item, index) => (
                <Card key={index} className="">
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
                      <Toggle
                        aria-label="Toggle italic"
                        variant="outline"
                        onClick={() => handleBookmarkToggle(item)}
                      >
                        <BsJournalBookmarkFill />
                      </Toggle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-small text-default-400">
                    <div className="flex gap-2 flex-wrap">
                      {item && item.interests
                        ? item.interests.split(",").map((interest, index) => (
                            <Badge key={index} variant="outline">
                              {interest.trim()}
                            </Badge>
                          ))
                        : "N/A"}
                    </div>
                    <div className="mt-1 ">{item.bio}</div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t py-2">
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
      </div>
    </>
  );
};

export default HomeCardSection;

