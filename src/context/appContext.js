import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

import reducer from './reducer';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  TOGGLE_SIDEBAR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from './actions';

// eslint-disable-next-line
const user = localStorage.getItem('user');
// eslint-disable-next-line
const userLocation = localStorage.getItem('location');

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  showSidebar: false,
  alertText: '',
  alertType: '',
  user: null,
  userLocation: '',
  jobLocation: '',
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  //job location
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios  - Global setup - would be used on all axios requests and would send bearer token
  // axios.defaults.headers['Authorization'] = `Bearer ${state.token}`;

  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  // Interceptors request - used in authFetch , but could be used directly in axios (see docs)
  // <------> Not needed since token is coming from cookie
  // authFetch.interceptors.request.use(
  //   (config) => {
  //     config.headers['Authorization'] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  // interceptors response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log('AUTH ERROR');
        setTimeout(() => {
          logoutUser();
        }, 3000);
      }

      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
      const { user, location } = data;

      dispatch({ type: SETUP_USER_SUCCESS, payload: { user, location, alertText } });
    } catch (err) {
      dispatch({ type: SETUP_USER_ERROR, payload: { msg: err.response.data.message } });
    }
    clearAlert();
  };

  const logoutUser = async () => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });

    try {
      // const headerConfig = { headers: { Authorization: `Bearer ${state.token}` } };

      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          user,
          location,
          alertType: 'success',
          alertText: 'User updated successfully',
        },
      });
    } catch (err) {
      if (err.response.status !== 401) {
        dispatch({ type: UPDATE_USER_ERROR, payload: { msg: err.response.data.message } });
      }
    }
    clearAlert();
  };

  // Handle changes for job inputs
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  // Job actions
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.post('/jobs', {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({ type: CREATE_JOB_ERROR, payload: { msg: error.response.data.message } });
    }
    clearAlert();
  };

  const getJobs = async () => {
    // will add pagination later

    const { page, search, searchStatus, searchType, sort } = state;
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

    if (search) url += `&search=${search}`;

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      // console.log(data);
      dispatch({ type: GET_JOBS_SUCCESS, payload: { jobs, totalJobs, numOfPages } });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({ type: EDIT_JOB_ERROR, payload: { msg: error.response.data.message } });
    }
    clearAlert();
  };

  const deleteJob = async (id) => {
    dispatch({ type: DELETE_JOB_BEGIN, payload: { id } });
    try {
      await authFetch.delete(`/jobs/${id}`);
      getJobs();
      // dispatch({ type: DELETE_JOB_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      // logoutUser();
      dispatch({ type: DELETE_JOB_ERROR, payload: { msg: error.response.data.message } });
    }
    clearAlert();
  };

  // Stats actions
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/jobs/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: { stats: data.defaultStats, monthlyApplications: data.monthlyApplications },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  // Change Page
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  // Get Current User
  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });

    try {
      const { data } = await authFetch('/auth/getCurrentUser');
      const { user, location } = data;

      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user, location } });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  // <------------------->

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        logoutUser,
        toggleSidebar,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
