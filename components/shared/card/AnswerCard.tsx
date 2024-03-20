import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";
import Metric from "../Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { title } from "process";

interface Props {
  _id: string;
  clerkId: string | null;
  question: { _id: string; title: string };
  author: { _id: string; name: string; picture: string };
  upvotes: string[];
  createdAt: Date;
}

const AnswerCard = ({
  _id,
  clerkId,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${question?._id}/#${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </Link>
        </div>
      </div>
      {/* If signed in, add edit delete actions */}

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <div>
          <Metric
            imgUrl={author.picture}
            alt="user"
            value={author.name}
            title={` - asked ${getTimestamp(createdAt)}`}
            href={`/profile/${author._id}`}
            isAuthor
            textStyles="body-medium text-dark400_light700"
          ></Metric>
        </div>
        <div className="flex gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          ></Metric>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
