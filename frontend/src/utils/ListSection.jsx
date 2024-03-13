import React from "react";
import {Divider} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { HomeIcon } from "@/icons/HomeIcon";

const ListSection = () => {
  const router = useRouter();


  return (
    <div className="flex h-full justify-between">
      {/* menu items */}
     <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
      <HomeIcon/>
      <p>Home</p>
      </div>
      <div className="flex gap-4 items-center ">
      <HomeIcon/>
      <p>Home</p>
      </div>
      <div className="flex gap-4 items-center">
      <HomeIcon/>
      <p>Home</p>
      </div>
      <div className="flex gap-4 items-center">
      <HomeIcon/>
      <p>Home</p>
      </div>
      <div className="flex gap-4 items-center">
      <HomeIcon/>
      <p>Home</p>
      </div>
    </div>
    <Divider orientation="vertical" />
    </div>
   
  );
};

export default ListSection;
