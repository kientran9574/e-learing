"use server";
import React from "react";
import OrderManage from "./OrderManage";
import { getOrderAll } from "@/lib/actions/order.actions";
import { EOrderStatus } from "@/types/enum";
import { ITEMS_PER_PAGE } from "@/constants";

const page = async ({
  searchParams,
}: {
  searchParams: {
    search: string;
    status: EOrderStatus;
    page: number;
    limit: number;
  };
}) => {
  const data = await getOrderAll({
    search: searchParams.search,
    status: searchParams.status || EOrderStatus.PENDING,
    page: searchParams.page || 1,
    limit: ITEMS_PER_PAGE,
  });
  if (!data) return null;
  const { orders, total } = data;
  return (
    <>
      <OrderManage orders={orders} total={total}></OrderManage>
    </>
  );
};

export default page;
