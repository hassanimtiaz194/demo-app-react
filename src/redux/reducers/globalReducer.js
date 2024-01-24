import {
  START_GLOBAL_PROGRESS,
  END_GLOBAL_PROGRESS,
  REQUEST_RESPONSE_RETURNED,
} from "../actions/types";

export const initialState = {
  isLoading: false,
  requestResponse: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_GLOBAL_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case END_GLOBAL_PROGRESS:
      return {
        ...state,
        isLoading: false,
      };
    case REQUEST_RESPONSE_RETURNED:
      /**
       * @type {import("../../typedefs/contestantFormTemplate.typedef").RequestResponse} payload
       */
      const payload = action.payload;
      return {
        ...state,
        requestResponse: {
          error: payload.error,
          message: payload.message,
        },
      };
    default:
      return state;
  }
}
