import React from "react";
import LandingCard from "@/utils/LandingCard";

const LandingSection = () => {
  return (
    <>
      <div className="w-full flex flex-col overflow-y-auto custom-scrollbar">
        <LandingCard />
      </div>
    </>
  );
};

export default LandingSection;
