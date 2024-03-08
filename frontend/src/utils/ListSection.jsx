import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { AiFillHome } from "react-icons/ai";
import { ItemCounter } from "@/utils/ItemCounter";
import { ImOffice } from "react-icons/im";
import { TbSettingsCog } from "react-icons/tb";
import { IconWrapper } from "@/utils/IconWrapper";
import { FaFire } from "react-icons/fa6";
import { IoNotificationsSharp } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi2";
import { GoOrganization } from "react-icons/go";
import { useRouter } from "next/navigation";

const ListSection = () => {
  const router = useRouter();


  return (
    <div>
      <Listbox
        aria-label="User Menu"
        shouldHighlightOnFocus={true}
        onAction={(key) => router.push(`/${key}`)}
        className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-full overflow-visible shadow-small rounded-medium"
        itemClasses={{
          base: "px-2 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-primary",
        }}
      >
        <ListboxItem
          key=" "
          endContent={<ItemCounter number={13} />}
          startContent={
            <IconWrapper className="bg-success/10 text-success">
              <AiFillHome className="text-lg " />
            </IconWrapper>
          }
        >
          Home
        </ListboxItem>
        <ListboxItem
          key="pull_requests"
          endContent={<ItemCounter number={6} />}
          startContent={
            <IconWrapper className="bg-primary/10 text-primary">
              <FaFire className="text-lg " />
            </IconWrapper>
          }
        >
          Trending
        </ListboxItem>
        <ListboxItem
          key="notification"
          endContent={<ItemCounter number={293} />}
          startContent={
            <IconWrapper className="bg-secondary/10 text-secondary">
              <IoNotificationsSharp className="text-xl " />
            </IconWrapper>
          }
        >
          Notification
        </ListboxItem>
        <ListboxItem
          key="actions"
          endContent={<ItemCounter number={2} />}
          startContent={
            <IconWrapper className="bg-warning/10 text-warning">
              <IoNotificationsSharp className="text-lg " />
            </IconWrapper>
          }
        >
          Actions
        </ListboxItem>
        <ListboxItem
          key="Profile"
          endContent={<ItemCounter number={4} />}
          startContent={
            <IconWrapper className="bg-default/50 text-foreground">
              <HiDocumentText className="text-lg " />
            </IconWrapper>
          }
        >
          Profile
        </ListboxItem>

        <ListboxItem
          showDivider={true}
          key="Organization"
          endContent={<ItemCounter number={79} />}
          startContent={
            <IconWrapper className="bg-warning/10 text-warning">
              <ImOffice />
            </IconWrapper>
          }
        >
          Organization
        </ListboxItem>
        <ListboxItem
          key="watchers"
          endContent={<ItemCounter number={82} />}
          startContent={
            <IconWrapper className="bg-default/50 text-foreground">
              <TbSettingsCog />
            </IconWrapper>
          }
        >
          Settings
        </ListboxItem>
        <ListboxItem
          key="license"
          endContent={<span className="text-small text-default-400">MIT</span>}
          startContent={
            <IconWrapper className="bg-danger/10 text-danger dark:text-danger-500">
              <TbSettingsCog />
            </IconWrapper>
          }
        >
          License
        </ListboxItem>
      </Listbox>
    </div>
  );
};

export default ListSection;
