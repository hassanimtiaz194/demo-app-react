import * as moment from "moment";

import {
  DASHBOARD_MSG_LOADED,
  CURRENT_PHASE_LOADED,
  TIMELINE_LOADED,
  QUICK_LINKS_LOADED,
  CONTESTANT_FORM_SUBMITTED,
  CONTESTANT_FORM_INIT,
  CONTESTANT_FORM_UNSUBMITTED,
  LOAD_DASHBOARD_MSG,
  UNIVERSAL_QUICK_LINKS_LOADED,
} from "../actions/types";

export const initialState = {
  message: null,
  phaseList: null,
  currentPhaseNumber: null,
  quickLinks: null,
  editMode: false,
  outsideSubmissionPeriodMessage: null,
  currentPhase: null,
  submissionStatus: null,
};

export const SUBMISSION_IS_ENDED = 1;
export const SUBMISSION_NOT_STARTED = -1;
export const SUBMISSION_STARTED = 0;

/**
 *
 * @param {*} phaseList
 * @returns {number} SUBMISSION_IS_ENDED, SUBMISSION_NOT_STARTED or SUBMISSION_STARTED (1, -1, 0)
 */
const getSubmissionStatus = (currentPhase) => {
  const currentDate = moment();

  if (!currentPhase) return null;

  const submissionStartDate = moment(currentPhase.submissionStartDate);
  const submissionEndDate = moment(currentPhase.submissionEndDate);

  if (currentDate.isBefore(submissionStartDate)) return SUBMISSION_NOT_STARTED;
  if (currentDate.isAfter(submissionEndDate)) return SUBMISSION_IS_ENDED;

  return SUBMISSION_STARTED;
};

const getCurrentPhase = (phaseList, phaseNumber) => {
  phaseList = phaseList || [];
  return phaseList.find((phase) => {
    return phase.phaseNumber === phaseNumber;
  });
};

const getOutsideSubmissionPeriodMessage = (currentPhase, submissionStatus) => {
  if (!currentPhase) return "";

  const submissionStartDate = moment(currentPhase.submissionStartDate);
  const submissionEndDate = moment(currentPhase.submissionEndDate);

  if (submissionStatus === SUBMISSION_NOT_STARTED)
    return `The submission period has not yet begun. Please return on ${submissionStartDate.format(
      "MMM DD, YYYY, LT"
    )} to submit your entry.`;
  if (submissionStatus === SUBMISSION_IS_ENDED)
    return `Submissions are no longer being accepted. The submission deadline was ${submissionEndDate.format(
      "MMM DD, YYYY, LT"
    )}.`;

  return "";
};

const createPhaseRelatedProps = (phaseNumber, phaseList, timeline) => {
  const currentPhase = getCurrentPhase(phaseList, phaseNumber);
  const submissionStatus = getSubmissionStatus(currentPhase);
  return {
    currentPhase: currentPhase,
    submissionStatus: submissionStatus,
    timeline: timeline,
    outsideSubmissionPeriodMessage: getOutsideSubmissionPeriodMessage(
      currentPhase,
      submissionStatus
    ),
    // if the the submission has started then we can allow to edit the form
    editMode: submissionStatus === SUBMISSION_STARTED,
  };
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // clear previous message if any before loading new
    case LOAD_DASHBOARD_MSG:
      return {
        ...state,
        message: null,
      };
    case DASHBOARD_MSG_LOADED:
      return {
        ...state,
        message: action.payload,
      };
    case TIMELINE_LOADED:
      return {
        ...state,
        phaseList: action.payload.phaseList,
        ...createPhaseRelatedProps(
          state.currentPhaseNumber,
          action.payload.phaseList,
          action.payload
        ),
      };
    case CURRENT_PHASE_LOADED:
      return {
        ...state,
        currentPhaseNumber: action.payload.currentPhase,
        ...createPhaseRelatedProps(
          action.payload.currentPhase,
          state.phaseList,
          state.timeline
        ),
      };
    case QUICK_LINKS_LOADED:
      const quickLinks = action.payload
/*         .filter((link) => {
          const { hideContestantApp } = link;
          return !hideContestantApp;
        })
        .sort((link1, link2) => {
          if (link1.displayOrder > link2.displayOrder) return 1;
          if (link1.displayOrder < link2.displayOrder) return -1;
          return 0;
        }); */
      return {
        ...state,
        quickLinks: quickLinks,
      };
    case CONTESTANT_FORM_SUBMITTED:
      const response = action.payload;
      if (response && response.success)
        return {
          ...state,
          //   since the form is submitted then it should be editable
          editMode: false,
        };
      return state;
    case CONTESTANT_FORM_UNSUBMITTED:
      return {
        ...state,
        editMode: true,
      };
    case CONTESTANT_FORM_INIT:
      const { entry } = action.payload;
      if (entry && entry.submissionDate)
        return {
          ...state,
          //   since submission date presents then the form should be editable
          editMode: false,
        };
      return {
        ...state,
        // so we make the form editable if it is in valid submission date range
        editMode: state.submissionStatus === SUBMISSION_STARTED,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
