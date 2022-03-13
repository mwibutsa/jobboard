import { HTTP_OK } from '@constants/statusCodes';

/**
 * @param  {Object} data
 * @param  {ServerResponse} res
 * @return {Response} Response
 */
const jsonResponse = ({ status = HTTP_OK, res, data, ...otherData }) =>
  res.status(status).json({
    status,
    data,
    ...otherData,
  });

export default jsonResponse;
