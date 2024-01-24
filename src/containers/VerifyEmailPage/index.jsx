import React, { useEffect, useRef } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { initAppSelectors } from "redux/selectors";

import useStyles from "./style";

import { verifyEmail } from "api";

function VerifyEmailPage(props) {
  const classes = useStyles();

  const { authToken } = props;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("token");

  const [loading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const comRef = useRef();

  useEffect(() => {
    verifyEmail(code, authToken)
      .then(() => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        err.response.json();
        setSuccess(false);
        setLoading(false);
      });
    comRef.current.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
  }, [code, authToken]);

  return (
    <>
      <Typography component="h1" variant="h5">
        Thank You
      </Typography>
      <div ref={comRef} />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {!loading && (
        <Grid container style={{ marginTop: 40 }}>
          <Typography variant="body1">
            {success
              ? "Your email has been successfully verified!"
              : "This email address has already been verified"}
          </Typography>
          <Grid item sm={12} style={{ marginTop: 20 }}>
            <Link href="/login" variant="body2">
              Go back to login page
            </Link>
          </Grid>
        </Grid>
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  authToken: initAppSelectors.makeSelectInitAppToken(),
});

export default connect(mapStateToProps, null)(VerifyEmailPage);
