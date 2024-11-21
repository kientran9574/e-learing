import { ECommentStatus } from "@/types/enum";
import { Document, Schema, model, models } from "mongoose";
export interface IComment extends Document {
  _id: string;
  content: string;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: ECommentStatus;
  parentId?: Schema.Types.ObjectId;
  level: number;
  created_at: Date;
}
const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Lesson",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: ECommentStatus.PENDING,
    enum: Object.values(ECommentStatus),
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  level: {
    type: Number,
    default: 0,
  },
});
const Comment = models.comment || model<IComment>("comment", commentSchema);
export default Comment;
