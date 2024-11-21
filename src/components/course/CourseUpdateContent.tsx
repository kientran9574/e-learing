/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { MouseEvent, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassNames } from "@/constants";
import IconEdit from "@/icons/IconEdit";
import IconDelete from "@/icons/IconDelete";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createLecture, updateLecture } from "@/lib/actions/lectures.action";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ILecture } from "@/database/lecture.model";
import { useImmer } from "use-immer";
import IconCheck from "@/icons/IconCheck";
import IconCancel from "@/icons/IconCancel";
import { cn } from "@/lib/utils";
import { TCourseUpdateParams, TUpdateCourseLecture } from "@/types";
import { createLesson, updateLesson } from "@/lib/actions/lessons.action";
import { ILesson } from "@/database/lesson.model";
import slugify from "slugify";
import LessonItemUpdate from "../lesson/LessonItemUpdate";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdIndex, setLectureIdIndex] = useState("");
  const [lessonsEdit, setLessonsEdit] = useState("");
  const [lessonsIdIndex, setLessonsIdIndex] = useState("");
  const lectures = course.lectures;
  const handleAddLecture = async () => {
    try {
      const res = await createLecture({
        title: "Chương mới",
        course: course._id,
        order: lectures.length + 1,
        path: `manage/course/update-content?slug=${course.slug}`,
      });
      if (res) {
        toast.success("Tạo chương học thành công");
      }
    } catch (error) {
      console.log("🚀 ~ handleAddLecture ~ error:", error);
    }
  };
  const handleDeleteLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async () => {
        const res = await updateLecture({
          lectureId,
          updateData: {
            _destroy: true,
            path: `manage/course/update-content?slug=${course.slug}`,
          },
        });
        if (res) {
          toast.success("Xóa chương thành công");
        }
      });
    } catch (error) {
      console.log("🚀 ~ handleDeleteLecture ~ error:", error);
    }
  };
  const handleUpdateLecture = async (
    e: React.MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    lectureId: string
  ) => {
    e.stopPropagation();
    console.log(lectureEdit);
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
          path: `manage/course/update-content?slug=${course.slug}`,
        },
      });
      if (res) {
        toast.success("Cập nhật chương học thành công");
        setLectureEdit("");
        setLectureIdIndex("");
      }
    } catch (error) {
      console.log("🚀 ~ CourseUpdateContent ~ error:", error);
    }
  };
  const handleAddLesson = async (lectureId: string, courseId: string) => {
    try {
      const res = await createLesson({
        lecture: lectureId,
        course: courseId,
        path: `/manage/course/update-content?slug=${course.slug}`,
        title: "Tiêu đề bài học mới",
        slug: `tieu-de-bai-hoc-moi-${new Date()
          .getTime()
          .toString()
          .slice(-3)}`,
      });
      if (res?.success) {
        toast.success("Thêm bài học mới thành công!");
        return;
      }
      toast.error("Thêm bài học mới thất bại!");
    } catch (error) {}
  };
  const handleUpdateLessons = async (
    e: React.MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    lessonId: string
  ) => {
    try {
      const res = await updateLesson({
        lessonId: lessonId,
        path: `/manage/course/update-content?slug=${course.slug}`,
        updateData: {
          title: lessonsEdit,
          slug: slugify(lessonsEdit, {
            locale: "vi",
            lower: true,
            remove: /[*+~.()'"!:@]/g,
          }),
        },
      });
      if (res?.success) {
        toast.success("Thêm bài học mới thành công!");
        setLessonsEdit("");
        setLessonsIdIndex("");
        return;
      }
    } catch (error) {}
  };
  // Nhớ thứ 5 làm chức năng xóa nhé
  return (
    <div className="p-5">
      <div className="flex flex-col gap-5">
        {lectures.map((item: TUpdateCourseLecture) => {
          return (
            <div className="flex flex-col gap-5" key={item._id}>
              <Accordion type="single" collapsible={Boolean(!lectureIdIndex)}>
                <AccordionItem value={item._id}>
                  <AccordionTrigger>
                    <div className="flex items-center w-full justify-between pr-5 gap-3">
                      {item._id === lectureIdIndex ? (
                        <>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex-grow pr-5">
                              <Input
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                }}
                                onChange={(e) => {
                                  setLectureEdit(e.target.value);
                                }}
                                placeholder="Tên chương..."
                                defaultValue={item.title}
                              ></Input>
                            </div>
                            <div className="flex gap-3">
                              <IconCheck
                                className={cn(
                                  commonClassNames.action,
                                  "text-green-500"
                                )}
                                onClick={(e) =>
                                  handleUpdateLecture(e, item._id)
                                }
                              ></IconCheck>
                              <IconCancel
                                className={cn(
                                  commonClassNames.action,
                                  "text-red-500"
                                )}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLectureIdIndex("");
                                }}
                              ></IconCancel>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="">{item.title}</div>
                          <div className="flex gap-2">
                            <span
                              className={cn(
                                commonClassNames.action,
                                "text-yellow-500"
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                setLectureIdIndex(item._id);
                              }}
                            >
                              <IconEdit></IconEdit>
                            </span>
                            <div
                              typeof="button"
                              onClick={(e) => handleDeleteLecture(e, item._id)}
                              className={cn(
                                commonClassNames.action,
                                "text-red-500"
                              )}
                            >
                              <IconDelete></IconDelete>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-none">
                    {item.lessons.map((lesson: ILesson, index) => {
                      return (
                        <Accordion
                          type="single"
                          collapsible={!lessonsIdIndex}
                          key={lesson._id}
                        >
                          <AccordionItem value={lesson._id}>
                            <AccordionTrigger>
                              <div className="flex items-center w-full justify-between pr-5 gap-3">
                                {" "}
                                {lesson._id === lessonsIdIndex ? (
                                  <>
                                    <div className="flex items-center justify-between w-full">
                                      <div className="flex-grow pr-5">
                                        <Input
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                          }}
                                          onChange={(e) => {
                                            setLessonsEdit(e.target.value);
                                          }}
                                          placeholder="Tên chương..."
                                          defaultValue={lesson.title}
                                        ></Input>
                                      </div>
                                      <div className="flex gap-3">
                                        <IconCheck
                                          className={cn(
                                            commonClassNames.action,
                                            "text-green-500"
                                          )}
                                          onClick={(e) =>
                                            handleUpdateLessons(e, lesson._id)
                                          }
                                        ></IconCheck>
                                        <IconCancel
                                          className={cn(
                                            commonClassNames.action,
                                            "text-red-500"
                                          )}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setLessonsIdIndex("");
                                          }}
                                        ></IconCancel>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="">{lesson.title}</div>
                                    <div className="flex gap-2">
                                      <span
                                        className={cn(
                                          commonClassNames.action,
                                          "text-yellow-500"
                                        )}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setLessonsIdIndex(lesson._id);
                                        }}
                                      >
                                        <IconEdit></IconEdit>
                                      </span>
                                      <div
                                        typeof="button"
                                        // onClick={(e) =>
                                        //   handleDeleteLessons(e, lesson._id)
                                        // }
                                        className={cn(
                                          commonClassNames.action,
                                          "text-red-500"
                                        )}
                                      >
                                        <IconDelete></IconDelete>
                                      </div>
                                    </div>
                                  </>
                                )}{" "}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <LessonItemUpdate
                                lesson={lesson}
                              ></LessonItemUpdate>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button
                className="block ml-auto w-fit"
                onClick={() => handleAddLesson(item._id, course._id)}
              >
                Thêm bài học mới
              </Button>
            </div>
          );
        })}
      </div>

      <Button className="mt-5" onClick={handleAddLecture}>
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
