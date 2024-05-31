import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { BsArrow90DegRight, BsCopy } from "react-icons/bs";
import { useUser } from "@/contexts/user-context";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import {
  getMentor,
  updateMentor,
  verifyRequest,
} from "../../../backend/src/pocketbase";
import { EmptyIcon } from "@/icons/EmptyIcon";
import { Skeleton } from "./ui/skeleton";

const AccountSection = () => {
  const { user, mentor, setMentor, reviews, isReviewLoading } = useUser();
  const { toast } = useToast();
  const [formData, setFormData] = useState({});
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const defaultFormData = {
      time: "",
      price: "",
      balance: 0,
      meetingsHeld: 0,
    };

    const initialFormData = user
      ? {
          time: mentor.duration,
          price: mentor.rate,
          balance: mentor.balance,
          meetingsHeld: mentor.meetingsHeld,
        }
      : defaultFormData;

    setFormData(initialFormData);
  }, [mentor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.replace(/[^0-9.]/g, ""), // Keep only numeric values
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSpinning(true);

    const mentorId = mentor.id;

    if (formData.price > 5) {
      toast({
        title: "Price cap exceeded",
        description:
          "Ops seems you've entered an amount higher than your current cap. complete more sessions to unlock more!",
        variant: "default",
      });
      return;
    }

    if (mentorId && mentorId.length > 0) {
      updateMentor(mentorId, formData.time, formData.price).then(() => {
        getMentor()
          .then((res) => {
            setMentor(res);
            toast({
              title: "settings updated",
              description: "Settings updated successfully! .",
              variant: "default",
            });
          })
          .catch((error) => {
            console.error("Error fetching mentor updated data:", error);
          });
      });
    }

    if (!mentorId) {
      verifyRequest(formData.time, formData.price).then(() => {
        getMentor()
          .then((res) => {
            setMentor(res);
            toast({
              title: "settings updated",
              description: "Settings updated successfully! .",
              variant: "default",
            });
          })
          .catch((error) => {
            console.error("Error fetching mentor updated data:", error);
          });
      });
    }
  };

  const handleWithdraw = (event) => {
    event.preventDefault();

    if (formData.balance < 50) {
      toast({
        title: "Balance too low to withdraw",
        description:
          "Sorry, your balance is lower than our withdrawable balance of $50! Complete more sessions to increase your balance.",
        variant: "default",
      });
      return;
    }
  };

  //   const handleWithdraw = () => {
  //     if (formData.meetingsHeld < 10) {
  //         toast({
  //           title: "Unable to withdraw",
  //           description:
  //             "Ops seems you've entered an amount higher than your current cap! Complete ${10 - formData.meetingsHeld} more sessions to withdraw balance.",
  //           variant: "default",
  //         });
  //         return;
  //       }
  //   }

  async function copyBookingLink() {
    try {
      // Get the current BookCard URL
      const BookCardUrl = `https://qikelink.com/book/${user.id}`;

      // Copy the URL to the clipboard
      await navigator.clipboard.writeText(BookCardUrl);
      toast({
        title: "Booking link copied",
        description: "Booking link copied successfully to clickboard.",
        variant: "default",
      });
    } catch (err) {
      console.error("Failed to copy booking link: ", err);
    }
  }

  const getCapAndSessionsNeeded = (meetingsHeld) => {
    if (meetingsHeld < 10) {
      return { cap: 5, sessionsNeeded: 10 - meetingsHeld };
    } else if (meetingsHeld < 30) {
      return { cap: 20, sessionsNeeded: 30 - meetingsHeld };
    } else if (meetingsHeld < 50) {
      return { cap: 50, sessionsNeeded: 50 - meetingsHeld };
    } else {
      return { cap: 100, sessionsNeeded: 0 }; // No more cap after 50 sessions
    }
  };

  const { cap, sessionsNeeded } = getCapAndSessionsNeeded(
    formData.meetingsHeld
  );

  return (
    <section className="space-y-4">
      {/* Welcome and balance section */}
      <div className=" mt-4 px-6 py-3 rounded-xl bg-gray-100">
        <p className="text-lg text-gray-800 text-left">
          Welcome, {user.name} 👋🏻
        </p>
        <div className=" flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-black text-lg font-bold">${mentor.balance}</p>
            <p className="text-darktext text-sm ">My Total Earnings</p>
          </div>
          <Button onClick={handleWithdraw} className="">
            Withdraw
          </Button>
        </div>
      </div>

      {/* Booking link setting section */}
      <div className="bg-gray-100 rounded-xl px-4 py-3">
        <div className=" rounded-xl bg-gray-100 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-black text-lg font-medium">
              Booking Link Settings
            </p>
            {/* <p className="text-darktext text-sm ">Additional info</p> */}
          </div>
          <Button size="icon" variant="ghost" type="button" className="">
            <ArrowTopRightIcon size={60} />
          </Button>
        </div>

        <div className="flex justify-between items-center space-x-2 mt-3">
          <div className="flex-1 ">
            <p className="text-base font-medium leading-none bg-white px-3 py-3  rounded-lg">
              qikelink.com/book/{user.id}
            </p>
          </div>
          <Button
            variant="outline"
            className="font-bold"
            onClick={() => copyBookingLink()}
          >
            Copy
          </Button>
        </div>

        {/* Inputs for time and price */}
        <div className="space-y-2 mt-3">
          <div>
            <Label className="text-base">
              Session Duration <span className="text-darktext">(In mins)</span>
            </Label>
            <Input
              className="py-5 px-3 bg-inputbackground"
              placeholder="Please enter how long session would be"
              name="time"
              type="text"
              value={`${formData.time}`}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="text-base">
              Booking Price <span className="text-darktext">($)</span>
            </Label>
            <Input
              className="py-5 px-3 bg-inputbackground"
              placeholder="Please enter your booking price"
              name="price"
              type="text"
              value={`$${formData.price}`}
              onChange={handleChange}
            />
            <p className="text-sm text-darktext ml-1">
              Capped at ${cap}, remaining {sessionsNeeded} more sessions to
              unlock more
            </p>
          </div>

          <Button onClick={handleSubmit} className="px-6 mt-6">
            Save
          </Button>
        </div>
      </div>

      {/* review section */}
      <div className="bg-gray-100 rounded-xl px-4 py-3 space-y-3 h-72">
        <div className=" rounded-xl bg-gray-100 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-black text-lg font-medium">Session Reviews</p>
            {/* <p className="text-darktext text-sm ">Additional info</p> */}
          </div>
          <Button size="icon" variant="ghost" type="button" className="">
            <ArrowTopRightIcon size={60} />
          </Button>
        </div>

        {isReviewLoading ? (
          <div className="flex flex-col space-y-2">
            <Skeleton className=" h-12 w-full rounded-lg bg-white" />
            <Skeleton className=" h-12 w-full rounded-lg bg-white" />
            <Skeleton className=" h-12 w-full rounded-lg bg-white" />
            <Skeleton className=" h-12 w-full rounded-lg bg-white" />
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((item, index) => (
            <div key={index} className="flex-1 ">
              <p className="text-base font-medium leading-tight bg-white p-2 rounded-lg">
                {`${item.comment} - ${item.expand.author.name}`}
              </p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full ">
            <EmptyIcon size={100} />
            <p className="text-center text-lg font-medium text-darktext">
              No reviews recieved yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AccountSection;
