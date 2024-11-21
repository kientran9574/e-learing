import React from "react";
import NewCouponForm from "./NewCouponForm";
import Heading from "@/components/common/Heading";

const page = () => {
  return (
    <>
      <Heading>
        <h1>Tạo mã giảm giá</h1>
      </Heading>
      <NewCouponForm></NewCouponForm>
    </>
  );
};

export default page;
