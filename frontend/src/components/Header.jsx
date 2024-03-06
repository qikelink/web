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
} from "@nextui-org/react";
import { AiFillAmazonCircle, AiOutlineSearch } from "react-icons/ai";
import { signout } from "../../../backend/src/pocketbase";
import { useAuth } from "@/contexts/auth-context";

export default function Header() {
  const { setIsUserValid } = useAuth();

  const handleSignout = () => {
    signout(setIsUserValid);
  };

  return (
    <Navbar maxWidth="xl">
      <NavbarBrand>
        <AiFillAmazonCircle />
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
          size="sm"
          startContent={<AiOutlineSearch size={18} />}
          type="search"
        />
      </NavbarContent>

      <NavbarContent as="div" justify="end">
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
      </NavbarContent>
    </Navbar>
  );
}
