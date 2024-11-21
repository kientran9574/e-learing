import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const Heading = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "text-2xl lg:text-3xl text-gray-500 dark:text-white font-bold border-b border-b-gray-300 dark:border-b-gray-500 p-5",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Heading;
