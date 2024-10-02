import React, { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-3xl text-gray-500 dark:text-white font-bold border-b border-b-gray-300 dark:border-b-gray-500 p-5">{children}</h1>;
};

export default Heading;
