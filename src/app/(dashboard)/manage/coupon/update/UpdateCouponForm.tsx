/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { couponTypes } from "@/constants";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ECouponType } from "@/types/enum";
import { TCouponParams } from "@/types";
import IconCancel from "@/icons/IconCancel";
import { Checkbox } from "@/components/ui/checkbox";
import { getCourseList } from "@/lib/actions/courses.action";
import { ppid } from "process";
import { updateCoupon } from "@/lib/actions/coupon.actions";
import { toast } from "react-toastify";
import InputFormatCurrency from "@/components/ui/input-currency";
const formSchema = z.object({
  title: z.string({
    message: "Tiêu đề không được để trống",
  }),
  code: z
    .string({
      message: "Mã giảm giá không được để trống",
    })
    .min(3, "Mã giảm giá phải có ít nhất 3 ký tự")
    .max(10, "Mã giảm giá không được quá 10 ký tự"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  active: z.boolean().optional(),
  value: z.number().optional(),
  type: z.enum([ECouponType.AMOUNT, ECouponType.PERCENT]),
  courses: z.array(z.string()).optional(),
  limit: z.number().optional(),
});

const UpdateCouponForm = ({ coupon }: { coupon: TCouponParams }) => {
  const [startDate, setStartDate] = useState<Date>(coupon.start_date);
  const [endDate, setEndDate] = useState<Date>(coupon.end_date);
  const [findCourse, setFindCourse] = useState<any[] | undefined>([]);
  const [selectedCourse, setSelectedCourse] = useState<any[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: coupon.title,
      code: coupon.code,
      type: coupon.type,
      active: coupon.active,
      value: coupon.value,
      limit: coupon.limit,
    },
  });
  useEffect(() => {
    setSelectedCourse(coupon.courses);
  }, [coupon.courses]);
  const handleSearchCourse = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const findCourseList = await getCourseList({ search: value });
    setFindCourse(findCourseList);
    if (!value) {
      setFindCourse([]);
    }
  };
  const handleSelectCourse = async (checked: boolean | string, course: any) => {
    if (checked) {
      setSelectedCourse((prev) => [...prev, course]);
    } else {
      setSelectedCourse((prev) =>
        prev.filter((item) => item._id !== course._id)
      );
    }
  };
  const couponTypeWatch = form.watch("type");
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const couponType = values.type;
      if (
        couponType === ECouponType.PERCENT &&
        values?.value &&
        (values?.value > 100 || values?.value < 0)
      ) {
        form.setError("value", {
          message: "Giá trị không hợp lệ",
        });
        return;
      }
      const updatedCoupon = await updateCoupon({
        _id: coupon._id,
        update: {
          ...values,
          start_date: startDate,
          end_date: endDate,
          courses: selectedCourse,
        },
      });
      if (updatedCoupon.code) {
        toast.success("Cập nhật coupon thành công");
        // redirect("/manage/coupon");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
          <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Tiêu đề" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mã giảm giá"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày bắt đầu</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="w-full">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? (
                            format(startDate, "dd/MM/yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus
                          selected={startDate}
                          onSelect={setStartDate as any}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày kết thúc</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="w-full">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? (
                            format(endDate, "dd/MM/yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus
                          selected={endDate}
                          onSelect={setEndDate as any}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại coupon</FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue={ECouponType.PERCENT}
                      className="flex gap-5"
                      onValueChange={field.onChange}
                    >
                      {couponTypes.map((type) => (
                        <div
                          className="flex items-center space-x-2"
                          key={type.value}
                        >
                          <RadioGroupItem value={type.value} id={type.value} />
                          <Label htmlFor={type.value}>{type.title}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá trị</FormLabel>
                  <FormControl>
                    <>
                      {couponTypeWatch === ECouponType.PERCENT ? (
                        <Input
                          type="number"
                          placeholder="50%"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      ) : (
                        <InputFormatCurrency
                          {...field}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /,/g,
                              ""
                            ); // Remove commas
                            const parsedValue = numericValue
                              ? parseInt(numericValue)
                              : 0; // Default to 0 if empty
                            field.onChange(parsedValue);
                          }}
                        />
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <FormControl>
                    <div>
                      <Switch
                        checked={field.value}
                        defaultChecked={true}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng tối đa</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="100"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khóa học</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        placeholder="Tìm kiếm khóa học..."
                        onChange={handleSearchCourse}
                      />
                      {findCourse &&
                        findCourse.length > 0 &&
                        findCourse.map((item, index) => {
                          return (
                            <div className="flex flex-col" key={index + 1}>
                              <Label
                                htmlFor={item.title}
                                className="flex mt-3 items-center gap-3 cursor-pointer"
                              >
                                <Checkbox
                                  checked={selectedCourse.some(
                                    (e) => e._id === item._id
                                  )}
                                  id={item.title}
                                  onCheckedChange={(checked) =>
                                    handleSelectCourse(checked, item)
                                  }
                                ></Checkbox>
                                <span className="text-sm">{item.title}</span>
                              </Label>
                            </div>
                          );
                        })}
                      {selectedCourse &&
                        selectedCourse.length > 0 &&
                        selectedCourse.map((item, index) => {
                          return (
                            <div
                              className="flex !mt-5 items-center gap-3 cursor-pointer"
                              key={index + 1}
                            >
                              <div className="inline-flex items-center gap-2 font-semibold text-sm px-3 py-1 rounded-lg border borderDarkMode bgDarkMode">
                                <span>{item.title}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSelectCourse(false, item)
                                  }
                                >
                                  <IconCancel className="size-5 text-gray-400 hover:text-gray-600"></IconCancel>
                                </button>
                              </div>
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
          <Button className="w-[150px] ml-auto flex">Cập nhật</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateCouponForm;
