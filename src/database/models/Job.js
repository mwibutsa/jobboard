import mongoose, { Schema } from 'mongoose';

const jobSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  payRange: {
    type: String,
    required: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const jobModel = mongoose.model('Job', jobSchema);

export default jobModel;
