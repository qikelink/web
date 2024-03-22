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
import { useAuth } from "@/contexts/auth-context";

const ListSection = () => {
  const pathname = usePathname();
  const { setIsUserValid, progress, setProgress } = useAuth();

  return (
    <div className="flex flex-row justify-between h-full w-full ">
      {/* menu items */}
      <ul className="flex text-base flex-col grow">
        <li>
          <Link
            href="/"
            onClick={() => setProgress(90)}
            className={`flex gap-4 justify-start items-center py-5 px-1 cursor-pointer hover:text-blue ${
              pathname === "/" ? "bg-[#e2eff8] text-blue rounded-md" : ""
            }`}
          >
            <AiOutlineHome size={24} className="ml-2" />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link
            href="/bookmark"
            onClick={() => setProgress(90)}
            className={`flex gap-4 items-center cursor-pointer py-5 px-1 hover:text-blue ${
              pathname === "/bookmark"
                ? "bg-[#e2eff8] text-blue rounded-md"
                : ""
            }`}
          >
            <PiBookBookmarkDuotone size={24} className="ml-2" />
            <p>BookMarked</p>
          </Link>
        </li>
        <li>
          <Link
            href="/sessions"
            onClick={() => setProgress(90)}
            className={`flex gap-4 items-center py-5 px-1 cursor-pointer ${
              pathname === "/sessions"
                ? "bg-[#e2eff8] text-blue rounded-md"
                : ""
            } hover:text-blue`}
          >
            <BsJournalBookmarkFill size={24} className="ml-2" />
            <p>Sessions</p>
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            onClick={() => setProgress(90)}
            className={`flex gap-4 justify-start items-center py-5 px-1 cursor-pointer hover:text-blue ${
              pathname === "/settings"
                ? "bg-[#e2eff8] text-blue rounded-md"
                : ""
            }`}
          >
            <IoMdSettings size={24} className="ml-2" />
            <p>Settings</p>
          </Link>
        </li>
        <Separator orientation="horizontal" />

        <li>
          <Link
            href="/manager/Organization"
            onClick={() => setProgress(90)}
            className={`flex gap-4 justify-start items-center py-5 px-1 cursor-pointer hover:text-blue ${
              pathname === "/manager/Organization" ? "bg-[#e2eff8] text-blue rounded-md" : ""
            }`}
          >
            <CgProfile size={24} className="ml-2" />
            <p>Manager</p>
          </Link>
        </li>
        <li>
          <Link
            href="/help"
            onClick={() => setProgress(90)}
            className={`flex gap-4 justify-start items-center py-5 px-1 cursor-pointer hover:text-blue ${
              pathname === "/help" ? "bg-[#e2eff8] text-blue rounded-md" : ""
            }`}
          >
            <IoMdHelpCircleOutline size={24} className="ml-2" />
            <p>Help</p>
          </Link>
        </li>
        <li>
          <Link
            href="/feedBack"
            onClick={() => setProgress(90)}
            className={`flex gap-4 justify-start items-center py-5 px-1 cursor-pointer hover:text-blue ${
              pathname === "/feedBack"
                ? "bg-[#e2eff8] text-blue rounded-md"
                : ""
            }`}
          >
            <MdOutlineFeedback size={24} className="ml-2" />
            <p>Send FeedBack</p>
          </Link>
        </li>
      </ul>

      <Separator orientation="vertical" className="grow-0 mx-2" />
    </div>
  );
};

export default ListSection;
