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
  EVENT_INFO_LOADED,
  UI_INFO_LOADED,
  LOAD_UI_INFO,
  TIMELINE_LOADED,
  UPLOAD_FILE,
  CMS_LIST_LOADED,
  SET_INVITATION_CODE,
  REMOVE_UPLOADED_FILE,
  JUDGES_COMMENTS,
  SET_JUDGES_COMMENTS,
  UPLOAD_CONTESTANT_PHOTO,
  UPLOAD_CONTESTANT_PHOTO_PROGRESS_START,
  UPLOAD_CONTESTANT_PHOTO_PROGRESS_DONE,
  UPLOAD_CONTESTANT_PHOTO_UPLOADED,
  TRANSCODER_JOB_STATUS,
  SET_TRANSCODER_JOB_STATUS,
  DELETE_TRANSCODER_JOB_STATUS,
  SET_CMS_MESSAGES,
} from "./types";

export function eventInfoLoaded(event) {
  return {
    type: EVENT_INFO_LOADED,
    payload: event,
  };
}

export function loadUiInfo() {
  return {
    type: LOAD_UI_INFO,
  };
}

export function uiInfoLoaded(uiInfo) {
  return {
    type: UI_INFO_LOADED,
    payload: uiInfo,
  };
}

export function timelineLoaded(timeline) {
  return {
    type: TIMELINE_LOADED,
    payload: timeline,
  };
}

export function cmsListLoaded(cmsList) {
  return {
    type: CMS_LIST_LOADED,
    payload: cmsList,
  };
}

export function uploadFile(payload) {
  return {
    type: UPLOAD_FILE,
    payload,
  };
}
export function uploadContestantPhoto(payload) {
  return {
    type: UPLOAD_CONTESTANT_PHOTO,
    payload,
  };
}

export function uploadContestantPhotoProgressStart() {
  return {
    type: UPLOAD_CONTESTANT_PHOTO_PROGRESS_START,
  };
}

export function uploadContestantPhotoProgressDone(payload) {
  return {
    type: UPLOAD_CONTESTANT_PHOTO_PROGRESS_DONE,
    payload
  };
}
export function profilePictureUploaded(payload) {
  return {
    type: UPLOAD_CONTESTANT_PHOTO_UPLOADED,
    payload
  };
}

export function removeUploadedFile(file) {
  return {
    type: REMOVE_UPLOADED_FILE,
    payload: file,
  };
}
export function judgesComments(planId) {
  return {
    type: JUDGES_COMMENTS,
    payload: planId,
  };
}
export function setjudgesComments(comments) {
  return {
    type: SET_JUDGES_COMMENTS,
    payload: comments,
  };
}
export function setInvitationCode(payload) {
  return {
    type: SET_INVITATION_CODE,
    payload,
  };
}

export function transcoderJobStatus(payload) {
  return {
    type: TRANSCODER_JOB_STATUS,
    payload,
  };
}

export function setTranscoderJobStatus(payload) {
  return {
    type: SET_TRANSCODER_JOB_STATUS,
    payload,
  };
}

export function deleteTranscoderJobStatus() {
  return {
    type: DELETE_TRANSCODER_JOB_STATUS,
  };
}
