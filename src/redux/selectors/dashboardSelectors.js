import { createSelector } from "reselect";
import * as moment from "moment";

import { initialState } from "../reducers";

const selectDashboardState = (state) => (state || initialState).dashboard;

const selectCurrentPhaseNumber = (state) =>
  (state || initialState).currentPhaseNumber;

const makeSelectDashboard = () =>
  createSelector(
    selectDashboardState,
    (selectDashboardState) => selectDashboardState
  );

const makeSelectDashboardMsg = () =>
  createSelector(
    selectDashboardState,
    (dashboardState) => dashboardState.message
  );

const makeSelectQuickLinks = () =>
  createSelector(
    selectDashboardState,
    (dashboardState) => dashboardState.quickLinks
  );

const makeSelectUniversalQuickLinks = () =>
  createSelector(
    selectDashboardState,
    (dashboardState) => dashboardState.universalQuickLinks
  );

const makeSelectTimelinePhaseList = () =>
  createSelector(selectDashboardState, (state) => state.phaseList || []);

const makeSelectCurrentPhaseNumber = () =>
  createSelector(selectDashboardState, selectCurrentPhaseNumber);

const makeSelectCurrentPhase = () =>
  createSelector(makeSelectDashboard(), (state) => state.currentPhase);

const makeSelectOutsideSubmissionPeriodMessage = () =>
  createSelector(
    makeSelectDashboard(),
    (state) => state.outsideSubmissionPeriodMessage
  );

const makeSelectOutsidePhasePeriodMessage = () =>
  createSelector(makeSelectDashboard(), (state) => {
    const currentDate = moment();
    const { currentPhase } = state;
    if (!currentPhase) return "";

    const competitionStartDate = moment(state.timeline.competitionStartDate);
    const competitionEndDate = moment(state.timeline.competitionEndDate);

    if (currentDate.isBefore(competitionStartDate)) {
      return `The competition has not yet began. Please return on ${competitionStartDate.format(
        "MMM DD, YYYY, LT"
      )}`;
    }
    if (currentDate.isAfter(competitionEndDate)) {
      return `Thank you for your interest, but the competition ended on ${competitionEndDate.format(
        "MMM DD, YYYY, LT"
      )}`;
    }

    return "";
  });

const makeSelectSubmissionStatus = () =>
  createSelector(makeSelectDashboard(), (state) => state.submissionStatus);

const makeSelectFormEditMode = () =>
  createSelector(makeSelectDashboard(), (state) => {
    return state.editMode;
  });

const dashboardSelectors = {
  makeSelectDashboard,
  makeSelectDashboardMsg,
  makeSelectTimelinePhaseList,
  makeSelectCurrentPhase,
  makeSelectCurrentPhaseNumber,
  makeSelectOutsideSubmissionPeriodMessage,
  makeSelectSubmissionStatus,
  makeSelectQuickLinks,
  makeSelectFormEditMode,
  makeSelectOutsidePhasePeriodMessage,
  makeSelectUniversalQuickLinks,
};

export default dashboardSelectors;
