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

import { resendEmailVerification } from "api";

function EmailIsNotVerifiedPage(props) {
  const classes = useStyles();
  const comRef = useRef();

  const { authToken } = props;
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const isCameFromRegistration = params.get("confirmation");

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [verificationContent, setContent] = React.useState("");

  useEffect(() => {
    if (isCameFromRegistration) {
      setContent(
        <>
          <Typography variant="body1" style={{ textAlign: 'justify' }}>
            Thank you for registering. Please check your email to complete the
            registration process. If you have not received your registration
            confirmation email in a few minutes, please click{" "}
            <Link href="#" onClick={sendVerificaton} variant="body1">
              here{" "}
            </Link>
            to have it resent.
          </Typography>
          <br />
          <Link href="/" variant="body1">
            Go Back to Login Page
          </Link>
        </>
      );
    } else {
      setContent(
        <>
          <Typography variant="body1" style={{ textAlign: 'justify' }}>
            Your email address has not yet been verified. Please verify your email
            address by clicking on the link inside your registration confirmation
            email. If you need your registration confirmation email to be resent,
            please click{" "}
            <Link href="#" onClick={sendVerificaton} variant="body1">
              here.
            </Link>
          </Typography>
        </>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    comRef.current.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
  }, [isCameFromRegistration]);

  const sendVerificaton = (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    setLoading(true);
    const teamMemberEmail = localStorage.getItem("teamMemberEmail");
    resendEmailVerification(email ?? teamMemberEmail, authToken)
      .then(({ message }) => {
        setMessage(message);
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        err.response.json();
        setSuccess(false);
        setLoading(false);
      });
  };

  return (
    <Grid id='reactVerification'>

      <Typography component="h1" variant="h5" style={{ textAlign: 'center', fontWeight:700 }}>
        {isCameFromRegistration  ? "Please check your Inbox" : "Verify Email"}
      </Typography>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div ref={comRef} />
      <Grid container style={{ marginTop: 40 }}>
        <Typography variant="body1">
          {success ? message : verificationContent}
        </Typography>
        <Typography variant="body1">
          {success ? <Link href="/" variant="body1">
            Go Back to Login Page
          </Link> : ''}
        </Typography>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  authToken: initAppSelectors.makeSelectInitAppToken(),
});

export default connect(mapStateToProps, null)(EmailIsNotVerifiedPage);
