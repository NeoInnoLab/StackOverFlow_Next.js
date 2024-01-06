import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import Filter from "@/components/shared/search/Filter";
import Link from "next/link";
import { HomePageFilters } from "@/constants/filters";
import HomeFilter from "@/components/home/HomeFilter";
import NoResult from "@/components/shared/search/NoResult";
import QuestionCard from "@/components/shared/card/QuestionCard";

const questions = [
  {
    _id: "1",
    title: "Cascading Deletes in SQLAlchemy",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "3",
      name: "John Doe",
      picture: "url/to/picture.jpg",
    },
    upvotes: 10,
    answers: [],
    views: 10000,
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How to center a div",
    tags: [
      { _id: "4", name: "css" },
      { _id: "5", name: "html" },
    ],
    author: {
      _id: "6",
      name: "John Doe",
      picture: "url/to/another-picture.jpg",
    },
    upvotes: 15,
    answers: [],
    views: 120553,
    createdAt: new Date("2021-09-02T12:30:00.000Z"),
  },
];
export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link className="flex justify-end max-sm:w-full" href="/ask-question">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder=""
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title=" There's no quesiton to show"
            description="Be the first to break the silence! 🚀 Ask a Question and 
            kickstart the discussion. our query could be the next big thing others learn from. Get
            i nvolved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
