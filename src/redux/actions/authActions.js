/*
 *
 * Actions change things in the application
 * We have these actions which are the only way the application interacts with
 * the application state. This guarantees that our state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your action type
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOGIN_USER,
  SESSION_EXPIRED,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  REGISTER_ERROR,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  APP_LOGOUT,
  SESSION_LOGOUT,
  SOCIAL_LOGIN_USER,
  SOCIAL_LOGIN_REGISTRATION_COMPLETE
} from "./types";

export function loginUser(username, password, remember) {
  return { type: LOGIN_USER, payload: { username, password, remember } };
}

export function socialLoginUser(contestantEmail, firstName, lastName, profilePicture, provider) {
  return { type:SOCIAL_LOGIN_USER, payload: { contestantEmail, firstName, lastName, profilePicture, provider } };
}

export function sessionExpired() {
  return {
    type: SESSION_EXPIRED,
  };
}

export function registerError(error = {}) {
  return {
    type: REGISTER_ERROR,
    payload: error,
  };
}

export function loginSuccess(token, email, userId) {
  return {
    type: LOGIN_SUCCESS,
    payload: { token, email, userId },
  };
}

export function forgotPassword(email) {
  return {
    type: FORGOT_PASSWORD,
    payload: email,
  };
}

export function forgotPasswordSuccess(res) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: res,
  };
}

export function resetPassword(token, password) {
  return {
    type: RESET_PASSWORD,
    payload: { token, password },
  };
}

export function resetPasswordSuccess(res) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: res,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
}

export function logout(href) {
  return {
    type: LOGOUT,
    payload: href,
  };
}

export function appLogout() {
  return {
    type: APP_LOGOUT,
  };
}

export function sessionLogout() {
  return {
    type: SESSION_LOGOUT,
  };
}



