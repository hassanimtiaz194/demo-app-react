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
  SELECT_BRACKET,
  BRACKET_LIST_LOADED,
  LOAD_BRACKET_LIST,
  LOAD_CONTESTANT_FORM,
  CONTESTANT_FORM_TEMPLATE_LOADED,
  SUBMISSION_PERMISSION_LOADED,
  CONTESTANT_FORM_TEMPLATE_ENTRY,
  CONTESTANT_FORM_TEMPLATE_ENTRY_LOADING,
  CONTESTANT_FORM_TEMPLATE_ENTRY_EXIST,
  CONTESTANT_FORM_TEMPLATE_ENTRY_RELOAD_FILE_UPLOAD,
  SET_CMS_MESSAGES
} from "./types";

export function selectBracket(bracketId) {
  return {
    type: SELECT_BRACKET,
    payload: bracketId,
  };
}

export function bracketListLoaded(brackets) {
  return {
    type: BRACKET_LIST_LOADED,
    payload: brackets,
  };
}

export function loadBracketList() {
  return {
    type: LOAD_BRACKET_LIST,
  };
}

export function loadContestantFormTemplate(bracketId, phaseNumber) {
  return {
    type: LOAD_CONTESTANT_FORM,
    payload: { bracketId, phaseNumber },
  };
}

export function contestantFormTemplateLoaded(contestantFormTemplate) {
  return {
    type: CONTESTANT_FORM_TEMPLATE_LOADED,
    payload: contestantFormTemplate,
  };
}

export function submissionPermissionLoaded(response) {
  return {
    type: SUBMISSION_PERMISSION_LOADED,
    payload: response,
  };
}

export function contestantFormTemplateEntry(response) {
  return {
    type: CONTESTANT_FORM_TEMPLATE_ENTRY,
    payload: response,
  };
}
export function contestantFormTemplateEntryLoading(response) {
  return {
    type: CONTESTANT_FORM_TEMPLATE_ENTRY_LOADING,
    payload: response,
  };
}
export function contestantFormTemplateEntryExist(response) {
  return {
    type: CONTESTANT_FORM_TEMPLATE_ENTRY_EXIST,
    payload: response,
  };
}
export function contestantFormTemplateEntryReloadFileUpload(response) {
  return {
    type: CONTESTANT_FORM_TEMPLATE_ENTRY_RELOAD_FILE_UPLOAD,
    payload: response,
  };
}

export function setCMSMessages(payload) {
  return {
    type: SET_CMS_MESSAGES,
    payload,
  };
}