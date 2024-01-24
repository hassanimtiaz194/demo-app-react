import { combineReducers } from "redux";
import authReducer from "./authReducer";
import globalReducer from "./globalReducer";
import contestantFormTemplateReducer from "./contestantFormTemplateReducer";
import contestantFormReducer from "./contestantFormReducer";
import profileReducer from "./profileReducer";
import initReducer from "./initReducer";
import commonApiReducer from "./commonApiReducer";
import dashboardReducer from "./dashboardReducer";
import teamReducer from "./teamReducer";

import { initialState as authInitialState } from "./authReducer";
import { initialState as globalInitialState } from "./globalReducer";
import { initialState as contestantFormTemplateInitialState } from "./contestantFormTemplateReducer";
import { initialState as contestantFormInitialState } from "./contestantFormReducer";
import { initialState as profileState } from "./profileReducer";
import { initialState as initAppState } from "./initReducer";
import { initialState as commonApiState } from "./commonApiReducer";
import { initialState as dashboardState } from "./dashboardReducer";
import { initialState as teamState } from "./teamReducer";


import { LOGOUT } from "redux/actions/types";


// The initial state of the App
export const initialState = {
  auth: { ...authInitialState },
  global: { ...globalInitialState },
  contestantFormTemplate: { ...contestantFormTemplateInitialState },
  contestantForm: { ...contestantFormInitialState },
  profile: { ...profileState },
  init: { ...initAppState },
  commonApi: { ...commonApiState },
  dashboard: { ...dashboardState },
  team: {
    ...teamState,
  },
};

const appReducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
  contestantFormTemplate: contestantFormTemplateReducer,
  contestantForm: contestantFormReducer,
  profile: profileReducer,
  init: initReducer,
  commonApi: commonApiReducer,
  dashboard: dashboardReducer,
  team: teamReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    const href = action.payload;
    window.location.href = href || "/login";
    return initialState;
  }
  return appReducer(state, action);
};

export default rootReducer;
