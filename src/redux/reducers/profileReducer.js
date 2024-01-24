import timezones from "assets/timezones.json";

import {
  PROFILE_INFO_LOADED,
  PROFILE_UPDATE,
  LOAD_PROFILE_INFO,
  PROFILE_INFO_UPDATED,
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  SOCIAL_LOGIN_REGISTRATION_COMPLETE,
} from "../actions/types";

export const initialState = {
  profile: null,
  loading: false,
  socialRegComplete: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_INFO_LOADED:
      const profile = action.payload;
      const timezone =
        timezones.find((timezone) => {
          return timezone.label === profile.timezone;
        }) || {};

      return {
        ...state,
        loading: false,
        profile: { ...profile, timezone },
      };
    case PROFILE_INFO_UPDATED:
      return {
        ...state,
        loading: false,
      };

    case PASSWORD_CHANGE:
    case EMAIL_CHANGE:
    case LOAD_PROFILE_INFO:
    case PROFILE_UPDATE:
      return {
        ...state,
        loading: true,
      };
      case SOCIAL_LOGIN_REGISTRATION_COMPLETE:
        const { socialRegComplete } = action.payload;
        return {
          ...state,
          socialRegComplete: socialRegComplete,
        }
    default:
      return state;
  }
}
