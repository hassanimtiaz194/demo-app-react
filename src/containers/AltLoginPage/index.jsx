import React, { useEffect, useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory, useLocation } from "react-router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Alert } from "@material-ui/lab";
import {
  authSelectors,
  globalSelectors,
  commonApiSelectors,
  dashboardSelectors,
} from "redux/selectors";

import useStyles from "./style";
import { authActions, globalActions } from "redux/actions";
import ReactGA from "react-ga4";
import moment from "moment";

export function AltLoginPage(props) {
  const classes = useStyles();
  const comRef = useRef();

  // local state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const currentDate = moment();
  const location = useLocation();

  // state properties
  const { token,
    isLoading,
    authError,
    timeLine,
    event,
    regStatus,
    competitionStatus,
    registrationNotStartedMessage,
    CMSMsg,
    registrationIsEndedMessage,
    uiInfo } = props;


  // state actions
  const { loginUser, endLoading, socialLoginUser } = props;
  let history = useHistory();


  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/altlogin" });
  }, []);

  
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  useEffect(() => {
    if (authError) {
      setErrorMessage(
        "You've entered an invalid email or password. Please try again."
      );

      endLoading();
    }
    setLoading(isLoading);
  }, [authError, isLoading, endLoading]);

  useEffect(() => {
    if (location.hash === '#login-center-section') {
      if (uiInfo?.topHtml !== "" && uiInfo?.topHtml !== undefined && uiInfo?.topHtml !== null) {
        comRef.current.scrollIntoView({ behavior: 'smooth', block: "center", inline: "end" });
      }
    }
  }, [comRef, uiInfo, location]);

  const handleRemember = () => {
    setRemember(!remember);
  };

  const getCompetitionStatus = (timeLine, currentDate) => {
    const startDate = new Date(timeLine?.competitionStartDate);
    const endDate = new Date(timeLine?.competitionEndDate);
    if (currentDate.isBefore(timeLine?.competitionStartDate)) {
      return `The competition has not yet began. Please return on ${startDate}`;
    }
    if (currentDate.isAfter(timeLine?.competitionEndDate)) {
      return `ThaAnk you for your interest, but the competition ended on ${endDate}`;
    }
  };
  return (
    <Grid id='login-center-section' ref={comRef} >
      {(currentDate.isBefore(timeLine?.competitionStartDate) === true || currentDate.isAfter(timeLine?.competitionEndDate) === true) && (
        <div role='alert' className={classes.submissionStatusAlert}>{getCompetitionStatus(timeLine, currentDate)}</div>
      )}
      <br />
      {(currentDate.isBefore(timeLine?.competitionStartDate) === false && currentDate.isAfter(timeLine?.competitionEndDate) === false
        && regStatus !== 0 && regStatus !== null && regStatus !== undefined) && (
          <>
            {regStatus === -1 && (<Alert role="alert" icon={false} severity="warning" variant="outlined">{registrationNotStartedMessage}</Alert>)}
            {regStatus === 1 && (<Alert role="alert" icon={false} severity="warning" variant="outlined">{registrationIsEndedMessage}</Alert>)}
            <br />
          </>
        )}
      <Typography id="altLogin-Heading" component="h1" variant="h3" style={{ textAlign: 'center', fontSize: '2.50rem' }}>
        Welcome back!
        <br />
        {eventTitle}
      </Typography>
      <Typography id="altLogin-paragraph" component="p" variant="p" style={{textAlign:'justify'}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam explicabo, facere similique ad adipisci vel iste asperiores perferendis deleniti magni, ullam in praesentium architecto quibusdam dolorem rem pariatur repudiandae eveniet.
      </Typography>

      <br />
      <>
        {regStatus === 0 && (
          < GoogleLogin
            type='standard'
            width='700px'
            shape='circle'
            logo_alignment='left'
            theme='filled_blue'
            onSuccess={credentialResponse => {
              //console.log(credentialResponse);
              var decoded = jwt_decode(credentialResponse.credential);
              const picture = decoded.picture.replace('=s96', '=s1024');
              socialLoginUser(decoded.email, decoded.given_name, decoded.family_name, picture, 'google');
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        )}
      </>
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  token: authSelectors.makeSelectToken(),
  event: commonApiSelectors.makeSelectEventInfo(),
  regStatus: commonApiSelectors.makeSelectRegStatus(),
  registrationNotStartedMessage:
    commonApiSelectors.makeSelectRegistrationNotStartedMessage(),
  registrationIsEndedMessage:
    commonApiSelectors.makeSelectRegistrationIsEndedMessage(),
  competitionStatus: dashboardSelectors.makeSelectOutsidePhasePeriodMessage(),
  authError: authSelectors.makeSelectAuthError(),
  timeLine: commonApiSelectors.makeSelectFullTimeLine(),
  isLoading: globalSelectors.makeSelectGlobalProgressIsLoading(),
  uiInfo: commonApiSelectors.makeSelectUiInfo(),
  // CMSMsg: commonApiSelectors.makeSelectCMSMsg(),
});

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    loginUser: (evt, username, passowrd, remember) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(authActions.loginUser(username, passowrd, remember));
      dispatch(globalActions.startGlobalProgress());
    },
    socialLoginUser: (contestantEmail, firstName, lastName, profilePicture, provider) => {
      dispatch(authActions.socialLoginUser(contestantEmail, firstName, lastName, profilePicture, provider));
    },
    endLoading: () => {
      dispatch(globalActions.endGlobalProgress());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AltLoginPage);
