import ListSection from "@/utils/ListSection";
import SettingCard from "@/utils/SettingCard";

import React from "react";

const Settings = () => {
  return (
    <>
      <div className="h-screen relative flex flex-row py-1 overflow-contain">
        <div className="hidden md:inline w-1/4 ">
          <ListSection />
        </div>
        <div className=" w-3/4 flex flex-col px-1 overflow-y-auto custom-scrollbar">
          <SettingCard />
        </div>
      </div>
    </>
  );
};

export default Settings;
