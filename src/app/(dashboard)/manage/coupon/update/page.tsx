import Heading from "@/components/common/Heading";
import React from "react";
import UpdateCouponForm from "./UpdateCouponForm";
import { getCouponByCode } from "@/lib/actions/coupon.actions";

const page = async ({
  searchParams,
}: {
  searchParams: {
    code: string;
  };
}) => {
  const findCoupon = await getCouponByCode({ code: searchParams.code });
  if (!findCoupon) return null;
  return (
    <>
      <Heading>
        <h1>Cập nhật mã giảm giá</h1>
      </Heading>
      <UpdateCouponForm coupon={findCoupon}></UpdateCouponForm>
    </>
  );
};

export default page;
