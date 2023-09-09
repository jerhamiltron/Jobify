import express from 'express';

const router = express.Router();

import {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobsController.js';
import testUser from '../middleware/testUser.js';

router.route('/').get(getAllJobs).post(testUser, createJob);
router.route('/stats').get(showStats);
router.route('/:id').patch(testUser, updateJob).delete(testUser, deleteJob);

export default router;
