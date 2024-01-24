import { call, all, put, select, takeLatest } from "redux-saga/effects";

import request from "utils/request";
import {registrPageView} from "hooks/usePageTracking";
import {
  ADD_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
  LOAD_TEAM_INFO,
  MAKE_TEAM_LEADER,
  RESEND_INVITATION,
  CHANGE_TEAM_NAME_DESCRIPTION
} from "redux/actions/types";
import { teamActions, authActions, globalActions } from "redux/actions";

import {
  TEAM_INFO_ENDPOINT,
  ADD_TEAM_MEMBER_ENDPOINT,
  DELETE_TEAM_MEMBER_ENDPOINT,
  RESEND_INVITATION_ENDPOINT,
  MAKE_TEAM_LEADER_ENDPOINT,
  UPDATE_TEAM_NAME_DESC_HEADLINE_ENDPOINT
} from "./endpoints";

import { authSelectors } from "redux/selectors";

function* loadTeamInfo() {
  const token = yield select(authSelectors.makeSelectToken());
  try {
    const options = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    };

    const team = yield call(request, TEAM_INFO_ENDPOINT, options);

    yield put(teamActions.teamInfoLoaded(team));
  } catch (error) {
    const { response } = error;
    const { message } = yield response.json();
    if (response && (response.status === 401 || response.status === 419))
      yield put(authActions.sessionExpired());
    yield put(teamActions.teamDataError(message));
  }
}

function* addTeamMember(action) {
  const token = yield select(authSelectors.makeSelectToken());
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    };

    const member = yield call(request, ADD_TEAM_MEMBER_ENDPOINT, options);
    registrPageView(action);
    yield put(teamActions.teamMemberAdded(member));
    yield put(teamActions.loadTeamInfo(member));
    yield put(
      globalActions.requestResponseReturned({
        error: null,
        message: "Team member is successfully added",
      })
    );
  } catch (error) {
    const { response } = error;
    const { message } = yield response.json();
    if (response && (response.status === 401 || response.status === 419))
      yield put(authActions.sessionExpired());
    yield put(teamActions.teamDataError(message));
  }
}

function* deleteTeamMember(action) {
  const token = yield select(authSelectors.makeSelectToken());
  try {
    const options = {
      method: "DELETE",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    };

    const params = new URLSearchParams({
      memberEmail: action.payload,
    }).toString();

    const URL = `${DELETE_TEAM_MEMBER_ENDPOINT}?${params}`;

    const member = yield call(request, URL, options);
    registrPageView(action);
    yield put(teamActions.loadTeamInfo(member));
    yield put(
      globalActions.requestResponseReturned({
        error: null,
        message: "Team member is successfully deleted",
      })
    );
  } catch (error) {
    const { response } = error;
    const { message } = yield response.json();
    if (response && (response.status === 401 || response.status === 419))
      yield put(authActions.sessionExpired());
    yield put(teamActions.teamDataError(message));
  }
}

function* resendTeamMemberInvitation(action) {
  const token = yield select(authSelectors.makeSelectToken());
  try {
    const options = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        userId: action.payload,
      }),
    };

    const member = yield call(request, RESEND_INVITATION_ENDPOINT, options);
    registrPageView(action);
    yield put(teamActions.loadTeamInfo(member));
    yield put(
      globalActions.requestResponseReturned({
        error: null,
        message: "Invitation is successfully sent",
      })
    );
  } catch (error) {
    const { response } = error;
    const { message } = yield response.json();
    if (response && (response.status === 401 || response.status === 419))
      yield put(authActions.sessionExpired());
    yield put(teamActions.teamDataError(message));
  }
}

function* makeTeamLeader(action) {
  const token = yield select(authSelectors.makeSelectToken());
  try {
    const options = {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    };

    const params = new URLSearchParams({
      newLeaderEmail: action.payload,
    }).toString();

    const member = yield call(
      request,
      `${MAKE_TEAM_LEADER_ENDPOINT}?${params}`,
      options
    );
    registrPageView(action);
    yield put(teamActions.loadTeamInfo(member));
    yield put(
      globalActions.requestResponseReturned({
        error: null,
        message: "Team member is successfully updated",
      })
    );
  } catch (error) {
    const { response } = error;
    const { message } = yield response.json();
    if (response && (response.status === 401 || response.status === 419))
      yield put(authActions.sessionExpired());
    yield put(teamActions.teamDataError(message));
  }
}


function* changeTeamNameDescription(action) {
  const { teamName, teamHeadline, teamDescription } = action.payload;
  const token = yield select(authSelectors.makeSelectToken());
  try {
    const body = JSON.stringify({
      "locale": "en",
      "teamName": teamName,
    });

    const options = {
      method: "POST",
      body,
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    };

    const member = yield call(
      request,
      `${UPDATE_TEAM_NAME_DESC_HEADLINE_ENDPOINT}`,
      options
    );
   
    registrPageView(action);

    yield put(teamActions.loadTeamInfo(member));
    yield put(
      globalActions.requestResponseReturned({
        error: null,
        message: "Your team name is updated successfully.",
      })
    );
  } catch (error) {
    const { response } = error;
    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message: "Unable to update team name",
      })
    );
    if (response && (response.status === 401 || response.status === 419))
      yield put(authActions.sessionExpired());;
  }
}

function* makeTeamLeaderSaga() {
  yield takeLatest(MAKE_TEAM_LEADER, makeTeamLeader);
}
function* changeTeamNameDescriptionSaga() {
  yield takeLatest(CHANGE_TEAM_NAME_DESCRIPTION, changeTeamNameDescription);
}

function* deleteTeamMemberSaga() {
  yield takeLatest(DELETE_TEAM_MEMBER, deleteTeamMember);
}

function* resendTeamMemberInvitationSaga() {
  yield takeLatest(RESEND_INVITATION, resendTeamMemberInvitation);
}

function* addTeamMemberSaga() {
  yield takeLatest(ADD_TEAM_MEMBER, addTeamMember);
}

function* loadTeamInfoSaga() {
  yield takeLatest(LOAD_TEAM_INFO, loadTeamInfo);
}

export default function* rootSaga() {
  yield all([
    loadTeamInfoSaga(),
    addTeamMemberSaga(),
    deleteTeamMemberSaga(),
    resendTeamMemberInvitationSaga(),
    makeTeamLeaderSaga(),
    changeTeamNameDescriptionSaga()
  ]);
}
