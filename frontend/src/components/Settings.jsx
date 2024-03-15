import ListSection from "@/utils/ListSection";
import SettingCard from "@/utils/SettingCard";

import React from "react";


const Settings = () => {
  return (
    <div className="min-h-screen font-poppins w-full">
      <div className="flex flex-row py-1">
        <div className="w-1/4 ">
          <ListSection />
        </div>
        <div className=" w-3/4 flex flex-col px-1 ">
           <SettingCard /> 
        </div>
      </div>
    </div>
  );
};

export default Settings;
