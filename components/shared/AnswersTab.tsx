import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswerCard from "./card/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId: string | null;
}
const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const results = await getUserAnswers({ userId, page: 1 });

  return (
    <>
      {results.answers.map((item) => (
        <AnswerCard
          key={item._id}
          _id={item._id}
          clerkId={clerkId}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes}
          createdAt={item.createdAt}
        />
      ))}
    </>
  );
};

export default AnswersTab;
