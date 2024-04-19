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
import {
  CreateBookmark,
  createNotification,
  createSession,
  getImageUrl,
  getNotifications,
  isUserValid,
} from "../../../backend/src/pocketbase";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/user-context";
import LoginDialog from "@/components/dialog/login";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { GrTag } from "react-icons/gr";
import { SignInIcon } from "@/icons/SignInIcon";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { usePaystackPayment } from "react-paystack";

const BookModal = ({ buttonName, blue, data }) => {
  const [date, setDate] = useState();
  const [isSpinning, setIsSpinning] = useState(false);
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [sessionTime, setSessionTime] = useState("");
  const [characterCount, setCharacterCount] = useState(800);
  const [formData, setFormData] = useState({
    purpose: "",
  });
  const { user, createdOrganization, setNotifications } = useUser();
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const pathname = usePathname();

  const PAYSTACK_KEY =
    process.env.PAYSTACK_KEY ||
    "pk_live_7783d09436e5356ced8146ba3de4cacdcd614645";

  const handlePaymentSuccess = () => {
    const orgId = selectedOption === "Individual" ? undefined : selectedOption;
    let sessionDate = date
      ? new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        ).toISOString()
      : new Date().toISOString();

    const requestMessageReceiver = `Hello you have received a session request from ${user.name}, accept or reject request from session requests under manager section.`;
    const requestMessageSender = `Hello you have requested a session with ${data.username}, you would be notified as soon as session is approved.`;

    createSession(
      data.id,
      data.rating,
      orgId,
      formData.purpose,
      sessionTime,
      sessionDate,
      user.username,
      user.bio
    )
      .then(() => {
        toast({
          title: "Booking request sent",
          description: "Booking request sent successfully!",
          variant: "default",
        });
      })
      .finally(() => {
        createNotification(
          "Session Request",
          requestMessageSender,
          requestMessageReceiver,
          undefined,
          data.expand.users.id,
          orgId
        ).then(() => {
          getNotifications(user.id, user.email)
            .then((res) => {
              setNotifications(res);
            })
            .catch((error) => {
              console.error("Error fetching notifications data:", error);
            });
        });
      });

    setIsSpinning(false);
    setIsLoading(false);
    setIsExpanded(false);
    setSelectedOption("");
    setDate(null);
    setFormData({ purpose: "" });
  };

  const handlePaymentCancel = () => {
    toast({
      title: "Payment canceled",
      description: "Please complete payment to be able to request a session.",
      variant: "destructive",
    });

    setIsLoading(false);
    setIsSpinning(false);
  };

  const handlePaymentError = (error) => {
    toast({
      title: "Payment initialization failed",
      description: "An error occurred during payment initialization.",
      variant: "destructive",
    });
    console.error("Payment initialization error:", error);

    setIsLoading(false);
    setIsSpinning(false);
  };

  const config = {
    publicKey: PAYSTACK_KEY,
    reference: new Date().getTime().toString(),
    email: user.email,
    currency: "NGN",
    amount: data.rate * 100,
    onSuccess: handlePaymentSuccess,
    onCancel: handlePaymentCancel,
    onError: handlePaymentError,
  };

  const initializePayment = usePaystackPayment(config);

  const options = createdOrganization.map((org) => ({
    value: org.id,
    label: org.username,
  }));

  // to add the default one too
  options.unshift({ value: "Individual", label: "Individual" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const remainingCharacters = 800 - value.length; // Calculate remaining characters
    setCharacterCount(remainingCharacters); // Update character count state
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
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
    setIsLoading(!isLoading);
    setIsSpinning(true);

    if (data.rate !== "Free") {
      initializePayment({
        onSuccess: handlePaymentSuccess,
        onClose: handlePaymentCancel,
      });
    } else {
      handlePaymentSuccess();
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBookmarkToggle = (mentor) => {
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

  const handleClick = () => {
    if (!isUserValid) {
      setIsLoginDialogOpen(true);
    }
  };

  async function copyPageUrl() {
    try {
      // Get the current page URL
      const pageUrl = window.location.href;

      // Copy the URL to the clipboard
      await navigator.clipboard.writeText(pageUrl);

      // Optional: Show a success message to the user
      alert("Page URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy page URL: ", err);
    }
  }


  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={handleClick}>
            <p className={blue ? "text-blue" : ""}>{buttonName} </p>
            <BsFillSendArrowDownFill
              color={blue ? "#0096FF" : "#0096FF"}
              className="ml-2 h-4 w-4"
            />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] rounded-md">
          <div className="max-h-[500px] w-full p-2 bookmark-scrollbar overflow-y-auto">
            {isUserValid && (
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        {data && data.expand.users ? (
                          <Avatar>
                            <AvatarImage
                              src={getImageUrl(
                                data.expand.users.collectionId,
                                data.expand.users.id,
                                data.expand.users.avatar
                              )}
                            />
                            <AvatarFallback>
                              {data && data.username
                                ? data.username.slice(0, 2).toUpperCase()
                                : "CN"}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar>
                            <AvatarFallback>
                              {data && data.username
                                ? data.username.slice(0, 2).toUpperCase()
                                : "CN"}
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {data && data.username ? data.username : "N/A"}
                          </h4>
                          <span className="text-sm tracking-tight text-default-400 flex align-middle justify-center">
                            {data && data.rating ? data.rating : "N/A"}
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
                          variant="outline"
                          aria-label="Toggle italic"
                          onClick={() => handleBookmarkToggle(data)}
                        >
                          <BsJournalBookmarkFill />
                        </Toggle>
                        <Button
                          onClick={() => copyPageUrl()}
                          size="icon"
                          variant="outline"
                          type="button"
                        >
                          <BsShareFill />
                        </Button>
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <DialogDescription className="flex flex-wrap space-x-3 mt-2">
                  <Badge variant="outline">
                    <GrTag color="green" />
                  </Badge>{" "}
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
                  <div className="mt-3">
                    <Label className="font-semibold">Personal details</Label>
                    <div
                      className={`text-sm text-darktext max-w-[380px] mx-auto ${
                        isExpanded ? " line-clamp-none" : "line-clamp-2"
                      }`}
                    >
                      <p>{data && data.bio ? data.bio : "N/A"}</p>
                    </div>
                    <button
                      type="button"
                      onClick={toggleExpand}
                      className="text-blue-600 hover:underline focus:outline-none text-sm"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  </div>

                  {/* Achievements section */}
                  <div className="flex flex-col space-y-2 ">
                    <Label className="font-semibold">Work Experiences</Label>
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

                  {/* Time slot section */}
                  {pathname === "/quickService" ? (
                    <Input
                      className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                      type="time"
                      placeholder="Pick Time In This Format 9:00pm"
                      value={sessionTime}
                      onChange={(e) => setSessionTime(e.target.value)}
                    />
                  ) : (
                    <div className="flex flex-col space-y-2 ">
                      <Label className="font-semibold">
                        Schedule Date/Time
                      </Label>
                      <Input
                        className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                        type="time"
                        placeholder="Pick Time In This Format 9:00pm"
                        value={sessionTime}
                        onChange={(e) => setSessionTime(e.target.value)}
                      />

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
                              format(date, "MMMM dd, yyyy ")
                            ) : (
                              <span>Pick a date</span>
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
                  )}

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
                    <Label className="font-semibold">Session details</Label>
                    <Textarea
                      className="w-full mt-2 h-20"
                      placeholder="Why do you want to request a session?"
                      value={formData.purpose}
                      onChange={handleChange}
                      name="purpose"
                      maxLength={800} // Adding the maxLength attribute
                    />
                    <span className="ml-1 text-sm text-darktext">
                      {characterCount} characters remaining
                    </span>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    size="xl"
                    className="bg-blue hover:bg-darkblue rounded-lg text-lg w-full mt-3"
                    type="submit"
                  >
                    {isSpinning ? "Requesting" : "Request"}
                    <AiOutlineLoading3Quarters
                      className={`${
                        isSpinning ? "ml-3 animate-spin" : "hidden"
                      }`}
                    />
                  </Button>
                </DialogFooter>
              </form>
            )}

            {isLoginDialogOpen && (
              <div className="flex flex-col items-center gap-3 ">
                <SignInIcon size={120} />
                <p className="text-darktext text-lg text-center ">
                  Create account or sign in to continue
                </p>
                <LoginDialog />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookModal;
