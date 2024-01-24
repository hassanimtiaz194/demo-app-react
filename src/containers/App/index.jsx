import React, { useEffect, Fragment } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { initAppSelectors } from "redux/selectors";
import { initAppActions, commonApiActions, globalActions } from "redux/actions";

import GlobalProgress from "components/GlobalProgress/index";

import App from "./App";

function AppWrapper(props) {
  const { initialized } = props;

  // state actions
  const { loadUiDesignInfo, initApp, startLoading, endLoading } = props;

  useEffect(() => {
    if (!initialized) {
      initApp();
      startLoading();
    } else {
      loadUiDesignInfo();
      endLoading();
    }
  }, [initApp, loadUiDesignInfo, initialized, startLoading, endLoading]);

  return (
    <Fragment>
      <GlobalProgress />
      {initialized ? (
        <Router>
          <App />
        </Router>
      ) : (
        ""
      )}
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  initialized: initAppSelectors.makeSelectIsInitialized(),
});

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    initApp: () => {
      dispatch(initAppActions.initApp());
    },
    loadUiDesignInfo: () => {
      dispatch(commonApiActions.loadUiInfo());
    },
    startLoading: () => {
      dispatch(globalActions.startGlobalProgress());
    },
    endLoading: () => {
      dispatch(globalActions.endGlobalProgress());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
