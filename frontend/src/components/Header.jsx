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
import { signout } from "../../../backend/src/pocketbase";
import { useAuth } from "@/contexts/auth-context";
import { CheckIcon } from "@/utils/CheckIcon";
import { IoNotifications } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";


export default function Header() {
  const { setIsUserValid } = useAuth();

  const handleSignout = () => {
    signout(setIsUserValid);
  };

  return (
    <Navbar maxWidth="xl">
      <NavbarBrand className="flex gap-4">
        <Button isIconOnly variant="light" color="default">
          <IoIosMenu size={36} color="white" />
        </Button>
        <p className="font-bold text-inherit">Y-PROJECT</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-white dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="md"
          startContent={<AiOutlineSearch size={18} />}
          type="search"
        />
        <Button
          radius="full"
          isIconOnly
          aria-label="more than 9 notifications"
          variant="light"
        >
          <FaMicrophone size={20} />
        </Button>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <div className="flex flex-row justify-between gap-5">
          <Badge content="9+" shape="circle" color="danger" size="lg">
            <Button
              radius="full"
              isIconOnly
              aria-label="more than 9 notifications"
              variant="light"
            >
              <IoNotifications size={24} />
            </Button>
          </Badge>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="text-black"
            >
              <DropdownItem key="signin">
                <Link href="/signInPage">Sign In</Link>
              </DropdownItem>
              <DropdownItem key="profile">
                <Link href="/profilePage">Profile</Link>
              </DropdownItem>
              <DropdownItem key="settings">
                <Link href="/settingsPage">Settings</Link>
              </DropdownItem>

              <DropdownItem key="logout" color="danger" onClick={handleSignout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarContent>
    </Navbar>
  );
}
