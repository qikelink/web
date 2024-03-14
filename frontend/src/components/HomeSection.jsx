import HomeCardSection from "@/utils/HomeCardSection";
import ListSection from "@/utils/ListSection";
import React from "react";
import { isUserValid } from "../../../backend/src/pocketbase";

const HomeSection = () => {
  return (
    <div className="min-h-screen font-poppins px-8 w-full">
      <KeywordBar />
      {!isUserValid ? (
        <div className="flex flex-row justify-center py-1">
          <div className="w-1/4 px-3 ">
            <ListSection />
          </div>
          <div className=" w-3/4 flex justify-center flex-col">
            <HomeCardSection />
          </div>
        </div>
      ) : (
        <div className=" w-full flex justify-center flex-col">
          <HomeCardSection />
        </div>
      )}
    </div>
  );
};

export default HomeSection;
