import React, { useEffect, useState } from "react";
import { Grid, Container } from "@material-ui/core";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { commonApiSelectors } from "redux/selectors";

import RequestResponseStatusSnackbar from "components/RequestResponseStatusSnackbar";
import useStyles from "./style";
import { useLocation } from "react-router-dom";

function AuthLayout({ children, uiInfo, parentComponent }) {
  const classes = useStyles();
  let location = useLocation();

  const [headerHtml, setHeaderHtml] = useState("");
  const [footerHtml, setFooterHtml] = useState("");
  const [childComponent, setChildComponent] = useState("");
  const [reactFooter, setReactFooter] = useState(false);

  useEffect(() => {
    const { head } = document;
    if (uiInfo) {
      setHeaderHtml(uiInfo.topHtml || "");
      setFooterHtml(uiInfo.bottonHtml || "");
      const style = document.createElement("style");

      style.innerHTML = uiInfo.css;
      head.appendChild(style);

      if (parentComponent != "login")
        setChildComponent(children);
    }
  }, [uiInfo]);

  useEffect(() => {
    if (location.pathname === '/register' || location.pathname === '/completeRegistration' || location.pathname === '/registerTeamMember') {
      setReactFooter(false);
    }
    else {
      setReactFooter(true);
    }


  }, [location]);

  return (
    <>
      <div
        id='reactHeader'
        dangerouslySetInnerHTML={{
          __html: headerHtml,
        }}
      />


      <main id={location.pathname.replace('/','')} style={{ textAlign: "left" }}>
        <Grid container id='react-container' className={classes.root}>
          <RequestResponseStatusSnackbar />
          <Container maxWidth="xs">
            {parentComponent === "login" ? (
              <div className={classes.formWrapper} id='skild-content-react'>{children}</div>
            ) : (
              <div className={classes.formWrapper} id='skild-content-react'>{childComponent}</div>
            )
            }

          </Container>
        </Grid>
      </main>
      <div
        id='reactFooter'
        dangerouslySetInnerHTML={{
          __html: footerHtml,
        }}
      />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  uiInfo: commonApiSelectors.makeSelectUiInfo(),
});

export default connect(mapStateToProps, null)(AuthLayout);
