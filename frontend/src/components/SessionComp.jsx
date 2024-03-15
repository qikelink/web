import KeywordBar from "@/utils/KeywordBar";
import ListSection from "@/utils/ListSection";
import SessionCard from "@/utils/SessionCard";
import React from "react";

const SessionComp = () => {
  return (
    <div className="min-h-screen font-poppins w-full">
      <div className="flex flex-row justify-center py-1">
        <div className="w-1/4 ">
          <ListSection />
        </div>
        <div className=" w-3/4 flex flex-col px-1">
          {/* <HomeCardSection /> */}
          <SessionCard />
        </div>
      </div>
    </div>
  );
};

export default SessionComp;
