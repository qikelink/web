import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsFillSendArrowDownFill, BsShareFill } from "react-icons/bs";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { Toggle } from "@/components/ui/toggle";
import { FaStar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import SessionBar from "./SessionBar";
import { sessions, sessiontags } from "@/dummy_api/dataSet";
import { Textarea } from "@/components/ui/textarea";

const ModalBox = ({ buttonName, blue }) => {
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      James Madison
                    </h4>
                    <span className="text-sm tracking-tight text-default-400 flex align-middle justify-center">
                      4.5/5
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

                {/* <ModalBox buttonName="Request" /> */}
              </div>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-wrap space-x-3 mt-2">
            <p>Interests:</p>
            <Badge variant="outline">Startup</Badge>
            <Badge variant="outline">Tech</Badge>
            <Badge variant="outline">Business</Badge>
            <Badge variant="outline">Health</Badge>
          </DialogDescription>

          <div className="space-y-3">
            {/* Info section */}
            <div>
              <Label className="font-semibold text-md">Personal details</Label>
              <p className="text-sm text-darktext">
                James madison is an english footballer with the english national
                team, Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Necessitatibus nemo dolor aut dolore hic aliquid repellendus
                maiores maxime libero doloribus ipsa perspiciatis earum nisi
                explicabo, eius quis atque aperiam et!
              </p>
            </div>

            {/* Achievements section */}
            <div>
              <Label className="font-semibold text-md">Achievements</Label>
              <ol className="text-sm text-darktext list-disc">
                <li>Winner Ballon'dor 2021 🏆</li>
                <li>Winner English player of the year award 🥇</li>
                <li>Times magazine most influencer sports personality 🌟</li>
              </ol>
            </div>

            {/* Time slot section */}
            <div className="max-w-[370px] mx-auto">
              <Label className="font-semibold text-md">
                Available sessions - Jan 20th
              </Label>
              <SessionBar data={sessions} />
            </div>

            {/* Section section
            <div className="max-w-[380px] mx-auto">
              <Label className='font-semibold text-md'>Session tag </Label>
              <SessionBar data={sessiontags} />
            </div> */}

            {/* Questions section */}
            <div>
              <Label className="font-semibold text-md">Meeting details</Label>
              <Textarea
                className="w-full mt-2"
                placeholder="Why do you want to request a session?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              size="xl"
              className="bg-blue hover:bg-darkblue rounded-lg text-lg w-full"
              type="submit"
            >
              Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalBox;
