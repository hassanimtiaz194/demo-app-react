import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { teamActions, authActions } from "redux/actions";
import { teamSelectors, authSelectors } from "redux/selectors";

import "../../typedefs/team.typedef";

import useStyles from "./style";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router";
import { useValidation } from "./useValidation";
import { useRef } from "react";
import * as yup from "yup";
import { useFormik } from 'formik';
import IdleTimer from "react-idle-timer";
import SessionExpiredDialog from "components/SessionExpiredDialog";

const validationSchema = yup.object({
  fname: yup
    .string('Enter your First Name')
    .min(2, 'First Name Too Short!')
    .max(50, 'First Name Too Long!')
    .required('First Name is Required'),
  lname: yup
    .string('Enter your Last Name')
    .min(2, 'Last Name Too Short!')
    .max(50, 'Last Name Too Long!')
    .required('Last Name is Required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});


export function TeamPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState({});
  const [submitted, setSubmitted] = useState(false);
  // state props
  const { isMemberAdded, errorMessage } = props;
  // state actions
  const {
    addTeamMember,
    onAppLogout,
    logout,
    currentSessionExpired,
    sessionExpired,
    sessionLogout } = props;
  const fnameInput = useRef();
  const lnameInput = useRef();
  const emailInput = useRef();
  const idleTimerRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      personalMsg: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSubmitted(true);
      addTeamMember(values);

    },
  });

  const handleGoBack = () => {
    history.goBack();
  };
  const onIdle = () => {
    currentSessionExpired();
   // if (sessionExpired) {
      window.addEventListener('popstate', () => {
        sessionLogout();
      })
    //}
  };

  useEffect(() => {
    if (isMemberAdded && submitted) {
      // Means successfully team member is added/edited
      history.goBack();
    }
  }, [isMemberAdded, submitted, history]);

  /*   useEffect(() => {
      if (formik.touched.fname && Boolean(formik.errors.fname) === true) {
        if (fnameInput) {
          fnameInput.current.children[1].firstChild.focus();
        }
      }
      if (formik.touched.lname && Boolean(formik.errors.lname) === true) {
        if (lnameInput) {
          lnameInput.current.children[1].firstChild.focus();
        }
      }
      if (formik.touched.email && Boolean(formik.errors.email) === true) {
        if (emailInput) {
          emailInput.current.children[1].firstChild.focus();
        }
      }
    }, [formik, errorMessage]) */

  return (
    <Container className={classes.root} maxWidth="sm">
      <Toolbar className={classes.toolbar}>
        {/* <Tooltip title="Confirm Team Name" aria-label="Confirm Team Name"> */}
        <IconButton
          onClick={handleGoBack}
          edge="start"
          className={classes.menuButton}
          color="primary"
          aria-label="Back"
        >
          <ArrowBack />
        </IconButton>
        {/*  </Tooltip> */}
        <Typography component='p' variant="h6">Back</Typography>
      </Toolbar>
      <Container component={Paper} className={classes.container} maxWidth="sm">
        <IdleTimer
          ref={idleTimerRef}
          timeout={3660000}
          onIdle={onIdle}
        ></IdleTimer>
        {/* <DashboardMessage /> */}
        <SessionExpiredDialog
          sessionExpired={sessionExpired}
          onGoLoginPage={logout}
          onAppLogout={onAppLogout}
        />
        <form>
          <Grid
            container
            direction="row"
            justify="center"
            spacing={2}
            alignItems="center"
          >
            <Typography className={classes.title} component='h2' variant="h5">
              Add/Invite a Team Member
            </Typography>
            {errorMessage && (
              <Typography role="alert" style={{ paddingBottom: 20, color: '#e91c0d' }} color="secondary">
                {errorMessage}
              </Typography>
            )}
            <Grid
              style={{ margin: 0 }}
              container
              direction="row"
              justify="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <TextField
                  /*  {...getErrorProps("fname")} */
                  inputProps={{
                    "aria-label": "First name",
                    'aria-labelledby': "firstNameFieldHelper",
                    autoComplete: "on"
                  }}
                  variant="outlined"
                  fullWidth
                  required
                  name="fname"
                  style={{ minWidth: 130 }}
                  value={formik.values.fname}
                  onChange={formik.handleChange}
                  /* aria-describedby="fnameHelper" */
                  FormHelperTextProps={{
                    'id': "firstNameFieldHelper"
                  }}
                  label="First Name"
                  ref={fnameInput}
                  error={formik.touched.fname && Boolean(formik.errors.fname)}
                  className={classes.textField}
                  helperText={formik.touched.fname && formik.errors.fname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  /* {...getErrorProps("lname")} */
                  inputProps={{
                    "aria-label": "Last name",
                    'aria-labelledby': "lastNameFieldHelper",
                    autoComplete: "on"
                  }}
                  variant="outlined"
                  fullWidth
                  required
                  style={{ minWidth: 130 }}
                  name="lname"
                  /*  error={!!errorMessage}
                   helperText={errorMessage && ('Last Name Required.')} */
                  value={formik.values.lname}
                  onChange={formik.handleChange}
                  label="Last Name"
                  ref={lnameInput}
                  /* aria-describedby="lnameHelper" */
                  FormHelperTextProps={{
                    'id': "lastNameFieldHelper"
                  }}
                  error={formik.touched.lname && Boolean(formik.errors.lname)}
                  className={classes.textField}
                  helperText={formik.touched.lname && formik.errors.lname}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                /* {...getErrorProps("email")} */
                inputProps={{
                  "aria-label": "Email address",
                  'aria-labelledby': "emailAddressFieldHelper"
                }}
                variant="outlined"
                style={{ minWidth: 130 }}
                fullWidth
                required
                name="email"
                className={classes.error + ' ' + classes.textField}
                value={formik.values.email}
                onChange={formik.handleChange}
                /* error={!!errorMessage} */
                label="Email Address"
                ref={emailInput}
                /* aria-describedby="emailHelper" */
                FormHelperTextProps={{
                  'id': "emailAddressFieldHelper"
                }}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              /* className={classes.textField} */
              /*  helperText={errorMessage && ('Email is already registered.')}
               FormHelperTextProps={{
                 'role': "alert",
               }} */
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{
                  "aria-label": "Personal message",
                }}
                variant="outlined"
                style={{ minWidth: 130 }}
                fullWidth
                multiline
                rows={6}
                name="personalMsg"
                value={formik.values.personalMsg}
                onChange={formik.handleChange}
                label="Personal Message"
                className={classes.textField}
              />
            </Grid>
            <Grid sm={12} item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={formik.handleSubmit}
                className={classes.submit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  errorMessage: teamSelectors.makeSelectTeamErrorMessage(),
  isMemberAdded: teamSelectors.makeSelectTeamIsMemberAdded(),
  sessionExpired: authSelectors.makeSelectIsSessionExpired(),
});

const mapDispatchToProps = function (dispatch) {
  return {
    addTeamMember: (member) => {
      dispatch(teamActions.addTeamMember(member));
    },
    onAppLogout: () => {
      dispatch(authActions.appLogout());
    },
    logout: () => {
      dispatch(authActions.logout());
    },
    currentSessionExpired: () => {
      dispatch(authActions.sessionExpired());
    },
    sessionLogout: () => {
      dispatch(authActions.sessionLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);