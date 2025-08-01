import { Request } from "express";
import Topic from "../models/topicModel";

const getAllTopic = async (reqBody: Request) => {
  try {
    const topics = await Topic.find({
      deleted: false,
    });

    return topics;
  } catch (error) {
    throw new Error(error);
  }
};

const topicService = {
  getAllTopic: getAllTopic,
};

export default topicService;
