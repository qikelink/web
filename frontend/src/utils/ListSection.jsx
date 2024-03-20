import React from "react";
import { useRouter } from "next/navigation";
import { HomeIcon } from "@/icons/HomeIcon";
import { Separator } from "@/components/ui/separator";
import { PiBookBookmarkDuotone } from "react-icons/pi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";

const ListSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between h-full w-full my-3 ">
      {/* menu items */}
      <ul className="flex text-base flex-col grow">
        <li>
          <Link
            href="/"
            className={`flex gap-4 justify-start items-center py-5 px-1 cursor-pointer hover:text-blue ${
              pathname === "/" ? "bg-[#e2eff8] text-blue rounded-md" : ""
            }`}>
            <AiOutlineHome size={20} />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link
            href="/bookmark"
            className={`flex gap-4 items-center cursor-pointer py-5 px-1 hover:text-blue ${
              pathname === "/bookmark" ? "bg-[#e2eff8] text-blue" : ""
            }`}>
            <PiBookBookmarkDuotone size={20} />
            <p>BookMarked</p>
          </Link>
        </li>
        <li>
          <Link
            href="/sessions"
            className={`flex gap-4 items-center py-5 px-1 cursor-pointer ${
              pathname === "/sessions" ? "bg-[#e2eff8] text-blue" : ""
            } hover:text-blue`}>
            <BsJournalBookmarkFill size={20} />
            <p>Sessions</p>
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className={`flex gap-4 justify-start items-center py-5 px-1 cursor-pointer hover:text-blue ${
              pathname === "/settings" ? "bg-[#e2eff8] text-blue" : ""
            }`}>
            <IoMdSettings size={20} />
            <p>Settings</p>
          </Link>
        </li>
        <Separator orientation="horizontal" />

        <li>
          <Link
            href="/manager"
            className={`flex gap-4 justify-start items-center py-5 px-1 cursor-pointer hover:text-blue ${
              pathname === "/manager" ? "bg-[#e2eff8] text-blue" : ""
            }`}>
            <CgProfile size={20} />
            <p>Manager</p>
          </Link>
        </li>
        <li>
          <Link
            href="/help"
            className={`flex gap-4 justify-start items-center py-5 px-1 cursor-pointer hover:text-blue ${
              pathname === "/help" ? "bg-[#e2eff8] text-blue" : ""
            }`}>
            <IoMdHelpCircleOutline size={20} />
            <p>Help</p>
          </Link>
        </li>
        <li>
          <Link
            href="/feedBack"
            className={`flex gap-4 justify-start items-center py-5 px-1 cursor-pointer hover:text-blue ${
              pathname === "/feedBack" ? "bg-[#e2eff8] text-blue" : ""
            }`}>
            <MdOutlineFeedback size={20} />
            <p>Send FeedBack</p>
          </Link>
        </li>
      </ul>

      <Separator orientation="vertical" className="grow-0 mx-2" />
    </div>
  );
};

export default ListSection;
