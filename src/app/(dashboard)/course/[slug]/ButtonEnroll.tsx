"use client";
import { Button } from "@/components/ui/button";
import { IUser } from "@/database/user.model";
import { createOrder, getOrderDetails } from "@/lib/actions/order.actions";
import { createOrderCode } from "@/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const ButtonEnroll = ({
  course,
  user,
  amount,
  couponId,
  total,
}: {
  course: string;
  user: IUser | undefined;
  amount: number;
  couponId: string | null;
  total: number;
}) => {
  const router = useRouter();
  const handleEnrollCourse = async () => {
    console.log(user);
    if (!user?.name || !user?.email) {
      toast.error("Vui lòng đăng nhập để mua khóa học");
      return;
    }
    const code = createOrderCode();
    await createOrder({
      code,
      user: user._id,
      course,
      total,
      amount,
      coupon: couponId || null,
    });
    const order = await getOrderDetails(code);
    router.push(`/order/${order.code}`);
  };
  return (
    <div className="relative w-full h-full rounded-full shadow-lg p-[2px] button-gradient">
      <div className="absolute inset-0 bg-gradient-to-r !from-yellow-500-500 via-pink-500 to-purple-500 rounded-full shadow"></div>
      <Button
        className="relative w-full h-full font-semibold bg-white dark:bg-grayDarker dark:text-white text-black hover:text-opacity-50 dark:hover:text-opacity-50 hover:bg-white dark:hover:text-white dark:hover:bg-grayDarker rounded-full"
        onClick={() => handleEnrollCourse()}
      >
        Mua khóa học
      </Button>
    </div>
  );
};

export default ButtonEnroll;
