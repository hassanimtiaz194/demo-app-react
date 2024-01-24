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
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  PROFILE_UPDATE,
  LOAD_PROFILE_INFO,
  PROFILE_INFO_LOADED,
  PROFILE_INFO_UPDATED,
  SOCIAL_LOGIN_REGISTRATION_COMPLETE
} from "./types";

/**
 * Initi form fields action
 * @typedef {Object} UpdateProfileAction
 * @property {string} type
 * @property {*} payload
 */

/**
 *
 * @param {*} profile
 * @returns {UpdateProfileAction}
 */
export function updateProfile(profile) {
  return {
    type: PROFILE_UPDATE,
    payload: profile
  };
}

/**
 *
 * @param {*} profile
 * @returns {*}
 */
export function loadProfile() {
  return {
    type: LOAD_PROFILE_INFO
  };
}

/**
 *
 * @param {*} profile
 * @returns {*}
 */
export function profileLoaded(profile) {
  return {
    type: PROFILE_INFO_LOADED,
    payload: profile
  };
}

/**
 *
 * @param {*} res
 * @returns {*}
 */
export function profileUpdated() {
  return {
    type: PROFILE_INFO_UPDATED
  };
}

/**
 *
 * @param {*} payload
 * @returns {UpdateProfileAction}
 */
export function changeEmail(payload) {
  return {
    type: EMAIL_CHANGE,
    payload: payload
  };
}

/**
 *
 * @param {*} payload
 * @returns {UpdateProfileAction}
 */
export function changePassword(payload) {
  return {
    type: PASSWORD_CHANGE,
    payload: payload
  };
}

export function socialLoginRegistrationComplete(res) {
  return {
    type: SOCIAL_LOGIN_REGISTRATION_COMPLETE,
    payload: res,
  };
}