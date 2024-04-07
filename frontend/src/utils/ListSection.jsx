import React from "react";
import { Separator } from "@/components/ui/separator";
import { PiBookBookmarkDuotone } from "react-icons/pi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdLogout, MdOutlineFeedback } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { useAuth } from "@/contexts/auth-context";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoFlashOutline } from "react-icons/io5";
import { PiDesktopTower } from "react-icons/pi";
import {
  signout,
  isUserValid,
} from "../../../backend/src/pocketbase";
import { useUser } from "@/contexts/user-context";
import { signOut } from "next-auth/react";

const ListSection = () => {
  const pathname = usePathname();
  const { setUser } = useUser();
  const { setIsUserValid, setProgress } = useAuth();

  const handleSignout = () => {
    setProgress(90);
    signout(setIsUserValid);
    localStorage.setItem('googleClicked', 'false');
    signOut();
    window.location.reload();
    setUser([]);
  };

  return (
    <div className="flex flex-row justify-between h-full w-full ">
      {/* menu items */}
      <ul className="flex text-base flex-col grow">
        <li>
          <Link
            href="/"
            onClick={() => setProgress(90)}
            className={`flex gap-4 justify-start items-center py-5 cursor-pointer hover:text-blue ${
              pathname === "/" ? "bg-[#e2eff8] text-blue rounded-md" : ""
            }`}
          >
            <AiOutlineHome size={22} className="ml-2" />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link
            href="/quickService"
            onClick={() => setProgress(90)}
            className={`flex gap-4 justify-start items-center py-5 cursor-pointer hover:text-blue ${
              pathname === "/quickService"
                ? "bg-[#e2eff8] text-blue rounded-md"
                : ""
            }`}
          >
            <IoFlashOutline size={22} className="ml-2" />
            <p>Quick Service</p>
          </Link>
        </li>
        <li>
          <Link
            href="/bookmark"
            onClick={() => setProgress(90)}
            className={`flex gap-4 items-center cursor-pointer py-5 hover:text-blue ${
              pathname === "/bookmark"
                ? "bg-[#e2eff8] text-blue rounded-md"
                : ""
            }`}
          >
            <PiBookBookmarkDuotone size={22} className="ml-2" />
            <p>BookMarked</p>
          </Link>
        </li>
        <li>
          <Link
            href="/sessions"
            onClick={() => setProgress(90)}
            className={`flex gap-4 items-center py-5 cursor-pointer ${
              pathname === "/sessions"
                ? "bg-[#e2eff8] text-blue rounded-md"
                : ""
            } hover:text-blue`}
          >
            <BsJournalBookmarkFill size={22} className="ml-2" />
            <p>Sessions</p>
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            onClick={() => setProgress(90)}
            className={`flex gap-4 justify-start items-center py-5 cursor-pointer hover:text-blue ${
              pathname === "/settings"
                ? "bg-[#e2eff8] text-blue rounded-md"
                : ""
            }`}
          >
            <RiUserSettingsLine size={22} className="ml-2" />
            <p>Profile Setting</p>
          </Link>
        </li>
        <Separator orientation="horizontal" className="my-1" />

        <li>
          <Link
            href="/manager/Organization"
            onClick={() => setProgress(90)}
            className={`flex gap-4 justify-start items-center py-5 cursor-pointer hover:text-blue ${
              pathname === "/manager/Organization"
                ? "bg-[#e2eff8] text-blue rounded-md"
                : ""
            }`}
          >
            <PiDesktopTower size={22} className="ml-2 font-semibold" />
            <p>Manager</p>
          </Link>
        </li>
        <li>
          <Link
            href="/help"
            onClick={() => setProgress(90)}
            className={`flex gap-4 justify-start items-center py-5 cursor-pointer hover:text-blue ${
              pathname === "/help" ? "bg-[#e2eff8] text-blue rounded-md" : ""
            }`}
          >
            <IoMdHelpCircleOutline size={22} className="ml-2" />
            <p>Help</p>
          </Link>
        </li>
        <li>
          <Link
            href="/feedBack"
            onClick={() => setProgress(90)}
            className={`flex gap-4 justify-start items-center py-5 cursor-pointer hover:text-blue ${
              pathname === "/feedBack"
                ? "bg-[#e2eff8] text-blue rounded-md"
                : ""
            }`}
          >
            <MdOutlineFeedback size={22} className="ml-2" />
            <p>Send FeedBack</p>
          </Link>
        </li>
        {isUserValid ? (
          <li>
            <button
              onClick={handleSignout}
              className="flex gap-4 justify-start items-center py-5 cursor-pointer text-red rounded-md"
            >
              <MdLogout size={22} className="ml-2" />
              <p>Sign Out</p>
            </button>
          </li>
        ) : null}
      </ul>

      <Separator orientation="vertical" className="grow-0 mx-2" />
    </div>
  );
};

export default ListSection;
