"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import slugify from "slugify";
import { createCourse } from "@/lib/actions/courses.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IUser } from "@/database/user.model";
const CourseAddNew = ({ user }: { user: IUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formSchema = z.object({
    title: z.string(),
    slug: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const data = {
        title: values.title,
        slug:
          values.slug ||
          slugify(values.title, {
            locale: "vi",
            lower: true,
          }),
        author: user._id,
      };
      const course = await createCourse(data);
      if (course?.success) {
        toast.success("Tạo khóa học thành công");
        router.push(`/manage/course/update?slug=${course.data.slug}`);
      }
      if (!course?.success) {
        toast.error(course?.message);
        return;
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        autoComplete="off"
      >
        <div className="grid grid-cols-2 gap-8 p-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khóa học *</FormLabel>
                <FormControl>
                  <Input placeholder="Tên khóa học " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn *</FormLabel>
                <FormControl>
                  <Input placeholder="khoa-hoc-lap-trinh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="ml-5 w-[150px]"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Tạo khóa học
        </Button>
      </form>
    </Form>
  );
};

export default CourseAddNew;
