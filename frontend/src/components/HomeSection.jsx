import HomeCardSection from "@/utils/HomeCardSection";
import ListSection from "@/utils/ListSection";
import React from "react";
import { isUserValid } from "../../../backend/src/pocketbase";

const HomeSection = () => {
  return (
    <>
      <div className="h-dvh relative flex flex-row py-1 overflow-contain ">
        <div className="hidden md:inline w-1/4 ">
          <ListSection />
        </div>
        <div className="w-full md:w-3/4 flex flex-col px-1 overflow-y-auto custom-scrollbar">
          <HomeCardSection />
        </div>
      </div>
    </>
  );
};

export default HomeSection;
