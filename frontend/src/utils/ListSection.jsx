import React from "react";
import { useRouter } from "next/navigation";
import { HomeIcon } from "@/icons/HomeIcon";
import { Separator } from "@/components/ui/separator";
import { PiBookBookmarkDuotone } from "react-icons/pi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { GrHomeRounded } from "react-icons/gr";

const ListSection = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-between h-full w-full ">
      {/* menu items */}
      <ul class="flex flex-col gap-10 grow">
        <li class="flex gap-4 items-center">
          <GrHomeRounded size={20} />
          <p>Home</p>
        </li>
        <li class="flex gap-4 items-center ">
          <PiBookBookmarkDuotone size={20} />
          <p>BookMarked</p>
        </li>
        <li class="flex gap-4 items-center">
          <BsJournalBookmarkFill size={20} />
          <p>Sessions</p>
        </li>
        <li class="flex gap-4 items-center">
          <IoMdSettings size={20} />
          <p>Settings</p>
        </li>
        <Separator orientation="horizontal" />
        <li class="flex gap-4 items-center">
          <HomeIcon />
          <p>Home</p>
        </li>
      </ul>

      <Separator orientation="vertical" className="grow-0" />
    </div>
  );
};

export default ListSection;
