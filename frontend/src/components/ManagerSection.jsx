import ListSection from "@/utils/ListSection";
import ManagerList from "@/utils/ManagerList";
import React from "react";
import CreateMeet from "@/utils/CreateMeet";

const ManagerSection = () => {
  return (
    <>
      <div className="h-screen relative flex flex-row py-1 overflow-contain ">
        <div className="w-1/4 ">
          <ListSection />
        </div>
        <div className=" w-3/4 flex flex-col px-1 overflow-y-auto custom-scrollbar">
          <div className="w-full flex flex-row">
            <div className="w-2/3">
              <CreateMeet />
            </div>
            <div className="w-1/3">
              <ManagerList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerSection;
