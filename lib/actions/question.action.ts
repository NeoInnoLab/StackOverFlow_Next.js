"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";

export async function createQuestion(params: any) {
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

    // Create tags if they don't exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, // find a document with that filter; "i" means case insensitive
        { $setOnInsert: { name: tag }, $push: { question: question._id } }, // document to insert when nothing was found
        { upsert: true, new: true } // upsert - insert the document if it does not exist; new - return the modified document rather than the original
      );

      tagDocuments.push(existingTag._id);
    }

    // Update tags to question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask_question action

    // Increment author's reputation by +5 for creating a question
  } catch (error) {}
}
