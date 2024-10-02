import { menuItem } from "@/constants";
import Link from "next/link";
import React from "react";
import ActiveLink from "../common/ActiveLink";
import { TMenuItem } from "@/types";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";

const SideBar = () => {
  return (
    <div className="p-5 text-gray-500  border-r border-r-gray-300 dark:border-r-gray-500 bg-white dark:bg-dark flex flex-col">
      <Link href={"/"} className="font-bold text-3xl inline-block mb-5">
        <strong className="text-primary">U</strong>
        <span className="dark:text-white">cademy</span>
      </Link>
      <ul className="flex flex-col gap-2">
        {menuItem.map((item, index) => {
          return (
            <MenuItem
              key={index}
              url={item.url}
              title={item.title}
              icon={item.icon}
            ></MenuItem>
          );
        })}
      </ul>
      <div className="mt-auto flex items-center justify-end gap-5">
        <ModeToggle></ModeToggle>
        <UserButton></UserButton>
      </div>
    </div>
  );
};

export default SideBar;

function MenuItem({ url, title, icon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  );
}
