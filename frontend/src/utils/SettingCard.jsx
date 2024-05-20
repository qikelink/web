"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VerifyModal from "./VerifyModal";
import {
  getImageUrl,
  getMentor,
  getUser,
  toggleQuickService,
  updateMentor,
  updateSetting,
} from "../../../backend/src/pocketbase";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/user-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoFlash } from "react-icons/io5";
import { Switch } from "@/components/ui/switch";
import { BsCopy, BsShareFill } from "react-icons/bs";

const SettingCard = () => {
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState("");
  const [quickService, setQuickService] = useState(false);
  const { toast } = useToast();
  const { user, mentor, setMentor, isLoading, setUser } = useUser();
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const defaultFormData = {
      avatar: profileImage,
      email: "",
      username: "",
      phoneNumber: "",
      bio: "",
      awards: "",
      verified: false,
    };

    const initialFormData = user
      ? {
          avatar: user.avatar,
          email: user.email,
          username: user.name,
          phoneNumber: user.phoneNumber,
          bio: user.bio,
          awards: user.awards,
          verified: user.verified,
        }
      : defaultFormData;

    setFormData(initialFormData);
  }, [user]);

  useEffect(() => {
    const savedQuickService = localStorage.getItem("quickService");
    if (savedQuickService !== null) {
      setQuickService(savedQuickService === "true");
    } else if (mentor && mentor.username && mentor.username.length > 0) {
      setQuickService(mentor.quickService || false);
    }
  }, [mentor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSpinning(true);
    const id = user.id;
    const mentorId = mentor.id;

    const imageToUpdate = profileImage ? profileImage : formData.avatar;

    if (mentorId && mentorId.length > 0) {
      updateMentor(
        mentorId,
        formData.username,
        formData.email,
        formData.phoneNumber,
        formData.bio,
        formData.awards
      ).then(() => {
        getMentor()
          .then((res) => {
            setMentor(res);
          })
          .catch((error) => {
            console.error("Error fetching mentor updated data:", error);
          });
      });
    }

    updateSetting(
      id,
      imageToUpdate,
      formData.username,
      formData.phoneNumber,
      formData.bio,
      formData.awards
    )
      .then(() => {
        setIsSpinning(!isSpinning);
        toast({
          title: "settings updated",
          description: "Settings updated successfully! .",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to update setting",
          description: "Sorry an error just occurred! please try again.",
          variant: "destructive",
        });
        console.error("Setting error:", error);
      })
      .finally(() => {
        getUser()
          .then((res) => {
            setUser(res);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });

        setIsSpinning(false);
      });
  };

  const handleQuickServiceToggle = async () => {
    try {
      const newQuickService = !quickService;
      setQuickService(newQuickService);

      const id = mentor.id;

      await toggleQuickService(id, newQuickService);

      localStorage.setItem("quickService", newQuickService);

      toast({
        title: "Status toggled",
        description: "Status toggled successfully! .",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to toggle status",
        description: "Sorry an error just occurred! please try again.",
        variant: "destructive",
      });
      console.error("quick service error:", error);

      setQuickService(!quickService);
    }
  };

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

  return (
    <div className="px-1">
      <h1 className="text-2xl font-semibold mb-3">Settings</h1>
      <div className="h-fit border border-gray-200 rounded-lg lg:p-10 p-4 text-lg">
        {/* Profile image */}
        <Label className="text-lg">Profile Image</Label>
        {isLoading ? (
          <Skeleton className="h-24 w-24 mt-3 md:h-32 md:w-32 rounded-full"></Skeleton>
        ) : (
          user && (
            <Avatar className="h-24 w-24 mt-3 md:h-32 md:w-32">
              <AvatarImage
                src={getImageUrl(user.collectionId, user.id, user.avatar)}
              />
              <AvatarFallback>
                {" "}
                {user.email.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )
        )}
        <div className="flex justify-between items-center gap-3 mt-4">
          <Input
            id="picture"
            type="file"
            className="sm:w-52 w-32 bg-inputbackground "
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
          {isLoading ? (
            <Skeleton className="w-20 h-8 rounded-xl"></Skeleton>
          ) : (
            <Badge
              variant="outline"
              className={`rounded-full ${
                formData.verified === true ? "bg-green-600" : "bg-red-500"
              } text-secondary h-8 flex justify-center font-bold text-xs sm:text-sm text-wrap lg:mr-5 sm:px-6 px-3`}
            >
              {formData.verified === true ? "Verified" : "Not verified"}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div>
            <Label className="text-lg">Full name</Label>
            <Input
              className="py-6 px-3 bg-inputbackground"
              placeholder="Please enter your full name"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="text-lg">Email</Label>
            <Input
              className="py-6 px-3 bg-inputbackground"
              placeholder="Please enter your email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label className="text-lg">Phone number (optional)</Label>
            <Input
              className="py-6 px-3 bg-inputbackground"
              placeholder="Please enter your cell number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label className="text-lg">
              {" "}
              <span className="text-blue font-medium"> Booking link </span>
            </Label>
            <div className=" flex items-center space-x-4 rounded-md border px-3 py-4 bg-inputbackground">
              {/* <IoFlash /> */}
              <div className="flex-1 ">
                <p className="text-sm font-medium leading-none">
                  qikelink.com/book/{user.id}
                </p>
              </div>
              <button
                onClick={() => copyBookingLink()}
                size="icon"
                variant="outline"
                type="button"
              >
                <BsCopy />
              </button>
              {/* {formData.verified === true ? (
              mentor && mentor.username && mentor.username.length > 0 ? (
                <Switch
                  checked={quickService}
                  onCheckedChange={handleQuickServiceToggle}
                />
              ) : (
                <Skeleton className="rounded-2xl w-12 h-6"></Skeleton>
              )
            ) : null} */}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Label className="text-lg">Bio</Label>
          <Textarea
            className="h-24 sm:h-36 bg-inputbackground"
            placeholder="Write your bio here, feel free to brag about yourself!"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <Label className="text-lg">Work Experience</Label>
          <Textarea
            className="h-24 sm:h-36 bg-inputbackground"
            placeholder="Relevant work experiences separated by commas. eg CTO @startup, founder @startup, etc "
            name="awards"
            value={formData.awards}
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-2 md:justify-end gap-1 lg:gap-3 justify-center flex-row items-center mt-6 lg:space-x-5">
          <Button
            size="xl"
            className="bg-blue hover:bg-darkblue text-lg rounded-lg"
            onClick={handleSubmit}
          >
            {isSpinning ? "Updating profile" : "Update profile"}
            <AiOutlineLoading3Quarters
              className={`${isSpinning ? "ml-3 animate-spin" : "hidden"}`}
            />
          </Button>

          {formData.verified === true ||
          mentor.length > 0 ? null : !isLoading &&
            formData.username !== "" &&
            formData.bio !== "" &&
            formData.awards !== "" ? (
            <VerifyModal userData={user} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SettingCard;
