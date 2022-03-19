import mongoose, { Schema } from 'mongoose';
import { comparePasswords, hashPassword } from '@helpers/password';

export const userSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  this.password = await hashPassword(this.password);
  next();
});

userSchema.methods.isValidPassword = function (password) {
  return comparePasswords(password, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  delete obj.password;
  return obj;
};

const userModel = mongoose.model('User', userSchema);

export default userModel;
