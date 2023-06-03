import { StatusCodes } from 'http-status-codes';
import Job from '../models/Job.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';

export const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Please provide all values');
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId} was found`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.deleteOne();

  res.status(StatusCodes.OK).json({ msg: 'Job deleted successfully' });
};

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

export const updateJob = async (req, res) => {
  const { id: jobId } = req.params;

  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError('Please provide all values');
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId} was found`);
  }

  // check permissions
  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  // Used if you need some type of hook to update - Similar to the pre save hook issue
  // job.position = position;
  // job.company = company;

  // await job.save();

  res.status(StatusCodes.OK).json({ updatedJob });
};

export const showStats = async (req, res) => {
  await res.send('Show stats');
};
