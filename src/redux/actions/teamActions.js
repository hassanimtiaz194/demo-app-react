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
  LOAD_TEAM_INFO,
  TEAM_INFO_LOADED,
  UPDATE_TEAM,
  TEAM_UPDATED,
  ADD_TEAM_MEMBER,
  TEAM_MEMBER_ADDED,
  TEAM_DATA_ERROR,
  RESEND_INVITATION,
  DELETE_TEAM_MEMBER,
  MAKE_TEAM_LEADER,
  CHANGE_TEAM_NAME_DESCRIPTION
} from "./types";

/**
 * Init form fields action
 * @typedef {Object} TeamAction
 * @property {string} type
 * @property {*} payload
 */

/**
 *
 * @returns {TeamAction}
 */
export function loadTeamInfo() {
  return {
    type: LOAD_TEAM_INFO,
  };
}

/**
 *
 * @param {*} team
 * @returns {TeamAction}
 */
export function teamInfoLoaded(team) {
  return {
    type: TEAM_INFO_LOADED,
    payload: team,
  };
}

/**
 *
 * @param {*} teamWithUpdatedFields
 * @returns {TeamAction}
 */
export function updateTeam(teamWithUpdatedFields) {
  return {
    type: UPDATE_TEAM,
    payload: teamWithUpdatedFields,
  };
}

/**
 *
 * @returns {TeamAction}
 */
export function teamUpdated() {
  return {
    type: TEAM_UPDATED,
  };
}

/**
 *
 * @param {*} member
 * @returns {TeamAction}
 */
export function addTeamMember(member) {
  return {
    type: ADD_TEAM_MEMBER,
    payload: member,
  };
}

/**
 *
 * @returns {TeamAction}
 */
export function teamMemberAdded() {
  return {
    type: TEAM_MEMBER_ADDED,
  };
}

/**
 * @param {string} errorMessage
 * @returns {TeamAction}
 */
export function teamDataError(errorMessage) {
  return {
    type: TEAM_DATA_ERROR,
    payload: errorMessage,
  };
}

/**
 * @param {string} userId
 * @returns {TeamAction}
 */
export function resendTeamMemberInvitation(userId) {
  return {
    type: RESEND_INVITATION,
    payload: userId,
  };
}

/**
 * @param {string} memberEmail
 * @returns {TeamAction}
 */
export function deleteTeamMember(memberEmail) {
  return {
    type: DELETE_TEAM_MEMBER,
    payload: memberEmail,
  };
}

/**
 * @param {string} email
 * @returns {TeamAction}
 */
export function makeTeamLeader(email) {
  return {
    type: MAKE_TEAM_LEADER,
    payload: email,
  };
}

export function changeTeamNameDescription(teamName) {
  return {
    type: CHANGE_TEAM_NAME_DESCRIPTION,
    payload: teamName,
  };
}

