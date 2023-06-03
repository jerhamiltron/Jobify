import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide a position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },

    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship', 'remote'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please pvoide user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', jobSchema);
