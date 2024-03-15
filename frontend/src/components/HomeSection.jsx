import HomeCardSection from "@/utils/HomeCardSection";
import ListSection from "@/utils/ListSection";
import React from "react";
import { isUserValid } from "../../../backend/src/pocketbase";
import KeywordBar from "@/utils/KeywordBar";

const HomeSection = () => {
  return (
    <div className="min-h-screen font-poppins w-full">
      {/* <KeywordBar data={['All', 'Masterpiece', 'testing 2', 'All', 'Masterpiece', 'testing 2', 'All', 'Masterpiece', 'testing 2', 'All', 'Masterpiece', 'testing 2']}/> */}
      {!isUserValid ? (
        <div className="flex flex-row py-1">
          <div className="w-1/4 ">
            <ListSection />
          </div>
          <div className=" w-3/4 flex flex-col px-1">
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
