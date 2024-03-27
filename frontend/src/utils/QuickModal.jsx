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
import { BsHeadsetVr, BsShareFill } from "react-icons/bs";
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
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/user-context";

const QuickModal = ({ buttonName, blue, data }) => {
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
            <BsHeadsetVr className="ml-2 h-5 w-5 text-current hover:animate-spin" />
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
                        <AvatarFallback>CN</AvatarFallback>
                      )}
                    </Avatar>

                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        {data && data.username ? data.username : "N/A"}
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
            <DialogDescription className="flex flex-wrap space-x-3 mt-2">
              <p>Interests:</p>
              {data && data.interests
                ? data.interests.split(",").map((interest, index) => (
                    <Badge key={index} variant="outline">
                      {interest.trim()}
                    </Badge>
                  ))
                : "N/A"}
            </DialogDescription>

            <div className="space-y-3">
              {/* personal details */}
              <div>
                <Label className="font-semibold">Personal details</Label>
                <div
                  className={`text-sm text-darktext max-w-[380px] mx-auto ${
                    isExpanded ? " line-clamp-none" : "line-clamp-2"
                  }`}
                >
                  <p>{data && data.bio ? data.bio : "N/A"}</p>
                </div>
                <button
                  onClick={toggleExpand}
                  className="text-blue-600 hover:underline focus:outline-none text-sm"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </div>

              {/* Achievements section */}
              <div className="flex flex-col space-y-2 ">
                <Label className="font-semibold">Achievements</Label>
                <ol className="text-sm text-darktext list-disc ml-4">
                  {data && data.awards
                    ? data.awards
                        .split(",")
                        .map((award, index) => (
                          <li key={index}>{award.trim()}</li>
                        ))
                    : "N/A"}
                </ol>
              </div>

              <div className="relative inline-block w-full">
                {/* <Label className="font-semibold">Request Meeting As</Label> */}
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Request meet as
                  </option>
                  {options.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="py-2"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"
                    />
                  </svg>
                </div>
              </div>

              {/* Questions section */}
              <div>
                <Label className="font-semibold">Meeting details</Label>
                <Textarea
                  className="w-full mt-2"
                  placeholder="Why do you want to request a session?"
                  value={formData.purpose}
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

export default QuickModal;
