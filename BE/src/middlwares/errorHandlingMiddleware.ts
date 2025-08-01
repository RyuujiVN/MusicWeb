import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

const errorHandlingMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Nếu thiếu status code thì mặc định là 500
  if (!err.statusCode) {
    err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack,
  };

  res.status(err.statusCode).json(responseError);
};

export default errorHandlingMiddleware;
