import moment from "moment";

import {
  // eslint-disable-next-line no-unused-vars
  ContestantForm,
} from "../../typedefs/contestantFormTemplate.typedef";
import {
  // eslint-disable-next-line no-unused-vars
  UpdateFormFieldAction,
  // eslint-disable-next-line no-unused-vars
  InitFormFieldsAction,
} from "../actions/contestantFormActions";

import {
  CONTESTANT_FORM_UPDATE_FIELD,
  CONTESTANT_FORM_INIT,
  CONTESTANT_FORM_SUBMIT,
  CONTESTANT_FORM_SAVED,
  CONTESTANT_FORM_SUBMITTED,
  CONTESTANT_FORM_UNSUBMITTED,
  FORM_DOWNLOADED,
  CONTESTANT_FORM_UPLOAD_PHOTO_PROGRESS,
  UPLOAD_FILE,
  CONTESTANT_FORM_UPLOAD_PHOTO_DONE,
  FORM_HAS_BEEN_DOWNLOADED,
  DOWNLOAD_FORM_RESPONSE,
  RESET_DOWNLOAD_FORM_RESPONSE,
  CONTESTANT_FORM_PLANID
} from "redux/actions/types";

import { updateFormAnswerList, initFormFields } from "../../utils/helpers";

/**
 * @type {ContestantForm} initialState
 */
export const initialState = {
  answerList: [],
  bracketId: null,
  phaseNumber: null,
  teamId: null,
  contestantFormSubmissionResponse: null,
  submissionDate: null,
  entry: null,
  entrySavedId: null,
  downloadedForm: null,
  downloadFormResponse: null,
  fileUpload: {
    loading: false,
    sectionId: null,
    progress: 0,
  },
};

/**
 *
 * @param {ContestantForm} state
 * @param {UpdateFormFieldAction | InitFormFieldsAction} action
 */
const contestantFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTESTANT_FORM_UPDATE_FIELD:
      return {
        ...state,
        answerList: updateFormAnswerList(state.answerList, action.payload)
      };
    case CONTESTANT_FORM_INIT:
      const { template, entry } = action.payload;
      let submissionDate = null;
      if (entry && entry.submissionDate)
        submissionDate = entry.submissionDate/* moment(entry.submissionDate, 'YYYY-MM-DD hh:mm a') */;
      return {
        ...state,
        bracketId: template.bracketId,
        submissionDate: submissionDate,
        planId: (entry || {}).planId,
        answerList: initFormFields(template.sectionList, entry),
      };
    case CONTESTANT_FORM_SUBMIT:
      return {
        ...state,
        contestantFormSubmissionResponse: null
      };
    case CONTESTANT_FORM_SAVED:
      // generating 7 digit random number to track followup saves
      const entrySavedId = new Date().getTime() % 1e7;
      return {
        ...state,
        entrySavedId: entrySavedId,
      };
    case CONTESTANT_FORM_SUBMITTED:
      return {
        ...state,
        submissionDate:action.payload.planList[0].submissionDate/* moment() */,
        contestantFormSubmissionResponse: action.payload,
      };
    case CONTESTANT_FORM_UNSUBMITTED:
      return {
        ...state,
        submissionDate: null,
        contestantFormSubmissionResponse: null,
      };
    case FORM_DOWNLOADED:
      const { url, filename } = action.payload;
      return {
        ...state,
        downloadedForm: {
          url,
          filename,
        },
      };
    case FORM_HAS_BEEN_DOWNLOADED:
      return {
        ...state,
        downloadedForm: null,
      };

    case DOWNLOAD_FORM_RESPONSE:
      return {
        ...state,
        downloadFormResponse: action.payload,
      };
    case RESET_DOWNLOAD_FORM_RESPONSE:
      return {
        ...state,
        downloadFormResponse: null,
      };

    case UPLOAD_FILE:
      return {
        ...state,
        fileUpload: {
          sectionId: action.payload.sectionId,
          loading: true,
          progress: 0,
        },
      };

    case CONTESTANT_FORM_UPLOAD_PHOTO_PROGRESS:
      const progress = action.payload.progress || 0;
      return {
        ...state,
        fileUpload: {
          sectionId: action.payload.sectionId,
          loading: true,
          progress: progress,
        },
      };

    case CONTESTANT_FORM_PLANID:
      return {
        ...state,
        planId: action.payload,
      };

    case CONTESTANT_FORM_UPLOAD_PHOTO_DONE:
      return {
        ...state,
        fileUpload: {
          sectionId: null,
          loading: false,
          progress: 0,
        },
      };
    default:
      return state;
  }
};

export default contestantFormReducer;
