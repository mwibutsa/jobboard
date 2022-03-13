import { v2 } from 'cloudinary';
import 'dotenv/config';

const { COUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
v2.config({
  cloud_name: String(COUDINARY_CLOUD_NAME),
  api_key: String(CLOUDINARY_API_KEY),
  api_secret: String(CLOUDINARY_API_SECRET),
});
const uploadFile = (file) =>
  new Promise((resolve, reject) => {
    v2.uploader.upload(file.tempFilePath, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

export default uploadFile;
