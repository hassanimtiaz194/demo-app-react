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
  END_GLOBAL_PROGRESS,
  START_GLOBAL_PROGRESS,
  REQUEST_RESPONSE_RETURNED,
} from "./types";

export function startGlobalProgress() {
  return {
    type: START_GLOBAL_PROGRESS,
  };
}

export function endGlobalProgress() {
  return {
    type: END_GLOBAL_PROGRESS,
  };
}

/**
 *
 * @param {import("../../typedefs/contestantFormTemplate.typedef").RequestResponse} response
 */
export function requestResponseReturned(response) {
  return {
    type: REQUEST_RESPONSE_RETURNED,
    payload: response,
  };
}
