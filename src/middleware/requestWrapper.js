import createError from 'http-errors';

import * as statusCodes from '@constants/statusCodes';

const requestWrapper = (callbackFunc) => async (req, res, next) => {
  try {
    await callbackFunc(req, res, next);
  } catch (error) {
    if (createError.isHttpError(error)) {
      return next(error);
    }
    return next(createError(statusCodes.HTTP_SERVER_ERROR, error));
  }
};

export default requestWrapper;
