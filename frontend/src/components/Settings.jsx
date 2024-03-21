"use client";

import ListSection from "@/utils/ListSection";
import SettingCard from "@/utils/SettingCard";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { isUserValid } from "../../../backend/src/pocketbase";

const Settings = () => {
  return isUserValid ? (
    <div className="min-h-screen font-poppins w-full">
      <div className="flex flex-row py-1">
        <div className="w-1/4">
          <ListSection />
        </div>
        <div className="w-3/4 flex flex-col px-1">
          <SettingCard />
        </div>
      </div>
    </div>
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
