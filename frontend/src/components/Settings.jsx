"use client";

import ListSection from "@/utils/ListSection";
import SettingCard from "@/utils/SettingCard";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { isUserValid } from "../../../backend/src/pocketbase";

const Settings = () => {
  return isUserValid ? (
    <>
      <div className="h-screen relative flex flex-row py-1 overflow-contain">
        <div className="hidden md:inline w-1/4 ">
          <ListSection />
        </div>
        <div className=" w-3/4 flex flex-col px-1 overflow-y-auto custom-scrollbar">
          <SettingCard />
        </div>
      </div>
    </>
  ) : (
    <div className="min-h-screen font-poppins w-full">
      <div className="flex justify-center items-center">
        <p>
          Signed out put emoji here and two buttons below saying sign back in
          and return to home screen
        </p>
      </div>
    </div>
  );
};

export default Settings;
