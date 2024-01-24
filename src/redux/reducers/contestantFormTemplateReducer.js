import {
  SELECT_BRACKET,
  BRACKET_LIST_LOADED,
  CONTESTANT_FORM_TEMPLATE_LOADED,
  SUBMISSION_PERMISSION_LOADED,
  CONTESTANT_FORM_TEMPLATE_ENTRY,
  CONTESTANT_FORM_TEMPLATE_ENTRY_LOADING,
  CONTESTANT_FORM_TEMPLATE_ENTRY_EXIST,
  CONTESTANT_FORM_TEMPLATE_ENTRY_RELOAD_FILE_UPLOAD,
  SET_CMS_MESSAGES
} from "../actions/types";

export const initialState = {
  selectedBracketId: null,
  form: null,
  brackets: [],
  dashboardMsg: null,
  canSubmitEntry: null,
  entry: null,
  loadingEntry: false,
  entryFormExist: true,
  CMSMsg:null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_BRACKET:
      return {
        ...state,
        selectedBracketId: action.payload,
      };
    case BRACKET_LIST_LOADED:
      return {
        ...state,
        brackets: [...action.payload],
        /*  brackets: [{bracketId: 28, bracketName: 'Western Continents'},{bracketId: 38, bracketName: 'Asian Continents'} ] */
      };
    case CONTESTANT_FORM_TEMPLATE_LOADED:
      return {
        ...state,
        form: { ...action.payload },
      };
    case SUBMISSION_PERMISSION_LOADED:
      return {
        ...state,
        canSubmitEntry: action.payload.canSubmitEntry,
      };
    case CONTESTANT_FORM_TEMPLATE_ENTRY:
      return {
        ...state,
        entry: action.payload,
      };
    case CONTESTANT_FORM_TEMPLATE_ENTRY_LOADING:
      return {
        ...state,
        loadingEntry: action.payload,
      };
    case CONTESTANT_FORM_TEMPLATE_ENTRY_EXIST:
      return {
        ...state,
        entryFormExist: action.payload,
      };
    case CONTESTANT_FORM_TEMPLATE_ENTRY_RELOAD_FILE_UPLOAD:
      return {
        ...state,
        entry: action.payload
      }
    case SET_CMS_MESSAGES:
      const message = action?.payload?.split('(UTC');
      return {
        ...state,
        CMSMsg: message[0],
      };
    default:
      return state;
  }
}
