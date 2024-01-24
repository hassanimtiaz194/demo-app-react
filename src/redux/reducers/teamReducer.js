import {
  ADD_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
  LOAD_TEAM_INFO,
  MAKE_TEAM_LEADER,
  RESEND_INVITATION,
  TEAM_DATA_ERROR,
  TEAM_INFO_LOADED,
  TEAM_MEMBER_ADDED,
} from "../actions/types";

export const initialState = {
  team: null,
  loading: false,
  isMemberAdded: false,
  errorMessage: "",
};

export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEAM_MEMBER_ADDED:
      return {
        ...state,
        loading: false,
        isMemberAdded: true,
      };
    case MAKE_TEAM_LEADER:
    case DELETE_TEAM_MEMBER:
    case RESEND_INVITATION:
    case ADD_TEAM_MEMBER:
    case LOAD_TEAM_INFO:
      return {
        ...state,
        loading: true,
        errorMessage: "",
        isMemberAdded: false,
      };
    case TEAM_INFO_LOADED:
      return {
        team: action.payload,
        errorMessage: "",
        loading: false,
        isMemberAdded: false,
      };
    case TEAM_DATA_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default teamReducer;
