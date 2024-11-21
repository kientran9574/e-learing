"use client";
import React from "react";
const loading = () => {
  return (
    <div className="p-5">
      <div className="block lg:grid lg:grid-cols-[2fr,1fr] gap-10 items-start min-h-screen ">
        <div>
          <div className="aspect-video rounded-lg skeleton mb-5"></div>
          <div className="flex gap-3 mb-5">
            <div className="size-10 rounded-lg skeleton"></div>
            <div className="size-10 rounded-lg skeleton"></div>
          </div>
          <div className="w-full h-9 mb-10 skeleton"></div>
        </div>
        <div>
          <div className="h-3 w-full rounded-full mb-2 skeleton"></div>
          <div className="flex flex-col gap-5">
            <div className="skeleton w-full h-14 rounded-lg"></div>
            <div className="skeleton w-full h-14 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
