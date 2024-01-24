import { call, put, all, select, takeLatest } from "redux-saga/effects";

import {
    contestantFormTemplateActions,
    contestantFormActions,
    authActions,
    globalActions,
    commonApiActions,
} from "redux/actions";
import { LOAD_BRACKET_LIST, LOAD_CONTESTANT_FORM } from "redux/actions/types";

import {
    BRACKETS,
    CONTESTANT_FORM,
    SUBMISSION_CMS_LIST_ENDPOINT,
    SUBMISSION_ENTRY_ENDPOINT,
} from "./endpoints";
import request from "utils/request";

import { authSelectors } from "redux/selectors";

function* getBrackets() {
    const token = yield select(authSelectors.makeSelectToken());
    const URL = BRACKETS;

    const options = {
        method: "GET",
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }),
    };

    try {
        const { bracketList } = yield call(request, URL, options);
        yield put(contestantFormTemplateActions.bracketListLoaded(bracketList));
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

function* getSubmissionEntry(action) {
    const token = yield select(authSelectors.makeSelectToken());
    const { bracketId, phaseNumber } = action.payload;

    const params = new URLSearchParams({
        phaseNumber,
        bracket: bracketId,
    }).toString();

    const URL = `${SUBMISSION_ENTRY_ENDPOINT}?${params}`;

    const options = {
        method: "GET",
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }),
    };

    try {
        const entry = yield call(request, URL, options);
        return yield entry;
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

function* getCMSMessages(token, phase) {
    const options = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    };
  
    try {
      const params = new URLSearchParams({
        phaseNumber: phase,
      }).toString();
      let { cmsList } = yield call(
        request,
        `${SUBMISSION_CMS_LIST_ENDPOINT}?${params}`,
        options
      );
      yield put(contestantFormTemplateActions.setCMSMessages(cmsList[0]?.currCmsVersion?.inlineCopy));
    } catch (error) {
      const err = yield error?.response?.json();
      console.log('Please check Timeline')
    }
  }

function* getContestantFormTemplate(action) {
    const token = yield select(authSelectors.makeSelectToken());

    const { bracketId, phaseNumber } = action.payload;
    const params = new URLSearchParams({
        phaseNumber: phaseNumber,
        bracket: bracketId,
    }).toString();
    yield getCMSMessages(token, phaseNumber)
    const URL = `${CONTESTANT_FORM}?${params}`;

    const options = {
        method: "GET",
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }),
    };

    try {
        yield put(
            contestantFormTemplateActions.contestantFormTemplateEntryLoading(
                true
            )
        );
        const contestantFormTemplate = yield call(request, URL, options);
        if (contestantFormTemplate) {
            yield put(
                contestantFormTemplateActions.contestantFormTemplateEntryExist(
                    true
                )
            );
            const { canSubmitEntry, disableForm } = contestantFormTemplate;
            yield put(
                contestantFormTemplateActions.submissionPermissionLoaded({
                    canSubmitEntry,
                })
            );
            const submissionRes = yield getSubmissionEntry(action);
            let entry;
            if (submissionRes && submissionRes.success) {
                const { planList } = submissionRes;
                entry = planList.find((plan) => {
                    return plan.phaseNumber === phaseNumber && plan.bracketId === bracketId;
                });
            }

            if (submissionRes && submissionRes.success && disableForm === true) {
                const { planList } = submissionRes;
                entry = planList.find((plan) => {
                    return plan.bracketId === bracketId;
                });
            }

            yield put(
                contestantFormActions.initFormFields(contestantFormTemplate, entry)
            );
            yield put(
                contestantFormTemplateActions.contestantFormTemplateLoaded(
                    contestantFormTemplate
                )
            );

            const params = new URLSearchParams({
                "phaseNumber": phaseNumber,
                "bracket": bracketId,
            }).toString();
            const URL2 = `${SUBMISSION_ENTRY_ENDPOINT}?${params}`;
            const options2 = {
                method: "GET",
                headers: new Headers({
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }),
            };
            const res = yield call(request, URL2, options2);
            yield put(
                contestantFormTemplateActions.contestantFormTemplateEntry(res)
            )
            yield put(
                contestantFormTemplateActions.contestantFormTemplateEntryLoading(
                    false
                )
            );
        } else {
            yield put(
                contestantFormTemplateActions.contestantFormTemplateEntryExist(
                    false
                )
            );
            yield put(
                contestantFormTemplateActions.contestantFormTemplateEntryLoading(
                    false
                )
            );
        }
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

function* getBracketsSaga() {
    yield takeLatest(LOAD_BRACKET_LIST, getBrackets);
}

function* getContestantFormTemplateSaga() {
    yield takeLatest(LOAD_CONTESTANT_FORM, getContestantFormTemplate);
}

export default function* rootSaga() {
    yield all([getBracketsSaga(), getContestantFormTemplateSaga()]);
}