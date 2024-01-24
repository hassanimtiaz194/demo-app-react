export const API = process.env.REACT_APP_HOST;

export const INIT_ENDPOINT = API + "/authenticate";
export const LOGIN_ENDPOINT = API + "/ContestantLogin/";
export const SOCIAL_LOGIN_ENDPOINT = API + "/ContestantSocialLogin";
export const FORGOT_ENDPOINT = API + "/ForgotPassword/";
export const RESET_ENDPOINT = API + "/reset";
export const LOGOUT_ENDPOINT = API + "/Logout";
export const VERIFY_ENDPOINT = API + "/verifyContestant";
export const RESEND_EMAIL_VERIFICATION_ENDPOINT = API + "/ResendVerifyEmail";
export const REGISTRATION_FORM_ENDPOINT = API + "/RegistrationForm";
export const REGISTER_CONTESTANT_ENDPOINT = API + "/RegisterContestant";
export const REGISTER_CONTESTANT_MEMBER_ENDPOINT =
  API + "/RegisterContestantMember";
export const COMPLETE_REGISTRATION_ENDPOINT = API + "/UpdateRegistration";
export const BRACKETS = API + "/BracketIds";
export const CONTESTANT_FORM = API + "/ContestantForm";
export const SUBMISSION_ENTRY_ENDPOINT = API + "/Entry";
export const TRANSCODER_JOB_STATUS_ENDPOINT = API + "/TransCoderJobStatus"
export const UPDATE_PROFILE = API + "/UpdateContestantProfile";
export const CONTESTANT_INFO = API + "/ContestantInfo";
export const CHANGE_PASSWORD = API + "/UpdateContestantPassword";
export const DASHBOARD_MSG_ENDPOINT = API + "/ContestantDashboardMsg";
export const EVENT_INFO_ENDPOINT = API + "/EventInfo";
export const UI_DESIGN_INFO_ENDPOINT = API + "/UiDesign";
export const TIMELINE_ENDPOINT = API + "/TimeLine";
export const CURRENT_PHASE_ENDPOINT = API + "/CurrentPhase";
export const QUICK_LINKS_ENDPOINT = API + "/QuickLinks";
export const QUICK_LINKS_DOWNLOAD_MEDIA_FILE_ENDPOINT = API + "/DownloadMediaFile";
export const ENTRY_DOWNLOAD_MEDIA_FILE_ENDPOINT = API + "/DownloadEntryFile";
export const UNSUBMIT_ENDPOINT = API + "/UnsubmitEntry";
export const UPLOAD_FILE_ENDPOINT = API + "/UploadFileForEntry";
export const CMS_LIST_ENDPOINT = API + "/CmsList";
export const SUBMISSION_CMS_LIST_ENDPOINT = API + "/SubmissionCms";
export const DOWNLOAD_FORM_ENDPOINT = API + "/DownloadEntry";
export const REMOVE_UPLOADED_FILE_ENDPOINT = API + "/RemoveFileUpload";
export const JUDGES_COMMENTS_ENDPOINT = API + "/JudgeComments";
export const UPLOAD_CONTESTANT_PHOTO_ENDPOINT = API + "/UploadContestantPhoto";



// Team
export const TEAM_INFO_ENDPOINT = API + "/TeamInfo";
export const ADD_TEAM_MEMBER_ENDPOINT = API + "/AddTeamMember";
export const DELETE_TEAM_MEMBER_ENDPOINT = API + "/DeleteTeamMember";
export const RESEND_INVITATION_ENDPOINT = API + "/ResendMemberInvitation";
export const MAKE_TEAM_LEADER_ENDPOINT = API + "/MakeTeamLeader";
export const UPDATE_TEAM_NAME_DESC_HEADLINE_ENDPOINT = API + "/UpdateTeamNameDesc";
