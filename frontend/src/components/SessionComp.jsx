import KeywordBar from "@/utils/KeywordBar";
import ListSection from "@/utils/ListSection";
import SessionCard from "@/utils/SessionCard";
import React from "react";

const SessionComp = () => {
  return (
    <>
      <div className="h-screen relative flex flex-row  py-1 overflow-contain">
        <div className="hidden md:inline w-1/4 ">
          <ListSection />
        </div>
        <div className=" w-3/4 flex flex-col px-1 overflow-y-auto custom-scrollbar">
          {/* <HomeCardSection /> */}
          <SessionCard />
        </div>
      </div>
    </>
  );
};

export default SessionComp;
