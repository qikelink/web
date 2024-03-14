import React from "react";
import { useRouter } from "next/navigation";
import { HomeIcon } from "@/icons/HomeIcon";
import { Separator } from "@/components/ui/separator";
import { PiBookBookmarkDuotone } from "react-icons/pi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { GrHomeRounded } from "react-icons/gr";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ListSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between h-full w-full ">
      {/* menu items */}
      <ul className="flex flex-col grow">
        <li>
          <Link
            href="/"
            className={`flex gap-4 justify-start items-center p-5 cursor-pointer hover:bg-gray-200 ${
              pathname === "/" ? "bg-[#f7fafc] text-danger" : ""
            }`}
          >
            <GrHomeRounded size={20} />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link
            href="/Sessions"
            className="flex gap-4 items-center cursor-pointer p-5 hover:bg-gray-200"
          >
            <PiBookBookmarkDuotone size={20} />
            <p>BookMarked</p>
          </Link>
        </li>
        <li>
          <Link
            href="/Sessions"
            className={`flex gap-4 items-center p-5 cursor-pointer ${
              pathname === "/Sessions" ? "bg-[#f7fafc]" : ""
            } hover:bg-gray-200`}
          >
            <BsJournalBookmarkFill size={20} />
            <p>Sessions</p>
          </Link>
        </li>
        <li>
          <Link
            href="/Sessions"
            className="flex gap-4 items-center p-5 cursor-pointer hover:bg-gray-200"
          >
            <IoMdSettings size={20} />
            <p>Settings</p>
          </Link>
        </li>
        <Separator orientation="horizontal" />
        <li className="flex gap-4 items-center p-5">
          <HomeIcon />
          <p>Home</p>
        </li>
      </ul>

      <Separator orientation="vertical" className="grow-0" />
    </div>
  );
};

export default ListSection;
