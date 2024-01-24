import { call, put, all, select, takeLatest, takeEvery } from "redux-saga/effects";

import { dashboardActions, authActions, globalActions } from "redux/actions";
import { DOWNLOAD_ENTRY_FILE, DOWNLOAD_MEDIA_FILE, LOAD_DASHBOARD_MSG, LOAD_QUICK_LINKS, LOAD_UNIVERSAL_QUICK_LINKS } from "redux/actions/types";

import { DASHBOARD_MSG_ENDPOINT, ENTRY_DOWNLOAD_MEDIA_FILE_ENDPOINT, QUICK_LINKS_DOWNLOAD_MEDIA_FILE_ENDPOINT, QUICK_LINKS_ENDPOINT } from "./endpoints";
import request, { downloadFile } from "utils/request";

import { authSelectors } from "redux/selectors";


function* getDashboardMsg(action) {
  const token = yield select(authSelectors.makeSelectToken());

  const { phaseNumber, bracketId } = action.payload;
  var params;
  if (bracketId === null && phaseNumber === 0) {
    params = new URLSearchParams({
    }).toString();
  } else if (bracketId === null) {
    params = new URLSearchParams({
      phaseNumber: phaseNumber,
    }).toString();
  } else if (phaseNumber === null) {
    params = new URLSearchParams({
      bracket: bracketId,
    }).toString();
  } else {
    params = new URLSearchParams({
      phaseNumber: phaseNumber,
      bracket: bracketId,
    }).toString();
  }
  let URL = `${DASHBOARD_MSG_ENDPOINT}?${params}`;
  let options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };
  try {
    const response = yield call(request, URL, options);
    yield put(dashboardActions.dashboardMsgLoaded(response));
  } catch (error) {
    // if no dashboard msg display the default msg
    params = new URLSearchParams({
      phaseNumber: 0,
      bracket: '',
    }).toString();
    URL = `${DASHBOARD_MSG_ENDPOINT}?${params}`;
    options = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    };
    try {
      const response = yield call(request, URL, options);
      yield put(dashboardActions.dashboardMsgLoaded(response));
    } catch (error) {
      console.log(error);
    }
  }
}

function* getQuickLinks(action) {
  const token = yield select(authSelectors.makeSelectToken());
  const params = new URLSearchParams({
    bracket: action.payload.bracketId,
    phase: action.payload.phaseNumber,
  }).toString();

  const URL = `${QUICK_LINKS_ENDPOINT}?${params}`;
  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };

  try {
    const { reviewList } = yield call(request, URL, options);
    yield put(dashboardActions.quickLinksLoaded(reviewList));
  } catch (error) {
    const { response } = error;
    const err = yield error.response.json();

    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message: err.message,
      })
    );
    if (response && (response.status === 401 || response.status === 419))
      yield put(authActions.sessionExpired());
  }
}

function* downloadMediaFile(action) {
  const token = yield select(authSelectors.makeSelectToken());
  const { name, orginalFileName } = action.payload;

  const params = new URLSearchParams({
    "fileName": name,
    "originalFileName": orginalFileName,
  }).toString();
  const URL2 = `${QUICK_LINKS_DOWNLOAD_MEDIA_FILE_ENDPOINT}?${params}`;
  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };
  try {
    const res = yield call(fetch, URL2, options)
    if (res.status === 200) {
      const blob = yield res.blob()
      const url = URL.createObjectURL(blob);
      yield call(downloadFile, url, orginalFileName)
    }
  } catch (error) {
    console.log(error);
  }
}


function* downloadEntryFile(action) {
  const token = yield select(authSelectors.makeSelectToken());
  const { name, orginalFileName } = action.payload;

  const params = new URLSearchParams({
    "fileName": name,
    "originalFileName": orginalFileName,
  }).toString();
  const URL2 = `${ENTRY_DOWNLOAD_MEDIA_FILE_ENDPOINT}?${params}`;
  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };
  try {
    const res = yield call(fetch, URL2, options)
    if (res.status === 200) {
      const blob = yield res.blob()
      const url = URL.createObjectURL(blob);
      yield call(downloadFile, url, orginalFileName)
    }
  } catch (error) {
    console.log(error);
  }
}



function* getQuickLinksSaga() {
  yield takeLatest(LOAD_QUICK_LINKS, getQuickLinks);
}

function* downloadMediaFileSaga() {
  yield takeLatest(DOWNLOAD_MEDIA_FILE, downloadMediaFile);
}
function* downloadEntryFileSaga() {
  yield takeLatest(DOWNLOAD_ENTRY_FILE, downloadEntryFile);
}

function* getDashboardMsgSaga() {
  yield takeLatest(LOAD_DASHBOARD_MSG, getDashboardMsg);
}

export default function* rootSaga() {
  yield all([getDashboardMsgSaga(), getQuickLinksSaga(), downloadMediaFileSaga(),downloadEntryFileSaga()]);
}
