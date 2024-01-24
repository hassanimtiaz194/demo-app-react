/*
 * LoginConstants (Used from react boilerplate)
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent1-YourComponent2...' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer1-YourContainer2.../YOUR_ACTION_CONSTANT';
 */

export const INIT_APP = "contestant-client-app/app/INIT_APP";
export const APP_INITIALIZED = "contestant-client-app/app/APP_INITIALIZED";

export const USER_LOADING = "contestant-client-app/RegisterPage/USER_LOADING";
export const SESSION_EXPIRED =
  "contestant-client-app/RegisterPage/SESSION_EXPIRED";
export const REGISTER_CONTESTANT =
  "contestant-client-app/RegisterPage/REGISTER_CONTESTANT";
export const REGISTER_ERROR =
  "contestant-client-app/RegisterPage/REGISTER_ERROR";
export const SESSION_LOGOUT =
  "contestant-client-app/RegisterPage/SESSION_LOGOUT";
export const LOGIN_USER = "contestant-client-app/LoginPage/LOGIN_USER";
export const SOCIAL_LOGIN_USER = "contestant-client-app/LoginPage/SOCIAL_LOGIN_USER";
export const LOGIN_SUCCESS = "contestant-client-app/LoginPage/LOGIN_SUCCESS";
export const LOGIN_ERROR = "contestant-client-app/LoginPage/LOGIN_ERROR";

export const RESET_PASSWORD = "contestant-client-app/ResetPage/RESET_PASSWORD";
export const RESET_PASSWORD_SUCCESS =
  "contestant-client-app/ResetPage/RESET_PASSWORD_SUCCESS";

export const FORGOT_PASSWORD =
  "contestant-client-app/ForgotPage/FORGOT_PASSWORD";
export const FORGOT_PASSWORD_SUCCESS =
  "contestant-client-app/ForgotPage/FORGOT_PASSWORD_SUCCESS";

export const LOGOUT = "contestant-client-app/app/LOGOUT";
export const APP_LOGOUT = "contestant-client-app/app/APP_LOGOUT";
export const GET_ERRORS = "contestant-client-app/app/GET_ERRORS";
export const CLEAR_ERRORS = "contestant-client-app/app/CLEAR_ERRORS";

export const START_GLOBAL_PROGRESS =
  "contestant-client-app/components/GlobalProgress/START_GLOBAL_PROGRESS";
export const END_GLOBAL_PROGRESS =
  "contestant-client-app/components/GlobalProgress/END_GLOBAL_PROGRESS";

export const SOCIAL_LOGIN_REGISTRATION_COMPLETE = "contestant-client-app/app/SOCIAL_LOGIN_REGISTRATION_COMPLETE";

export const SELECT_BRACKET =
  "contestant-client-app/components/BracketSelect/SELECT_BRACKET";
export const BRACKET_LIST_LOADED =
  "contestant-client-app/components/BracketSelect/SET_BRACKET_LIST";
export const LOAD_BRACKET_LIST =
  "contestant-client-app/components/BracketSelect/LOAD_BRACKET_LIST";
export const LOAD_CONTESTANT_FORM =
  "contestant-client-app/components/Dashboard/LOAD_CONTESTANT_FORM";
export const CONTESTANT_FORM_TEMPLATE_LOADED =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_TEMPLATE_LOADED";
export const CONTESTANT_FORM_TEMPLATE_ENTRY =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_TEMPLATE_ENTRY";
export const CONTESTANT_FORM_TEMPLATE_ENTRY_EXIST =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_TEMPLATE_ENTRY_EXIST";
export const CONTESTANT_FORM_TEMPLATE_ENTRY_RELOAD_FILE_UPLOAD =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_TEMPLATE_ENTRY_RELOAD_FILE_UPLOAD";
export const CONTESTANT_FORM_TEMPLATE_ENTRY_LOADING =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_TEMPLATE_ENTRY_LOADING";
export const CONTESTANT_FORM_UPDATE_FIELD =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_UPDATE_FIELD";
export const CONTESTANT_FORM_INIT =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_INIT";
export const CONTESTANT_FORM_PLANID =
  "contestant-client-app/components/Dashboard/CONTESTANT__PLANID";
export const SUBMISSION_ENTRY_LOAD =
  "contestant-client-app/components/Dashboard/SUBMISSION_ENTRY_LOAD";
export const CONTESTANT_FORM_SUBMIT =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_SUBMIT";
export const CONTESTANT_FORM_SUBMITTED =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_SUBMITTED";
export const CONTESTANT_FORM_UNSUBMITTED =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_UNSUBMITTED";
export const CONTESTANT_FORM_SAVE =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_SAVE";
export const CONTESTANT_FORM_SAVED =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_SAVED";
export const CONTESTANT_FORM_UPLOAD_PHOTO_PROGRESS =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_UPLOAD_PHOTO_PROGRESS";
export const CONTESTANT_FORM_UPLOAD_PHOTO_DONE =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_UPLOAD_PHOTO_DONE";
export const CONTESTANT_FORM_UNSUBMIT =
  "contestant-client-app/components/Dashboard/CONTESTANT_FORM_UNSUBMIT";
export const PROFILE_UPDATE =
  "contestant-client-app/components/Profile/PROFILE_UPDATE";
export const LOAD_PROFILE_INFO =
  "contestant-client-app/components/Profile/LOAD_PROFILE_INFO";
export const PROFILE_INFO_LOADED =
  "contestant-client-app/components/Profile/PROFILE_INFO_LOADED";
export const PROFILE_INFO_UPDATED =
  "contestant-client-app/components/Profile/PROFILE_INFO_UPDATED";
export const EMAIL_CHANGE =
  "contestant-client-app/components/Profile/EMAIL_CHANGE";
