import ListSection from "@/utils/ListSection";
import QuickCardSection from "@/utils/QuickCardSection";
import React from "react";

const QuickSection = () => {
  return (
    <>
      <div className="h-screen relative flex flex-row py-1 overflow-contain ">
        <div className="hidden md:inline w-1/4 ">
          <ListSection />
        </div>
        <div className="w-full md:w-3/4 flex flex-col px-1 overflow-y-auto custom-scrollbar">
          <QuickCardSection/>
        </div>
      </div>
    </>
  );
};

export default QuickSection;
