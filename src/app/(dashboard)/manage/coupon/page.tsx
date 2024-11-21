import React from "react";
// import { BouncedLink } from "@/components/common";

import { getCoupons } from "@/lib/actions/coupon.actions";
import CouponManage from "./CouponManage";
const page = async ({
  searchParams,
}: {
  searchParams: {
    search: string;
    active: boolean;
  };
}) => {
  const coupons = await getCoupons({
    search: searchParams.search,
    active: searchParams.active,
  });
  return (
    <>
      <CouponManage coupons={coupons}></CouponManage>
    </>
  );
};

export default page;
