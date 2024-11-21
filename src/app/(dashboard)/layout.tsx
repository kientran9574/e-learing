import SideBar, { MenuItem } from "@/components/layout/SideBar";
import { menuItem } from "@/constants";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper block lg:grid lg:grid-cols-[300px,minmax(0,1fr)] h-screen ">
      <SideBar></SideBar>
      <ul className="flex lg:hidden fixed bottom-0 left-0 w-full p-3 gap-2 bgDarkMode border-t borderDarkMode justify-center h-16 z-10">
        {menuItem.map((item, index) => {
          return (
            <MenuItem
              key={index}
              url={item.url}
              title={item.title}
              icon={item.icon}
              onlyIcon
            ></MenuItem>
          );
        })}
      </ul>
      <div className="hidden lg:block"></div>
      <main className="h-full w-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
