"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");
  return <>{children}</>;
};

export default AdminLayout;
