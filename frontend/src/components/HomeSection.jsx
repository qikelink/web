import HomeCardSection from "@/utils/HomeCardSection";
import ListSection from "@/utils/ListSection";
import React from "react";
import HeaderCardSection from "@/utils/HeaderCards";

const HomeSection = () => {
  return (
    <div className="flex flex-row justify-center px-5 w-full bg-mainbackground">
      <div className="w-1/4 text-black py-4">
        <ListSection />
      </div>
      <div className="text-black w-3/4 flex justify-center flex-col">
        <HeaderCardSection />

        <HomeCardSection />
      </div>
    </div>
  );
};

export default HomeSection;


