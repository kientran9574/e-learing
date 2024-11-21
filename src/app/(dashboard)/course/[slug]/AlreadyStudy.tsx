import Link from "next/link";
import React from "react";

const AlreadyStudy = () => {
  return (
    <div className="">
      <div className="bg-white rounded-lg p-5 border border-gray-300 dark:border-gray-200 dark:bg-grayDarker shadow-sm text-xl">
        Khóa học này bạn đã mua . Vui lòng bạn hãy nhấn
        <Link href={"/study"} className="text-primary ml-2">
          Khu vực học tập
        </Link>{" "}
        để quay trở trở lại học tập
      </div>
    </div>
  );
};

export default AlreadyStudy;
