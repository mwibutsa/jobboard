import jsonResponse from '@helpers/jsonResponse';
import { generateToken } from '@helpers/jwt';
import * as statusCodes from '@constants/statusCodes';
import uploadFile from '@helpers/cloudinary';
import { UserModel } from '@models';
/**
 * A class to manage user operations
 */
class UserController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async login(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && user.isValidPassword(password)) {
      return jsonResponse({ res, token: generateToken({ id: user.id }) });
    }
    return jsonResponse({ res, message: 'Invalid user credentials', status: statusCodes.HTTP_BAD_REQUEST });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async signUp(req, res) {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    let uploadedFile = null;

    // check user account availability

    const existingUser = await UserModel.find({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      return jsonResponse({
        status: statusCodes.HTTP_CONFLICT,
        message: 'User with the same email/phone number exists',
        res,
      });
    }

    if (req.files) {
      uploadedFile = await uploadFile(req.files.profilePicture);
    }

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      profilePicture: uploadedFile?.url || '',
    });

    return jsonResponse({ status: statusCodes.HTTP_CREATED, res, data: user });
  }
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async getUserProfile(req, res) {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);

    if (user) {
      return jsonResponse({ res, data: user });
    }

    return jsonResponse({ res, status: statusCodes.HTTP_NOT_FOUND, message: 'User not found.' });
  }
}

export default UserController;
