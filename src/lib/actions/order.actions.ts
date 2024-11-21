"use server";
import { TCreateOrderParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Order from "@/database/order.model";
import Course from "@/database/course.model";
import User from "@/database/user.model";
// import { IOrderManageProps } from "@/app/(dashboard)/manage/order/OrderManage";
import { FilterQuery } from "mongoose";
import { EOrderStatus } from "@/types/enum";
import { revalidatePath } from "next/cache";
import Coupon from "@/database/coupon.model";

export const createOrder = async (params: TCreateOrderParams) => {
  try {
    connectToDatabase();
    // Nếu mà coupoun nó là rỗng thì sẽ xóa cái coupon khỏi cái params đó đi
    // if (!params.coupon) delete params.coupon;S
    const newOrder = await Order.create(params);
    if (params.coupon) {
      await Coupon.findByIdAndUpdate(params.coupon, {
        $inc: { used: 1 },
      });
    }
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export const getOrderAll = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any
) => {
  try {
    connectToDatabase();
    const { search, status, page = 1, limit } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Order> = {};
    if (search) {
      query.$or = [{ code: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const orders = await Order.find(query)
      .populate({
        path: "course",
        model: Course,
        select: "title",
      })
      .populate({
        path: "user",
        model: User,
        select: "name",
      })
      .populate({
        path: "coupon",
        model: Coupon,
        select: "code",
      })
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    const total = await Order.countDocuments(query);
    return {
      total,
      orders: JSON.parse(JSON.stringify(orders)),
    };
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export const updateOrder = async (orderId: string, status: EOrderStatus) => {
  try {
    connectToDatabase();
    const findOrder = await Order.findById(orderId)
      .populate({
        path: "course",
        model: Course,
        select: "_id",
      })
      .populate({
        path: "user",
        model: User,
        select: "_id",
      });
    console.log("🚀 ~ updateOrder ~ findOrder:", findOrder);
    const findUser = await User.findById(findOrder.user._id);
    console.log("🚀 ~ updateOrder ~ findUser:", findUser);
    await Order.findByIdAndUpdate(
      findOrder._id,
      {
        status,
      },
      {
        new: true,
      }
    );
    if (
      status === EOrderStatus.COMPLETED &&
      findOrder.status === EOrderStatus.PENDING
    ) {
      findUser.courses.push(findOrder.course._id);
      await findUser.save();
    }
    if (
      (status === EOrderStatus.CANCELED &&
        findOrder.status === EOrderStatus.PENDING) ||
      findOrder.status === EOrderStatus.COMPLETED
    ) {
      findUser.courses = findUser.courses.filter(
        (el: string) => el.toString() !== findOrder.course._id.toString()
      );
      await findUser.save();
    }
    revalidatePath("/manage/order");
    return { success: true };
  } catch (error) {
    console.log("🚀 ~ updateOrder ~ error:", error);
  }
};
