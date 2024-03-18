import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { BsFillSendArrowDownFill } from "react-icons/bs";
import { Input } from "@/components/ui/input";

const VerifyModal = ({ buttonName, blue }) => {
  const [date, setDate] = useState();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="xl" variant="outline" className="text-lg rounded-lg">
            <p className={blue ? "text-blue" : ""}>Get verified </p>
            <BsFillSendArrowDownFill
              color={blue ? "#0096FF" : "#0096FF"}
              className="ml-2 h-4 w-4"
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Verification request</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            verify your account to start earning as a mentor.
          </DialogDescription>

          <div className="space-y-3">
            {/* personal details */}
            <div>
              <Label className="font-semibold ">Full name</Label>
              <Input
                name="fullname"
                type="name"
                placeholder="Full name"
                className=" bg-inputbackground mt-1 "
              />
            </div>

            {/* Achievements section */}
            <div>
              <Label className="font-semibold ">Valid ID</Label>
              <Input name="id" type="file" className=" bg-inputbackground mt-1 " />
            </div>

            {/* Time slot section */}
            <div>
              <Label className="font-semibold ">Social contact</Label>
              <Input
                name="contact"
                type="contact"
                placeholder="Social contact"
                className=" bg-inputbackground mt-1 "
              />
            </div>

            {/* Questions section */}
            <div>
              <Label className="font-semibold ">Payment details</Label>
              <Input
                name="account"
                type="account"
                placeholder="Payment account"
                className=" bg-inputbackground mt-1 "
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              size="xl"
              className="bg-blue hover:bg-darkblue rounded-lg text-lg w-full"
              type="submit"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerifyModal;
