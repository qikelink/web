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
import { CgProfile } from "react-icons/cg";

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
            href="/Bookmark"
            className={`flex gap-4 items-center cursor-pointer py-5 px-1 hover:text-blue ${
              pathname === "/Bookmark" ? "bg-[#f7fafc] text-blue" : ""
            }`}
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
            href="/Settings"
            className="flex gap-4 items-center py-5 px-1 cursor-pointer hover:text-blue"
          >
            <IoMdSettings size={20} />
            <p>Settings</p>
          </Link>
        </li>
        <Separator orientation="horizontal" />

        <li class="flex gap-4 items-center">
          <Link
            href="/Profile"
            className={`flex gap-4 items-center py-5 px-1 cursor-pointer ${
              pathname === "/Profile" ? "bg-[#f7fafc] text-blue" : ""
            } hover:text-blue `}
          >
            <CgProfile size={20} />
            <p>Profile</p>
          </Link>
        </li>
      </ul>

      <Separator orientation="vertical" className="grow-0 mx-2" />
    </div>
  );
};

export default ListSection;
