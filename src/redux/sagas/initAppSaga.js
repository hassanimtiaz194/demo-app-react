import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";

import { call, put, select, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import {
  initAppActions,
  commonApiActions,
  profileActions,
  dashboardActions,
  globalActions,
} from "redux/actions";
import { INIT_APP } from "redux/actions/types";
import {
  INIT_ENDPOINT,
  EVENT_INFO_ENDPOINT,
  CURRENT_PHASE_ENDPOINT,
  TIMELINE_ENDPOINT,
  CMS_LIST_ENDPOINT,
} from "./endpoints";
import { getProfile } from "./profileSaga";
import { authSelectors, commonApiSelectors } from "redux/selectors";
import { USER_REGISTRATION_PAGE_STATUS } from "typedefs/contestantFormTemplate.typedef";

// Init Google Analytics
function initGa(gaId, competitionName) {
  ReactGA.initialize(gaId, { debug: process.env.NODE_ENV === "development" });
  ReactGA.set({ dimension1: competitionName });
}

function initGA4(measurementId) {
  ReactGA.initialize(measurementId);
  console.log('GA4 initialized with ID ' + measurementId);
}

// Init Google Tag Manager
function initGoogleTagManager(gTagManagerId) {
  TagManager.initialize({
    gtmId: gTagManagerId,
  });
}

function* getEventInfo(level1Token) {
  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${level1Token}`,
      "Content-Type": "application/json",
    }),
  };

  try {
    return yield call(request, EVENT_INFO_ENDPOINT, options);
  } catch (error) {
    const err = yield error.response.json();
    console.error(err);
  }
}

function* getCurrentPhase(level1Token) {
  const { phaseList } = yield select(commonApiSelectors.makeSelectFullTimeLine());
  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${level1Token}`,
      "Content-Type": "application/json",
    }),
  };

  try {
    const currentPhase = yield call(request, CURRENT_PHASE_ENDPOINT, options);
    yield put(dashboardActions.currentPhaseLoaded(currentPhase));

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

function* getGeneralData(level1Token) {
  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${level1Token}`,
      "Content-Type": "application/json",
    }),
  };

  try {
    const timeline = yield call(request, TIMELINE_ENDPOINT, options);
    yield put(commonApiActions.timelineLoaded(timeline));

    const regStatus = yield select(commonApiSelectors.makeSelectRegStatus());

    if (regStatus !== USER_REGISTRATION_PAGE_STATUS.REGISTRATION_STARTED) {
      const params = new URLSearchParams({
        cmsName:
          regStatus === USER_REGISTRATION_PAGE_STATUS.REGISTRATION_NOT_STARTED
            ? USER_REGISTRATION_PAGE_STATUS.REGISTRATION_NOT_STARTED_MESSAGE
            : USER_REGISTRATION_PAGE_STATUS.REGISTRATION_IS_ENDED_MESSAGE,
      }).toString();
      let { cmsList } = yield call(
        request,
        `${CMS_LIST_ENDPOINT}?${params}`,
        options
      );
      yield put(commonApiActions.cmsListLoaded(cmsList));
    }

  } catch (error) {
    const err = yield error.response.json();
    console.log('Please check Timeline')
  }
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function* initApp() {
  /**
   * Below hardcoded username password pair will be replaced
   * with secret+token mechanism in the future
   */
  const username = process.env.REACT_APP_USER_ID;
  const password = process.env.REACT_APP_PASSWORD;

  const URL = INIT_ENDPOINT;

  const options = {
    method: "POST",
    body: JSON.stringify({
      userId: username,
      password: password,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  };




  const tokenLevel2 = yield select(authSelectors.makeSelectToken());

  try {
    const { token, legacyUrl } = yield call(request, URL, options);
    const res = yield getEventInfo(token);

    var cookieStr = getCookie("eventId");

    if (cookieStr !== "") {
      window.location.replace(legacyUrl);
      return;
    }


    yield getGeneralData(token);
    yield getCurrentPhase(token);

    const { gaId, gtmId, ga4MeasurementId, eventAlias, eventName, eventId } = res;
    ReactGA.set({ eventId: eventId, eventAlias: eventAlias, eventName: eventName });

    if (ga4MeasurementId) {
      initGA4(ga4MeasurementId);
    }

    if (gtmId) {
      initGoogleTagManager(gtmId);
    }

    let hasOldExpiredSession = false;
    if (tokenLevel2) {
      try {
        const profile = yield getProfile(tokenLevel2);
        yield put(profileActions.profileLoaded(profile));
      } catch (error) {
        // This means the token is expired
        hasOldExpiredSession = true;
      }
    }

    yield put(commonApiActions.eventInfoLoaded(res));
    yield put(initAppActions.appInitialized(token, hasOldExpiredSession));
  } catch (error) {
    yield error.response.json();
  }
}

function* initAppSaga() {
  yield takeEvery(INIT_APP, initApp);
}

export default initAppSaga;
