import { createSelector } from "reselect";
import { initialState } from "../reducers";

const selectContestantFormTemplateState = (state) =>
  (state || initialState).contestantFormTemplate;

const makeSelectContestantFormTemplate = () =>
  createSelector(
    selectContestantFormTemplateState,
    (selectContestantFormTemplateState) => selectContestantFormTemplateState
  );

const makeSelectContestantFormTemplateSelectedBracketId = () =>
  createSelector(
    selectContestantFormTemplateState,
    (selectContestantFormTemplateState) =>
      selectContestantFormTemplateState.selectedBracketId
  );

const makeSelectContestantFormTemplateBracketList = () =>
  createSelector(
    selectContestantFormTemplateState,
    (selectContestantFormTemplateState) => [
      ...(selectContestantFormTemplateState.brackets || []),
    ]
  );

const makeSelectContestantFormTemplateForm = () =>
  createSelector(
    selectContestantFormTemplateState,
    (selectContestantFormTemplateState) => {
      return { ...selectContestantFormTemplateState.form };
    }
  );

const makeSelectContestantFormTemplateCanSubmitEntry = () =>
  createSelector(
    selectContestantFormTemplateState,
    (selectContestantFormTemplateState) =>
      selectContestantFormTemplateState.canSubmitEntry
  );

const makeSelectContestantFormTemplateEntry = () =>
  createSelector(
    selectContestantFormTemplateState,
    (selectContestantFormTemplateState) =>
      selectContestantFormTemplateState.entry
  );
const makeSelectContestantFormTemplateEntryLoading = () =>
  createSelector(
    selectContestantFormTemplateState,
    (selectContestantFormTemplateState) =>
      selectContestantFormTemplateState.loadingEntry
  );
const makeSelectContestantFormTemplateEntryExist = () =>
  createSelector(
    selectContestantFormTemplateState,
    (selectContestantFormTemplateState) =>
      selectContestantFormTemplateState.entryFormExist
  );

  const makeSelectCMSMsg = () =>
  createSelector(
    selectContestantFormTemplateState,
    (selectContestantFormTemplateState) => selectContestantFormTemplateState.CMSMsg
  );

export default {
  makeSelectContestantFormTemplate,
  makeSelectContestantFormTemplateSelectedBracketId,
  makeSelectContestantFormTemplateBracketList,
  makeSelectContestantFormTemplateForm,
  makeSelectContestantFormTemplateCanSubmitEntry,
  makeSelectContestantFormTemplateEntry,
  makeSelectContestantFormTemplateEntryLoading,
  makeSelectContestantFormTemplateEntryExist,
  makeSelectCMSMsg
};
