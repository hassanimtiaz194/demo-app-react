import React, { useEffect, useRef } from "react";
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
import ReactGA from "react-ga4";
import * as yup from "yup";
import { useFormik } from 'formik';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});


function ForgotPage(props) {
  const classes = useStyles();
  const comRef = useRef(); 
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const { forgotPasswordResponse, forgotPassword } = props;

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      forgotPassword(values.email);
    },
  });
  React.useEffect(() => {
    if (formik.touched.email && Boolean(formik.errors.email) === true) {
      if (comRef) {
        comRef.current.children[1].firstChild.focus();
      }
    }
  }, [formik])

  React.useEffect(() => {
    if (!forgotPasswordResponse) return;
    if (forgotPasswordResponse.success === 0) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    setLoading(false);
  }, [forgotPasswordResponse]);


  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/forgot" });
    comRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }, []);

  return (
    <Grid id='reactForgot'>
      <div style={{ display: "none" }} role="status" aria-live="polite">
        Loading
      </div>
      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>
      {success ? (
        <Grid container style={{ marginTop: 40 }}>
          <Typography variant="body1" role='alert'>
            The reset link has been sent to specified email address. Please
            check your inbox
          </Typography>
          <Grid item sm={12} style={{ marginTop: 20 }}>
            <Link href="/login" variant="body2">
              Go back to login page
            </Link>
          </Grid>
        </Grid>
      ) : (
        <form className={classes.form} /* onSubmit={onSubmit} */>
          <TextField
            inputProps={{
              "aria-label": "email",
              'aria-labelledby': "emailAddressFieldHelper"
            }}
            variant="outlined"
            margin="normal"
            type="email"
            ref={comRef}
            value={formik.values.email}
            onChange={formik.handleChange}
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            className={classes.TextField}
            FormHelperTextProps={{
              'id': "emailAddressFieldHelper"
            }}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          //autoFocus
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
            disabled={loading}
            role="status"
            onClick={formik.handleSubmit}
          >
            {loading ? (
              <CircularProgress
                size={24}
                style={{ 'color': 'white' }}
                aria-label='Loading'
              />
            ) : (<> Reset </>)}
          </Button>
        </form>
      )}
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  forgotPasswordResponse: authSelectors.makeSelectForgotPasswordResponse(),
});

const mapDispatchToProps = function (dispatch) {
  return {
    forgotPassword: (email) => {
      dispatch(authActions.forgotPassword(email));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPage);