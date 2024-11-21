"use client";
import Heading from "@/components/common/Heading";
import StatusBadge from "@/components/common/StatusBadge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { commonClassNames, couponStatuses } from "@/constants";
import { ICoupon } from "@/database/coupon.model";
import useQueryString from "@/hook/useQueryString";
import IconAddItem from "@/icons/IconAddItem";
import IconCancel from "@/icons/IconCancel";
import IconEdit from "@/icons/IconEdit";
import { deleteCoupon } from "@/lib/actions/coupon.actions";
import { ECouponType } from "@/types/enum";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";

const CouponManage = ({ coupons }: { coupons: ICoupon[] | undefined }) => {
  const { router, pathname, createQueryString } = useQueryString();
  const handleChangeQs = (value: string) => {
    router.push(`${pathname}?${createQueryString("active", `${value}`)}`);
  };
  const handleDeleteCoupon = async (code: string) => {
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
        await deleteCoupon(code);
      });
    } catch (error) {
      console.log("🚀 ~ handleDelete ~ error:", error);
    }
  };
  return (
    <>
      <Heading className="w-full flex flex-col lg:flex-row items-center justify-between">
        <h1 className="lg:text-2xl whitespace-nowrap pr-5">
          Quản lý mã giảm giá
        </h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Tìm kiếm coupon..."
            className="lg:w-[280px] shadow"
          />
          <Select onValueChange={(value) => handleChangeQs(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Đang kích hoạt" defaultValue={1} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {couponStatuses.map((item) => (
                  <SelectItem key={item.value} value={`${item.value}`}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Heading>
      <div className="p-5">
        <div className="flex items-end justify-end py-2">
          <Link
            href={`/manage/coupon/new`}
            className=" text-white bg-primary  dark:bg-grayDarker dark:border dark:border-grayDark rounded-full p-2 hover:animate-bounce"
          >
            <IconAddItem className="size-5"></IconAddItem>
          </Link>
        </div>
        <Table className="table-responsive">
          <TableHeader>
            <TableRow>
              <TableHead>Mã</TableHead>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Giảm giá</TableHead>
              <TableHead>Sử dụng</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons &&
              coupons.length > 0 &&
              coupons.map((coupon) => {
                //   const _couponStatus = couponStatus.find(
                //     (status) =>
                //       (status.value === ECouponStatus.ACTIVATE &&
                //         coupon.active === true) ||
                //       (status.value === ECouponStatus.UNACTIVATE &&
                //         !coupon.active === false)
                //   );
                return (
                  <TableRow key={coupon.code}>
                    <TableCell>
                      <strong>{coupon.code}</strong>
                    </TableCell>
                    <TableCell>{coupon.title}</TableCell>
                    <TableCell>
                      {coupon.type === ECouponType.AMOUNT ? (
                        <span>{coupon.value.toLocaleString("us-US")}</span>
                      ) : (
                        <span>{coupon.value}%</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {coupon.used} / {coupon.limit}
                    </TableCell>
                    <TableCell>
                      {coupon.active ? (
                        <StatusBadge
                          item={{
                            title: "Đang kích hoạt",
                            className: "text-green-500",
                          }}
                        ></StatusBadge>
                      ) : (
                        <StatusBadge
                          item={{
                            title: "Chưa kích hoạt",
                            className: "text-orange-500",
                          }}
                        ></StatusBadge>
                      )}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <div className="flex gap-3">
                        <Link
                          type="button"
                          href={`/manage/coupon/update?code=${coupon.code}`}
                          className={commonClassNames.action}
                          // onClick={() =>
                          //   handleUpdateOrder(order._id, EOrderStatus.COMPLETED)
                          // }
                        >
                          <IconEdit />
                        </Link>
                        <button
                          type="button"
                          className={commonClassNames.action}
                          onClick={() => {
                            handleDeleteCoupon(coupon.code);
                          }}
                        >
                          <IconCancel />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CouponManage;
