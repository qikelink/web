import HomeCardSection from "@/utils/HomeCardSection";
import ListSection from "@/utils/ListSection";
import React from "react";
import { isUserValid } from "../../../backend/src/pocketbase";
import KeywordBar from "@/utils/KeywordBar";

const HomeSection = () => {
  return (
    <div className="min-h-screen font-poppins w-full">
      {!isUserValid ? (
        <div className="flex flex-row py-1">
          <div className="hidden md:inline w-1/4 ">
            <ListSection />
          </div>
          <div className="w-full md:w-3/4 flex flex-col px-1">
            <HomeCardSection />
          </div>
        </div>
      ) : (
        <div className=" w-full flex flex-col">
          <HomeCardSection />
        </div>
      )}
    </div>
  );
};

export default HomeSection;
