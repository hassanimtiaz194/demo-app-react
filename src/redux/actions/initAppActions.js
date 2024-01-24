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

import { APP_INITIALIZED, INIT_APP } from "./types";

export function initApp() {
  return {
    type: INIT_APP,
  };
}

export function appInitialized(token, hasOldExpiredSession) {
  return {
    type: APP_INITIALIZED,
    payload: { token, hasOldExpiredSession },
  };
}
