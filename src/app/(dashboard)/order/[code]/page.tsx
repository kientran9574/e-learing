"use server";
import { getOrderDetails } from "@/lib/actions/order.actions";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { code: string } }) => {
  console.log(params.code);
  const code = params.code;
  const orderDetails = await getOrderDetails(code);
  console.log("🚀 ~ page ~ orderDetails:", orderDetails);
  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white p-20 text-black">
      <div className="max-w-lg w-full  dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          Cảm ơn bạn đã đặt mua khóa học{" "}
          <Link href="/" className="text-blue-500 underline">
            {orderDetails.course.title}
          </Link>
        </h2>
        <p className="mb-4 text-black">
          Bạn vui lòng thanh toán vào thông tin tài khoản dưới đây với nội dung
          chuyển khoản là{" "}
          <span className="text-red-500 font-bold">{orderDetails.code}</span>
        </p>

        <div className=" dark:bg-gray-700 p-4 rounded-md space-y-3">
          <div className="flex justify-between">
            <span>Số tài khoản</span>
            <span className="font-semibold">33366668888</span>
          </div>
          <div className="flex justify-between">
            <span>Tên tài khoản</span>
            <span className="font-semibold">TRẦN VĂN KIÊN</span>
          </div>
          <div className="flex justify-between">
            <span>Ngân hàng</span>
            <span className="font-semibold">Ngân hàng NAM A BANK</span>
          </div>
          <div className="flex justify-between">
            <span>Số tiền cần thanh toán</span>
            <span className="font-semibold text-red-500">
              {orderDetails.amount} VNĐ
            </span>
          </div>
        </div>

        <p className="mt-4">
          Nếu bạn cần hỗ trợ, vui lòng liên hệ Admin qua fb cá nhân:{" "}
          <Link
            href="https://www.facebook.com/tranvankien237/"
            className="text-blue-500 underline"
          >
            Trần Văn Kiên
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
