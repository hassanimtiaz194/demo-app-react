import { createSelector } from "reselect";
import { initialState } from "../reducers";

const selectTeamState = (state) => (state || initialState).team;

const makeSelectTeam = () =>
  createSelector(selectTeamState, (teamState) => teamState.team);

const makeSelectTeamLoading = () =>
  createSelector(selectTeamState, (teamState) => teamState.loading);

const makeSelectTeamErrorMessage = () =>
  createSelector(selectTeamState, (teamState) => teamState.errorMessage);

const makeSelectTeamIsMemberAdded = () =>
  createSelector(selectTeamState, (teamState) => teamState.isMemberAdded);

const teamSelectors = {
  makeSelectTeam,
  makeSelectTeamLoading,
  makeSelectTeamErrorMessage,
  makeSelectTeamIsMemberAdded,
};
export default teamSelectors;
