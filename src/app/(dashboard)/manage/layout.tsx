"use server";
import PageNotAccessDenied from "@/app/not-access";
import { getUsersInfo } from "@/lib/actions/users.actions";
import { EUserRole } from "@/types/enum";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const { userId } = auth();
  const user = await getUsersInfo(userId as string);
  console.log("🚀 ~ AdminLayout ~ user:", user);
  if (user && user.role !== EUserRole.ADMIN) {
    return <PageNotAccessDenied></PageNotAccessDenied>;
  }
  if (!userId) return redirect("/sign-in");
  return <>{children}</>;
};

export default AdminLayout;
