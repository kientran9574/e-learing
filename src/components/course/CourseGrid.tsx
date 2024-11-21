import React, { ReactNode } from "react";

const CourseGrid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dark:bg-grayDarker bg-neutral-100 p-5 h-full">
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 course-slider">
        {children}
      </div>
    </div>
  );
};

export default CourseGrid;
