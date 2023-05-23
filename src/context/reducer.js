import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
} from './actions';

import { initialState } from './appContext';

const reducer = (state, action) => {
  // Alert actions

  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    };
  }

  if (action.type === CLEAR_ALERT) {
    return { ...state, showAlert: false, alertType: '', alertText: '' };
  }

  // Setup actions

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  // Logout actions

  if (action.type === LOGOUT_USER) {
    return { ...initialState, user: null, token: null, userLocation: '', jobLocation: '' };
  }

  // Application Actions

  if (action.type === TOGGLE_SIDEBAR) {
    return { ...state, showSidebar: !state.showSidebar };
  }

  throw new Error(`No such action ${action.type}`);
};

export default reducer;
