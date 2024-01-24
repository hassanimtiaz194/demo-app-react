import { createSelector } from "reselect";
import { initialState } from "../reducers";

const selectProfileState = state => (state || initialState).profile;

const makeSelectProfile = () =>
  createSelector(selectProfileState, profileState => profileState.profile);

const makeSelectProfileLoading = () =>
  createSelector(selectProfileState, profileState => profileState.loading);

const makeSelectSocialRegComplete = () =>
  createSelector(selectProfileState, profileState => profileState.socialRegComplete);

export default {
  makeSelectProfile,
  makeSelectProfileLoading,
  makeSelectSocialRegComplete
};
