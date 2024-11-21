/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ILesson } from "@/database/lesson.model";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Editor } from "@tinymce/tinymce-react";
import { editorOptions } from "@/constants";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import { updateLesson } from "@/lib/actions/lessons.action";
const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.coerce.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});
const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
  const editorRef = useRef<any>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug || "",
      duration: lesson.duration || 0,
      video_url: lesson.video_url || "",
      content: lesson.content || "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await updateLesson({
        lessonId: lesson._id,
        path: `/manage/course/update-content?slug=${lesson.slug}`,
        updateData: {
          ...values,
        },
      });
      if (res?.success) {
        toast.success("Cập nhật bài học mới thành công!");
        return;
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  }
  const { theme } = useTheme();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn</FormLabel>
                <FormControl>
                  <Input placeholder="bai-1-tong-quan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời lượng</FormLabel>
                <FormControl>
                  <Input placeholder="Thời lượng" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="video_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://youtube.com/abcdefXZ"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=""></div>
          <div className="col-start-1 col-end-3">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                      value={field.value}
                      onInit={(_evt, editor) => {
                        (editorRef.current = editor).setContent(
                          lesson.content || ""
                        );
                      }}
                      {...editorOptions(field, theme)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-5 items-center">
          <Button type="submit">Cập nhật</Button>
          <Link href="/" className="text-sm text-slate-600">
            Xem trước
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LessonItemUpdate;
