import React from "react";
import LandingCard from "@/utils/LandingCard";
import BookCard2 from "@/utils/BookCard2";

const LandingSection = () => {
  return (
    <>
      <div className="w-full flex flex-col overflow-y-auto">
        {/* <LandingCard /> */}
        <BookCard2/>
      </div>
    </>
  );
};

export default LandingSection;
