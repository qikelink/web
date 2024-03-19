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

export default function Header() {
  const { setIsUserValid } = useAuth();
  const pathname = usePathname();

  const handleSignout = () => {
    signout(setIsUserValid);
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

          <FaBars size={20} className="mr-2" />

          <h2 className="font-extrabold text-current text-xl">Y-PROJECT</h2>
        </div>
        <div className="hidden sm:inline gap-4 justify-center">
          <div className="relative flex w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <AiOutlineSearch size={20} />
            </span>
            <Input
              className="w-full sm:w-52 md:w-72 lg:w-96 pl-10 pr-8 bg-inputbackground rounded-md"
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
          <div className="flex items-center space-x-5 justify-center">
            {!isUserValid ? (
              <>
                <Badge
                  variant="outline"
                  className={"rounded-full p-2 hidden md:inline"}
                >
                  <BsHeadsetVr size={20} className="text-current" />
                </Badge>

                <Badge
                  variant="outline"
                  className={"rounded-full p-2 hidden md:inline"}
                >
                  <FaRegBell size={20} className="text-current" />
                </Badge>

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
                        <p className="text-xl font-medium">Samuel Arimo</p>
                        <p className="text-xs font-light">
                          SamuelArimo@gmail.com
                        </p>
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
                      <Link
                        href="/Sessions"
                        className="flex gap-4 items-center cursor-pointer py-1 text-lg font-medium"
                      >
                        <LogoutIcon />
                        <p>Log out</p>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <LoginDialog />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
