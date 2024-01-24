import React, { useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { authSelectors } from "redux/selectors";

import useStyles from "./style";
import { authActions } from "redux/actions";
import { commonApiSelectors } from "redux/selectors";
import * as yup from "yup";
import { useFormik } from 'formik';
import { usePasswordsValidition } from "hooks/usePasswordsValidition";


const validationSchema1 = yup.object({
  password: yup.string('Enter password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirmPassword: yup.string('Enter confirm password')
    .min(6, 'Confirm Password should be of minimum 6 characters length')
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: () => yup.string().oneOf(
        [yup.ref("password")],
        "Passwords do not match"
      ),
    })
    .required('Confirm Password is required'),
});

const validationSchema2 = yup.object({
  password: yup.string('Enter password')
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
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: () => yup.string().oneOf(
        [yup.ref("password")],
        "Passwords do not match"
      ),
    })
    .required('Confirm Password is required'),
});

function ResetPage(props) {
  const classes = useStyles();
  const comRef = useRef();
  const conPassword = useRef();
  const authResult = new URLSearchParams(window.location.search);
  const token = authResult.get("token");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [form, setForm] = React.useState({});
  const [isError, setIsError] = React.useState(false);
  const [isError2, setIsError2] = React.useState(false);



  const { resetPasswordResponse, resetPassword, eventInfo } = props;
  const { advanceSecurityEnabled } = eventInfo;
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: advanceSecurityEnabled ? validationSchema2 : validationSchema1,
    onSubmit: (values) => {
      setLoading(true);
      resetPassword(token, values.password);
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
  } = usePasswordsValidition(formik, advanceSecurityEnabled, null);

  useEffect(() => {
    if (!resetPasswordResponse) return;
    if (resetPasswordResponse.success) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    setLoading(false);
  }, [resetPasswordResponse]);

  useEffect(() => {
    if (comRef.current)
      comRef.current.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });

  }, []);

  /*  React.useEffect(() => {
   if (formik.touched.password && Boolean(formik.errors.password) === true) {
       if (comRef) {
         comRef.current.children[1].firstChild.focus();
       }
     }
     if (formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword) === true) {
       if (conPassword) {
         conPassword.current.children[1].firstChild.focus();
       }
     } 
     if (Boolean(formik.errors.password) === true && passwordsMatch === true) {
       setIsError(true)
     } else if (Boolean(formik.errors.password) === false && passwordsMatch !== true) {
       setIsError(false)
     }
     if (Boolean(formik.errors.confirmPassword) === true) {
       setIsError2(true)
     } else if (Boolean(formik.errors.confirmPassword) === false) {
       setIsError2(false)
     }
   }, [formik]) */

  return (
    <Grid id='reactReset'>

      <Typography component="h1" variant="h5">
        Reset Password
      </Typography>
      {success ? (
        <Grid container style={{ marginTop: 40 }}>
          <Typography variant="body1">
            Your password is updated successfully.
          </Typography>
          <Grid item sm={12} style={{ marginTop: 20 }}>
            <Link href="/login" variant="body2">
              Go back to login page
            </Link>
          </Grid>
        </Grid>
      ) : (
        <form className={classes.form} /* onSubmit={onSubmit} */>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                inputProps={{
                  "aria-label": "Password",
                  'aria-labelledby': "passwordFieldHelper"
                }}
                ref={comRef}
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                FormHelperTextProps={{
                  'id': "passwordFieldHelper"
                }}
                error={formik.touched.password && formik.errors.password}
                className={classes.textField}
                /* helperText={formik.errors.password} */
                onFocus={() => { setIsError(true) }}
                onBlur={() => { setIsError(false) }}
              />
            </Grid>
            <>
              {isError && (
                <>
                  {advanceSecurityEnabled ? (
                    <div className={classes.divInvalid}>
                      <h4 style={{ padding: 10, paddingBottom: 0, paddingTop: 0 }}>Password must meet the following requirements:</h4>
                      <ul style={{ fontSize: 12, listStyle: 'none', }}>
                        {minCharacters ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Be at least <strong>8 characters</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Be at least <strong>8 characters</strong></li>}
                        {containDigit ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one number</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one number</strong></li>}
                        {containUpperCase ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one capital letter</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one capital letter</strong></li>}
                        {containSpecialCharacter ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one special character</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one special character</strong></li>}
                        {passwordsMatch ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Passwords <strong> do not Match</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Passwords <strong>Match</strong></li>}
                      </ul>
                    </div>
                  ) : (
                    <div className={classes.divInvalid}>
                      <h4 style={{ padding: 10, paddingBottom: 0, paddingTop: 0 }}>Password must meet the following requirements:</h4>
                      <ul style={{ fontSize: 12, listStyle: 'none', }}>
                        {minCharacters ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Be at least <strong>6 characters</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Be at least <strong>6 characters</strong></li>}
                        {passwordsMatch ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Passwords <strong>do not Match</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Passwords <strong>Match</strong></li>}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </>
            <Grid item xs={12}>
              <TextField
                inputProps={{
                  "aria-label": "Confirm Password",
                  'aria-labelledby': "confirmPasswordFieldHelper"
                }}
                ref={conPassword}
                variant="outlined"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                FormHelperTextProps={{
                  'id': "confirmPasswordFieldHelper"
                }}
                error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                className={classes.textField}
                /* helperText={formik.errors.confirmPassword} */
                onFocus={() => { setIsError2(true) }}
                onBlur={() => { setIsError2(false) }}
              />
            </Grid>
            <>
              {isError2 && (
                <>
                  {advanceSecurityEnabled ? (
                    <div className={classes.divInvalid}>
                      <h4 style={{ padding: 10, paddingBottom: 0, paddingTop: 0 }}>Password must meet the following requirements:</h4>
                      <ul style={{ fontSize: 12, listStyle: 'none', }}>
                        {minCharacters2 ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Be at least <strong>8 characters</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Be at least <strong>8 characters</strong></li>}
                        {containDigit2 ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one number</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one number</strong></li>}
                        {containUpperCase2 ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one capital letter</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one capital letter</strong></li>}
                        {containSpecialCharacter2 ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one special character</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one special character</strong></li>}
                        {passwordsMatch ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Passwords <strong>Match</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Passwords <strong> do not Match</strong></li>}
                      </ul>
                    </div>
                  ) : (
                    <div className={classes.divInvalid}>
                      <h4 style={{ padding: 10, paddingBottom: 0, paddingTop: 0 }}>Password must meet the following requirements:</h4>
                      <ul style={{ fontSize: 12, listStyle: 'none', }}>
                        {minCharacters2 ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Be at least <strong>6 characters</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Be at least <strong>6 characters</strong></li>}
                        {passwordsMatch ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Passwords <strong>Match</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Passwords <strong> do not Match</strong></li>}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </>
          </Grid>
          <br />
          <div className={classes.resetButtonContainer}>
            <div className={classes.wrapper}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
                disabled={loading}
                onClick={formik.handleSubmit}
              >
                Reset
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </div>
        </form>
      )}
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  resetPasswordResponse: authSelectors.makeSelectResetPasswordResponse(),
  eventInfo: commonApiSelectors.makeSelectEventInfo(),
});

const mapDispatchToProps = function (dispatch) {
  return {
    resetPassword: (token, password) => {
      dispatch(authActions.resetPassword(token, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPage);