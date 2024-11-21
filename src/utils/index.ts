/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongoose";
import { Manrope } from "next/font/google";
export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const createOrderCode = () => {
  return `DH-${new Date().getTime().toString().slice(-6)}`;
};
export const formatNumberToK = (views: number) => {
  if (views < 1000) return views;
  return `${(views / 1000).toFixed(1)}k`;
};
export const formatMinutesToHour = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;
  return `${hours}h${remainMinutes}p`;
};
export const timeAgo = (date: Date | string | number): string => {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 5) {
    return "Vừa xong";
  }

  const intervals = [
    { label: "năm", seconds: 31536000 },
    { label: "tháng", seconds: 2592000 },
    { label: "tuần", seconds: 604800 },
    { label: "ngày", seconds: 86400 },
    { label: "giờ", seconds: 3600 },
    { label: "phút", seconds: 60 },
    { label: "giây", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? "" : ""} trước`;
    }
  }

  return "Vừa xong";
};
export const getRepliesComment = (
  comments: any,
  parentId: string | ObjectId
) => {
  return comments.filter(
    (item: any) => item.parentId?.toString() === parentId.toString()
  );
};
