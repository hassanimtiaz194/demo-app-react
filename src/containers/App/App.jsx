import React, { Suspense } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";
import DashboardLayout from "containers/DashboardLayout";
import AuthLayout from "containers/AuthLayout";
import NotFoundPage from "containers/NotFoundPage";

import {
  authSelectors,
  commonApiSelectors,
  profileSelectors,
} from "redux/selectors";

import { dashboardRoutes, preloadStandardRoutes, standardRoutes } from "routes";
import { usePageTracking } from "hooks/usePageTracking";
import useUiInfo from "hooks/useUiInfo";
import { useEffect } from "react";
import { event } from "react-ga";

function App(props) {
  // state props
  const { token, uiInfo, eventInfo } = props;

  usePageTracking();
  useUiInfo(uiInfo);

  useEffect(() => {
    if (eventInfo) {
      const Metadataa = document.createElement("meta");
      Metadataa.setAttribute("name", "description");
      Metadataa.setAttribute("content", eventInfo?.eventName);
      document.head.appendChild(Metadataa);
      if (eventInfo?.additionalEmbed !== null && eventInfo?.additionalEmbed !== undefined) {
        let frag = document.createRange().createContextualFragment(eventInfo?.additionalEmbed);
        document.head.appendChild(frag)
      }
      if (eventInfo?.gaSnippet !== null && eventInfo?.gaSnippet !== undefined) {
        let frag = document.createRange().createContextualFragment(eventInfo?.gaSnippet);
        document.head.appendChild(frag);
      }
    }
  }, [])

  const dashboard = (
    <DashboardLayout routes={dashboardRoutes}>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Redirect from="/login" to="/home" />
        <Redirect from="/altlogin" to="/home" />
        <Redirect from="/register" to="/home" />
        <Redirect exact from="/" to="/home" />
        {dashboardRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              exact={route.exact}
              path={"/" + route.path}
              render={() => {
                const Component = route.comp;
                return (
                  <Suspense>
                    <Component />
                  </Suspense>
                );
              }}
            />
          );
        })}

        <Route path="*">
          <Redirect to="/notfound" />
        </Route>
      </Switch>
    </DashboardLayout>
  );
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route path="/notfound" component={NotFoundPage} />
        {token && dashboard}
        {Object.values(standardRoutes).map((route) => {
          return (
            <Route
              key={route.path}
              exact={route.exact}
              path={"/" + route.path}
              render={() => {
                const AuthPageComponent = route.comp;
                return (
                  <AuthLayout parentComponent={route.path}>
                    <Suspense>
                      <AuthPageComponent />
                    </Suspense>
                  </AuthLayout>
                );
              }}
            />
          );
        })}
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  token: authSelectors.makeSelectToken(),
  uiInfo: commonApiSelectors.makeSelectUiInfo(),
  profile: profileSelectors.makeSelectProfile(),
  eventInfo: commonApiSelectors.makeSelectEventInfo(),
});

export default connect(mapStateToProps, null)(App);
