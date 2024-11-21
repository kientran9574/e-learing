import React from "react";
import RatingManage from "./RatingManage";
import { getRatings } from "@/lib/actions/rating.actions";
import { ERatingStatus } from "@/types/enum";

const page = async ({
  searchParams,
}: {
  searchParams: {
    search: string;
    status: ERatingStatus;
  };
}) => {
  const ratings = await getRatings({
    search: searchParams.search || "",
    status: searchParams.status || ERatingStatus.UNACTIVE,
  });
  return (
    <>
      <RatingManage ratings={ratings}></RatingManage>
    </>
  );
};

export default page;
