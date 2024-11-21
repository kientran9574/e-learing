/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { IComment } from "@/database/comment.model";
import { createComment } from "@/lib/actions/comment.actions";
import { findLesson } from "@/lib/actions/lessons.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
const formSchema = z.object({
  content: z
    .string({
      message: "Comment must be a string",
    })
    .min(10, { message: "Comment must be at least 10 character long" }),
});
const CommentForm = ({
  _comment,
  userId,
  lessonId,
  courseSlug,
  lessonBySlug,
}: {
  userId: string;
  lessonId: string;
  courseSlug?: string;
  lessonBySlug?: string;
  _comment?: IComment;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const comment = await createComment({
      content: values.content,
      user: userId!,
      lesson: lessonId!,
      level: _comment && _comment?.level >= 0 ? _comment?.level + 1 : 0,
      parentId: _comment?._id,
      path: { 
        courseSlug: courseSlug,
        lessonBySlug: lessonBySlug,
      },
    });
    if (comment) {
      toast.success("Bạn đã bình luận thành công");
      form.setValue("content", "");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex flex-col gap-5 mt-10"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter your comment..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-[140px] ml-auto" type="submit">
          Post comment
        </Button>
      </form>
    </Form>
  );
};
export default CommentForm;
