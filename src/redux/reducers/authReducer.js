import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_ERROR,
  RESET_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  PROFILE_INFO_LOADED,
  APP_INITIALIZED,
  SESSION_EXPIRED,
  SESSION_LOGOUT,
  SOCIAL_LOGIN_REGISTRATION_COMPLETE
} from "../actions/types";

export const initialState = {
  token: null,
  email: null,
  userId: null,
  forgotPasswordResponse: null,
  resetPasswordResponse: null,
  user: null,
  error: null,
  isSessionExpired: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_INITIALIZED:
      if (action.payload.hasOldExpiredSession) {
        return {
          ...initialState,
        };
      }
      return state;
    case SESSION_EXPIRED:
      return { ...state, isSessionExpired: true };
    case LOGIN_USER:
      return {
        ...state,
        user: null,
      };
    case PROFILE_INFO_LOADED:
      return {
        ...state,
        email: action.payload.email,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
        userId: action.payload.userId,
        isAuthenticated: true,
        error: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordResponse: action.payload,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordResponse: action.payload,
      };
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      return {
        ...state,
        error: action.payload,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    case SESSION_LOGOUT:
      return {
        token: null,
        email: null,
        userId: null
      }

    default:
      return state;
  }
};

export default authReducer;
