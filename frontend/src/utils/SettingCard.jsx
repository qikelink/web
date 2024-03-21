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
import {
  isUserValid,
  getUser,
  editSetting,
} from "../../../backend/src/pocketbase";
import { useToast } from "@/components/ui/use-toast";

const SettingCard = () => {
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [isUserValid]);

  useEffect(() => {
    const defaultFormData = {
      fullName: "",
      email: "",
      username: "",
      phoneNumber: "",
      bio: "",
      awards: "",
    };

    const initialFormData =
      user.length > 0
        ? {
            fullName: user[0].fullName || "",
            email: user[0].email || "",
            username: user[0].username || "",
            phoneNumber: user[0].phoneNumber || "",
            bio: user[0].bio || "",
            awards: user[0].awards || "",
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

    editSetting(
      id,
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
        <div className="min-h-screen border border-gray-200 rounded-lg p-10 text-lg">
          {/* Profile image */}
          <Label className="text-lg">Your profile picture</Label>
          <div className="flex items-center justify-center mt-1 border-2 border-gray-600 rounded-lg border-dashed bg-inputbackground h-32 w-32">
            <UploadIcon />
          </div>
          <div className="flex justify-between items-center  mt-4">
            <Input
              id="picture"
              type="file"
              className="max-w-xs bg-inputbackground "
            />
            <Badge
              variant="outline"
              className="rounded-full bg-red text-secondary h-8 flex justify-center font-bold text-sm mr-5 px-5"
            >
              Not Verified
            </Badge>
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

          <div className="flex items-center mt-6 h-10 space-x-5">
            <Button
              size="xl"
              className="bg-blue hover:bg-darkblue text-lg rounded-lg"
              type="submit"
            >
              Update Profile
            </Button>
            {/* <Separator orientation="vertical" className='bg-darktext'/> */}
            <VerifyModal userData={user} />
          </div>
        </div>
      </form>
    </>
  );
};

export default SettingCard;
