"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import {
  GetQuestionsParams,
  CreateQuestionParams,
  GetQuestionByIdParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";

export async function getQuestions(param: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({}) // For question data, MongoDB stored tags and authors by objectId, so we have to use populate() to get the data
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 }); // sort by createdAt in descending order

    return { questions }; // return questions as an object
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  // eslint-disable-next-line no-empty
  try {
    // connect to DB
    connectToDatabase();
    // 'path' is to let Next.js know where to redirect after creating a question
    const { title, content, tags, author, path } = params;

    // create a question
    const question = await Question.create({
      title,
      content,
      // tags,
      author,
      // path,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        // Create tags if they don't exist
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        // find a document with that filter; "i" means case insensitive
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        // document to insert when nothing was found
        { upsert: true, new: true }
        // upsert - insert the document if it does not exist; new - return the modified document rather than the original
      );

      tagDocuments.push(existingTag._id);
    }

    // Update tags to question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // TODO: Create an interaction record for the user's ask_question action
    // TODO: Increment author's reputation by +5 for creating a question
    revalidatePath(path); // revalidate the path
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
