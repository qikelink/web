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
import { RightIcon } from "@/icons/RightIcon";
import { EarnIcon } from "@/icons/EarnIcon";

const ListSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between h-full w-full my-3 ">
      {/* menu items */}
      <ul className="flex flex-col grow">
        <li>
          <Link
            href="/"
            className={`flex gap-4 justify-start items-center py-5 px-1 cursor-pointer hover:text-blue ${
              pathname === "/" ? "bg-[#f7fafc] text-blue" : ""
            }`}
          >
            <HomeIcon />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link
            href="/Sessions"
            className="flex gap-4 items-center cursor-pointer py-5 px-1 hover:text-blue"
          >
            <PiBookBookmarkDuotone size={20} />
            <p>BookMarked</p>
          </Link>
        </li>
        <li>
          <Link
            href="/Sessions"
            className={`flex gap-4 items-center py-5 px-1 cursor-pointer ${
              pathname === "/Sessions" ? "bg-[#f7fafc] text-blue" : ""
            } hover:text-blue`}
          >
            <BsJournalBookmarkFill size={20} />
            <p>Sessions</p>
          </Link>
        </li>
        <li>
          <Link
            href="/Sessions"
            className="flex gap-4 items-center py-5 px-1 cursor-pointer hover:text-blue"
          >
            <IoMdSettings size={20} />
            <p>Settings</p>
          </Link>
        </li>
        <Separator orientation="horizontal" />

        <li class="flex gap-4 items-center">
          <div className="flex space-x-2 items-center bg-inputbackground p-3 rounded-lg mr-3 mt-4">
            <span className="flex space-x-2 items-start">
              <EarnIcon size={60} />
              <p className="text-lg text-wrap ">
                {" "}
                Upgrade your account to start earning.
              </p>
            </span>

            <RightIcon size={20} />
          </div>
        </li>
      </ul>

      <Separator orientation="vertical" className="grow-0" />
    </div>
  );
};

export default ListSection;
