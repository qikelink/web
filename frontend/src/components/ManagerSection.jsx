import ListSection from "@/utils/ListSection";
import ManagerList from "@/utils/ManagerList";
import React from "react";

const ManagerSection = () => {
  return (
    <div className="min-h-screen font-poppins w-full">
      <div className="flex flex-row py-1">
        <div className="w-1/4 ">
          <ListSection />
        </div>
        <div className=" w-3/4 flex flex-col px-1 ">
          <div className="w-full flex flex-row">
            <div className="w-2/3">Display</div>
            <div className="w-1/3">
              <ManagerList/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerSection;
