import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { createStructuredSelector } from "reselect";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

import TimezoneSelect from "components/TimezoneSelect";
import BackdropLoading from "components/BackdropLoading";

import useStyles from "./styles";
import { profileActions, commonApiActions } from "redux/actions";
import { profileSelectors, globalSelectors, commonApiSelectors } from "redux/selectors";
import CircularProgressWithLabel from "components/CircularProgressWithLabel";
import { useRef } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import * as yup from "yup";
import { useFormik } from 'formik';
import { usePasswordsValidition } from "hooks/usePasswordsValidition";

const emailValidationSchema = yup.object({
  newEmail: yup
    .string('Enter new email')
    .email('Enter a valid email')
    .required('New Email is required'),
  confirmEmail: yup
    .string('Enter confirm email')
    .email('Enter a valid email')
    .when("newEmail", {
      is: (val) => (val && val.length > 0 ? true : false),
      then:() => yup.string().oneOf(
        [yup.ref("newEmail")],
        "Emails do not match"
      ),
    })
    .required('Confirm Email is required'),
});

const minSecurityValidationSchema = yup.object({
  newPassword: yup.string('Enter new password')
    .min(6, 'New Password should be of minimum 6 characters length')
    .required('New Password is required'),
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

const maxSecurityValidationSchema = yup.object({
  newPassword: yup.string('Enter password')
    .min(8, 'New Password should be of minimum 8 characters length')
    .matches(/[0-9]/, 'Contains at least one number')
    .matches(/[A-Z]/, 'Contains at least one capital letter')
    .matches(/[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/, 'Contains at least one special character')
    .required('New Password is required'),
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

export function ProfilePage(props) {
  const classes = useStyles();
  const [profileState, setProfileState] = useState({
    firstName: "",
    lastName: "",
    timezone: "",
  });
  const [passwordState, setPasswordState] = useState({});
  const [emailState, setEmailState] = useState({});

  const {
    loadProfile,
    updateProfileDispatch,
    changePasswordDispatch,
    changeEmailDispatch,
    profile,
    profileLoading,
    uploadContestantPhoto,
    uploadProfilePicProgress,
    uploadProfilePicLoaded,
    requestResponse,
    eventInfo,
  } = props;
  const { advanceSecurityEnabled } = eventInfo;
  const [emailInputTarget, setEmailInputTarget] = useState(null);
  const [isProfilePicUploading, setIsProfilePicUploading] = useState(false);
  const [isAlmostDone, setIsAlmostDone] = useState(false);
  const [isPlaceHolder, setIsPlaceHolder] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const newEmailRef = useRef();
  const confirmEmailRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isAriaExpanded, setIsAriaExpanded] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false);
  const [isChangeEmailButtonClicked, setIsChangeEmailButtonClicked] = useState(false);
  const [isChangePasswordButtonClicked, setIsChangePasswordButtonClicked] = useState(false);
  const profilePicButton = useRef();
  const [isError, setIsError] = useState(false);
  const [isError2, setIsError2] = useState(false);

  const emailformik = useFormik({
    initialValues: {
      newEmail: '',
      confirmEmail: ''
    },
    validationSchema: emailValidationSchema,
    onSubmit: (values) => {
      setPageLoading(false);
      setIsChangeEmailButtonClicked(true);
      changeEmailDispatch(values);
    },
  });

  const passwordformik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: advanceSecurityEnabled ? maxSecurityValidationSchema : minSecurityValidationSchema,
    onSubmit: (values) => {
      setPageLoading(false);
      setIsChangePasswordButtonClicked(true)
      changePasswordDispatch(values.newPassword);
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
  } = usePasswordsValidition(passwordformik, advanceSecurityEnabled, null);

  useEffect(() => {
    if (profile) {
      setProfileState(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (requestResponse?.message === 'Profile is successfully updated') {
      setIsUpdateButtonClicked(false);
    }
    if (requestResponse?.message === 'Email is successfully updated') {
      setIsChangeEmailButtonClicked(false);
    }
    if (requestResponse?.message === 'Password is successfully updated') {
      setIsChangePasswordButtonClicked(false);
    }
    if (requestResponse?.error === true) {
      setIsUpdateButtonClicked(false);
      setIsChangeEmailButtonClicked(false);
      setIsChangePasswordButtonClicked(false);
    }
  }, [requestResponse]);

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filename = profile.picture.split("/");
    filename = filename[filename.length - 1];
    if (filename === 'placeHolder.jpg') {
      setIsPlaceHolder(true);
    } else {
      setIsPlaceHolder(false);
      setProfilePicture(profile.picture.replace('/small/', '/large/'));
    }
  }, [profile, isPlaceHolder, profilePicture]);

  useEffect(() => {
    if (uploadProfilePicLoaded === true) {
      setIsProfilePicUploading(false);
      /*    if (requestResponse?.message === 'Your profile picture has been updated') { */
      loadProfile();
    }
    /*     } */
    if (uploadProfilePicProgress > 70) {
      setIsAlmostDone(true);
    } else {
      setIsAlmostDone(false);
    }
  }, [uploadProfilePicProgress, uploadProfilePicLoaded, requestResponse, isProfilePicUploading, profile]);

  /*  React.useEffect(() => {
      if (emailformik.touched.newEmail && Boolean(emailformik.errors.newEmail) === true) {
        if (newEmailRef) {
          newEmailRef.current.children[1].firstChild.focus();
        }
      }
      if (emailformik.touched.confirmEmail && Boolean(emailformik.errors.confirmEmail) === true && Boolean(emailformik.errors.newEmail) === false) {
        if (confirmEmailRef) {
          confirmEmailRef.current.children[1].firstChild.focus();
        }
      }
      if (passwordformik.touched.newPassword && Boolean(passwordformik.errors.newPassword) === true) {
        if (newPasswordRef) {
          newPasswordRef.current.children[1].firstChild.focus();
        }
      }
      if (Boolean(passwordformik.errors.newPassword) === true && passwordsMatch === true) {
        setIsError(true)
      } else if (Boolean(passwordformik.errors.newPassword) === false && passwordsMatch !== true) {
        setIsError(false)
      }
      if (passwordformik.touched.confirmPassword && Boolean(passwordformik.errors.confirmPassword) === true) {
        if (confirmPasswordRef) {
          confirmPasswordRef.current.children[1].firstChild.focus();
        }
      }
      if (Boolean(passwordformik.errors.confirmPassword) === true) {
        setIsError2(true)
      } else if (Boolean(passwordformik.errors.confirmPassword) === false) {
        setIsError2(false)
      }
    }, [emailformik, passwordformik])*/

  const handleProfilePic = (event) => {
    event.preventDefault();
    setIsProfilePicUploading(true);
    const file = event.target.files[0];
    uploadContestantPhoto(file)
  };

  const handleProfileStateChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProfileState({
      ...profileState,
      [name]: value,
    });
  };

  const handleTimeZoneChange = (event, timezone) => {
    setProfileState({ ...profileState, timezone: timezone });
  };

  const updateProfile = (event) => {
    event.preventDefault();
    setPageLoading(false);
    setIsUpdateButtonClicked(true);
    updateProfileDispatch(profileState);
  };

  const handleKeyPress = (event) => {
    if (profilePicButton && profilePicButton !== null && profilePicButton !== undefined) {
      if (event.key === "Enter") {
        if (profilePicButton.current) {
          profilePicButton.current.click()
        }
      }
    }
  };

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <Grid>
      {pageLoading && (<BackdropLoading show={profileLoading}></BackdropLoading>)}
      <Container maxWidth="sm" className={classes.root} component={Paper}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography className={classes.title} component="h1" variant="h5">
            Edit Profile
          </Typography>
          <Grid item>
            {isPlaceHolder ?
              <Avatar variant="circular" className={classes.avatarText} alt={profileState.firstName + " " + profileState.lastName}  {...stringAvatar(`${profileState.firstName} ${profileState.lastName}`)} />
              : <Avatar variant="circular" className={classes.avatar} alt={profileState.firstName + " " + profileState.lastName} src={isProfilePicUploading ? '' : profilePicture}>
                <CircularProgressWithLabel value={uploadProfilePicProgress} isAlmostDone={isAlmostDone} />
              </Avatar>
            }
            {/* <PersonIcon className={classes.person} /> */}
            {/* </Avatar> */}
            <IconButton color="primary" aria-label="upload picture" component="label" onKeyDown={handleKeyPress} style={{ marginTop: 70, marginLeft: -10 }}>
              <input hidden accept="image/*" type="file" onChange={handleProfilePic} ref={profilePicButton} />
              <PhotoCamera />
            </IconButton>
          </Grid>
        </Grid>
        <form onSubmit={updateProfile}>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid xs={12} sm={6} item>
              <TextField
                inputProps={{
                  "aria-label": "First name",
                  autoComplete: "on"
                }}
                name="firstName"
                value={profileState.firstName}
                onChange={handleProfileStateChange}
                fullWidth
                variant="outlined"
                className={classes.textField}
                label="First Name"
                margin="normal"
                autoComplete="on"
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                inputProps={{
                  "aria-label": "Last name",
                  autoComplete: "on"
                }}
                fullWidth
                name="lastName"
                value={profileState.lastName}
                onChange={handleProfileStateChange}
                variant="outlined"
                className={classes.textField}
                label="Last Name"
                margin="normal"
                autoComplete="on"
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TimezoneSelect
                selectedTimeZone={profileState.timezone}
                handleChange={handleTimeZoneChange}
                isAriaExpanded={isAriaExpanded}
                setIsAriaExpanded={setIsAriaExpanded}
                fullWidth
              ></TimezoneSelect>
            </Grid>
            <Grid sm={12} item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                role="status"
              >
                {isUpdateButtonClicked === true ? (
                  <CircularProgress
                    size={24}
                    style={{ 'color': 'white' }}
                    aria-label='Loading'
                  />
                ) : (<> UPDATE </>)}

              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      <Container maxWidth="sm" component={Paper} className={classes.root}>
        <form /* onSubmit={changeEmail} */>
          <Grid
            container
            direction="row"
            justify="center"
            spacing={2}
            alignItems="center"
          >
            <Typography className={classes.title} component="h2" variant="h5">
              Change Email
            </Typography>
            {profileState.email && (
              <Grid item xs={12} sm={12}>
                <Typography className={classes.email} variant="div">
                  {`Email: ${profileState.email}`}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                inputProps={{
                  "aria-label": "New Email",
                  'aria-labelledby': "newEmailFieldHelper"
                }}
                variant="outlined"
                fullWidth
                required
                name="newEmail"
                ref={newEmailRef}
                value={emailformik.values.newEmail}
                onChange={emailformik.handleChange}
                label="New Email"
                type="email"
                className={classes.textField}
                FormHelperTextProps={{
                  'id': "newEmailFieldHelper"
                }}
                error={emailformik.touched.newEmail && Boolean(emailformik.errors.newEmail)}
                helperText={emailformik.touched.newEmail && emailformik.errors.newEmail}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputProps={{
                  "aria-label": "Confirm Email",
                  'aria-labelledby': "confirmEmailFieldHelper"
                }}
                variant="outlined"
                fullWidth
                required
                name="confirmEmail"
                ref={confirmEmailRef}
                value={emailformik.values.confirmEmail}
                onChange={emailformik.handleChange}
                label="Confirm Email"
                type="email"
                className={classes.textField}
                FormHelperTextProps={{
                  'id': "confirmEmailFieldHelper"
                }}
                error={emailformik.touched.confirmEmail && Boolean(emailformik.errors.confirmEmail)}
                helperText={emailformik.touched.confirmEmail && emailformik.errors.confirmEmail}
              />
            </Grid>
            <Grid sm={12} item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                role="status"
                onClick={emailformik.handleSubmit}
              >
                {isChangeEmailButtonClicked === true ? (
                  <CircularProgress
                    size={24}
                    style={{ 'color': 'white' }}
                    aria-label='Loading'
                  />
                ) : (<> CHANGE EMAIL </>)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      <Container maxWidth="sm" component={Paper} className={classes.root}>
        <form /* onSubmit={changePassword} */>
          <Grid
            container
            direction="row"
            justify="center"
            spacing={2}
            alignItems="center"
          >
            <Typography className={classes.title} component="h2" variant="h5">
              Change Password
            </Typography>
            <Grid item xs={12}>
              <TextField
                inputProps={{
                  "aria-label": "New Password",
                  "aria-describedby": "newPasswordFieldHelper"
                }}
                variant="outlined"
                fullWidth
                required
                name="newPassword"
                id="newPassword"
                ref={newPasswordRef}
                value={passwordformik.values.newPassword}
                onChange={passwordformik.handleChange}
                label="New Password"
                type="password"
                FormHelperTextProps={{
                  'id': "newPasswordFieldHelper"
                }}
                error={passwordformik.touched.newPassword && Boolean(passwordformik.errors.newPassword)}
                helperText={passwordformik.errors.newPassword === "New Password is required" ? passwordformik.errors.newPassword : null}
                onFocus={() => { setIsError(true) }}
                onBlur={() => { setIsError(false) }}
                className={classes.textField}
              />
            </Grid>
            {isError && (
              <>
                {advanceSecurityEnabled ? (
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
              <TextField
                inputProps={{
                  "aria-label": "Confirm Password",
                  "aria-describedby": "confirmPasswordFieldHelper"
                }}
                variant="outlined"
                fullWidth
                required
                name="confirmPassword"
                value={passwordformik.values.confirmPassword}
                onChange={passwordformik.handleChange}
                label="Confirm Password"
                ref={confirmPasswordRef}
                type="password"
                FormHelperTextProps={{
                  'id': "confirmPasswordFieldHelper"
                }}
                error={passwordformik.touched.confirmPassword && Boolean(passwordformik.errors.confirmPassword)}
                helperText={passwordformik.errors.confirmPassword === 'Confirm Password is required' ? passwordformik.errors.confirmPassword : null}
                onFocus={() => { setIsError2(true) }}
                onBlur={() => { setIsError2(false) }}
                className={classes.textField}
              />
              {isError2 && (
                <>
                  {advanceSecurityEnabled ? (
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                role='status'
                onClick={passwordformik.handleSubmit}
              >
                {isChangePasswordButtonClicked === true ? (
                  <CircularProgress
                    size={24}
                    style={{ 'color': 'white' }}
                    aria-label='Loading'
                  />
                ) : (<> CHANGE PASSWORD </>)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  profile: profileSelectors.makeSelectProfile(),
  eventInfo: commonApiSelectors.makeSelectEventInfo(),
  profileLoading: profileSelectors.makeSelectProfileLoading(),
  requestResponse: globalSelectors.makeSelectGlobalRequestResponse(),
  uploadProfilePicProgress: commonApiSelectors.makeSelectContestantProfilePhotoProgress(),
  uploadProfilePicLoaded: commonApiSelectors.makeSelectContestantProfilePhotoUploaded(),
  //error: globalSelectors.makeSelectGlobalRequestResponseError(),
});

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    loadProfile: () => {
      dispatch(profileActions.loadProfile());
    },
    updateProfileDispatch: (profile) => {
      dispatch(profileActions.updateProfile(profile));
    },
    changeEmailDispatch: (payload) => {
      dispatch(profileActions.changeEmail(payload));
    },
    changePasswordDispatch: (payload) => {
      dispatch(profileActions.changePassword(payload));
    },
    uploadContestantPhoto: (data) => {
      dispatch(commonApiActions.uploadContestantPhoto(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);