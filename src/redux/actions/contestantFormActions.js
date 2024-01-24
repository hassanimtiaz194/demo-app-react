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
  // eslint-disable-next-line no-unused-vars
  ContestantForm,
  // eslint-disable-next-line no-unused-vars
  ContestantFormTemplate,
  // eslint-disable-next-line no-unused-vars
  ContestantFormFieldAnswer,
  // eslint-disable-next-line no-unused-vars
  SectionList,
} from "../../typedefs/contestantFormTemplate.typedef";

import {
  CONTESTANT_FORM_UPDATE_FIELD,
  CONTESTANT_FORM_INIT,
  CONTESTANT_FORM_PLANID,
  CONTESTANT_FORM_SUBMIT,
  CONTESTANT_FORM_SUBMITTED,
  CONTESTANT_FORM_SAVE,
  CONTESTANT_FORM_SAVED,
  CONTESTANT_FORM_UNSUBMIT,
  CONTESTANT_FORM_UNSUBMITTED,
  DOWNLOAD_FORM,
  FORM_DOWNLOADED,
  CONTESTANT_FORM_UPLOAD_PHOTO_PROGRESS,
  CONTESTANT_FORM_UPLOAD_PHOTO_DONE,
  FORM_HAS_BEEN_DOWNLOADED,
  DOWNLOAD_FORM_RESPONSE,
  RESET_DOWNLOAD_FORM_RESPONSE,
} from "./types";

/**
 * Update form field action
 * @typedef {Object} UpdateFormFieldAction
 * @property {string} type
 * @property {ContestantFormFieldAnswer} payload
 */

/**
 * Initi form fields action
 * @typedef {Object} InitFormFieldsAction
 * @property {string} type
 * @property {ContestantFormTemplate} payload
 */

/**
 * Submit contestant form action
 * @typedef {Object} SubmitFormFieldsAction
 * @property {string} type
 * @property {ContestantForm} payload
 */

/**
 * General action
 * @typedef {Object} GeneralAction
 * @property {string} type
 * @property {any} payload
 */

/**
 *
 * @param {ContestantFormFieldAnswer} fieldAnswer
 * @returns {UpdateFormFieldAction}
 */
export function updateFormField(fieldAnswer) {
  return {
    type: CONTESTANT_FORM_UPDATE_FIELD,
    payload: fieldAnswer,
  };
}

/**
 *
 * @param {ContestantFormTemplate} contestantFormTemplate
 * @returns {InitFormFieldsAction}
 */
export function initFormFields(template, entry) {
  return {
    type: CONTESTANT_FORM_INIT,
    payload: { template, entry },
  };
}

/**
 *
 * @param {ContestantForm} contestantForm
 * @returns {SubmitFormFieldsAction}
 */
export function submitForm() {
  return {
    type: CONTESTANT_FORM_SUBMIT,
  };
}

/**
 *
 * @param {ContestantForm} contestantForm
 */
export function saveForm() {
  return {
    type: CONTESTANT_FORM_SAVE,
  };
}

/**
 *
 * @param {any} response
 * @returns {GeneralAction}
 */
export function contestantFormSubmitted(response) {
  return {
    type: CONTESTANT_FORM_SUBMITTED,
    payload: response,
  };
}

/**
 *
 * @returns {GeneralAction}
 */
export function contestantFormUnSubmitted() {
  return {
    type: CONTESTANT_FORM_UNSUBMITTED,
  };
}

/**
 *
 * @param {any} response
 * @returns {GeneralAction}
 */
export function contestantFormSaved() {
  return {
    type: CONTESTANT_FORM_SAVED,
  };
}

/**
 *
 * @returns {GeneralAction}
 */
export function contestantFormUploadPhotoDone() {
  return {
    type: CONTESTANT_FORM_UPLOAD_PHOTO_DONE,
  };
}

/**
 *
 * @param {number} sectionId
 * @param {number} progress - Percentage
 * @returns {GeneralAction}
 */
export function contestantFormUploadPhotoProgress(sectionId, progress) {
  return {
    type: CONTESTANT_FORM_UPLOAD_PHOTO_PROGRESS,
    payload: {
      sectionId,
      progress,
    },
  };
}

/**
 *
 * @param {any} response
 * @returns {GeneralAction}
 */
export function unsubmitForm() {
  return {
    type: CONTESTANT_FORM_UNSUBMIT,
  };
}

/**
 *
 * @param {any} response
 * @returns {GeneralAction}
 */
export function downloadForm() {
  return {
    type: DOWNLOAD_FORM,
  };
}

export function contestantFormDownloaded(payload) {
  return {
    type: FORM_DOWNLOADED,
    payload,
  };
}
export function downloadFormResponse(payload) {
  return {
    type: DOWNLOAD_FORM_RESPONSE,
    payload,
  };
}
export function resetDownloadResponse() {
  return {
    type: RESET_DOWNLOAD_FORM_RESPONSE,
  };
}

export function formHasBeenDownloaded() {
  return {
    type: FORM_HAS_BEEN_DOWNLOADED,
  };
}

export function entryPlanId(planId) {
  return {
    type: CONTESTANT_FORM_PLANID,
    payload: planId,
  };
}