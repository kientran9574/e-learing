import SideBar from "@/components/layout/SideBar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper grid grid-cols-[300px,minmax(0,1fr)] min-h-screen">
      <SideBar></SideBar>
      <main className="h-full w-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
