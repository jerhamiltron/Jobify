import { StatusCodes } from 'http-status-codes';
import Job from '../models/Job.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

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
  await res.send('Delete job');
};

export const getAllJobs = async (req, res) => {
  await res.send('Get all jobs');
};

export const updateJob = async (req, res) => {
  await res.send('Update job');
};

export const showStats = async (req, res) => {
  await res.send('Show stats');
};
