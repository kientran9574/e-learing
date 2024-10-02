import {
  IconComment,
  IconCourse,
  IconExplore,
  IconMember,
  IconOrder,
  IconPlay,
} from "@/icons";
import { TMenuItem } from "@/types";

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
    url: "/manage/comment",
    title: "Quản lý bình luận",
    icon: <IconComment className="size-4"></IconComment>,
  },
];