export const PASSWORD_CHANGE =
  "contestant-client-app/components/Profile/PASSWORD_CHANGE";
export const LOAD_DASHBOARD_MSG =
  "contestant-client-app/components/Dashboard/LOAD_DASHBOARD_MSG";
export const DASHBOARD_MSG_LOADED =
  "contestant-client-app/components/Dashboard/DASHBOARD_MSG_LOADED";
export const EVENT_INFO_LOADED = "contestant-client-app/app/EVENT_INFO_LOADED";
export const SET_INVITATION_CODE = 'SET_INVITATION_CODE';
export const LOAD_UI_INFO = "contestant-client-app/app/LOAD_UI_INFO";
export const UI_INFO_LOADED = "contestant-client-app/app/UI_INFO_LOADED";
export const TIMELINE_LOADED =
  "contestant-client-app/components/App/TIMELINE_LOADED";
export const CMS_LIST_LOADED =
  "contestant-client-app/components/App/CMS_LIST_LOADED";
export const SET_CMS_MESSAGES =
  "contestant-client-app/components/App/SET_CMS_MESSAGES";
export const CURRENT_PHASE_LOADED =
  "contestant-client-app/components/Dashboard/CURRENT_PHASE_LOADED";

export const QUICK_LINKS_LOADED =
  "contestant-client-app/components/Dashboard/QUICK_LINKS_LOADED";
export const LOAD_QUICK_LINKS =
  "contestant-client-app/components/Dashboard/LOAD_QUICK_LINKS";
export const DOWNLOAD_MEDIA_FILE =
  "contestant-client-app/components/Dashboard/DOWNLOAD_MEDIA_FILE";
export const DOWNLOAD_ENTRY_FILE =
  "contestant-client-app/components/Dashboard/DOWNLOAD_ENTRY_FILE";



export const REQUEST_RESPONSE_RETURNED =
  "contestant-client-app/components/App/REQUEST_RESPONSE_RETURNED";
export const SUBMISSION_PERMISSION_LOADED =
  "contestant-client-app/components/Dashboard/SUBMISSION_PERMISSION_LOADED";
export const UPLOAD_FILE = "contestant-client-app/app/UPLOAD_FILE";
export const REMOVE_UPLOADED_FILE = "contestant-client-app/app/REMOVE_UPLOADED_FILE";
export const JUDGES_COMMENTS = "contestant-client-app/app/JUDGES_COMMENTS";
export const SET_JUDGES_COMMENTS = "contestant-client-app/app/SET_JUDGES_COMMENTS";
export const TRANSCODER_JOB_STATUS = "contestant-client-app/app/TRANSCODER_JOB_STATUS";
export const SET_TRANSCODER_JOB_STATUS = "contestant-client-app/app/SET_TRANSCODER_JOB_STATUS";
export const DELETE_TRANSCODER_JOB_STATUS = "contestant-client-app/app/DELETE_TRANSCODER_JOB_STATUS";
export const DOWNLOAD_FORM =
  "contestant-client-app/components/Dashboard/DOWNLOAD_FORM";
export const FORM_DOWNLOADED =
  "contestant-client-app/components/Dashboard/FORM_DOWNLOADED";
export const FORM_HAS_BEEN_DOWNLOADED =
  "contestant-client-app/components/Dashboard/FORM_HAS_BEEN_DOWNLOADED";
export const DOWNLOAD_FORM_RESPONSE = "contestant-client-app/components/Dashboard/DOWNLOAD_FORM_RESPONSE";
export const RESET_DOWNLOAD_FORM_RESPONSE = "contestant-client-app/components/Dashboard/RESET_DOWNLOAD_FORM_RESPONSE";
export const UPLOAD_CONTESTANT_PHOTO = 'contestant-client-app/app/UPLOAD_CONTESTANT_PHOTO'
export const UPLOAD_CONTESTANT_PHOTO_PROGRESS_START = 'contestant-client-app/app/UPLOAD_CONTESTANT_PHOTO_PROGRESS_START'
export const UPLOAD_CONTESTANT_PHOTO_PROGRESS_DONE = 'contestant-client-app/app/UPLOAD_CONTESTANT_PHOTO_PROGRESS_DONE'
export const UPLOAD_CONTESTANT_PHOTO_UPLOADED = 'contestant-client-app/app/UPLOAD_CONTESTANT_PHOTO_UPLOADED'

// Team
export const LOAD_TEAM_INFO =
  "contestant-client-app/components/Team/LOAD_TEAM_INFO";
export const TEAM_INFO_LOADED =
  "contestant-client-app/components/Team/TEAM_INFO_LOADED";
export const UPDATE_TEAM = "contestant-client-app/components/Team/UPDATE_TEAM";
export const TEAM_UPDATED =
  "contestant-client-app/components/Team/TEAM_UPDATED";
export const ADD_TEAM_MEMBER =
  "contestant-client-app/components/Team/ADD_TEAM_MEMBER";
export const TEAM_MEMBER_ADDED =
  "contestant-client-app/components/Team/TEAM_MEMBER_ADDED";
export const TEAM_DATA_ERROR =
  "contestant-client-app/components/Team/TEAM_DATA_ERROR";
export const RESEND_INVITATION =
  "contestant-client-app/components/Team/RESEND_INVITATION";
export const DELETE_TEAM_MEMBER =
  "contestant-client-app/components/Team/DELETE_TEAM_MEMBER";
export const MAKE_TEAM_LEADER =
  "contestant-client-app/components/Team/MAKE_TEAM_LEADER";
export const CHANGE_TEAM_NAME_DESCRIPTION = 'CHANGE_TEAM_NAME_DESCRIPTION';

