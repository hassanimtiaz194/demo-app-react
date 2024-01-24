import React from "react";

import { useLocation } from "react-router-dom";
import { dashboardRoutes, standardRoutes } from "routes";

const getRouteName = (pathname) => {
  let route = dashboardRoutes
    .concat(Object.values(standardRoutes))
    .find((route) => {
      // If the base of the current route is equal to the defined rout path
      return route.path === pathname.split("/")[1];
    });
  if (route) return route.name;
};

const useUiInfo = (uiInfo,eventInfo) => {
  const location = useLocation();

  React.useEffect(() => {
    if (uiInfo) {
      const routeName = getRouteName(location.pathname);
      const { contestantTitle } = uiInfo;
      let title = routeName;
      if (contestantTitle) title += ` - ${contestantTitle}`;
      document.title = title;
    }
  }, [location, uiInfo]);
};

export default useUiInfo;
