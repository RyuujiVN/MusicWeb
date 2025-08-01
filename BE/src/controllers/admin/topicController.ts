import { Request, Response } from "express";

const getTopic = async (req: Request, res: Response, next): Promise<void> => {
  try {
    res.send("Hello World");
  } catch (error) {
    next(error);
  }
};

const topicController = {
  getTopic: getTopic
}

export default topicController
