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
import { list } from "@/dummy_api/dataSet";
import BookModal from "./BookModal";

const BookmarkCard = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [value, onChange] = useState(new Date());



  return (
    <>
      <div className="min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-fullull mt-6">
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
                 {/* <BookModal buttonName="Request" /> */}
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
               <BookModal buttonName="Request" />
               {item.rate != "free" ? (
                 <Badge
                   variant="outline"
                   className="flex gap-1 rounded-full bg-green-500"
                 >
                   <p className="font-semibold  text-secondary">{item.rate}</p>
                 </Badge>
               ) : (
                 <Badge
                   variant="outline"
                   className="flex gap-1 rounded-full bg-red"
                 >
                   <p className="font-semibold  text-secondary">Free</p>
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

export default BookmarkCard;
