/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import Coupon, { ICoupon } from "@/database/coupon.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { TCouponParams } from "@/types";
import Course from "@/database/course.model";
import { FilterQuery } from "mongoose";

export const createCoupon = async (params: any) => {
  try {
    connectToDatabase();
    const newCoupon = await Coupon.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newCoupon)),
    };
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

export async function getCoupons(params: any): Promise<ICoupon[] | undefined> {
  try {
    connectToDatabase();
    const { search, active } = params;
    const query: FilterQuery<typeof Coupon> = {};
    if (search) {
      query.$or = [{ code: { $regex: search, $options: "i" } }];
    }
    if (active) {
      query.active = active;
    }
    const coupons = await Coupon.find(query);
    return JSON.parse(JSON.stringify(coupons));
  } catch (error) {
    console.log(error);
  }
}
export async function getCouponByCode(
  params: any
): Promise<TCouponParams | undefined> {
  try {
    connectToDatabase();
    const coupons = await Coupon.findOne({ code: params.code }).populate({
      path: "courses",
      model: Course,
      select: "_id title",
    });
    return JSON.parse(JSON.stringify(coupons));
  } catch (error) {
    console.log(error);
  }
}
export async function updateCoupon(params: any) {
  try {
    connectToDatabase();
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      params._id,
      params.update
    );
    revalidatePath("/manage/coupon");
    return JSON.parse(JSON.stringify(updatedCoupon));
  } catch (error) {
    console.log(error);
  }
}
export async function getValidateCoupon(
  params: any
): Promise<TCouponParams | undefined> {
  try {
    connectToDatabase();
    const findCoupon = await Coupon.findOne({
      code: params.code,
    }).populate({
      path: "courses",
      select: "_id title",
    });
    const coupon = JSON.parse(JSON.stringify(findCoupon));
    const couponCourses = coupon?.courses.map((course: any) => course._id);
    let isActive = true;
    if (!couponCourses.includes(params.courseId)) isActive = false;
    if (!coupon?.active) isActive = false;
    if (coupon?.used >= coupon?.limit) isActive = false;
    if (coupon?.start_date && new Date(coupon?.start_date) > new Date())
      isActive = false;
    if (coupon?.end_date && new Date(coupon?.end_date) < new Date())
      isActive = false;
    return isActive ? coupon : undefined;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteCoupon(code: string) {
  try {
    connectToDatabase();
    await Coupon.findOneAndDelete({ code });
    revalidatePath("/manage/coupon");
  } catch (error) {
    console.log(error);
  }
}
