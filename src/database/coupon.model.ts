import { ECouponType } from "@/types/enum";
import { Document, Schema, model, models } from "mongoose";
export interface ICoupon extends Document {
  _id: string;
  title: string;
  code: string;
  active: boolean;
  start_date: Date;
  end_date: Date;
  limit: number;
  used: number;
  courses: Schema.Types.ObjectId[];
  type: ECouponType;
  value: number;
  created_at: Date;
}
const couponSchema = new Schema<ICoupon>({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  used: {
    type: Number,
    default: 0,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
  limit: {
    type: Number,
  },
  courses: [  
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  type: {
    type: String,
    enum: Object.values(ECouponType),
    default: ECouponType.PERCENT,
  },
  value: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const Coupon = models.Coupon || model<ICoupon>("Coupon", couponSchema);
export default Coupon;
