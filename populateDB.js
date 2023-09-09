import { readFile } from 'fs/promises';

import dotenv from 'dotenv';

dotenv.config();

import connectDB from './db/connect.js';
import Job from './models/Job.js';

const start = async () => {
  try {
    const url = process.env.MONGO_URL.replace('<password>', process.env.MONGO_PASSWORD);
    await connectDB(url);
    // await Job.deleteMany();

    const jsonProducts = JSON.parse(
      await readFile(new URL('./MOCK_DATA_jobify.json', import.meta.url))
    );
    await Job.create(jsonProducts);
    console.log('Success!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
