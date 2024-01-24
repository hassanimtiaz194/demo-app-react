import { createSelector } from "reselect";
import { initialState } from "../reducers";

const selectAuthState = (state) => (state || initialState).auth;

const makeSelectAuth = () =>
  createSelector(selectAuthState, (authState) => authState);

const makeSelectToken = () =>
  createSelector(selectAuthState, (auth) => auth.token);

const makeSelectRegistrationForm = () =>
  createSelector(selectAuthState, (auth) => auth.registrationForm);
const makeSelectForgotPasswordResponse = () =>
  createSelector(selectAuthState, (auth) => auth.forgotPasswordResponse);
const makeSelectResetPasswordResponse = () =>
  createSelector(selectAuthState, (auth) => auth.resetPasswordResponse);
const makeSelectAuthError = () =>
  createSelector(selectAuthState, (auth) => auth.error);
const makeSelectIsSessionExpired = () =>
  createSelector(selectAuthState, (auth) => auth.isSessionExpired);

const makeSelectEmail = () =>
  createSelector(selectAuthState, (auth) => auth.email);
const makeSelectUserId = () =>
  createSelector(selectAuthState, (auth) => auth.userId);

const authSelectors = {
  makeSelectAuth,
  makeSelectToken,
  makeSelectRegistrationForm,
  makeSelectForgotPasswordResponse,
  makeSelectResetPasswordResponse,
  makeSelectAuthError,
  makeSelectEmail,
  makeSelectUserId,
  makeSelectIsSessionExpired,
};

export default authSelectors;
