import { createSelector } from "reselect";
import { initialState } from "../reducers";

const selectCommonApiState = (state) => (state || initialState).commonApi;

const makeSelectEventInfo = () =>
  createSelector(
    selectCommonApiState,
    (selectCommonApiState) => selectCommonApiState.event
  );

const makeSelectUiInfo = () =>
  createSelector(
    selectCommonApiState,
    (selectCommonApiState) => selectCommonApiState.uiInfo
  );

const makeSelectRegStatus = () =>
  createSelector(
    selectCommonApiState,
    (selectCommonApiState) => selectCommonApiState.registrationStatus
  );

const makeSelectFullTimeLine = () =>
  createSelector(
    selectCommonApiState,
    (selectCommonApiState) => selectCommonApiState.fullTimeline
  );

const makeSelectRegistrationNotStartedMessage = () =>
  createSelector(
    selectCommonApiState,
    (selectCommonApiState) => selectCommonApiState.registrationNotStartedMessage
  );

const makeSelectRegistrationIsEndedMessage = () =>
  createSelector(
    selectCommonApiState,
    (selectCommonApiState) => selectCommonApiState.registrationIsEndedMessage
  );

const makeSelectJudgesComments = () =>
  createSelector(selectCommonApiState, (selectCommonApiState) => {
    return selectCommonApiState.judgesComments;
  });


const makeSelectCanTeamMembersInvite = () =>
  createSelector(makeSelectEventInfo(), (selectCommonApiState) => {
    return selectCommonApiState.teamMembersCanInvite;
  });

const makeSelectContestantProfilePhotoProgress = () =>
  createSelector(
    selectCommonApiState,
    (selectCommonApiState) => selectCommonApiState.photoUploadProgress
  );
const makeSelectContestantProfilePhotoUploaded = () =>
  createSelector(
    selectCommonApiState,
    (selectCommonApiState) => selectCommonApiState.ProfilePictureUploaded
  );
const makeSelectTranscoderJobStatus = () =>
  createSelector(
    selectCommonApiState,
    (selectCommonApiState) => selectCommonApiState.trasnCoderJobStatus
  );

export const commonApiSelectors = {
  makeSelectEventInfo,
  makeSelectUiInfo,
  makeSelectRegStatus,
  makeSelectRegistrationNotStartedMessage,
  makeSelectRegistrationIsEndedMessage,
  makeSelectCanTeamMembersInvite,
  makeSelectJudgesComments,
  makeSelectContestantProfilePhotoProgress,
  makeSelectContestantProfilePhotoUploaded,
  makeSelectTranscoderJobStatus,
  makeSelectFullTimeLine,
};

export default commonApiSelectors;
