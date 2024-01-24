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
  LOAD_DASHBOARD_MSG,
  DASHBOARD_MSG_LOADED,
  CURRENT_PHASE_LOADED,
  QUICK_LINKS_LOADED,
  LOAD_QUICK_LINKS,
  DOWNLOAD_MEDIA_FILE,
  DOWNLOAD_ENTRY_FILE,
} from "./types";

export function loadDashboardMsg(bracketId, phaseNumber) {
  return {
    type: LOAD_DASHBOARD_MSG,
    payload: { bracketId, phaseNumber },
  };
}

export function dashboardMsgLoaded(message) {
  return {
    type: DASHBOARD_MSG_LOADED,
    payload: message,
  };
}

export function currentPhaseLoaded(phase) {
  return {
    type: CURRENT_PHASE_LOADED,
    payload: phase,
  };
}

export function loadQuickLinks(bracketId, phaseNumber) {
  return {
    type: LOAD_QUICK_LINKS,
    payload: { bracketId, phaseNumber }
  };
}

export function quickLinksLoaded(links) {
  return {
    type: QUICK_LINKS_LOADED,
    payload: links,
  };
}

export function downloadMediaFile(payload) {
  return {
    type: DOWNLOAD_MEDIA_FILE,
    payload: payload,
  };
}

export function downloadEntryFile(payload) {
  return {
    type: DOWNLOAD_ENTRY_FILE,
    payload: payload,
  };
}
