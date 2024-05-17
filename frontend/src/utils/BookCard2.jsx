"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { HiBars3BottomRight } from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { QikelinkLogo } from "@/icons/Qikelinklogo";
import { ImCross } from "react-icons/im";

const BookCard2 = () => {
  const [date, setDate] = useState();
  const [sessionTime, setSessionTime] = useState("");

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

  //   useEffect(() => {
  //     let prevScrollPos = window.scrollY;
  //     const navbar = document.getElementById("navbar");

  //     const handleScroll = () => {
  //       const currentScrollPos = window.scrollY;

  //       if (currentScrollPos > prevScrollPos) {
  //         // Scrolling down
  //         navbar.classList.add(
  //           "fixed",
  //           "-top-10",
  //           "left-0",
  //           "right-0",
  //           "bg-white",
  //           "z-50"
  //         );
  //       } else {
  //         // Scrolling up
  //         if (currentScrollPos === 0) {
  //           // Reached the top of the page
  //           navbar.classList.remove(
  //             "fixed",
  //             "top-0",
  //             "w-full",
  //             "left-0",
  //             "right-0",
  //             "bg-white",
  //             "z-50"
  //           );
  //         }
  //       }

  //       prevScrollPos = currentScrollPos;
  //     };

  //     window.addEventListener("scroll", handleScroll);

  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

  return (
    <div className="bg-[#D9EBFF] absolute px-4 lg:px-12 py-6 h-full flex flex-col space-y-3">
      {/* Header */}
      <div className="bg-[#FFFFFFCC]  rounded-full py-4 px-4 lg:px-8 flex justify-between items-center w-[100%] mx-auto">
        <div className="flex space-x-3">
          <div className="flex items-center">
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
          <Button size="lg" onClick={handleBrowse}>
            Get started
          </Button>
        </div>
        <div className="lg:hidden">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <HiBars3BottomRight size={20} />
              </MenubarTrigger>
              <MenubarContent className="flex flex-col space-y-3 bg-[#FFFFFFCC] p-2">
                <Button onClick={handleAbout} variant="ghost">
                  About
                </Button>
                <Button onClick={handleContact} variant="ghost">
                  Contact us
                </Button>
                <Button onClick={handleBrowse} size="lg">
                  Get started
                </Button>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <div className="rounded-xl relative bg-[#FFFFFF] p-4 h-full overflow-hidden">
        <div className="h-full overflow-y-auto lg:flex space-x-6">
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
                  <Avatar className="h-16 w-16 ">
                    <AvatarImage src={"/image.png"} />
                    <AvatarFallback>'CN'</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-3 items-center">
                  <div className="flex flex-col ml-1">
                    <p className="text-start text-gray-800 text-base">
                      Mel Robbins
                    </p>
                    <p className="text-start text-darktext text-sm">
                      Youtuber + Educator
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
                <p className="text-sm text-darktext hidden lg:block mt-2">About</p>
                <p className="text-black text-base lg:hidden">
                  Coaching Call <span className="text-darktext">(20mins)</span>
                </p>
                <p className="text-darktext lg:text-gray-700 text-sm line-clamp-3 lg:line-clamp-none lg:tracking-wide ">
                  Co-founder and CEO @qikelink. Prev. CTO @bustleup,
                  Ex-Outreachy Intern, I bring a wealth of experience in
                  software development and startup ventures. I am poised to
                  provide expert advice on all aspects of startups, both
                  technical and business-related.
                </p>
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
                    $50
                  </div>
                  <div className="bg-[#F2F8FF] flex space-x-1 px-3 py-1 rounded-full text-darktext font-light">
                    <img src="/clock.svg" alt="Chat icon" className="mr-1" />
                    20mins
                  </div>
                </div>
                <div className="bg-[#F2F8FF] flex space-x-1 px-3 py-1 rounded-full text-darktext font-light text-left ">
                  <img src="/calendar.svg" alt="Chat icon" className="mr-1" />
                  <p className="line-clamp-1">
                    16:00 - 17:00, Wednesday, May 15, 2024{" "}
                  </p>
                </div>
                <Separator className="bg-gray-100 my-3 hidden lg:block" />
              </div>
            </div>
          </div>

          <Separator className="bg-gray-100 my-3 sm:hidden" />

          {/* Enter Details section */}
          <div className="lg:w-[40%] lg:overflow-y-auto w-fit">
            <div className="flex flex-col space-y-3 mt-4 lg:mt-0">
              <p className="text-base font-semibold my-2 lg:my-0">Enter Details</p>

              <div className="space-y-2">
                <Label>
                  Email <span className="text-darktext">(required)</span>
                </Label>
                <Input
                  className="rounded-full py-6 px-4"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Name <span className="text-darktext">(required)</span>
                </Label>
                <Input
                  className="rounded-full py-6 px-4"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Select time <span className="text-darktext">(required)</span>
                </Label>
                <div className="flex space-x-3">
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
                          alt="Chat icon"
                          className="mr-1"
                        />
                        {date ? (
                          format(date, "MMMM dd, yyyy ")
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
                    className="bg-gray-200 rounded-full py-2 text-[#0A84FF] w-3/4"
                    type="time"
                    placeholder="9:00pm"
                    value={sessionTime}
                    onChange={(e) => setSessionTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  Book as <span className="text-darktext">(required)</span>
                </Label>
                <Select>
                  <SelectTrigger className="w-2/4 bg-gray-200 rounded-full text-[#0A84FF]">
                    <SelectValue placeholder="Individual" />
                  </SelectTrigger>
                  <SelectContent className="h-fit bg-transparent">
                    <SelectGroup>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Reason for session
                  <span className="text-darktext ml-1">(required)</span>
                </Label>
                <Textarea
                  className="h-20 sm:h-28 rounded-2xl"
                  placeholder="Please share what you need my help on."
                  name="reason"
                ></Textarea>
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
                  $50
                </Button>
              </div>
              <p className="text-sm text-darktext">
                All transactions are secure and encrypted
              </p>
              <div className="flex space-x-3 items-center justify-start">
                <Button
                  variant="outline"
                  className="py-6 px-10 rounded-lg text-xl font-medium text-[#635BFF]"
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
                >
                  <img
                    src="/paystack.png"
                    alt="paystack icon"
                    className="mr-2 w-5 h-5"
                  />
                  Paystack
                </Button>
              </div>
            </div>

            {/* Buttons request and claim link */}
            <div className="mt-6 space-y-3">
              <Button className="bg-[#0A84FF] w-full rounded-xl" size="xl">
                Book Now
              </Button>

              <p className="text-center mt-2 text-base">
                claim your own link{" "}
                <button variant="ghost" className=" text-lg text-blue ">
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
          className="py-2 px-4 bg-[#F2F8FF] rounded-lg mr-2"
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
