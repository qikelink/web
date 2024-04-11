import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  getImageUrl,
  getNotifications,
  isUserValid,
  signout,
} from "../../../backend/src/pocketbase";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "./ui/input";
import LoginDialog from "./dialog/login";
import { FaBars } from "react-icons/fa6";
import { BsHeadsetVr } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { TiMicrophoneOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/contexts/user-context";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiBookBookmarkDuotone } from "react-icons/pi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdLogout, MdOutlineFeedback } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import { FaX } from "react-icons/fa6";
import { EmptyIcon } from "@/icons/EmptyIcon";
import {
  IoChatboxEllipsesOutline,
  IoChatboxOutline,
  IoFlashOutline,
} from "react-icons/io5";
import Image from "next/image";
import logo from "../../images/logorm.png";

export default function Header() {
  const { user, isLoading, setUser, notifications, setNotifications } =
    useUser();
  const { setIsUserValid, progress } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { setProgress } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleSignout = () => {
    setProgress(90);
    window.location.reload();
    signout(setIsUserValid);
    setUser([]);
  };

  useEffect(() => {
    if (user != undefined) {
      getNotifications(user.id, user.email)
        .then((res) => {
          setNotifications(res);
        })
        .catch((error) => {
          console.error("Error fetching notifications data:", error);
        });
    }
  }, [notifications]);

 

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="font-poppins flex justify-between items-center pb-3">
        <div className="flex items-center justify-between space-x-2 hover:cursor">
          {isDropdownOpen ? (
            <Badge
              variant={"outline"}
              className={"p-2 md:hidden"}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaX className="md:hidden" size={16} />
            </Badge>
          ) : (
            <Badge
              variant={"outline"}
              className={"p-2 md:hidden"}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaBars className="md:hidden" size={16} />
            </Badge>
          )}

          <Badge variant={"outline"} className="p-2 mr-3 hidden md:block">
            <FaBars size={20} />
          </Badge>

          <Image
            onClick={() => router.push(`/`)}
            src={logo}
            width={150}
            height={150}
            layout="fixed"
          />
        </div>
        <div className="hidden sm:inline gap-4 justify-center">
          <div className="relative flex w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <AiOutlineSearch size={20} />
            </span>
            <Input
              className="w-full sm:w-52 md:w-72 lg:w-96 pl-10 pr-8 bg-secondary rounded-md"
              placeholder="Type to search..."
              size="md"
              type="search"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <TiMicrophoneOutline size={20} />
            </span>
          </div>
        </div>
        <div as="div" justify="end">
          <div>
            {isLoading && isUserValid ? (
              <div className="flex items-center space-x-5 justify-center">
                <Skeleton className="hidden md:inline h-8 w-8 rounded-full" />
                <Skeleton className="hidden md:inline h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            ) : isUserValid && user ? (
              <div className="flex items-center space-x-5 justify-center">
                <Badge
                  variant="outline"
                  className={"rounded-full p-2 hidden md:inline"}
                  onClick={() => router.push("/sessions")}
                >
                  <BsHeadsetVr
                    size={20}
                    className="text-current hover:animate-spin cursor-pointer"
                  />
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    "relative rounded-full p-2 hidden md:inline cursor-pointer"
                  }
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <FaRegBell size={20} className="text-current" />

                  {notifications.items && notifications.items.length > 0 && (
                    <span className="absolute -top-1 right-0 bg-red-500 -mt-1 text-white border rounded-full px-1">
                      {" "}
                      {`${notifications.items.length}+`}
                    </span>
                  )}

                  {isNotificationOpen && (
                    <>
                      <div className="absolute  md:top-0 md:right-9 md:w-96 bg-white border border-gray-300 rounded-md mt-1 overflow-hidden shadow-lg">
                        {notifications && notifications.items.length > 0 ? (
                          notifications.items.map((item, index) => (
                            <div
                              className="flex items-center justify-between px-4 py-2 border-b cursor-pointer border-gray-300"
                              onClick={() => router.push("/sessions")}
                              key={index}
                            >
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue rounded-full mr-2"></div>
                                <div>
                                  <p className="text-base font-semibold">
                                    {item.title}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {user.id === item.owner
                                      ? item.messageSender
                                      : item.messageReceiver}
                                  </p>
                                </div>
                              </div>

                              {/* <Badge variant='secondary' >Clear</Badge> */}
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-col  items-center w-full h-full my-16">
                            <EmptyIcon size={120} />
                            <p className="text-center text-lg font-medium text-darktext">
                              No message received yet.
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </Badge>

                <Avatar>
                  <AvatarImage
                    src={getImageUrl(user.collectionId, user.id, user.avatar)}
                  />
                  <AvatarFallback>{"QK"}</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <LoginDialog />
            )}
          </div>
        </div>
      </div>
      {isDropdownOpen ? (
        <div className="absolute top-full left-0 w-full bg-background py-2 h-screen">
          <div className="flex flex-col  ">
            <ul className="flex text-base flex-col justify-between">
              <li>
                <Link
                  href="/"
                  onClick={() => setProgress(90)}
                  className={`flex gap-4 justify-start py-5 cursor-pointer hover:text-blue ${
                    pathname === "/" ? "bg-[#e2eff8] text-blue rounded-md" : ""
                  }`}
                >
                  <AiOutlineHome size={24} className="ml-2" />
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/quickService"
                  onClick={() => setProgress(90)}
                  className={`flex gap-4 justify-start items-center py-5 px-1 cursor-pointer hover:text-blue ${
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
                  href="/notification"
                  onClick={() => setProgress(90)}
                  className={`flex gap-4 justify-between items-center py-5 px-1 cursor-pointer hover:text-blue ${
                    pathname === "/notification"
                      ? "bg-[#e2eff8] text-blue rounded-md"
                      : ""
                  }`}
                >
                  <div className="flex justify-start space-x-4">
                    <IoChatboxEllipsesOutline size={22} className="ml-2" />
                    <p>Messages</p>
                  </div>
                  {notifications.items && notifications.items.length > 0 && (
                    <span className=" bg-red text-white border rounded-full px-1">
                      {" "}
                      {`${notifications.items.length}+`}
                    </span>
                  )}
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

              <Separator orientation="horizontal" />
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

              <li>
                <Link
                  href="/manager/Organization"
                  onClick={() => setProgress(90)}
                  className={`flex gap-4 justify-start items-center py-5 px-1 cursor-pointer hover:text-blue ${
                    pathname === "/manager/Organization"
                      ? "bg-[#e2eff8] text-blue rounded-md"
                      : ""
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
                    pathname === "/help"
                      ? "bg-[#e2eff8] text-blue rounded-md"
                      : ""
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
              {isUserValid && (
                <li>
                  <button
                    onClick={handleSignout}
                    className="flex gap-4 justify-start items-center py-5 px-1 cursor-pointer text-red-500 rounded-md"
                  >
                    <MdLogout size={22} className="ml-2" />
                    <p>Sign Out</p>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      ) : null}
      {progress !== 22 && (
        <Progress
          value={progress}
          variant="secondary"
          className="w-full h-[1px] my-1"
        />
      )}
    </header>
  );
}
