import { createStore, compose, applyMiddleware } from "redux";
import logger from 'redux-logger';
import createSagaMiddleware from "redux-saga";
import persistState from "redux-localstorage";

import rootReducer from "./reducers";
import sagas from "./sagas";

import { getSliceByDotNotation, getSubset } from "utils/helpers";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const emptyEnhancer = (next) => next;

const localStorageConfig = {
  slicer: (paths) => {
    return (state) => {
      let subset = {};
      paths.forEach((path) => {
        subset = {
          ...subset,
          ...getSliceByDotNotation(state, path),
        };
      });

      // TODO - auth is hardcoded here
      return { auth: subset };
    };
  },
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware, logger),
    persistState(
      ["auth.token", "auth.email", "auth.userId"],
      localStorageConfig
    ),
    process.env.NODE_ENV === "development" &&
      window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : emptyEnhancer
  )
);

sagaMiddleware.run(sagas);

export default store;
