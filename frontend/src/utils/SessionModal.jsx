import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { BsFillSendArrowDownFill, BsShareFill } from "react-icons/bs";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { Toggle } from "@/components/ui/toggle";
import { FaStar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { getImageUrl } from "../../../backend/src/pocketbase";

const SessionModal = ({ buttonName, blue, data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <p className={blue ? "text-blue" : ""}>{buttonName} </p>
            <BsFillSendArrowDownFill
              color={blue ? "#0096FF" : "#0096FF"}
              className="ml-2 h-4 w-4"
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-md">
          <form>
            <DialogHeader>
              <DialogTitle>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Avatar>
                      {data && data.expand.mentor.username ? (
                        <AvatarImage
                          src={getImageUrl(
                            data.expand.mentor.expand.users.collectionId,
                            data.expand.mentor.expand.users.id,
                            data.expand.mentor.expand.users.avatar
                          )}
                        />
                      ) : (
                        <AvatarFallback>
                          {data && data.expand.mentor.username
                            ? data.expand.mentor.username
                                .slice(0, 2)
                                .toUpperCase()
                            : "CN"}
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        {data && data.expand.mentor.username
                          ? data.expand.mentor.username
                          : "N/A"}
                      </h4>
                      <span className="text-sm tracking-tight text-default-400 flex align-middle justify-center">
                        {data && data.rating ? data.rating : "N/A"}
                        <FaStar className="ml-1" color="#FFC72C" size={16} />
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <Toggle variant="outline" aria-label="Toggle italic">
                      <BsJournalBookmarkFill />
                    </Toggle>
                    <Button size="icon" variant="outline">
                      <BsShareFill />
                    </Button>
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-3  mt-2">
              {/* personal details */}
              <div>
                <Label className="font-semibold">Meeting Purpose</Label>
                <div
                  className={`text-base text-darktext max-w-[380px] mx-auto ${
                    isExpanded ? " line-clamp-none" : "line-clamp-2"
                  }`}
                >
                  <p>{data && data.purpose ? data.purpose : "N/A"}</p>
                </div>
                <button
                  type="button"
                  onClick={toggleExpand}
                  className="text-blue-600 hover:underline focus:outline-none text-sm"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </div>

              {/* Time slot section */}
              <div className="flex flex-col space-y-2 ">
                <Label className="font-semibold">Meeting Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !data.sessionDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {data.sessionDate ? (
                        format(data.sessionDate, "MMMM dd, yyyy h:mm a")
                      ) : (
                        <span>Picking Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </Popover>
              </div>

              <div className="grid w-full gap-1.5">
                <Label htmlFor="requestedAs" className="font-semibold">
                  Requested As
                </Label>
                <Textarea
                  className="w-full mt-2"
                  value={
                    data.organization.length > 0 ? "Organization" : "Individual"
                  }
                  name="requestedAs"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  size="xl"
                  className="bg-blue hover:bg-darkblue rounded-lg text-lg w-full mt-3"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SessionModal;
