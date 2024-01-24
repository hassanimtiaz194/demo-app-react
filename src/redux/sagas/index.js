import { all } from "redux-saga/effects";

import authSaga from "./authSaga";
import contestantFormTemplateSaga from "./contestantFormTemplateSaga";
import contestantFormSaga from "./contestantFormSaga";
import profileSaga from "./profileSaga";
import initAppSaga from "./initAppSaga";
import commonApiSaga from "./commonApiSaga";
import dashboardSaga from "./dashboardSaga";
import teamSaga from "./teamSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    contestantFormTemplateSaga(),
    contestantFormSaga(),
    profileSaga(),
    initAppSaga(),
    commonApiSaga(),
    dashboardSaga(),
    teamSaga(),
  ]);
}
