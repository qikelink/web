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
import { BsFillSendArrowDownFill, BsShareFill } from "react-icons/bs";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { Toggle } from "@/components/ui/toggle";
import { FaStar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createSession, getImageUrl } from "../../../backend/src/pocketbase";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/user-context";

const SessionModal = ({ buttonName, blue, data }) => {
  const [date, setDate] = useState();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    purpose: "",
  });
  const { createdOrganization } = useUser();

  const [selectedOption, setSelectedOption] = useState("");

  const options = createdOrganization.map((org) => ({
    value: org.id,
    label: org.org_name,
  }));

  // to add the default one too
  options.unshift({ value: "Individual", label: "Individual" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isAnyFieldEmpty = Object.values(formData).some(
      (value) => value === ""
    );

    if (isAnyFieldEmpty) {
      toast({
        title: "Please provide all values",
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }

    const orgId = selectedOption === "Individual" ? undefined : selectedOption;

    createSession(
      data.rating,
      orgId,
      data.username,
      formData.purpose,
      date.toISOString()
    )
      .then(() => {
        toast({
          title: "Booking request sent",
          description: "Booking request sent successfully! .",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to send Booking request",
          description: "Sorry an error just occurred! please try again.",
          variant: "destructive",
        });
        console.error("verification error:", error);
      })
      .finally(() => {
        setIsExpanded(false);
        setSelectedOption("");
        setDate(null);
        setFormData({ purpose: "" });
      });
  };

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
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Avatar>
                      {data && data.avatar ? (
                        <AvatarImage
                          src={getImageUrl(
                            data.collectionId,
                            data.id,
                            data.avatar
                          )}
                        />
                      ) : (
                        <AvatarFallback>{data && data.sessionWith ? data.sessionWith.slice(0, 2).toUpperCase() : 'CN'}</AvatarFallback>
                      )}
                    </Avatar>

                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        {data && data.sessionWith ? data.sessionWith : "N/A"}
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
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "MMMM dd, yyyy h:mm a")
                      ) : (
                        <span>Picking Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid w-full gap-1.5">
                <Label htmlFor="requestedAs" className="font-semibold">
                  Requested As
                </Label>
                <Textarea
                  className="w-full mt-2"
                  value={data.requestAs ? data.requestAs : "Requested As"}
                  name="requestedAs"
                />
              </div>

              {/* Questions section */}
              <div>
                <Label className="font-semibold">Meeting details</Label>
                <Textarea
                  className="w-full mt-2"
                  placeholder="Why do you want to request a session?"
                  value={
                    data.details
                      ? data.details
                      : "This is a meeting details here"
                  }
                  onChange={handleChange}
                  name="purpose"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                size="xl"
                className="bg-blue hover:bg-darkblue rounded-lg text-lg w-full mt-3"
                type="submit"
              >
                Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SessionModal;
