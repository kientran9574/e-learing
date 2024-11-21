/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconComment,
  IconCourse,
  IconExplore,
  IconMember,
  IconOrder,
  IconPlay,
} from "@/icons";
import IconCoupon from "@/icons/IconCoupon";
import IconStar from "@/icons/IconStar";
import { TMenuItem, TRatingIcon } from "@/types";
import {
  ECommentStatus,
  ECouponStatus,
  ECouponType,
  ECourseLevel,
  ECourseStatus,
  EOrderStatus,
  ERatingStatus,
} from "@/types/enum";

export const menuItem: TMenuItem[] = [
  {
    url: "/",
    title: "Khám phá",
    icon: <IconExplore className="size-4"></IconExplore>,
  },
  {
    url: "/study",
    title: "Khu vực học tập",
    icon: <IconPlay className="size-4"></IconPlay>,
  },
  {
    url: "/manage/course",
    title: "Quản lý khóa học",
    icon: <IconCourse className="size-4"></IconCourse>,
  },
  {
    url: "/manage/member",
    title: "Quản lý thành viên",
    icon: <IconMember className="size-4"></IconMember>,
  },
  {
    url: "/manage/order",
    title: "Quản lý đơn hàng ",
    icon: <IconOrder className="size-4"></IconOrder>,
  },
  {
    url: "/manage/coupon",
    title: "Quản lý coupon",
    icon: <IconCoupon className="size-5" />,
  },
  {
    url: "/manage/rating",
    title: "Quản lý đánh giá",
    icon: <IconStar className="size-5" />,
  },
  {
    url: "/manage/comment",
    title: "Quản lý bình luận",
    icon: <IconComment className="size-4"></IconComment>,
  },
];
export const courseStatus: {
  title: string;
  value: ECourseStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: ECourseStatus.APPROVED,
    className:
      "text-green-500/90 bg-green-500 bg-opacity-10 px-3 py-1 border border-green-500 rounded-md",
  },
  {
    title: "Chờ duyệt",
    value: ECourseStatus.PENDING,
    className:
      "text-orange-500/90 bg-orange-500 bg-opacity-10 px-3 py-1 border border-orange-500 rounded-md",
  },
  {
    title: "Từ chối",
    value: ECourseStatus.REJECTED,
    className:
      "text-red-500/90 bg-red-500 bg-opacity-10 px-3 py-1 border border-red-500 rounded-md",
  },
];
export const courseLevel: {
  title: string;
  value: ECourseLevel;
}[] = [
  {
    title: "Dễ",
    value: ECourseLevel.BEGINNER,
  },
  {
    title: "Khó",
    value: ECourseLevel.ADVANCED,
  },
  {
    title: "Trung bình",
    value: ECourseLevel.INTERMEDIATE,
  },
];
export const couponTypes: {
  title: string;
  value: ECouponType;
}[] = [
  {
    title: "Phần trăm",
    value: ECouponType.PERCENT,
  },
  {
    title: "Giá trị",
    value: ECouponType.AMOUNT,
  },
];
export const couponStatus: {
  title?: string;
  value?: ECouponStatus;
  className?: string;
}[] = [
  {
    title: "Đã kích hoạt",
    value: ECouponStatus.ACTIVATE,
    className:
      "text-green-500/90 bg-green-500 bg-opacity-10 px-3 py-1 border border-green-500 rounded-md",
  },
  {
    title: "Chưa kích hoạt",
    value: ECouponStatus.UNACTIVATE,
    className:
      "text-red-500/90 bg-red-500 bg-opacity-10 px-3 py-1 border border-red-500 rounded-md",
  },
];
export const commonClassNames = {
  status:
    "bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 text-xs",
  action:
    "size-8 rounded-md border flex items-center justify-center p-2  text-gray-500 dark:text-white hover:border-opacity-80 dark:bg-transparent borderDarkMode dark:hover:border-opacity-20 hover:animate-bounce",
};

export const editorOptions = (field: any, theme: any) => ({
  initialValue: "",
  onBlur: field.onBlur,
  onEditorChange: (content: any) => field.onChange(content),
  init: {
    codesample_global_prismjs: true,
    skin: theme === "dark" ? "oxide-dark" : "oxide",
    height: 300,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "codesample",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "heading",
    ],
    toolbar:
      "undo redo | " +
      "codesample | bold italic forecolor | alignleft aligncenter |" +
      "alignright alignjustify | bullist numlist |" +
      "image |" +
      "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
      "link",
    content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`,
  },
});
// order
export const orderStatus: {
  title: string;
  value: EOrderStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: EOrderStatus.COMPLETED,
    className: "text-green-500 bg-green-500",
  },
  {
    title: "Chờ duyệt",
    value: EOrderStatus.PENDING,
    className: "text-orange-500 bg-orange-500",
  },
  {
    title: "Từ chối",
    value: EOrderStatus.CANCELED,
    className: "text-red-500 bg-red-500",
  },
];
export const ratingList: {
  title: TRatingIcon;
  value: number;
}[] = [
  {
    title: "awesome",
    value: 5,
  },
  {
    title: "good",
    value: 4,
  },
  {
    title: "meh",
    value: 3,
  },
  {
    title: "bad",
    value: 2,
  },
  {
    title: "terrible",
    value: 1,
  },
];
export const ratingStatus: {
  title: string;
  value: ERatingStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: ERatingStatus.ACTIVE,
    className: "text-green-500 bg-green-500",
  },
  {
    title: "Chờ duyệt",
    value: ERatingStatus.UNACTIVE,
    className: "text-orange-500 bg-orange-500",
  },
];
// coupon
export const couponStatuses = [
  {
    title: "Đang kích hoạt",
    value: 1,
  },
  {
    title: "Chưa kích hoạt",
    value: 0,
  },
];
// comment
export const commentStatuses = [
  {
    title: "Đang hoạt động",
    value: ECommentStatus.APPROVED,
    className: "text-green-500 bg-green-500",
  },
  {
    title: "Chờ duyệt",
    value: ECommentStatus.PENDING,
    className: "text-orange-500 bg-orange-500",
  },
  {
    title: "Hủy hoạt động",
    value: ECommentStatus.REJECTED,
    className: "text-red-500 bg-red-500",
  },
];
export const ITEMS_PER_PAGE = 5;
