"use client";

import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { isUserValid, signout } from "../../../backend/src/pocketbase";
import { useAuth } from "@/contexts/auth-context";
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
import { UserIcon } from "@/icons/UserIcon";
import { InviteIcon } from "@/icons/InviteIcon";
import { SettingIcon } from "@/icons/SettingIcon";
import { LogoutIcon } from "@/icons/LogoutIcon";
import { BsHeadsetVr } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TiMicrophoneOutline } from "react-icons/ti";
import Image from "next/image";
import logo from "../../images/loho.png";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/contexts/user-context";
import { Progress } from "@/components/ui/progress";

export default function Header() {
  const { user, isLoading, setUser } = useUser();
  const { setIsUserValid, progress, setProgress } = useAuth();
  const pathname = usePathname();
  const history = useRouter();

  const handleSignout = () => {
    signout(setIsUserValid);
    setUser([]);
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background ">
      <div className="font-poppins flex justify-between items-center py-3 ">
        <div className="flex items-center justify-between gap-1">
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

          <FaBars size={20} className="mr-4" />

          {/* <h2 className="font-extrabold text-current text-xl">VRMEET</h2> */}
          <Image
            src={logo}
            width={150}
            className="rounded-md"
            alt="Picture of the author"
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
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            ) : user.length > 0 ? (
              user.map((userInfo, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-5 justify-center">
                  <Badge
                    variant="outline"
                    className={"rounded-full p-2 hidden md:inline"}>
                    <BsHeadsetVr size={20} className="text-current" />
                  </Badge>

                  <Badge
                    variant="outline"
                    className={"rounded-full p-2 hidden md:inline"}>
                    <FaRegBell size={20} className="text-current" />
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar>
                        <AvatarImage src={userInfo.avatar} />
                        <AvatarFallback>
                          {userInfo.email.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="max-w-sm p-5 space-y-3">
                      <DropdownMenuLabel className="flex space-x-3 items-center">
                        <Avatar>
                          <AvatarImage src={userInfo.avatar} />
                          <AvatarFallback>
                            {userInfo.email.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
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
                          className="flex gap-4 items-center cursor-pointer py-1 text-lg font-medium">
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
                          } py-1 text-lg font-medium`}>
                          <InviteIcon />
                          <p>Invite friends</p>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href="/Sessions"
                          className="flex gap-4 items-center cursor-pointer py-1 text-lg font-medium">
                          <SettingIcon />
                          <p>Support</p>
                        </Link>
                      </DropdownMenuItem>

                      <Separator orientation="horizontal" />
                      <DropdownMenuItem>
                        <button
                          onClick={handleSignout}
                          className="flex gap-4 items-center cursor-pointer py-1 text-lg font-medium">
                          <LogoutIcon />
                          <p>Log out</p>
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            ) : (
              <LoginDialog />
            )}
          </div>
        </div>
      </div>
      {progress === 0 ? null : (
        <Progress
          value={progress}
          variant="secondary"
          className="w-[100%] h-[1px]"
        />
      )}
    </header>
  );
}
