import { Request, Response, NextFunction } from "express";
import topicService from "../../services/topicService";
import { StatusCodes } from "http-status-codes";

// [GET] /api/v1/topic
export const getTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const topics = await topicService.getAllTopic(req.body);

    res.status(StatusCodes.OK).json(topics);
  } catch (error) {
    next(error);
  }
};
