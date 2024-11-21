/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Heading from "@/components/common/Heading";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { commonClassNames, orderStatus } from "@/constants";
import { IconCourse } from "@/icons";
import IconEye from "@/icons/IconEye";
import IconEdit from "@/icons/IconEdit";
import IconDelete from "@/icons/IconDelete";
import Image from "next/image";
import IconAddItem from "@/icons/IconAddItem";
import Link from "next/link";
import { IOrder } from "@/database/order.model";
import IconCheck from "@/icons/IconCheck";
import { EOrderStatus } from "@/types/enum";
import IconCancel from "@/icons/IconCancel";
import Swal from "sweetalert2";
import useQueryString from "@/hook/useQueryString";
import { updateOrder } from "@/lib/actions/order.actions";
import { toast } from "react-toastify";
import Pagination from "@/components/common/Pagination";
export interface IOrderManageProps {
  _id: string;
  code: string;
  total: number;
  amount: number;
  discount: number;
  status: EOrderStatus;
  course: {
    title: string;
  };
  coupon: {
    code: string;
  };
  user: {
    name: string;
  };
}
const OrderManage = ({ orders, total }: { orders: any; total: number }) => {
  const { router, pathname, createQueryString, currentPage } = useQueryString();
  const handleStatusParams = (status: EOrderStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };
  const handleSearchParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
    }, 500);
    return () => clearTimeout(500);
  };
  const handleChangePage = (page: number) => {
    router.push(`${pathname}?${createQueryString("page", `${page}`)}`);
  };
  const handleUpdateOrder = async (orderId: string, status: EOrderStatus) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async () => {
        if (status === EOrderStatus.CANCELED) {
          const res = await updateOrder(orderId, status);
          if (res?.success) {
            toast.success("Cập nhât đơn hàng thành công");
          }
        }
        if (status === EOrderStatus.COMPLETED) {
          const res = await updateOrder(orderId, status);
          if (res?.success) {
            toast.success("Cập nhât đơn hàng thành công");
          }
        }
      });
    } catch (error) {
      console.log("🚀 ~ handleDelete ~ error:", error);
    }
  };
  return (
    <>
      <Heading className="w-full flex flex-col lg:flex-row items-center justify-between">
        <h1 className="lg:text-2xl whitespace-nowrap pr-5">Quản lý đơn hàng</h1>
        <div className="w-full mt-2 lg:mt-0 lg:w-[500px] flex gap-3 items-center">
          <Input
            placeholder="Tìm kiếm đơn hàng..."
            className="lg:w-[280px] shadow"
            onChange={(e) => handleSearchParams(e)}
          ></Input>
          <Select
            onValueChange={(status) =>
              handleStatusParams(status as EOrderStatus)
            }
          >
            <SelectTrigger className="lg:w-[180px] xl:w-[200px] shadow">
              <SelectValue placeholder="Chọn trạng thái " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {orderStatus.map((status) => {
                  return (
                    <SelectItem value={status.value} key={status.value}>
                      {status.title}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Heading>
      <div className="p-5">
        <div className="flex items-end justify-end py-2">
          <Link
            href={`/manage/course/new`}
            className=" text-white bg-primary  dark:bg-grayDarker dark:border dark:border-grayDark rounded-full p-2 hover:animate-bounce"
          >
            <IconAddItem className="size-5"></IconAddItem>
          </Link>
        </div>
        <Table className="table-responsive">
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn hàng</TableHead>
              <TableHead>Khóa học</TableHead>
              <TableHead>Thành viên</TableHead>
              <TableHead>Số tiền</TableHead>
              <TableHead>Mã giảm giá</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders &&
              orders.map((order: any) => {
                const orderStatusItem = orderStatus.find(
                  (item) => item.value === order.status
                );
                return (
                  <TableRow key={order.code}>
                    <TableCell>
                      <strong>{order.code}</strong>
                    </TableCell>
                    <TableCell>{order.course.title}</TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <span>{order.amount.toLocaleString("us-US")}</span>
                        {order.discount > 0 && (
                          <span>{order.discount.toLocaleString("us-US")}</span>
                        )}
                        <strong
                          className={cn(
                            orderStatusItem?.className,
                            "bg-transparent"
                          )}
                        >
                          {order.total?.toLocaleString("us-US") || ""}
                        </strong>
                      </div>
                    </TableCell>
                    <TableCell>{order.coupon?.code || ""}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          commonClassNames.status,
                          orderStatusItem?.className
                        )}
                      >
                        {orderStatusItem?.title}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className={commonClassNames.action}
                          onClick={() =>
                            handleUpdateOrder(order._id, EOrderStatus.COMPLETED)
                          }
                        >
                          <IconCheck />
                        </button>
                        <button
                          type="button"
                          className={commonClassNames.action}
                        >
                          <IconCancel
                            onClick={() =>
                              handleUpdateOrder(
                                order._id,
                                EOrderStatus.CANCELED
                              )
                            }
                          />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Pagination
          handleChangePage={handleChangePage}
          currentPage={currentPage}
          totalPages={total}
        ></Pagination>
      </div>
    </>
  );
};

export default OrderManage;
