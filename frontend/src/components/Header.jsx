"use client";

import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { isUserValid, signout } from "../../../backend/src/pocketbase";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";
import { FaMicrophone } from "react-icons/fa";
import { ThemeSwitcher } from "@/contexts/switch-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";
import CreateAccountDialog from "./dialog/create-account";
import LoginDialog from "./dialog/login";
import { FaBars } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { setIsUserValid } = useAuth();

  const handleSignout = () => {
    signout(setIsUserValid);
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-background font-poppins flex justify-between items-center py-3 px-1 ">
      <div className="flex items-center justify-center gap-4">
        <FaBars size={20} />

        <p className="font-extrabold text-xl">Y-PROJECT</p>
      </div>
      <div className="hidden sm:flex gap-4 justify-center">
        <div className="relative flex w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <AiOutlineSearch size={18} />
          </span>
          <Input
            className="w-full sm:w-48 md:w-72 lg:w-96 pl-10 pr-8 bg-inputbackground"
            placeholder="Type to search..."
            size="lg"
            type="search"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <FaMicrophone size={18} />
          </span>
        </div>
      </div>

      <div as="div" justify="end">
        <div className="flex items-center space-x-5 justify-center">
          {isUserValid ? (
            <>
              <DropdownMenu placement="bottom-end">
                <DropdownMenuTrigger asChild>
                  <Image src="/bell.svg" alt="bell" width={22} height={22} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    {" "}
                    Space for messages and notifications as they come
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div>
                <User
                  // name="Jane Doe"
                  //  description="Product Designer"
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    size: "sm",
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <LoginDialog />
              <CreateAccountDialog />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
