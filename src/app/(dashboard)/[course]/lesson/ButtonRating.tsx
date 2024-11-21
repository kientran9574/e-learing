"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ratingList } from "@/constants";
import IconStar from "@/icons/IconStar";
import { createRating } from "@/lib/actions/rating.actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ButtonRating = ({
  data,
}: {
  data: {
    userId: string;
    courseId: string;
  };
}) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingContent, setRatingContent] = useState("");
  const [modelRating, setModelRating] = useState(false);
  const handleRatingCourse = async () => {
    const _data = await createRating({
      content: ratingContent,
      rate: ratingValue,
      user: data.userId,
      course: data.courseId,
    });
    if (_data?.success) {
      toast.success("Đánh giá khóa học thành công");
      setRatingValue(0);
      setRatingContent("");
      setModelRating(false);
    }
  };
  return (
    <Dialog open={modelRating} onOpenChange={() => setModelRating(true)}>
      <DialogTrigger asChild>
        <Button
          className="hover:bg-primary hover:text-white shadow"
          variant={"outline"}
        >
          <IconStar></IconStar>
          Đánh giá khóa học
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Đánh giá</DialogTitle>
          <DialogDescription>
            Tôi rất vui lòng khi nhận được những đánh giá từ bạn!
            <div className="flex justify-between gap-5 my-5">
              {ratingList.map((rating) => {
                return (
                  <button
                    key={rating.value}
                    className="flex flex-col gap-3 text-center text-xs items-center"
                    type="button"
                    onClick={() => {
                      setRatingValue(rating.value);
                    }}
                  >
                    <span
                      className={cn(
                        "flex items-center justify-center size-10 rounded-full bg-gray-200",
                        ratingValue === rating.value &&
                          "bg-primary transition-colors"
                      )}
                    >
                      <Image
                        src={`/rating/${rating.title}.png`}
                        alt={rating.title}
                        width={20}
                        height={20}
                      ></Image>
                    </span>
                    <strong className="capitalize">{rating.title}</strong>
                  </button>
                );
              })}
            </div>
          </DialogDescription>
          <Textarea
            className="w-full h-[200px] resize-none"
            placeholder="Cảm nhận của bạn về khóa học này"
            onChange={(e) => setRatingContent(e.target.value)}
          ></Textarea>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-primary"
            onClick={() => handleRatingCourse()}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonRating;
