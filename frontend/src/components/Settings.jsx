"use client";

import ListSection from "@/utils/ListSection";
import SettingCard from "@/utils/SettingCard";
import React, { useEffect } from "react";
import { isUserValid } from "../../../backend/src/pocketbase";
import { BookmarkEmpty } from "./emptystate/bookmarkEmpty";

const Settings = () => {
  return (
    <>
      <div className="h-screen relative flex flex-row py-1 overflow-contain">
        <div className="hidden md:inline w-1/4 ">
          <ListSection />
        </div>
        <div className=" w-3/4 flex flex-col px-1 overflow-y-auto custom-scrollbar">
          {isUserValid ? (
            <SettingCard />
          ) : (
            <div className="flex justify-center items-center h-full">
              {/* Render BookmarkEmpty when no bookmarks exist */}
              <BookmarkEmpty />
            </div>
          )}
        </div>
      </div>
    </>
  ) 
};

export default Settings;
