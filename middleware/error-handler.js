import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
  // console.error(err);

  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again later',
  };

  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // defaultError.msg = err.message;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
  }

  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )}, please choose another value`;
  }

  res.status(defaultError.statusCode).json({
    status: 'fail',
    message: defaultError.msg,
  });
};

export default errorHandler;
