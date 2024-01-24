import { createSelector } from "reselect";
import { initialState } from "../reducers";

const selectInitAppState = state => (state || initialState).init;

const makeSelectInitApp = () =>
  createSelector(selectInitAppState, initApp => initApp);

const makeSelectInitAppToken = () =>
  createSelector(selectInitAppState, initApp => initApp.token);

const makeSelectIsInitialized = () =>
  createSelector(selectInitAppState, initApp => initApp.isInitialized);

export default {
  makeSelectInitApp,
  makeSelectInitAppToken,
  makeSelectIsInitialized
};
