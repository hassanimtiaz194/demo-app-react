import { createSelector } from "reselect";
import { convertFieldAnswerListToObj } from "../../utils/helpers";
import { initialState } from "../reducers";

const selectContestantFormState = (state) =>
  (state || initialState).contestantForm;

const makeSelectContestantForm = () =>
  createSelector(
    selectContestantFormState,
    (contestantFormState) => contestantFormState
  );

const makeSelectContestantFormSubmissionResponse = () =>
  createSelector(selectContestantFormState, (selectContestantFormState) => {
    return selectContestantFormState.contestantFormSubmissionResponse;
  });

const makeSelectContestantFormPlanId = () =>
  createSelector(selectContestantFormState, (selectContestantFormState) => {
    return selectContestantFormState.planId;
  });

const makeSelectSubmissionDateIfAny = () =>
  createSelector(selectContestantFormState, (selectContestantFormState) => {
    return selectContestantFormState.submissionDate;
  });

const makeSelectEntrySavedId = () =>
  createSelector(
    selectContestantFormState,
    (selectContestantFormState) => selectContestantFormState.entrySavedId
  );

const makeSelectDownloadedForm = () =>
  createSelector(
    selectContestantFormState,
    (selectContestantFormState) => selectContestantFormState.downloadedForm
  );
const makeSelectDownloadFormResponse = () =>
  createSelector(
    selectContestantFormState,
    (selectContestantFormState) => selectContestantFormState.downloadFormResponse
  );

const makeSelectIsValid = (schema) =>
  createSelector(makeSelectContestantForm(), (form) => {
    const answerListObj = convertFieldAnswerListToObj(form.answerList);
    try {
      schema.validateSync(answerListObj);
    } catch (error) {
      // console.error(error);
    }
    return schema.isValidSync(answerListObj);
  });

const makeSelectFileUpload = () =>
  createSelector(
    selectContestantFormState,
    (selectContestantFormState) => selectContestantFormState.fileUpload
  );

const makeSelectFileUploadProgress = () =>
  createSelector(makeSelectFileUpload(), (fileUpload) => fileUpload.progress);

const makeSelectFileUploadLoading = () =>
  createSelector(makeSelectFileUpload(), (fileUpload) => fileUpload.loading);

const makeSelectFileUploadSectionId = () =>
  createSelector(makeSelectFileUpload(), (fileUpload) => fileUpload.sectionId);

const contestantFormSelectors = {
  makeSelectContestantForm,
  makeSelectContestantFormSubmissionResponse,
  makeSelectSubmissionDateIfAny,
  makeSelectEntrySavedId,
  makeSelectContestantFormPlanId,
  makeSelectDownloadedForm,
  makeSelectIsValid,
  makeSelectFileUploadProgress,
  makeSelectFileUploadLoading,
  makeSelectFileUploadSectionId,
  makeSelectDownloadFormResponse
};

export default contestantFormSelectors;
