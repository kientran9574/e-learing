import { EOrderStatus } from "@/types/enum";
import { Document, Schema, model, models } from "mongoose";
export interface IOrder extends Document {
  _id: string;
  code: string;
  course: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: EOrderStatus;
  created_at: Date;
  total: number;
  amount: number;
  discount: number;
  // nên để là optional vì là coupon lúc có lúc không , nếu mình không sử dụng mà lại để trong code là bắt buộc thì sẽ sinh ra lỗi khi không sử dụng coupon
  coupon?: Schema.Types.ObjectId;
}
const orderSchema = new Schema<IOrder>({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  total: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  discount: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
  },
  status: {
    type: String,
    enum: Object.values(EOrderStatus),
    default: EOrderStatus.PENDING,
  },
});
const Order = models.Order || model<IOrder>("Order", orderSchema);
export default Order;
