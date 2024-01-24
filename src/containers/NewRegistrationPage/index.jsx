import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import { connect } from "react-redux";

import "../../typedefs/team.typedef";

import useStyles from "./style";
import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { useRef } from "react";
import * as yup from "yup";
import { useFormik } from 'formik';
//import { Grid, TextField, Typography, FormHelperText } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { createStructuredSelector } from "reselect";
import { commonApiSelectors } from "redux/selectors";
import { usePasswordsValidition } from "hooks/usePasswordsValidition";

const minValidationSchemaWithTeamName = yup.object({
  teamName: yup
    .string('Enter your Team Name')
    .min(2, 'Team Name Too Short!')
    .max(50, 'Team Name Too Long!')
    .required('Team Name is Required'),
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
  newPassword: yup.string('Enter new password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirmPassword: yup.string('Enter confirm password')
    .min(6, 'Confirm Password should be of minimum 6 characters length')
    .when("newPassword", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: () => yup.string().oneOf(
        [yup.ref("newPassword")],
        "Passwords do not match"
      ),
    })
    .required('Confirm Password is required'),
});

const minValidationSchemaWithoutTeamName = yup.object({
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
  newPassword: yup.string('Enter new password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirmPassword: yup.string('Enter confirm password')
    .min(6, 'Confirm Password should be of minimum 6 characters length')
    .when("newPassword", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: () => yup.string().oneOf(
        [yup.ref("newPassword")],
        "Passwords do not match"
      ),
    })
    .required('Confirm Password is required'),
});

