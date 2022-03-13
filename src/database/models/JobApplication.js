import mongoose, { Schema } from 'mongoose';
import * as applicationStatus from '@constants/jobApplicationStatus';

const jobApplicationSchema = Schema({
  job: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Job',
  },
  cvFile: {
    type: String,
    required: true,
  },
  applicant: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  status: {
    type: String,
    required: true,
    default: applicationStatus.PENDING,
  },
});

jobApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true });
const jobApplicationModel = mongoose.model('JobApplication', jobApplicationSchema);

export default jobApplicationModel;
