import { call, all, select, put, takeLatest, take } from "redux-saga/effects";
import request/* ,{requestAwait} */ from "utils/request";
import ReactGA from "react-ga4";
import {
  SUBMISSION_ENTRY_ENDPOINT,
  UNSUBMIT_ENDPOINT,
  DOWNLOAD_FORM_ENDPOINT,
} from "./endpoints";

import {
  CONTESTANT_FORM_SAVE,
  CONTESTANT_FORM_SUBMIT,
  CONTESTANT_FORM_UNSUBMIT,
  DOWNLOAD_FORM,
} from "redux/actions/types";

import { contestantFormActions, globalActions } from "redux/actions";
/* import { registerEvent, useGAEventsTracker } from "hooks/usePageTracking"; */
import {
  authSelectors,
  dashboardSelectors,
  contestantFormSelectors,
  contestantFormTemplateSelectors,
} from "redux/selectors";
import { getFileNameFromDisposition } from "../../utils/helpers";

const { createObjectURL } = URL;

function* downloadForm() {
  const planId = yield select(
    contestantFormSelectors.makeSelectContestantFormPlanId()
  );

  const phaseNumber = yield select(
    dashboardSelectors.makeSelectCurrentPhaseNumber()
  );

  const bracketId = yield select(
    contestantFormTemplateSelectors.makeSelectContestantFormTemplateSelectedBracketId()
  );

  const token = yield select(authSelectors.makeSelectToken());

  const params = new URLSearchParams({
    bracket: bracketId,
    planId,
  }).toString();

  const URL = `${DOWNLOAD_FORM_ENDPOINT}?${params}`;
  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };

  try {
    yield put(
      contestantFormActions.formHasBeenDownloaded()
    );
    let fileNumber = Math.floor(Math.random() * 100);
    const DEFAULT_FILENAME = `Phase${phaseNumber}Entry` /* + fileNumber */;
    const res = yield call(fetch, URL, options)
    const disposition = res.headers.get("content-disposition");
    const filename = getFileNameFromDisposition(disposition) || DEFAULT_FILENAME;
    const blob = yield res.blob()
    const url = createObjectURL(blob);
    yield put(
      contestantFormActions.contestantFormDownloaded({ filename, url })
    );
    yield put(
      contestantFormActions.downloadFormResponse(res)
    );

  } catch (error) {
    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message: "Unable to download",
      })
    );
  }
}

function* saveContestantForm() {
  const phaseNumber = yield select(
    dashboardSelectors.makeSelectCurrentPhaseNumber()
  );
  const form = yield select(contestantFormSelectors.makeSelectContestantForm());

  const { entry } = yield select(contestantFormTemplateSelectors.makeSelectContestantFormTemplate());
  const excludedSectionIds = form?.answerList?.map(obj => obj.sectionId);
  if (entry["planList"] !== undefined) {
    const hiddenValue = entry.planList[0].contentList.filter((obj) => {
      return !excludedSectionIds.includes(obj.sectionId);
    });
    const extractedAnswer = hiddenValue.map(obj => {
      return {
        sectionId: obj.sectionId,
        answer: obj.answer
      };
    });
    if (extractedAnswer.length !== 0) {
      const combinedAnswerlist = form.answerList.concat(extractedAnswer);
      const uniqueAnswerList = combinedAnswerlist.reduce((uniqueList, obj) => {
        const existingObj = uniqueList.find(item => item.sectionId === obj.sectionId);
        if (!existingObj) {
          uniqueList.push(obj);
        }
        return uniqueList;
      }, []);
      form.answerList = uniqueAnswerList;
    }
  }

  const token = yield select(authSelectors.makeSelectToken());

  const options = {
    method: "POST",
    body: JSON.stringify({ ...form, phaseNumber }),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };

  try {
    const res = yield call(request, SUBMISSION_ENTRY_ENDPOINT, options);
    yield put(contestantFormActions.contestantFormSaved(res));
  } catch (error) {
    console.log("unable to save form");
  }
}

export function* submitContestantForm() {
  const phaseNumber = yield select(
    dashboardSelectors.makeSelectCurrentPhaseNumber()
  );

  const form = yield select(contestantFormSelectors.makeSelectContestantForm());

  const { entry } = yield select(contestantFormTemplateSelectors.makeSelectContestantFormTemplate());
  const excludedSectionIds = form?.answerList?.map(obj => obj.sectionId);
  if(entry["planList"] !== undefined) {
    const hiddenValue = entry.planList[0].contentList.filter((obj) => {
      return !excludedSectionIds.includes(obj.sectionId);
    });
    const extractedAnswer = hiddenValue.map(obj => {
      return {
        sectionId: obj.sectionId,
        answer: obj.answer
      };
    });
    if (extractedAnswer.length !== 0) {
      const combinedAnswerlist = form.answerList.concat(extractedAnswer);
      const uniqueAnswerList = combinedAnswerlist.reduce((uniqueList, obj) => {
        const existingObj = uniqueList.find(item => item.sectionId === obj.sectionId);
        if (!existingObj) {
          uniqueList.push(obj);
        }
        return uniqueList;
      }, []);
      form.answerList = uniqueAnswerList;
    }
  }

  const token = yield select(authSelectors.makeSelectToken());

  const options = {
    method: "POST",
    body: JSON.stringify({ ...form, phaseNumber, submitted: true }),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };

  const res = yield call(request, SUBMISSION_ENTRY_ENDPOINT, options);
  yield put(contestantFormActions.entryPlanId(res.planId));
  return yield res;
}

function* submitContestantFormAndNotify() {
  try {
    const res = yield submitContestantForm();
    yield put(contestantFormActions.contestantFormSubmitted(res));
    yield put(
      globalActions.requestResponseReturned({
        message: "Entry successfully submitted",
      })
    );
  } catch (error) {
    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message: "Unable to submit",
      })
    );
    yield put(contestantFormActions.contestantFormSubmitted({}));
  }
}

function* unsubmitContestantForm() {
  const planId = yield select(
    contestantFormSelectors.makeSelectContestantFormPlanId()
  );

  const phaseNumber = yield select(
    dashboardSelectors.makeSelectCurrentPhaseNumber()
  );

  const form = yield select(contestantFormSelectors.makeSelectContestantForm());
  const token = yield select(authSelectors.makeSelectToken());

  const params = new URLSearchParams({
    planId: planId,
  }).toString();

  const options = {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };

  const URL = `${UNSUBMIT_ENDPOINT}?${params}`;

  try {
    const res = yield call(request, URL, options);
    yield put(contestantFormActions.contestantFormUnSubmitted(res));
  } catch (error) {
    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message: "Unable to un-submit the entry",
      })
    );
  }
}

function* saveContestantFormSaga() {
  yield takeLatest(CONTESTANT_FORM_SAVE, saveContestantForm);
}

function* submitContestantFormSaga() {
  yield takeLatest(CONTESTANT_FORM_SUBMIT, submitContestantFormAndNotify);
}

function* unsubmitContestantFormSaga() {
  yield takeLatest(CONTESTANT_FORM_UNSUBMIT, unsubmitContestantForm);
}

function* downloadFormSaga() {
  yield takeLatest(DOWNLOAD_FORM, downloadForm);
}

export default function* rootSaga() {
  yield all([
    saveContestantFormSaga(),
    submitContestantFormSaga(),
    unsubmitContestantFormSaga(),
    downloadFormSaga(),
  ]);
}
