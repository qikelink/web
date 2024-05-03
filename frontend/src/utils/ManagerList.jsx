import React from "react";
import { VscOrganization } from "react-icons/vsc";
import { Separator } from "@/components/ui/separator";
import { MdOutlineGroupAdd } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";

const ManagerList = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between w-full border rounded-md md:border-0">
      {/* menu items */}
      <div>
        <Separator
          orientation="vertical"
          className="grow-0 mx-2 hidden md:block "
        />
      </div>

      <ul className="flex flex-row md:flex-col grow justify-between w-full ">
        <li className="hidden md:block">
          <Link
            href="/manager/Settings"
            className={`flex gap-2 items-center rounded-md py-5 px-4 cursor-pointer hover:text-blue ${
              pathname === "/manager/Settings" ? "bg-[#f7fafc] text-blue" : ""
            }`}
          >
            <IoMdSettings size={20} />
            <p>Profile Settings</p>
          </Link>
        </li>
        <li>
          <Link
            href="/manager/Upcoming"
            className={`flex gap-2 items-center rounded-md py-5 px-6 md:px-4 cursor-pointer hover:text-blue ${
              pathname === "/manager/Upcoming"
                ? "bg-[#f7fafc] text-blue"
                : ""
            }`}
          >
            <VscOrganization className="hidden sm:inline" size={20} />
            <p className="lg:block text-lg font-medium">Upcoming sessions</p>
          </Link>
        </li>
        <li>
          <Link
            href="/manager/Request"
            className={`flex gap-2 items-center rounded-md py-5 px-6 md:px-4 cursor-pointer ${
              pathname === "/manager/Request" ? "bg-[#f7fafc] text-blue" : ""
            } hover:text-blue`}
          >
            <MdOutlineGroupAdd className="hidden sm:inline" size={20} />
            <p className="lg:block text-lg font-medium"> Session requests</p>
          </Link>
        </li>

        <li className="hidden md:block">
          <Link
            href="/manager/Metrics"
            className={`flex gap-2 items-center rounded-md cursor-pointer py-5 px-4 hover:text-blue ${
              pathname === "/manager/Metrics" ? "bg-[#f7fafc] text-blue" : ""
            }`}
          >
            <VscGraphLine size={20} />
            <p>Metrics</p>
          </Link>
        </li>

        <Separator orientation="horizontal" className="hidden md:block" />

        <li className="hidden md:block">
          <Link
            href="/Profile"
            className={`flex gap-2 items-center rounded-md py-5 px-4 cursor-pointer hover:text-blue ${
              pathname === "/Profile" ? "bg-[#f7fafc] text-blue" : ""
            }`}
          >
            <CgProfile size={20} />
            <p>Profile</p>
          </Link>
        </li>
        <li className="hidden md:block">
          <Link
            href="/FeedBack"
            className={`flex gap-2 items-center rounded-md py-5 px-4 cursor-pointer hover:text-blue ${
              pathname === "/FeedBack" ? "bg-[#f7fafc] text-blue" : ""
            }`}
          >
            <MdOutlineFeedback size={20} />
            <p>Send FeedBack</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ManagerList;
