import HomeCardSection from "@/utils/HomeCardSection";
import ListSection from "@/utils/ListSection";
import React from "react";

const HomeSection = () => {
  return (
    <div className="min-h-screen font-poppins w-full">
      <div className="flex flex-row justify-center py-1">
        <div className="w-1/4 ">
          <ListSection />
        </div>
        <div className=" w-3/4 flex justify-center flex-col px-1">
          <HomeCardSection />
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
