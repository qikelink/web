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

export default function Header() {
  const { setIsUserValid } = useAuth();

  const handleSignout = () => {
    signout(setIsUserValid);
  };

  return (
    <div
      
      className="font-poppins shadow-sm"
    >
      <div className="flex gap-4">
        {/* <Button isIconOnly variant="light" color="default">
          <IoIosMenu size={36} color="white" />
        </Button> */}
        <p className="font-extrabold text-xl">Y-PROJECT</p>
        <ThemeSwitcher />
      </div>

      <div className="hidden sm:flex gap-4" justify="center">
        <Input
          classNames={{
            base: "w-96 sm:max-w-[30rem] h-10", // Adjust the max-width for large devices
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="md"
          startContent={<AiOutlineSearch size={18} />}
          type="search"
          endContent={<FaMicrophone size={18} />}
        />
      </div>

      <div as="div" justify="end">
        <div className="flex items-center space-x-5">
          <div>
            {isUserValid ? (
              <User
                // name="Jane Doe"
                //  description="Product Designer"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                  size: "sm",
                }}
              />
            ) : (
              "Sign in"
            )}
          </div>

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
        </div>
      </div>
    </div>
  );
}
