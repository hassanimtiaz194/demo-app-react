import { createSelector } from "reselect";
import { initialState } from "../reducers";

const selectGlobalState = (state) => (state || initialState).global;

const makeSelectGlobal = () =>
  createSelector(selectGlobalState, (state) => state);

const makeSelectGlobalRequestResponse = () =>
  createSelector(selectGlobalState, (state) => state.requestResponse);

const makeSelectGlobalRequestResponseError = () =>
  createSelector(
    makeSelectGlobalRequestResponse(),
    (requestResponse) => (requestResponse || {}).error
  );

const makeSelectGlobalRequestResponseMessage = () =>
  createSelector(
    makeSelectGlobalRequestResponse(),
    (requestResponse) => (requestResponse || {}).message
  );

const makeSelectGlobalProgressIsLoading = () =>
  createSelector(makeSelectGlobal, (global) => global.isLoading);

export default {
  makeSelectGlobal,
  makeSelectGlobalProgressIsLoading,
  makeSelectGlobalRequestResponse,
  makeSelectGlobalRequestResponseError,
  makeSelectGlobalRequestResponseMessage,
};
