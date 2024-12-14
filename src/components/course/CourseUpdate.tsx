/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useRouter } from "next/navigation";
import { ECourseLevel, ECourseStatus } from "@/types/enum";
// import { ICourse } from "@/database/course.model";
import { Textarea } from "../ui/textarea";
import { updateCourse } from "@/lib/actions/courses.action";
import { toast } from "react-toastify";
import { useImmer } from "use-immer";
import IconAdd from "@/icons/IconAdd";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courseLevel, courseStatus } from "@/constants";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
const CourseUpdate = ({ course }: { course: any }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [courseInfo, setCourseInfo] = useImmer({
    requirements: course.info.requirements,
    benefits: course.info.benefits,
    qa: course.info.qa,
  });

  const formSchema = z.object({
    title: z.string().min(10, "Tên khóa học phải có ít nhất 10 ký tự"),
    slug: z.string().optional(),
    price: z.coerce.number().int().positive().optional(),
    sale_price: z.coerce.number().int().positive().optional(),
    intro_url: z.string().optional(),
    desc: z.string().optional(),
    image: z.string().optional(),
    views: z.coerce.number().int().positive().optional(),
    status: z
      .enum([
        ECourseStatus.APPROVED,
        ECourseStatus.PENDING,
        ECourseStatus.REJECTED,
      ])
      .optional(),
    level: z
      .enum([
        ECourseLevel.BEGINNER,
        ECourseLevel.INTERMEDIATE,
        ECourseLevel.ADVANCED,
      ])
      .optional(),
    info: z.object({
      requirements: z.array(z.string()).optional(),
      benefits: z.array(z.string()).optional(),
      qa: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        )
        .optional(),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title || "",
      slug: course.slug || "",
      price: course.price || 0,
      sale_price: course.sale_price || 0,
      intro_url: course.intro_url || "",
      desc: course.desc || "",
      image: course.image || "",
      status: course.status || ECourseStatus.PENDING,
      level: course.level || ECourseLevel.BEGINNER,
      views: course.views || 0,
      info: {
        requirements: course.info.requirements || "",
        benefits: course.info.benefits || "",
        qa: course.info.qa || "",
      },
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values);
    console.log("🚀 ~ onSubmit ~ values:", courseInfo);
    setIsLoading(true);
    try {
      const res = await updateCourse({
        slug: course.slug,
        updateData: {
          title: values.title,
          slug: values.slug,
          price: values.price,
          sale_price: values.sale_price,
          intro_url: values.intro_url,
          desc: values.desc,
          views: values.views,
          status: values.status,
          level: values.level,
          image: values.image || "",
          info: {
            requirements: courseInfo.requirements,
            benefits: courseInfo.benefits,
            qa: courseInfo.qa,
          },
        },
      });
      if (values.slug) {
        router.replace(`/manage/course/update?slug=${values.slug}`);
      }
      if (res?.success) {
        toast.success("Cập nhật khóa học thành công");
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }
  const imgWatch = form.watch("image");
  console.log(imgWatch, "3123123123123")
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
                <FormLabel>Tên khóa học *</FormLabel>
                <FormControl>
                  <Input placeholder="Tên khóa học" {...field} />
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
                <FormLabel>Đường dẫn khóa học</FormLabel>
                <FormControl>
                  <Input placeholder="khoa-hoc-lap-trinh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá khuyến mãi</FormLabel>
                <FormControl>
                  <Input placeholder="599.000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sale_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá gốc</FormLabel>
                <FormControl>
                  <Input placeholder="999.000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả khóa học</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập mô tả..."
                    {...field}
                    className="h-[250px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh đại diện</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-center h-[250px] bg-white rounded-md border border-gray-200 relative">
                    {/* Lưu ý là do FormControl: nó chỉ để 1 cái thôi */}
                    {!imgWatch ? (
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          console.log("Files: ", res);
                          form.setValue("image", res[0]?.url, { shouldDirty: true, shouldValidate: true } || "");
                        }}
                        onUploadError={(error: Error) => {
                          // Do something with the error.
                          console.log(`ERROR! ${error.message}`);
                        }}
                      />
                    ) : (
                      <Image
                        src={imgWatch}
                        fill
                        alt="image"
                        className="object-contain"
                      ></Image>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="intro_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Youtube URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://youtube.com/axfgdr5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="views"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lượt xem</FormLabel>
                <FormControl>
                  <Input placeholder="1000" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-lg font-bold">
                  Trạng thái *:
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full border outline-none">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent className="outline-none">
                      {courseStatus.map((item) => {
                        return (
                          <SelectItem value={item.value} key={item.value}>
                            {item.title}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-lg font-bold">
                  Trình độ *:
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full border outline-none">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent className="outline-none">
                      {courseLevel.map((item) => {
                        return (
                          <SelectItem value={item.value} key={item.value}>
                            {item.title}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Yêu cầu:</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.requirements.push("");
                      });
                    }}
                  >
                    <IconAdd></IconAdd>
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.requirements.map((item: any, index: any) => {
                      return (
                        <Input
                          type="text"
                          placeholder="Yêu cầu"
                          key={index + 1}
                          value={item}
                          onChange={(e) => {
                            setCourseInfo((draft) => {
                              draft.requirements[index] = e.target.value;
                            });
                          }}
                        />
                      );
                    })}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.benefits"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Lợi ích:</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.benefits.push("");
                      });
                    }}
                  >
                    <IconAdd></IconAdd>
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.benefits.map((item: any, index: any) => {
                      return (
                        <Input
                          key={index + 1}
                          placeholder="Lợi ích"
                          value={item}
                          onChange={(e) => {
                            setCourseInfo((draft) => {
                              draft.benefits[index] = e.target.value;
                            });
                          }}
                        ></Input>
                      );
                    })}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.qa"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Question/Answer</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.qa.push({
                          question: "",
                          answer: "",
                        });
                      });
                    }}
                  >
                    <IconAdd></IconAdd>
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.qa.map((item: any, index: any) => {
                      return (
                        <div className="grid grid-cols-2 gap-5" key={index + 1}>
                          <Input
                            key={index + 1}
                            placeholder="Câu hỏi "
                            value={item.question}
                            onChange={(e) => {
                              setCourseInfo((draft) => {
                                draft.qa[index].question = e.target.value;
                              });
                            }}
                          ></Input>
                          <Input
                            key={index + 1}
                            placeholder="Lợi ích"
                            value={item.answer}
                            onChange={(e) => {
                              setCourseInfo((draft) => {
                                draft.qa[index].answer = e.target.value;
                              });
                            }}
                          ></Input>
                        </div>
                      );
                    })}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          // variant={"primary"}
          className="ml-5 w-[150px]"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Cập nhật khóa học
        </Button>
      </form>
    </Form>
  );
};

export default CourseUpdate;
