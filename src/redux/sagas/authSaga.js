import { call, put, all, select, takeEvery, takeLatest } from "redux-saga/effects";

import request from "utils/request";
import { authActions, profileActions, globalActions } from "redux/actions";
import {
  LOGIN_USER,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  APP_LOGOUT,
  SOCIAL_LOGIN_USER,
} from "redux/actions/types";

import { LOGIN_ENDPOINT, FORGOT_ENDPOINT, RESET_ENDPOINT, LOGOUT_ENDPOINT, SOCIAL_LOGIN_ENDPOINT } from "./endpoints";

import { initAppSelectors, authSelectors } from "redux/selectors";
import { getProfile } from "./profileSaga";
import { standardRoutes } from "routes";
import ReactGA from "react-ga4";


function* loginUser(action) {
  const level1Token = yield select(initAppSelectors.makeSelectInitAppToken());

  // eslint-disable-next-line no-unused-vars
  const { username, password, remember } = action.payload;
  const URL = LOGIN_ENDPOINT;
  const options = {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${level1Token}`,
      contestantPassword: password,
      contestantEmail: username,
    }),
  };

  try {
    const { token, email, userId, temporaryPasswordFlag, legacyUrl } = yield call(
      request,
      URL,
      options
    );

    if (legacyUrl && legacyUrl != null) {
      window.location.replace(legacyUrl);
      return;
    }


    ReactGA.set({ user_id: userId, skild_id: userId });
    // Check if the password is temporary then force the user to reset it
    if (temporaryPasswordFlag) {
      return yield put(
        authActions.logout(
          `/${standardRoutes.resetPassword.path}?token=${token}`
        )
      );
    }

    const profile = yield getProfile(token);
    // Check if email is not verified then log out and return to the relevant page
    if (profile && !profile.emailVerifyStatus)
      return yield put(
        authActions.logout(
          `/${standardRoutes.notVerified.path}?email=${profile.email}`
        )
      );
    yield put(profileActions.profileLoaded(profile));
    yield put(authActions.loginSuccess(token, email, userId));
  } catch (error) {
    const err = yield error.response.json();
    yield put(authActions.loginError(err));
  }
}

function* loginUserSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
}

function* resetPassword(action) {
  const { password, token } = action.payload;

  const URL = `${RESET_ENDPOINT}`;

  const options = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify({
      newPassword: password,
    }),
  };

  try {
    const res = yield call(request, URL, options);
    yield put(authActions.resetPasswordSuccess(res));
  } catch (error) {
    yield error.response.json();

    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message: "Unable to update password",
      })
    );
    yield put(authActions.resetPasswordSuccess({ success: null }));
  }
}

function* resetPasswordSaga() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

function* forgotPassword(action) {
  const level1Token = yield select(initAppSelectors.makeSelectInitAppToken());

  const email = action.payload;
  const params = new URLSearchParams({
    contestantEmail: email,
  }).toString();

  const URL = `${FORGOT_ENDPOINT}?${params}`;

  const options = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${level1Token}`,
    }),
  };

  try {
    const res = yield call(request, URL, options);
    yield put(authActions.forgotPasswordSuccess(res));
  } catch (error) {
    const err = yield error.response.json();
    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message: err.message,
      })
    );
    yield put(authActions.forgotPasswordSuccess({ success: null }));
  }
}

function* appLogout() {
  const token = yield select(authSelectors.makeSelectToken());

  const options = {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };

  try {
    const res = yield call(request, LOGOUT_ENDPOINT, options);
    yield put(
      globalActions.requestResponseReturned({
        error: null,
        message: 'Logged Out Successfully',
      })
    );

  } catch (error) {
    const err = yield error.response.json();
    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message: err.message,
      })
    );
  }
}

function* socialLoginUser(action) {
  const level1Token = yield select(initAppSelectors.makeSelectInitAppToken());
  const { contestantEmail, firstName, lastName, profilePicture, provider } = action.payload;
  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${level1Token}`,
      "Content-Type": "application/json",
      contestantEmail,
      firstName,
      lastName: lastName === undefined ?  'Doe' : lastName,
      profilePicture,
    }),
  };
  const params = new URLSearchParams({
    provider
  }).toString();

  const URL = `${SOCIAL_LOGIN_ENDPOINT}?${params}`;

  try {
    const res = yield call(request, URL, options);

    if (res.legacyUrl && res.legacyUrl != null && res.legacyUrl !== '') {
      window.location.replace(res.legacyUrl);
      return;
    }


    ReactGA.set({ user_id: res.userId, skild_id: res.userId });
    //Check if the password is temporary then force the user to reset it
    if (res.temporaryPasswordFlag) {
      return yield put(
        authActions.logout(
          `/${standardRoutes.resetPassword.path}?token=${res.token}`
        )
      );
    }

    const profile = yield getProfile(res.token);
    // Check if email is not verified then log out and return to the relevant page
    if (profile && !profile.emailVerifyStatus)
      return yield put(
        authActions.logout(
          `/${standardRoutes.notVerified.path}?email=${profile.email}`
        )
      );
    yield put(profileActions.profileLoaded(profile));
    yield put(authActions.loginSuccess(res.token, res.email, res.userId));
  } catch (error) {
    const err = yield error.response.json();
    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message: err.message,
      })
    );
  }
}

function* forgotPasswordSaga() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}
function* appLogoutSaga() {
  yield takeLatest(APP_LOGOUT, appLogout);
}
function* socialLoginUserSaga() {
  yield takeLatest(SOCIAL_LOGIN_USER, socialLoginUser);
}
export default function* rootSaga() {
  yield all([loginUserSaga(), forgotPasswordSaga(), resetPasswordSaga(), appLogoutSaga(), socialLoginUserSaga()]);
}
