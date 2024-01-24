import * as moment from "moment";

import { USER_REGISTRATION_PAGE_STATUS } from "../../typedefs/contestantFormTemplate.typedef";
import {
  EVENT_INFO_LOADED,
  TIMELINE_LOADED,
  UI_INFO_LOADED,
  CMS_LIST_LOADED,
  SET_INVITATION_CODE,
  SET_JUDGES_COMMENTS,
  UPLOAD_CONTESTANT_PHOTO_PROGRESS_START,
  UPLOAD_CONTESTANT_PHOTO_PROGRESS_DONE,
  UPLOAD_CONTESTANT_PHOTO_UPLOADED,
  SET_TRANSCODER_JOB_STATUS,
  DELETE_TRANSCODER_JOB_STATUS,
} from "../actions/types";

export const initialState = {
  event: null,
  uiInfo: null,
  registrationNotStartedMessage: null,
  registrationIsEndedMessage: null,
  registrationStatus: null, //0 menas started, 1 means over, -1, menas has not started yet
  invitationToken: null,
  judgesComments: null,
  photoUploadProgress: 0,
  ProfilePictureUploaded: false,
  trasnCoderJobStatus: null,
  fullTimeline: null,
};


const getRegStatus = (
  contestantRegistrationStartDate,
  contestantRegistrationEndDate
) => {
  const currentDate = moment();

  if (currentDate.isBefore(contestantRegistrationStartDate))
    return USER_REGISTRATION_PAGE_STATUS.REGISTRATION_NOT_STARTED;
  if (currentDate.isAfter(contestantRegistrationEndDate))
    return USER_REGISTRATION_PAGE_STATUS.REGISTRATION_IS_ENDED;
  return USER_REGISTRATION_PAGE_STATUS.REGISTRATION_STARTED;
};

const getRegistrationStatusMessage = (cmsList) => {
  let registrationNotStartedMessage, registrationIsEndedMessage;
  cmsList.map(({ currCmsVersion, name }) => {
    let message = currCmsVersion?.inlineCopy?.split('(UTC');;
    if (name === USER_REGISTRATION_PAGE_STATUS.REGISTRATION_NOT_STARTED_MESSAGE)
      registrationNotStartedMessage = message[0];  
      registrationIsEndedMessage = message[0];
  });

  return {
    registrationNotStartedMessage,
    registrationIsEndedMessage,
  };
};

export const commonApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_INFO_LOADED:
      return {
        ...state,
        event: action.payload,
      };
    case TIMELINE_LOADED:
      const contestantRegistrationStartDate = moment(
        action.payload.contestantRegistrationStartDate
      );
      const contestantRegistrationEndDate = moment(
        action.payload.contestantRegistrationEndDate
      );

      return {
        ...state,
        fullTimeline: action.payload,
        registrationStatus: getRegStatus(
          contestantRegistrationStartDate,
          contestantRegistrationEndDate
        ),
      };

    case CMS_LIST_LOADED:
      return {
        ...state,
        ...getRegistrationStatusMessage(action.payload),
      };
    case UI_INFO_LOADED:
      return {
        ...state,
        uiInfo: action.payload,
      };
    case SET_INVITATION_CODE:
      return {
        ...state,
        invitationToken: action.payload,
      };
    case SET_JUDGES_COMMENTS:
      return {
        ...state,
        judgesComments: action.payload,
      };
    case UPLOAD_CONTESTANT_PHOTO_PROGRESS_START:
      return {
        ...state,
        photoUploadProgress: 0,
        ProfilePictureUploaded: false,
      };
    case UPLOAD_CONTESTANT_PHOTO_PROGRESS_DONE:
      const progress = action.payload.progress || 0;
      return {
        ...state,
        photoUploadProgress: progress,
      };
    case UPLOAD_CONTESTANT_PHOTO_UPLOADED:
      const isProfilePicUploaded = action.payload.loaded;
      return {
        ...state,
        ProfilePictureUploaded: isProfilePicUploaded,
      };
    case SET_TRANSCODER_JOB_STATUS:
      return {
        ...state,
        trasnCoderJobStatus: action.payload,
      };
    case DELETE_TRANSCODER_JOB_STATUS:
      return {
        ...state,
        trasnCoderJobStatus: null,
      };
    default:
      return state;
  }
};

export default commonApiReducer;
