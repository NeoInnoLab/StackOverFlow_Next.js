import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const RightSidebar = () => {
  const hotQuestions = [
    { _id: "1", text: "How to get started with React?" },
    { _id: "2", text: "How to get started with React?" },
    { _id: "3", text: "How to get started with React?" },
    { _id: "4", text: "How to get started with React?" },
    { _id: "5", text: "How to get started with React?" },
  ];

  const tags = [
    { _id: "1", name: "React", totalQuestions: 2 },
    { _id: "2", name: "JavaScripts", totalQuestions: 4 },
    { _id: "3", name: "Next.js", totalQuestions: 7 },
    { _id: "4", name: "Career", totalQuestions: 8 },
    { _id: "5", name: "Tailwind", totalQuestions: 3 },
  ];

  return (
    <section
      className="background-light900_dark200 light-border custom-scrollbar sticky 
    right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto 
    border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden"
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.text}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              ></Image>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {tags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
