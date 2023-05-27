import React, { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import Loading from './Loading.js';
import Job from './Job.js';
import Wrapper from '../assets/wrappers/JobsContainer.js';

const JobsContainer = () => {
  const { getJobs, jobs, isLoading, page, totalJobs } = useAppContext();

  useEffect(() => {
    getJobs();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
        <p>Create a job to see further information</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job {jobs.length > 1 && `'s`} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {/* pagination buttons */}
    </Wrapper>
  );
};

export default JobsContainer;