const maxValidationSchemaWithTeamName = yup.object({
  teamName: yup
    .string('Enter your Team Name')
    .min(2, 'Team Name Too Short!')
    .max(50, 'Team Name Too Long!')
    .required('Team Name is Required'),
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
  newPassword: yup.string('Enter password')
    .min(8, 'Password should be of minimum 8 characters length')
    .matches(/[0-9]/, 'Contains at least one number')
    .matches(/[A-Z]/, 'Contains at least one capital letter')
    .matches(/[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/, 'Contains at least one special character')
    .required('Password is required'),
  confirmPassword: yup.string('Enter confirm password')
    .min(8, 'Confirm Password should be of minimum 8 characters length')
    .matches(/[0-9]/, 'Contains at least one number')
    .matches(/[A-Z]/, 'Contains at least one capital letter')
    .matches(/[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/, 'Contains at least one special character')
    .when("newPassword", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: () => yup.string().oneOf(
        [yup.ref("newPassword")],
        "Passwords do not match"
      ),
    })
    .required('Confirm Password is required'),
});

const maxValidationSchemaWithoutTeamName = yup.object({
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
  newPassword: yup.string('Enter password')
    .min(8, 'Password should be of minimum 8 characters length')
    .matches(/[0-9]/, 'Contains at least one number')
    .matches(/[A-Z]/, 'Contains at least one capital letter')
    .matches(/[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/, 'Contains at least one special character')
    .required('Password is required'),
  confirmPassword: yup.string('Enter confirm password')
    .min(8, 'Confirm Password should be of minimum 8 characters length')
    .matches(/[0-9]/, 'Contains at least one number')
    .matches(/[A-Z]/, 'Contains at least one capital letter')
    .matches(/[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/, 'Contains at least one special character')
    .when("newPassword", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: () => yup.string().oneOf(
        [yup.ref("newPassword")],
        "Passwords do not match"
      ),
    })
    .required('Confirm Password is required'),
});


export function NewRegisterationPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { eventInfo } = props;

  const fnameInput = useRef();
  const lnameInput = useRef();
  const emailInput = useRef();
  const idleTimerRef = useRef(null);
  const [isError, setIsError] = useState(false);
  const [isError2, setIsError2] = useState(false);

  const formik = useFormik({
    initialValues: {
      teamName: '',
      fname: '',
      lname: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema:
      eventInfo.advanceSecurityEnabled === true && eventInfo.teamAddOn === true
        ? maxValidationSchemaWithTeamName
        : eventInfo.advanceSecurityEnabled === false && eventInfo.teamAddOn === true
          ? minValidationSchemaWithTeamName
          : eventInfo.advanceSecurityEnabled === true && eventInfo.teamAddOn === false
            ? maxValidationSchemaWithoutTeamName
            : minValidationSchemaWithoutTeamName,
    onSubmit: (values) => {
      if (eventInfo.teamAddOn === false) {
        const obj = {
          ...values,
          teamName: `${values.fname} ${values.lname}`,
        }
        console.log(obj);
      } else {
        console.log(values);
      }
      //setSubmitted(true);
      //addTeamMember(values);

    },
  });

  const {
    minCharacters,
    minCharacters2,
    containDigit,
    containDigit2,
    containUpperCase,
    containUpperCase2,
    containSpecialCharacter,
    containSpecialCharacter2,
    passwordsMatch
  } = usePasswordsValidition(formik, eventInfo.advanceSecurityEnabled, null);

  return (
    <Container className={classes.root} maxWidth="sm">
      <form>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={2}
          alignItems="center"
        >
          <Typography className={classes.title} component='h2' variant="h5">
            Registration Form
          </Typography>
          <Grid
            style={{ margin: 0 }}
            container
            direction="row"
            justify="center"
            spacing={2}
          >
            {eventInfo.teamAddOn && (
              <Grid item xs={12}>
                <div className={classes.label} >
                  <EditIcon style={{ fill: "#89ba39" }} noWrap />
                  <div style={{ display: 'inline-block', marginLeft: '5px', fontWeight: 'bold', fontSize: 16 }} >
                    Team Name
                    <span style={{ color: 'red', marginLeft: 5, fontSize: 24 }}>*</span>
                  </div>
                </div>
                <TextField
                  inputProps={{
                    "aria-label": "Team Name",
                    'aria-labelledby': "teamNameFieldHelper",
                    autoComplete: "on",
                    maxLength: 30
                  }}
                  variant="outlined"
                  fullWidth
                  required
                  name="teamName"
                  style={{ minWidth: 130 }}
                  value={formik.values.teamName}
                  onChange={formik.handleChange}
                  /* aria-describedby="fnameHelper" */
                  FormHelperTextProps={{
                    'id': "teamNameFieldHelper"
                  }}
                  //ref={fnameInput}
                  error={formik.touched.teamName && Boolean(formik.errors.teamName)}
                  className={classes.textField}
                  helperText={formik.touched.teamName && formik.errors.teamName}
                />
                <span style={{ color: "#3D3D3D" }} role='status'>Characters {formik.values.teamName.length}/30</span>
              </Grid>
            )}
            <Grid item xs={12}>
              <div className={classes.label} >
                <EditIcon style={{ fill: "#89ba39" }} noWrap />
                <div style={{ display: 'inline-block', marginLeft: '5px', fontWeight: 'bold', fontSize: 16 }} >
                  First Name
                  <span style={{ color: 'red', marginLeft: 5, fontSize: 24 }}>*</span>
                </div>
              </div>
              <TextField
                inputProps={{
                  "aria-label": "First name",
                  'aria-labelledby': "firstNameFieldHelper",
                  autoComplete: "on",
                  maxLength: 30
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
                ref={fnameInput}
                error={formik.touched.fname && Boolean(formik.errors.fname)}
                className={classes.textField}
                helperText={formik.touched.fname && formik.errors.fname}
              />
              <span style={{ color: "#3D3D3D" }} role='status'>Characters {formik.values.fname.length}/30</span>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.label} >
                <EditIcon style={{ fill: "#89ba39" }} noWrap />
                <div style={{ display: 'inline-block', marginLeft: '5px', fontWeight: 'bold', fontSize: 16 }} >
                  Last Name
                  <span style={{ color: 'red', marginLeft: 5, fontSize: 24 }}>*</span>
                </div>
              </div>
              <TextField
                /* {...getErrorProps("lname")} */
                inputProps={{
                  "aria-label": "Last name",
                  'aria-labelledby': "lastNameFieldHelper",
                  autoComplete: "on",
                  maxLength: 30
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
                ref={lnameInput}
                /* aria-describedby="lnameHelper" */
                FormHelperTextProps={{
                  'id': "lastNameFieldHelper"
                }}
                error={formik.touched.lname && Boolean(formik.errors.lname)}
                className={classes.textField}
                helperText={formik.touched.lname && formik.errors.lname}
              />
              <span style={{ color: "#3D3D3D" }} role='status'>Characters {formik.values.lname.length}/30</span>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.label} >
              <EditIcon style={{ fill: "#89ba39" }} noWrap />
              <div style={{ display: 'inline-block', marginLeft: '5px', fontWeight: 'bold', fontSize: 16 }} >
                Email
                <span style={{ color: 'red', marginLeft: 5, fontSize: 24 }}>*</span>
              </div>
            </div>
            <TextField
              /* {...getErrorProps("email")} */
              inputProps={{
                "aria-label": "Email address",
                'aria-labelledby': "emailAddressFieldHelper",
                maxLength: 30
              }}
              variant="outlined"
              style={{ minWidth: 130 }}
              fullWidth
              required
              name="email"
              className={classes.error + ' ' + classes.textField}
              value={formik.values.email}
              onChange={formik.handleChange}
              ref={emailInput}
              FormHelperTextProps={{
                'id': "emailAddressFieldHelper"
              }}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <span style={{ color: "#3D3D3D" }} role='status'>Characters {formik.values.email.length}/30</span>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.label} >
              <EditIcon style={{ fill: "#89ba39" }} noWrap />
              <div style={{ display: 'inline-block', marginLeft: '5px', fontWeight: 'bold', fontSize: 16 }} >
                Password
                <span style={{ color: 'red', marginLeft: 5, fontSize: 24 }}>*</span>
              </div>
            </div>
            <TextField
              inputProps={{
                "aria-label": "Password",
                'aria-labelledby': "passwordFieldHelper",
                autoComplete: "on",
                maxLength: 30
              }}
              variant="outlined"
              fullWidth
              required
              name="newPassword"
              style={{ minWidth: 130 }}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              /* aria-describedby="fnameHelper" */
              FormHelperTextProps={{
                'id': "passwordFieldHelper"
              }}
              //ref={fnameInput}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              className={classes.textField}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              onFocus={() => { setIsError(true) }}
              onBlur={() => { setIsError(false) }}
            />
            <span style={{ color: "#3D3D3D" }} role='status'>Characters {formik.values.newPassword.length}/30</span>
          </Grid>
          {isError && (
            <>
              {eventInfo.advanceSecurityEnabled ? (
                <div className={classes.divInvalid} id="password-error" role="alert">
                  <h4 style={{ padding: 10, paddingBottom: 0, paddingTop: 0 }}>Password must meet the following requirements:</h4>
                  <ul style={{ fontSize: 12, listStyle: 'none', }}>
                    {minCharacters ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Be at least <strong>8 characters</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Be at least <strong>8 characters</strong></li>}
                    {containDigit ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one number</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one number</strong></li>}
                    {containUpperCase ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one capital letter</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one capital letter</strong></li>}
                    {containSpecialCharacter ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one special character</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one special character</strong></li>}
                    {passwordsMatch ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Passwords <strong>Match</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Passwords <strong> do not Match</strong></li>}
                  </ul>
                </div>
              ) : (
                <div className={classes.divInvalid} id="password-error" role="alert">
                  <h4 style={{ padding: 10, paddingBottom: 0, paddingTop: 0 }}>Password must meet the following requirements:</h4>
                  <ul style={{ fontSize: 12, listStyle: 'none', }}>
                    {minCharacters ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Be at least <strong>6 characters</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Be at least <strong>6 characters</strong></li>}
                    {passwordsMatch ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Passwords <strong>Match</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Passwords <strong> do not Match</strong></li>}
                  </ul>
                </div>
              )}
            </>
          )}
          <Grid item xs={12}>
            <div className={classes.label} >
              <EditIcon style={{ fill: "#89ba39" }} noWrap />
              <div style={{ display: 'inline-block', marginLeft: '5px', fontWeight: 'bold', fontSize: 16 }} >
                Confirm Password
                <span style={{ color: 'red', marginLeft: 5, fontSize: 24 }}>*</span>
              </div>
            </div>
            <TextField
              /*  {...getErrorProps("fname")} */
              inputProps={{
                "aria-label": "Confirm Password",
                'aria-labelledby': "confirmPasswordFieldHelper",
                autoComplete: "on",
                maxLength: 30
              }}
              variant="outlined"
              fullWidth
              required
              name="confirmPassword"
              style={{ minWidth: 130 }}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              /* aria-describedby="fnameHelper" */
              FormHelperTextProps={{
                'id': "confirmPasswordFieldHelper"
              }}
              //ref={fnameInput}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              className={classes.textField}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              onFocus={() => { setIsError2(true) }}
              onBlur={() => { setIsError2(false) }}
            />
            <span style={{ color: "#3D3D3D" }} role='status'>Characters {formik.values.confirmPassword.length}/30</span>
            {isError2 && (
              <>
                {eventInfo.advanceSecurityEnabled ? (
                  <div className={classes.divInvalid2} id="cpassword-error" role="alert">
                    <h4 style={{ padding: 10, paddingBottom: 0, paddingTop: 0 }}>Password must meet the following requirements:</h4>
                    <ul style={{ fontSize: 12, listStyle: 'none', }}>
                      {minCharacters2 ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Be at least <strong>8 characters</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Be at least <strong>8 characters</strong></li>}
                      {containDigit2 ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one number</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one number</strong></li>}
                      {containUpperCase2 ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one capital letter</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one capital letter</strong></li>}
                      {containSpecialCharacter2 ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one special character</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one special character</strong></li>}
                      {passwordsMatch ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Passwords <strong>do not Match</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Passwords <strong>Match</strong></li>}
                    </ul>
                  </div>
                ) : (
                  <div className={classes.divInvalid2} id="cpassword-error" role="alert">
                    <h4 style={{ padding: 10, paddingBottom: 0, paddingTop: 0 }}>Password must meet the following requirements:</h4>
                    <ul style={{ fontSize: 12, listStyle: 'none', }}>
                      {minCharacters2 ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Be at least <strong>6 characters</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Be at least <strong>6 characters</strong></li>}
                      {passwordsMatch ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Passwords <strong>do not Match</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Passwords <strong>Match</strong></li>}
                    </ul>
                  </div>
                )}
              </>
            )}

          </Grid>
          <Grid sm={12} item>
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={formik.handleSubmit}
              className={classes.submit}
            >
              Sign up
            </Button>
            <br />
            <Link href="/login" variant="body1">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  eventInfo: commonApiSelectors.makeSelectEventInfo(),
});

/* const mapDispatchToProps = function (dispatch) {
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
}; */

export default connect(mapStateToProps, null)(NewRegisterationPage);