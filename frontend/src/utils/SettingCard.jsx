"use client";

import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "@/icons/UploadIcon";
import { Badge } from "@/components/ui/badge";
import VerifyModal from "./VerifyModal";
import { getImageUrl, updateSetting } from "../../../backend/src/pocketbase";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/user-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const SettingCard = () => {
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState("");
  const { toast } = useToast();
  const { user, isLoading } = useUser();

  useEffect(() => {
    const defaultFormData = {
      avatar: profileImage,
      fullName: "",
      email: "",
      username: "",
      phoneNumber: "",
      bio: "",
      awards: "",
      verified: false,
    };

    const initialFormData =
      user.length > 0
        ? {
            avatar: user[0].avatar || "",
            fullName: user[0].fullName || "",
            email: user[0].email || "",
            username: user[0].username || "",
            phoneNumber: user[0].phoneNumber || "",
            bio: user[0].bio || "",
            awards: user[0].awards || "",
            verified: user[0].verified,
          }
        : defaultFormData;

    setFormData(initialFormData);
    
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = user[0].id;

    updateSetting(
      id,
      profileImage,
      formData.fullName,
      formData.username,
      formData.phoneNumber,
      formData.bio,
      formData.awards
    )
      .then(() => {
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
      .finally(() => {});
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="min-h-screen border border-gray-200 rounded-lg lg:p-10 p-4 text-lg">
          {/* Profile image */}
          <Label className="text-lg">Profile image</Label>
          {isLoading ? (
            <Skeleton className="h-24 w-24 mt-3 md:h-32 md:w-32 rounded-full"></Skeleton>
          ) : (
            user.length > 0 && (
              <Avatar className="h-24 w-24 mt-3 md:h-32 md:w-32">
                <AvatarImage
                  src={getImageUrl(
                    user[0].collectionId,
                    user[0].id,
                    user[0].avatar
                  )}
                />
                <AvatarFallback>
                  {" "}
                  {user[0].email.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )
          )}
          <div className="flex justify-between items-center gap-3 mt-4">
            <Input
              id="picture"
              type="file"
              className="lg:max-w-xs w-fit bg-inputbackground "
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            {isLoading ? (
              <Skeleton className="w-20 h-8 rounded-xl"></Skeleton>
            ) : (
              <Badge
                variant="outline"
                className={`rounded-full ${
                  formData.verified === true ? "bg-green-600" : "bg-red"
                } text-secondary h-8 flex justify-center font-bold text-sm text-wrap lg:mr-5 px-5`}
              >
                {formData.verified === true ? "Verified" : "Not Verified"}
              </Badge>
            )}
          </div>

          <Separator className="my-6"></Separator>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label className="text-lg">Full name</Label>
              <Input
                className="py-6 px-3 bg-inputbackground"
                placeholder="Please enter your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-lg">Email</Label>
              <Input
                className="py-6 px-3 bg-inputbackground"
                placeholder="Please enter your full name"
                name="email"
                type="email"
                value={formData.email}
                readOnly
              />
            </div>
            <div>
              <Label className="text-lg">Username</Label>
              <Input
                className="py-6 px-3 bg-inputbackground"
                placeholder="Please enter your full name"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-lg">Phone number (optional)</Label>
              <Input
                className="py-6 px-3 bg-inputbackground"
                placeholder="Please enter your full name"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <Label className="text-lg">Bio</Label>
            <Textarea
              className="sm:h-40 bg-inputbackground"
              placeholder="Write your Bio here e.g your hobbies, interests ETC"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <Label className="text-lg">Awards/Recognitions</Label>
            <Textarea
              className="sm:h-24 bg-inputbackground"
              placeholder="Notable awards and recognitions you want to mention"
              name="awards"
              value={formData.awards}
              onChange={handleChange}
            />
          </div>

          <div className="flex md:justify-start gap-3 justify-center lg:flex-row items-center mt-6 h-full space-x-5">
            <Button
              size="xl"
              className="bg-blue hover:bg-darkblue text-lg rounded-lg"
              type="submit"
            >
              Update Profile
            </Button>
            {/* <Separator orientation="vertical" className='bg-darktext'/> */}
            {formData.verified === true ? null : !isLoading ? (
              <VerifyModal userData={user} />
            ) : null}
          </div>
        </div>
      </form>
    </>
  );
};

export default SettingCard;
