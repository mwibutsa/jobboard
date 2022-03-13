import jsonResponse from '@helpers/jsonResponse';
import { verifyToken } from '@helpers/jwt';
import * as statusCodes from '@constants/statusCodes';

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void} -
 */
const isAuthenticated = (req, res, next) => {
  let token = req.headers['x-token'];

  if (token) {
    token = String(token).replace('Bearer ', '');
    const decodedToken = verifyToken(token);
    if (decodedToken.id) {
      req.currentUserId = decodedToken.id;
      return next();
    }
  }

  return jsonResponse({ status: statusCodes.HTTP_UNAUTHORIZED, message: 'Please login first', res });
};

export default isAuthenticated;
