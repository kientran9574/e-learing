"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TActiveLinkProps } from "@/types";
import React from "react";
const ActiveLink = ({ url, children }: TActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = url === pathname;
  return (
    <>
      <Link
        href={url}
        className={`p-3 rounded-md flex items-center gap-3 transition-all ${
          isActive
            ? "text-white dark:text-primary bg-primary dark:bg-primary/30  svg-animate"
            : "text-gray-600 dark:text-grayDark hover:!text-primary hover:bg-primary/25"
        }`}
      >
        {children}
      </Link>
    </>
  );
};

export default ActiveLink;
