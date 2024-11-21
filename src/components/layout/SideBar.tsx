"use client";
import { menuItem } from "@/constants";
import Link from "next/link";
import React from "react";
import ActiveLink from "../common/ActiveLink";
import { TMenuItem } from "@/types";
import { UserButton, useAuth } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";
import { IconMember } from "@/icons";

const SideBar = () => {
  const { userId } = useAuth();
  return (
    <div className="hidden p-5 text-gray-500  border-r border-r-gray-300 dark:border-r-gray-500 bg-white dark:bg-dark lg:flex flex-col fixed top-0 left-0 bottom-0 w-[300px]">
      <Link href={"/"} className="font-bold text-3xl flex items-end mb-5">
        <strong className="text-primary">U</strong>
        {/* <Image alt="Ucademy" src="/logo.png" width={20} height={20} className="inline-block size-10" /> */}
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
        {!userId ? (
          <Link
            href={"/sign-in"}
            className="w-10 h-19 p-2 bg-primary text-white rounded"
          >
            <IconMember></IconMember>
          </Link>
        ) : (
          <UserButton></UserButton>
        )}
      </div>
    </div>
  );
};

export default SideBar;

export function MenuItem({ url, title, icon, onlyIcon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {onlyIcon ? null : title}
      </ActiveLink>
    </li>
  );
}
