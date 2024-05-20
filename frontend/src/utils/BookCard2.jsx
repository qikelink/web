"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/user-context";
import { usePathname, useRouter } from "next/navigation";
import { SignInIcon } from "@/icons/SignInIcon";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { usePaystackPayment } from "react-paystack";
import { FaX } from "react-icons/fa6";
import {
  CreateBookmark,
  createNotification,
  createSession,
  getImageUrl,
  getNotifications,
  isUserValid,
} from "../../../backend/src/pocketbase";
import { Skeleton } from "@/components/ui/skeleton";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { QikelinkLogo } from "@/icons/Qikelinklogo";
import { ImCross } from "react-icons/im";
import LoginDialog from "@/components/dialog/login";
import { format } from "date-fns";

const BookCard2 = () => {
  const [date, setDate] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [sessionTime, setSessionTime] = useState("");
  const [characterCount, setCharacterCount] = useState(800);
  const [formData, setFormData] = useState({
    purpose: "",
    email: "",
    name: "",
  });
  const {
    user,
    isLoading,
    mentorForBooking,
    createdOrganization,
    setNotifications,
  } = useUser();

  const [selectedOption, setSelectedOption] = useState("");
  const [isloading, setIsloading] = useState(true);
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paid, setPaid] = useState(false);

  const closeDialog = () => setIsDialogOpen(false);
  const openDialog = () => setIsDialogOpen(true);

  const handleLink = () => {
    router.push("/get-started");
  };

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
      mentorForBooking.id,
      mentorForBooking.rating,
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
        closeDialog();
      })
      .finally(() => {
        createNotification(
          "Session Request",
          requestMessageSender,
          requestMessageReceiver,
          undefined,
          mentorForBooking.expand.users.id,
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
    setIsloading(false);
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

    setIsloading(false);
    setIsSpinning(false);
  };

  const handlePaymentError = (error) => {
    toast({
      title: "Payment initialization failed",
      description: "An error occurred during payment initialization.",
      variant: "destructive",
    });
    console.error("Payment initialization error:", error);

    setIsloading(false);
    setIsSpinning(false);
  };

  const config = {
    publicKey: PAYSTACK_KEY,
    reference: new Date().getTime().toString(),
    email: user.email,
    currency: "NGN",
    amount:
      mentorForBooking && mentorForBooking.rate
        ? mentorForBooking.rate * 100
        : 0,
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

    if (!isUserValid) {
      handleClick();
    }

    if (
      selectedOption === "" ||
      sessionTime === "" ||
      formData.purpose === "" ||
      formData.email === "" ||
      formData.name === ""
    ) {
      toast({
        title: "Please provide all values",
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }
    setIsloading(!isloading);
    setIsSpinning(true);

    if (mentorForBooking.rate !== "Free" || !paid) {
      setIsDialogOpen(false);
      initializePayment({
        onSuccess: setPaid(true),
        onClose: handlePaymentCancel,
      });
    } else {
      handlePaymentSuccess();
    }
  };

  const handlePaystack = async (event) => {
    event.preventDefault();

    if (!isUserValid) {
      handleClick();
    }

    if (mentorForBooking.rate === null) {
      return;
    }

    if (mentorForBooking.rate !== "Free" || !paid) {
      setIsDialogOpen(false);
      initializePayment({
        onSuccess: setPaid(true),
        onClose: handlePaymentCancel,
      });
    } else {
      handlePaymentSuccess();
    }
  };

  const handleStripe = async (event) => {
    event.preventDefault();

    if (!isUserValid) {
      handleClick();
    }

    if (mentorForBooking.rate === null) {
      return;
    }

    if (mentorForBooking.rate !== "Free" || !paid) {
      setIsDialogOpen(false);
      initializePayment({
        onSuccess: setPaid(true),
        onClose: handlePaymentCancel,
      });
    } else {
      handlePaymentSuccess();
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBookmarkToggle = (mentorForBooking) => {
    CreateBookmark(
      mentorForBooking.username,
      mentorForBooking.rate,
      mentorForBooking.bio,
      mentorForBooking.awards,
      mentorForBooking.interests,
      mentorForBooking.rating,
      mentorForBooking.id
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
    setIsDialogOpen(true);
  };

  async function copyBookCardUrl() {
    try {
      // Get the current BookCard URL
      const BookCardUrl = window.location.href;

      // Copy the URL to the clipboard
      await navigator.clipboard.writeText(BookCardUrl);
      toast({
        title: "Profile link copied",
        description: "Profile link copied successfully to clickboard.",
        variant: "default",
      });
    } catch (err) {
      console.error("Failed to copy BookCard URL: ", err);
    }
  }

  const router = useRouter();

  const handleBrowse = () => {
    router.push("/mentors");
  };

  const handleContact = () => {
    const recipientEmail = "support@qikelink.com";
    const subject = "Contact Us";

    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}`;
  };

  const handleAbout = () => {
    router.push("/help");
  };

  const getInitials = (username) => {
    if (username && username.length >= 3) {
      return username.substring(0, 3).toUpperCase();
    }
    return username ? username.toUpperCase() : "";
  };

  return (
    <div className="bg-[#D9EBFF] absolute px-4 lg:px-12 py-6 h-full w-full flex flex-col space-y-3">
      {/* Header */}
      <div className="bg-[#FFFFFFCC] rounded-full py-4 px-4 lg:px-8 flex justify-between items-center w-[100%] mx-auto">
        <div className="flex space-x-3">
          <div className="flex items-center cursor-pointer">
            <QikelinkLogo />
            <p className="font-bold text-xl ml-2">Qikelink</p>
          </div>

          <Badge className="px-4 rounded-full bg-[#d6e7fa]" variant="secondary">
            Beta
          </Badge>
        </div>

        <div className="hidden lg:flex space-x-3 items-center">
          <Button variant="ghost" onClick={handleAbout}>
            About
          </Button>
          <Button variant="ghost" onClick={handleContact}>
            Contact us
          </Button>
          <LoginDialog
            loginText={!isUserValid ? "Sign In" : getInitials(user.username)}
            buttonColor="bg-black"
            buttonHoverColor="bg-gray-800"
            buttonSize="lg"
            textHoverColor="white"
          />
        </div>
        <div className="lg:hidden">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <HiBars3BottomRight size={20} />
              </MenubarTrigger>
              <MenubarContent className="flex flex-col space-y-3 bg-[#FFFFFF] p-2">
                <Button onClick={handleAbout} variant="ghost">
                  About
                </Button>
                <Button onClick={handleContact} variant="ghost">
                  Contact us
                </Button>
                <LoginDialog
                 loginText={!isUserValid ? "Sign In" : getInitials(user.username)}
                  buttonColor="bg-black"
                  buttonHoverColor="bg-gray-600"
                  buttonSize="lg"
                  textHoverColor="white"
                />
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <div className="rounded-xl relative bg-[#FFFFFF] p-4 h-full overflow-hidden">
        <div className="h-full overflow-y-auto lg:flex lg:space-x-6">
          {/* Banner, Avatar and chat button */}
          <div className="lg:w-[30%]">
            <div>
              <div className="relative w-full">
                <img
                  src="/banner.svg"
                  alt="banner image"
                  className="rounded-xl mx-auto w-full"
                />
                <div className="absolute -bottom-5 left-3">
                  {isLoading ? (
                    <Skeleton className="w-10 h-10 rounded-full"></Skeleton>
                  ) : (
                    <>
                      {mentorForBooking &&
                      mentorForBooking.expand &&
                      mentorForBooking.expand.users ? (
                        <Avatar>
                          <AvatarImage
                            src={
                              mentorForBooking.expand.users.collectionId
                                ? getImageUrl(
                                    mentorForBooking.expand.users.collectionId,
                                    mentorForBooking.expand.users.id,
                                    mentorForBooking.expand.users.avatar
                                  )
                                : ""
                            }
                          />
                          <AvatarFallback>
                            {mentorForBooking.username
                              ? mentorForBooking.username
                                  .slice(0, 2)
                                  .toUpperCase()
                              : "CN"}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar>
                          <AvatarFallback>
                            {mentorForBooking.username
                              ? mentorForBooking.username
                                  .slice(0, 2)
                                  .toUpperCase()
                              : "CN"}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-3 items-center">
                  <div className="flex flex-col ml-1">
                    <p className="text-start text-gray-800 text-base">
                      {mentorForBooking.username
                        ? mentorForBooking.username
                        : "John Doe"}
                    </p>
                    <p className="text-start text-darktext text-sm">
                      {mentorForBooking && mentorForBooking.interests
                        ? mentorForBooking.interests
                            .split(",")
                            .slice(0, 2) // Limit to the first two interests
                            .map((interest) => interest.trim()) // Trim each interest
                            .join(" + ") // Join with a plus sign
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <Chat />
              </div>

              <Separator className="bg-gray-100 mt-3 hidden lg:block" />
            </div>

            {/* Title and bio section */}

            <div className="lg:flex lg:flex-col-reverse lg:space-y-4 lg:w-[90%]">
              <div className="space-y-2 mt-4">
                <p className="text-sm text-darktext hidden lg:block mt-2">
                  About
                </p>
                <p className="text-black text-base lg:hidden">
                  Coaching Call <span className="text-darktext">(20mins)</span>
                </p>

                {isLoading ? (
                  <Skeleton className="h-16 w-full"></Skeleton>
                ) : (
                  <>
                    <div
                      className={`text-darktext lg:text-gray-700 text-sm line-clamp-3 lg:line-clamp-none lg:tracking-wide  ${
                        isExpanded ? " line-clamp-none" : "line-clamp-3"
                      }`}
                    >
                      <p>
                        {mentorForBooking.bio
                          ? mentorForBooking.bio
                          : "Mentor Bio"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={toggleExpand}
                      className="text-blue-600 hover:underline focus:outline-none text-sm"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>{" "}
                  </>
                )}
              </div>
              {/* Button sections */}
              <div className="flex flex-col space-y-3 mt-2">
                <p className="text-base font-semibold mt-2 lg:hidden">
                  Booking Info
                </p>
                <div className="text-black text-2xl hidden lg:block">
                  <p className="text-sm text-darktext">Title</p>
                  <p>
                    {" "}
                    Coaching Call{" "}
                    <span className="text-darktext">(20mins)</span>
                  </p>
                </div>
                <div className="flex space-x-3">
                  <div className="bg-[#F2F8FF] flex space-x-1 px-3 py-1 rounded-full text-darktext font-light">
                    <img src="/wallet.svg" alt="Chat icon" className="mr-1" />
                    {mentorForBooking.rate
                      ? mentorForBooking.rate
                      : "Booking Fee"}
                  </div>
                  <div className="bg-[#F2F8FF] flex space-x-1 px-3 py-1 rounded-full text-darktext font-light">
                    <img src="/clock.svg" alt="Chat icon" className="mr-1" />
                    20mins
                  </div>
                </div>
                <div className="bg-[#F2F8FF] flex space-x-1 px-3 py-1 rounded-full text-darktext font-light text-left ">
                  <img src="/calendar.svg" alt="Chat icon" className="mr-1" />
                  <p className="line-clamp-1">
                    {sessionTime || date
                      ? `${sessionTime}`
                      : "Pick session time"}{" "}
                    {date ? format(date, "EEEE, MMMM dd, yyyy") : ""}
                  </p>
                </div>
                <Separator className="bg-gray-100 my-3 hidden lg:block" />
              </div>
            </div>
          </div>

          <Separator className="bg-gray-100 my-3 sm:hidden" />

          {/* Enter Details section */}
          <div className="lg:w-[40%] lg:overflow-y-auto ">
            <div className="flex flex-col space-y-3 mt-4 lg:mt-0">
              <p className="text-base font-semibold my-2 lg:my-0">
                Enter Details
              </p>

              <div className="space-y-2">
                <Label>
                  Email <span className="text-darktext">(required)</span>
                </Label>
                <Input
                  className="rounded-full py-6 px-4"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Name <span className="text-darktext">(required)</span>
                </Label>
                <Input
                  className="rounded-full py-6 px-4"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Select time <span className="text-darktext">(required)</span>
                </Label>
                <div className="flex space-x-3 justify-evenly">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-full bg-gray-200 text-[#0A84FF]",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <img
                          src="/calendar2.svg"
                          alt="Calendar icon"
                          className="mr-1"
                        />
                        {date ? (
                          format(date, "MMMM dd, yyyy")
                        ) : (
                          <span className="text-[#0A84FF]">Pick a date</span>
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

                  <Input
                    className="bg-gray-200 rounded-full py-2 text-[#0A84FF] w-full px-3"
                    type="time"
                    placeholder="9:00pm"
                    value={sessionTime}
                    onChange={(e) => setSessionTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Label>
                  Book as <span className="text-darktext">(required)</span>
                </Label>
                <div className="relative inline-block w-2/4 bg-gray-200 rounded-full">
                  <select
                    className="block appearance-none  text-[#0A84FF] w-full bg-gray-200 rounded-full border border-gray-300  py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  >
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
              </div>

              <div className="space-y-2">
                <Label>
                  Reason for session
                  <span className="text-darktext ml-1">(required)</span>
                </Label>

                {isLoading ? (
                  <Skeleton className="h-24 w-full"></Skeleton>
                ) : (
                  <Textarea
                    className="h-20 sm:h-28 rounded-2xl"
                    placeholder="Please share what you need my help on."
                    name="reason"
                    value={formData.purpose}
                    onChange={handleChange}
                    maxLength={800} // Adding the maxLength attribute
                  />
                )}
                {/* {!isLoading && (
                  <span className="ml-1 text-sm text-darktext">
                    {characterCount} characters remaining
                  </span>
                )} */}
              </div>
            </div>

            <Separator className="bg-gray-200 my-3" />

            {/* Payment section */}
            <div className="space-y-2 mt-6">
              <div className="flex space-x-3 items-center">
                <Label>Payment </Label>
                <Button
                  variant="secondary"
                  className="bg-[#F2F8FF] rounded-full text-darktext font-light"
                >
                  <img src="/wallet.svg" alt="Chat icon" className="mr-1" />
                  {mentorForBooking.rate ? mentorForBooking.rate : " Fee"}
                </Button>
              </div>
              <p className="text-sm text-darktext">
                All transactions are secure and encrypted
              </p>
              <div className="flex space-x-3 items-center justify-start">
                <Button
                  variant="outline"
                  className="py-6 px-10 rounded-lg text-xl font-medium text-[#635BFF]"
                  onClick={isUserValid ? openDialog : openDialog}
                >
                  <img
                    src="/stripe.svg"
                    alt="stripe icon"
                    className="mr-2 w-5 h-5"
                  />
                  Stripe
                </Button>
                <Button
                  variant="outline"
                  className="py-6 px-8 rounded-lg text-lg font-medium"
                  onClick={isUserValid ? handlePaystack : openDialog}
                >
                  <img
                    src="/paystack.png"
                    alt="paystack icon"
                    className="mr-2 w-5 h-5"
                  />
                  Paystack
                </Button>
              </div>
              <p className="text-xs text-darktext flex items-center">
                {mentorForBooking.rate === "Free"
                  ? null
                  : !paid && mentorForBooking.rate !== "Free"
                  ? "No payment detected yet.."
                  : "Payment successful, book away!"}
                <AiOutlineLoading3Quarters
                  className={`${
                    mentorForBooking.rate === "Free"
                      ? "hidden"
                      : !paid && mentorForBooking.rate !== "Free"
                      ? "ml-1 animate-spin"
                      : "hidden"
                  }`}
                />
              </p>
            </div>

            {/* Buttons request and claim link */}
            <div className="mt-6 space-y-3">
              {isUserValid ? (
                <Button
                  size="xl"
                  className="bg-blue hover:bg-darkblue rounded-xl text-lg w-full"
                  onClick={handleSubmit}
                >
                  {isSpinning ? "Booking.." : "Book Now"}
                  <AiOutlineLoading3Quarters
                    className={`${isSpinning ? "ml-3 animate-spin" : "hidden"}`}
                  />
                </Button>
              ) : (
                <Button
                  size="xl"
                  className="bg-blue hover:bg-darkblue rounded-xl text-lg w-full"
                  type="button"
                  onClick={openDialog}
                >
                  Book Now
                </Button>
              )}

              <p className="text-center mt-2 text-sm">
                claim your own link{" "}
                <button variant="ghost" className=" text-base text-blue ">
                  get link
                </button>
              </p>
            </div>
          </div>

          <div className="hidden lg:block lg:w-[30%] lg:mx-3">
            <Card className="h-full flex flex-col">
              <CardContent className="p-2 rounded-2xl flex-grow">
                <CardHeader className="mt-2 mb-2">
                  <CardTitle className="flex justify-between">
                    Message
                  </CardTitle>
                  <Separator className="bg-gray-200 my-2" />
                  <CardDescription className="text-left p-2 w-full bg-[#FFF2E6] rounded-lg flex space-x-2 items-start">
                    <img
                      src="/chatnotify.svg"
                      alt="Chat icon"
                      className="mt-1"
                    />
                    <p>You can send a message for free to your mentor.</p>
                  </CardDescription>
                </CardHeader>
                <div className="grid gap-4 py-4 flex-grow"></div>
              </CardContent>
              <CardFooter className="mt-auto">
                <div className="relative w-full">
                  <Input
                    className="rounded-full py-6 px-4 pr-12"
                    placeholder="Enter message"
                  />
                  <button className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <img
                      src="/send.svg"
                      alt="Send message"
                      className="h-6 w-6"
                    />
                  </button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <Dialog open={isDialogOpen} onClose={closeDialog}>
            <DialogContent className="p-4 rounded-lg w-[90%]">
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={closeDialog}
                  className="absolute top-0 right-0 "
                >
                  <FaX size={16} />
                </Button>
                <div className="flex flex-col items-center gap-3 mt-4">
                  <SignInIcon size={100} />
                  <p className="text-darktext text-lg text-center">
                    Create account or sign in to book
                  </p>
                  <LoginDialog
                    loginText="Sign In"
                    buttonColor="bg-black"
                    buttonHoverColor="bg-gray-600"
                    buttonSize="lg"
                    textHoverColor="white"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default BookCard2;

export const Chat = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="py-2 px-4 bg-[#F2F8FF] rounded-lg mr-2 lg:hidden"
        >
          <img src="/chat.svg" alt="Chat icon" className="mr-1" />
          Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:max-w-[425px] h-[80%] rounded-2xl">
        <DialogHeader className="mt-2 mb-2">
          <DialogTitle className="flex justify-between">
            Message
            <DialogClose asChild>
              <ImCross className="rounded-full p-1 bg-gray-200 w-5 h-5" />
            </DialogClose>
          </DialogTitle>
          <Separator className="bg-gray-200 my-2" />
          <DialogDescription className="text-left p-2 w-full bg-[#FFF2E6] rounded-lg flex space-x-2 items-start">
            <img src="/chatnotify.svg" alt="Chat icon" className="mt-1" />
            <p>You can send a message for free to your mentor.</p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter>
          <div className="relative w-full">
            <Input
              className="rounded-full py-6 px-4 pr-12"
              placeholder="Enter message"
            />
            <button className="absolute inset-y-0 right-0 flex items-center pr-4">
              <img src="/send.svg" alt="Send message" className="h-6 w-6" />
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};