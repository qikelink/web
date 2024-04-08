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
import { BsJournalBookmarkFill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { list } from "@/dummy_api/dataSet";
import BookModal from "./BookModal";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/contexts/user-context";
import {
  RemoveBookmark,
  getBookmarks,
  getImageUrl,
} from "../../../backend/src/pocketbase";
import { useToast } from "@/components/ui/use-toast";
import { EmptyIcon } from "@/icons/EmptyIcon";

const BookmarkCard = () => {
  const { user, bookmarks, setBookmarks, isLoadingUserData } = useUser();
  const [remove, setRemove] = useState(false);
  const { toast } = useToast();


  useEffect(() => {
    if (user.length > 0) {
      getBookmarks(user.id)
        .then((res) => {
          setBookmarks(res);
        })
        .catch((error) => {
          console.error("Error fetching bookmarks data:", error);
          setBookmarks(bookmarks);
        });
    }
  }, [remove]);

  const handleRemove = (id) => {
    RemoveBookmark(id)
      .then(() => {
        toast({
          title: "Removed from bookmarks",
          description: "Removed from bookmarks successfully!",
          variant: "default",
        });
        reloadBookmarks();
      })
      .catch((error) => {
        toast({
          title: "Failed to remove from bookmarks",
          description: "An error occurred while removing from bookmarks.",
          variant: "destructive",
        });
        console.error("Bookmark removal error:", error);
      });
  };

  const reloadBookmarks = () => {
    setRemove((prevRemove) => !prevRemove); // Invert the 'remove' state to trigger the effect
  };

  return (
    <div className="min-h-screen flex flex-col items-center ">
      {isLoadingUserData && bookmarks.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full mt-2">
          {/* Skeleton loaders */}
          {list.map((item, index) => (
            <Skeleton key={index} className="h-52 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full mt-2">
          {/* Render bookmark cards */}
          {bookmarks.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    
                    <Avatar>
                      <AvatarImage
                        src={getImageUrl(
                          item.expand.mentor.expand.users.collectionId,
                          item.expand.mentor.expand.users.id,
                          item.expand.mentor.expand.users.avatar
                        )}
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
                  <Toggle
                    aria-label="Toggle italic"
                    variant="outline"
                    onClick={() => handleRemove(item.id)}
                  >
                    <BsJournalBookmarkFill />
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
                <div className="mt-2 line-clamp-4">{item.bio}</div>

                <Separator className="my-2 -mb-4" />
              </CardContent>
              <CardFooter className="flex justify-between ">
                <BookModal buttonName="Request" data={item.expand.mentor} />
                {item.rate != "free" ? (
                  <Badge
                    variant="outline"
                    className="flex gap-1 rounded-full bg-green-200"
                  >
                    <p className="font-semibold  text-green-700">{item.rate}</p>
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
      )}

      {!isLoadingUserData && bookmarks.length === 0 && (
        <div className="flex flex-col  items-center w-full h-full mt-32">
          <EmptyIcon size={150} />
          <p className="text-center text-xl font-medium text-darktext">
            No bookmarks to show for now.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookmarkCard;
