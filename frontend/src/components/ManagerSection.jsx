import ListSection from "@/utils/ListSection";
import ManagerList from "@/utils/ManagerList";
import React from "react";
import { HuddleIframe } from "@huddle01/iframe";
import CreateMeet from "@/utils/CreateMeet";

const iframeConfig = {
  roomUrl: "https://iframe.huddle01.com/123",
  height: "600px",
  width: "80%",
  noBorder: false, // false by default
};

const ManagerSection = () => {
  return (
    <div className="min-h-screen font-poppins w-full">
      <div className="flex flex-row py-1">
        <div className="w-1/4 ">
          <ListSection />
        </div>
        <div className=" w-3/4 flex flex-col px-1 ">
          <div className="w-full flex flex-row">
            <div className="w-2/3">
              <CreateMeet/>
            </div>
            <div className="w-1/3">
              <ManagerList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerSection;
