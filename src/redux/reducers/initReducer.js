import { APP_INITIALIZED } from "../actions/types";

export const initialState = {
  isInitialized: false,
  token: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case APP_INITIALIZED:
      return {
        ...state,
        isInitialized: true,
        token: action.payload.token,
      };
    default:
      return state;
  }
}
