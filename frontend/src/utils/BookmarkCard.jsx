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
import ModalBox from "./BookModal";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { list } from "@/dummy_api/dataSet";
import BookModal from "./BookModal";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/contexts/user-context";
import { BookmarkEmpty } from "@/components/emptystate/bookmarkEmpty";
import { RemoveBookmark, getBookmarks } from "../../../backend/src/pocketbase";
import { useToast } from "@/components/ui/use-toast";

const BookmarkCard = () => {
  const { user, bookmarks, setBookmarks, isLoadingUserData } = useUser();
  const [remove, setRemove] = useState(false)
  const { toast } = useToast();

  useEffect(() => {
    if (user.length > 0) {
      getBookmarks(user[0].id)
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
    <div className="h-screen">
      {isLoadingUserData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full mt-2">
          {/* Skeleton loaders */}
          {list.map((item, index) => (
            <Skeleton key={index} className="h-52 w-64 rounded-lg" />
          ))}
        </div>
      ) : bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full mt-2">
          {/* Render bookmark cards */}
          {bookmarks.map((item, index) => (
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
                <div className=" ">{item.bio}</div>

                <Separator className="my-2 -mb-4" />
              </CardContent>
              <CardFooter className="flex justify-between ">
                <BookModal buttonName="Request" data={item} />
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
      ) : (
        <div className="flex justify-center items-center h-full">
          {/* Render BookmarkEmpty when no bookmarks exist */}
          <BookmarkEmpty />
        </div>
      )}
    </div>
  );
};

export default BookmarkCard;
