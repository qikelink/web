"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  Button,
} from "@nextui-org/react";
import { AiFillAmazonCircle, AiOutlineSearch } from "react-icons/ai";
import { isUserValid, signout } from "../../../backend/src/pocketbase";
import { useAuth } from "@/contexts/auth-context";
import { User } from "@nextui-org/react";
import Image from "next/image";
import { CheckIcon } from "@/utils/CheckIcon";
import { IoNotifications } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { ThemeSwitcher } from "@/contexts/switch-theme";

export default function Header() {
  const { setIsUserValid } = useAuth();

  const handleSignout = () => {
    signout(setIsUserValid);
  };

  return (
    <Navbar maxWidth="xl" className="font-poppins text-black dark:text-lighttext shadow-sm">
      <NavbarBrand className="flex gap-4">
        {/* <Button isIconOnly variant="light" color="default">
          <IoIosMenu size={36} color="white" />
        </Button> */}
        <p className="font-extrabold text-xl">Y-PROJECT</p>
        <ThemeSwitcher />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
      </NavbarContent>

      <NavbarContent as="div" justify="end">
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

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Image src="/bell.svg" alt="bell" width={22} height={22} />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="text-darktext"
            >
              <DropdownItem key="signin">
                Space for messages and notifications as they come
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarContent>
    </Navbar>
  );
}
