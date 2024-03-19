"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { isUserValid, signout, getUser } from "../../../backend/src/pocketbase";
import { useAuth } from "@/contexts/auth-context";
import { FaMicrophone } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";
import LoginDialog from "./dialog/login";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { EarnIcon } from "@/icons/EarnIcon";
import { UserIcon } from "@/icons/UserIcon";
import { InviteIcon } from "@/icons/InviteIcon";
import { SettingIcon } from "@/icons/SettingIcon";
import { LogoutIcon } from "@/icons/LogoutIcon";
import { BsHeadsetVr } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Header() {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setIsUserValid } = useAuth();
  const pathname = usePathname();
  const history = useRouter();

  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [isUserValid]);

  const handleSignout = () => {
    signout(setIsUserValid);
    if (pathname === "/") {
      window.location.reload();
    } else {
      history.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background ">
      <div className="font-poppins flex justify-between items-center py-3 px-1 ">
        <div className="flex items-center justify-center gap-4">
          <Sheet>
            <SheetTrigger>
              <FaBars className="md:hidden" size={16} />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <h2 className="font-extrabold text-current text-xl">Y-PROJECT</h2>
        </div>
        <div className="hidden sm:inline gap-4 justify-center">
          <div className="relative flex w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <AiOutlineSearch size={18} />
            </span>
            <Input
              className="w-full sm:w-52 md:w-72 lg:w-96 pl-10 pr-8 bg-inputbackground rounded-full "
              placeholder="Type to search..."
              size="md"
              type="search"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <FaMicrophone size={18} />
            </span>
          </div>
        </div>

        <div as="div" justify="end">
          <div className="flex items-center space-x-5 justify-center">
            {isLoading && isUserValid ? (
              <>
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </>
            ) : (
              user.map((userInfo, index) => (
                <>
                  <Badge
                    variant="outline"
                    className={"rounded-full p-2 hidden md:inline"}
                  >
                    <BsHeadsetVr size={24} className="text-current" />
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Badge
                        variant="outline"
                        className={"rounded-full p-2 hidden md:inline"}
                      >
                        <IoNotifications size={24} className="text-current" />
                      </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="max-w-md p-3 space-y-3">
                      <DropdownMenuLabel>Notifications (2) </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <div class="flex items-start space-x-2 ">
                          <EarnIcon size={40} />
                          <div className="flex flex-col items-start space-y-1  rounded-lg ">
                            <p className="text-base text-wrap text-darktext ">
                              {" "}
                              Upgrade your account to start earning as a mentor.
                            </p>

                            <p className="font-medium">2 hours ago</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <Separator orientation="horizontal" className="my-2" />
                      <DropdownMenuItem>
                        <div class="flex items-start space-x-2 ">
                          <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col items-start space-y-1  rounded-lg ">
                            <p className="text-base text-wrap text-darktext ">
                              {" "}
                              Upgrade your account to start earning as a mentor.
                            </p>

                            <p className="font-medium">2 hours ago</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <Separator orientation="horizontal" className="my-2" />
                      <DropdownMenuItem>
                        <div class="flex items-start space-x-2 ">
                          <EarnIcon size={40} />
                          <div className="flex flex-col items-start space-y-1  rounded-lg ">
                            <p className="text-base text-wrap text-darktext ">
                              {" "}
                              Upgrade your account to start earning as a mentor.
                            </p>

                            <p className="font-medium">2 hours ago</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <Separator orientation="horizontal" className="my-2" />
                      <DropdownMenuItem>
                        <div class="flex items-start space-x-2 ">
                          <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col items-start space-y-1  rounded-lg ">
                            <p className="text-base text-wrap text-darktext ">
                              {" "}
                              Upgrade your account to start earning as a mentor.
                            </p>

                            <p className="font-medium">2 hours ago</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="max-w-sm p-5 space-y-3">
                      <DropdownMenuLabel className="flex space-x-3 items-center">
                        <Avatar>
                          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xl font-medium">
                            {userInfo.username}
                          </p>
                          <p className="text-xs font-light">{userInfo.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {/* menu items */}

                      <DropdownMenuItem>
                        <Link
                          href="/Sessions"
                          className="flex gap-4 items-center cursor-pointer py-1 text-lg font-medium"
                        >
                          <UserIcon />
                          <p>My account</p>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href="/Sessions"
                          className={`flex gap-4 items-center cursor-pointer ${
                            pathname === "/Sessions"
                              ? "bg-[#f7fafc] text-blue"
                              : ""
                          } py-1 text-lg font-medium`}
                        >
                          <InviteIcon />
                          <p>Invite friends</p>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href="/Sessions"
                          className="flex gap-4 items-center cursor-pointer py-1 text-lg font-medium"
                        >
                          <SettingIcon />
                          <p>Support</p>
                        </Link>
                      </DropdownMenuItem>

                      <Separator orientation="horizontal" />
                      <DropdownMenuItem>
                        <button
                          onClick={handleSignout}
                          className="flex gap-4 items-center cursor-pointer py-1 text-lg font-medium"
                        >
                          <LogoutIcon />
                          <p>Log out</p>
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ))
            )}

            {!isUserValid ? <LoginDialog /> : null}
          </div>
        </div>
      </div>
    </header>
  );
}
