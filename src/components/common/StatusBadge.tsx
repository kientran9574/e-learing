import { commonClassNames } from "@/constants";
import { cn } from "@/lib/utils";
import { ERatingStatus } from "@/types/enum";
import React from "react";

const StatusBadge = ({
  item,
  onClick,
}: {
  item: {
    title: string;
    value?: ERatingStatus;
    className?: string;
  }| undefined;
  onClick?: () => void;
}) => {
  return (
    <span
      className={cn(commonClassNames.status, item?.className)}
      onClick={onClick}
    >
      {item?.title}
    </span>
  );
};

export default StatusBadge;
