import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  contestantFormTemplateActions,
  contestantFormActions,
  commonApiActions,
  globalActions,
  dashboardActions,
  profileActions
} from "redux/actions";
import {
  contestantFormTemplateSelectors,
  contestantFormSelectors,
  dashboardSelectors,
  profileSelectors,
  commonApiSelectors,
  authSelectors
} from "redux/selectors";
import { getCleanTextFromHtmlString } from "utils/helpers";

const mapStateToProps = createStructuredSelector({
  socialRegComplete: profileSelectors.makeSelectSocialRegComplete(),
  profile: profileSelectors.makeSelectProfile(),
  eventInfo: commonApiSelectors.makeSelectEventInfo(),
  contestantFormSubmissionResponse:
    contestantFormSelectors.makeSelectContestantFormSubmissionResponse(),
  contestantForm: contestantFormSelectors.makeSelectContestantForm(),
  formSavedId: contestantFormSelectors.makeSelectEntrySavedId(),
  contestantFormTemplate:
    contestantFormTemplateSelectors.makeSelectContestantFormTemplateForm(),
  selectedBracketId:
    contestantFormTemplateSelectors.makeSelectContestantFormTemplateSelectedBracketId(),
  currentPhaseNumber: dashboardSelectors.makeSelectCurrentPhaseNumber(),
  formEditMode: dashboardSelectors.makeSelectFormEditMode(),
  submissionDate: contestantFormSelectors.makeSelectSubmissionDateIfAny(),
  canSubmitEntry:
    contestantFormTemplateSelectors.makeSelectContestantFormTemplateCanSubmitEntry(),
  entryFormLoading: contestantFormTemplateSelectors.makeSelectContestantFormTemplateEntryLoading(),
  entryFormExist: contestantFormTemplateSelectors.makeSelectContestantFormTemplateEntryExist(),
  token: authSelectors.makeSelectToken(),
});

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    updateFormField: (fieldAnswer) => {
      dispatch(contestantFormActions.updateFormField(fieldAnswer));
    },
    loadContestantFormTemplate: (bracketId, phaseNumber) => {
      dispatch(
        contestantFormTemplateActions.loadContestantFormTemplate(
          bracketId,
          phaseNumber
        )
      );
    },
    downloadEntryFile: (payload) => {
      dispatch(dashboardActions.downloadEntryFile(payload))
    },
    saveContestantForm: () => {
      dispatch(contestantFormActions.saveForm());
    },
    submitContestantForm: () => {
      dispatch(contestantFormActions.submitForm());
    },
    uploadFile: (data) => {
      dispatch(commonApiActions.uploadFile(data));
    },
    onRegError: (err) => {
      dispatch(
        globalActions.requestResponseReturned({
          error: true,
          message: err.message,
        })
      );
    },
    socialRegistrationCompleted: () => {
      dispatch(profileActions.socialLoginRegistrationComplete({ socialRegComplete: false }));
    },
    onError: (msg) => {
      dispatch(
        globalActions.requestResponseReturned({
          error: true,
          message: getCleanTextFromHtmlString(msg),
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
