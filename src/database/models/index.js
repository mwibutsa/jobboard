import { connectDb } from '@dbConfig';

connectDb();

export { default as JobModel } from './Job';
export { default as JobApplicationModel } from './JobApplication';
export { default as UserModel } from './User';
