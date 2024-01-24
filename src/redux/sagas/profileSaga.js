import {
  call,
  all,
  put,
  select,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";

import request from "utils/request";

import {
  PROFILE_UPDATE,
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  LOAD_PROFILE_INFO,
} from "redux/actions/types";
import { globalActions, profileActions, authActions } from "redux/actions";
import ReactGA from "react-ga4";
import { UPDATE_PROFILE, CHANGE_PASSWORD, CONTESTANT_INFO } from "./endpoints";
import {registrPageView} from "hooks/usePageTracking";
import { authSelectors } from "redux/selectors";

export function* getProfile(token) {
  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };

  const profile = yield call(request, CONTESTANT_INFO, options);
  yield put(profileActions.socialLoginRegistrationComplete({ socialRegComplete: !profile.additionalRegFlag  }))
  ReactGA.set({ user_id: profile.userId});
  return yield profile;
}

function* updateProfile(action) {
  const token = yield select(authSelectors.makeSelectToken());

  const { timezone, ...rest } = action.payload;

  const options = {
    method: "POST",
    body: JSON.stringify({ ...rest, timezone: timezone.value }),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };

  try {
    yield call(request, UPDATE_PROFILE, options);
    registrPageView(action);
    yield put(profileActions.loadProfile());
    yield put(
      globalActions.requestResponseReturned({
        error: null,
        message: "Profile is successfully updated",
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
  yield put(profileActions.profileUpdated());
}

function* changeEmail(action) {
  const token = yield select(authSelectors.makeSelectToken());

  const options = {
    method: "POST",
    body: JSON.stringify({ email: action.payload.newEmail }),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };
  try {
    yield call(request, UPDATE_PROFILE, options);
    registrPageView(action);
    yield put(profileActions.profileUpdated());
    yield put(profileActions.loadProfile());
    yield put(
      globalActions.requestResponseReturned({
        error: null,
        message: "Email is successfully updated",
      })
    );
  } catch (error) {
    const err = yield error.response.json();
    const message =
      error.response.status === 403 ? err.message : "Unable to update email";

    yield put(profileActions.profileUpdated());
    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message,
      })
    );
  }
}

function* loadProfile() {
  const token = yield select(authSelectors.makeSelectToken());
  try {
    const profile = yield getProfile(token);

    yield put(profileActions.profileLoaded(profile));
  } catch (error) {
    const { response } = error;
    if (response && (response.status === 401 || response.status === 419))
      yield put(authActions.sessionExpired());
  }
}

function* changePassword(action) {
  const token = yield select(authSelectors.makeSelectToken());

  const options = {
    method: "POST",
    body: JSON.stringify({ password: action.payload }),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };

  try {
    yield call(request, CHANGE_PASSWORD, options);
    registrPageView(action);
    yield put(profileActions.profileUpdated());
    yield put(
      globalActions.requestResponseReturned({
        error: null,
        message: "Password is successfully updated",
      })
    );
  } catch (error) {
    yield put(profileActions.profileUpdated());
    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message: "Unable to update password",
      })
    );
  }
}

function* updateProfileSaga() {
  yield takeEvery(PROFILE_UPDATE, updateProfile);
}

function* getProfileSaga() {
  yield takeLatest(LOAD_PROFILE_INFO, loadProfile);
}

function* chnageEmailSaga() {
  yield takeEvery(EMAIL_CHANGE, changeEmail);
}

function* chnagePasswordSaga() {
  yield takeEvery(PASSWORD_CHANGE, changePassword);
}

export default function* rootSaga() {
  yield all([
    updateProfileSaga(),
    chnageEmailSaga(),
    chnagePasswordSaga(),
    getProfileSaga(),
  ]);
}
