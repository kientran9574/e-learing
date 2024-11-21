/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from "@/components/ui/input";
import { getValidateCoupon } from "@/lib/actions/coupon.actions";
import { ECouponType } from "@/types/enum";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

const CourseCoupon = ({
  setPrice,
  originalPrice,
  setCouponId,
  courseId,
}: {
  setPrice: Dispatch<SetStateAction<number>>;
  originalPrice: number;
  setCouponId: Dispatch<SetStateAction<string>>;
  courseId: string;
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  //   const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setIsApplied(false);
  }, [couponCode]);
  const handleChangeCoupon = (e: any) => {
    setTimeout(() => {
      setCouponCode(e.target.value);
    }, 500);
    return () => {
      clearTimeout(500);
    };
  };
  const handleApplyCoupon = async () => {
    if (isApplied) {
      toast.success("Mã giảm giá của ban đã được áp dụng");
      return;
    }
    try {
      const res = await getValidateCoupon({
        code: couponCode.toUpperCase(),
        courseId,
      });
      const couponType = res?.type;
      let finalPrice = originalPrice;
      if (!res) {
        toast.error("Mã giảm giá không hợp lệ");
        return;
      }
      if (couponType === ECouponType.PERCENT) {
        finalPrice = originalPrice - (originalPrice * res?.value) / 100;
      } else if (couponType === ECouponType.AMOUNT) {
        finalPrice = originalPrice - res?.value;
      }
      setPrice(finalPrice);
      setCouponCode("");
      setIsApplied(true);
      setCouponId(res._id);
      //   inputRef.current?.value && (inputRef.current.value = "");
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };

  return (
    <div className="mt-5 relative">
      <Input
        placeholder="Nhập mã giảm giá"
        className="uppercase pr-20 font-semibold"
        onChange={(e) => handleChangeCoupon(e)}
        defaultValue={couponCode}
        // ref={inputRef}
      ></Input>
      <button
        className="absolute right-5 top-1/2 -translate-y-1/2 font-medium text-sm"
        onClick={handleApplyCoupon}
      >
        Áp dụng
      </button>
    </div>
  );
};

export default CourseCoupon;
