import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { CircularProgress } from "@material-ui/core";
import ReactGA from "react-ga4";
import { connect, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import { commonApiSelectors } from "redux/selectors";
import { globalActions } from "redux/actions";

import useStyles from "./styles";

import { standardRoutes } from "routes";
import { useRegistrationForm } from "hooks/useRegistrationForm";
import { useRegisterContestant } from "hooks/useRegisterContestant";
import { useFormElement } from "hooks/useFormElement";

import { USER_REGISTRATION_PAGE_STATUS } from "../../typedefs/contestantFormTemplate.typedef";
import { setInvitationCode } from "redux/actions/commonApiActions";
import TimezoneSelect from "components/TimezoneSelect";
import { Formik, useFormik } from "formik";
import { useEntryFormFomikIntialsValues } from "hooks/useEntryFormFomikIntialsValues";
import { useEntryFormValidationSchema } from "hooks/useEntryFormValidationSchema";
import { formsValidationSchema } from "utils/helpers";


export function RegisterPage(props) {
  const classes = useStyles();
  const location = useLocation();
  const params = new URLSearchParams(window.location.search);
  const isTokenAvailable = params.get("token");
  const dispatch = useDispatch();
  const registerPageFormValidation = useRef();
  const comRef = useRef();
  const formButton = useRef(null);
  let [formButtonClicked, setFormButtonClicked] = useState(false);
  //   state actions
  const { onError } = props;

  // state properties
  const {
    regStatus,
    registrationNotStartedMessage,
    registrationIsEndedMessage,
    eventInfo
  } = props;

  let invitationToken = "";
  if (`/${standardRoutes.registerTeamMember.path}` === location.pathname) {
    // It mean this registration is for team member not for the team leader
    const params = new URLSearchParams(location.search);
    invitationToken = params.get("token");
    //dispatch(setInvitationCode(invitationToken))
  }
  const {
    sections,
    loading,
    errorMessage: loadFormErrorMessage,
  } = useRegistrationForm(invitationToken);
  const { register, errorMessage: registerErrorMessage } =
    useRegisterContestant(invitationToken);
  const { formFields, formElement } = useFormElement(
    sections,
    0,
    true,
    classes.inputField
  );
  const [buttonLoading, setButtonLoading] = useState(false);

  const {
    formikIntialValuesObj
  } = useEntryFormFomikIntialsValues(sections, formFields, eventInfo);
  const {
    entryValidationSchema
  } = useEntryFormValidationSchema(sections, eventInfo);

  useEffect(() => {
    if (loadFormErrorMessage || registerErrorMessage) {
      onError(loadFormErrorMessage || registerErrorMessage);
      setButtonLoading(false);
    }
  }, [loadFormErrorMessage, registerErrorMessage, onError]);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/register" });
    comRef.current.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
  }, []);

  useEffect(() => {
    //console.log(formFields);
  }, [formFields])
  useEffect(() => {
    if (formButton && registerPageFormValidation) {
      if (formButton.current !== null && registerPageFormValidation.current !== null) {
        formButton.current.addEventListener('click', (evt) => {
          if (registerPageFormValidation.current.reportValidity() === false) {
            onError();
            setFormButtonClicked(true)
          }
        })
      }
    }
  }, [formButtonClicked, formButton, formikIntialValuesObj, formsValidationSchema])


  /*   const onSubmit = async (event) => {
      event.preventDefault();
      setButtonLoading(true);
      if (registerPageFormValidation.current.reportValidity() !== false) {
        register(formFields);
      }
    }; */
  return (
    <Grid id='reactRegister' lg={12}>
      <div style={{ display: "none" }} role="status" aria-live="polite">
        Loading
      </div>
      <div ref={comRef} />
      {loading ? (
        <Grid className={classes.loadingContainer} item sm={12}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {regStatus ===
            USER_REGISTRATION_PAGE_STATUS.REGISTRATION_IS_ENDED && (
              <div
                className={classes.error}
                dangerouslySetInnerHTML={{
                  __html: registrationIsEndedMessage,
                }}
              ></div>
            )}
          {regStatus ===
            USER_REGISTRATION_PAGE_STATUS.REGISTRATION_NOT_STARTED && (
              <div
                className={classes.error}
                dangerouslySetInnerHTML={{
                  __html: registrationNotStartedMessage,
                }}
              ></div>
            )}

          {regStatus !== USER_REGISTRATION_PAGE_STATUS.REGISTRATION_IS_ENDED &&
            regStatus !==
            USER_REGISTRATION_PAGE_STATUS.REGISTRATION_NOT_STARTED && (
              <>
                {formikIntialValuesObj !== null && entryValidationSchema &&
                  <Formik
                    enableReinitialize={true}
                    isSubmitting={true}
                    isValidating={true}
                    initialStatus={formButtonClicked}
                    validateOnMount={true}
                    initialValues={
                      formikIntialValuesObj === null ? '' : formikIntialValuesObj
                    }
                    validate={values => {
                      const errors = {};
                      if (entryValidationSchema !== null && entryValidationSchema !== undefined) {
                        entryValidationSchema.map((array) => {
                          // validation Schema for Required url field only
                          if (Object.keys(array)[0].match('url')) {
                            if (!values[Object.keys(array)[0]]) {
                              errors[Object.keys(array)[0]] = Object.values(array)[0];
                            } else if (!/^(http:\/\/|https:\/\/|www\.)?[a-zA-Z0-9\-$]+\.[a-zA-Z]{1,5}?[a-zA-Z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\{\[\}\}\|\\\:\;\'\"\,\<\.\>\/?\*\+]{1,500}/g.test(values[Object.keys(array)[0]])) {
                              errors[Object.keys(array)[0]] = 'Enter a valid URL';
                            }
                          }

                          // validation Schema for Email field
                          if (Object.keys(array)[0].match('email')) {
                            if (!values[Object.keys(array)[0]]) {
                              errors[Object.keys(array)[0]] = Object.values(array)[0];
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values[Object.keys(array)[0]])) {
                              errors[Object.keys(array)[0]] = 'Enter a valid Email Address';
                            }
                          }
                          //validation for confirm Email
                          if (Object.keys(array)[0].match('confirmEmail')) {
                            if (!values[Object.keys(array)[0]]) {
                              errors[Object.keys(array)[0]] = Object.values(array)[0];
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values[Object.keys(array)[0]])) {
                              errors[Object.keys(array)[0]] = 'Enter a valid Email Address';
                            }
                            if (values.email !== values.confirmEmail) {
                              errors[Object.keys(array)[0]] = "Emails don't Match";
                            }
                          }

                          // validation Schema for password field
                          if (Object.keys(array)[0].match('password')) {
                            //passord is true
                            if (eventInfo.advanceSecurityEnabled === true) {
                              if (!values[Object.keys(array)[0]]) {
                                errors[Object.keys(array)[0]] = Object.values(array)[0];
                              }
                              else if (values[Object.keys(array)[0]].length < 7) {
                                errors[Object.keys(array)[0]] = 'Be at least 8 characters';
                              }
                              else if (values[Object.keys(array)[0]].search(/[A-Z]/) === -1) {
                                errors[Object.keys(array)[0]] = 'At least one character';
                              }
                              else if (values[Object.keys(array)[0]].search(/[0-9]/) === -1) {
                                errors[Object.keys(array)[0]] = 'At least one number';
                              }
                              else if (values[Object.keys(array)[0]].search(/[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/) === -1) {
                                errors[Object.keys(array)[0]] = 'At least one special character';
                              }
                            }
                            if (eventInfo.advanceSecurityEnabled === false) {
                              if (!values[Object.keys(array)[0]]) {
                                errors[Object.keys(array)[0]] = Object.values(array)[0];
                              }
                              else if (values[Object.keys(array)[0]].length < 5) {
                                errors[Object.keys(array)[0]] = 'Be at least 6 characters';
                              }
                            }
                            if (values.password !== values.confirmPassword) {
                              errors[Object.keys(array)[0]] = "Password don't Match";
                            }
                          }

                          // validation Schema for confirm password field
                          if (Object.keys(array)[0].match('confirmPassword')) {
                            //passord is true
                            if (eventInfo.advanceSecurityEnabled === true) {
                              if (!values[Object.keys(array)[0]]) {
                                errors[Object.keys(array)[0]] = Object.values(array)[0];
                              }
                              else if (values[Object.keys(array)[0]].length < 7) {
                                errors[Object.keys(array)[0]] = 'Be at least 8 characters';
                              }
                              else if (values[Object.keys(array)[0]].search(/[A-Z]/) === -1) {
                                errors[Object.keys(array)[0]] = 'At least one character';
                              }
                              else if (values[Object.keys(array)[0]].search(/[0-9]/) === -1) {
                                errors[Object.keys(array)[0]] = 'At least one number';
                              }
                              else if (values[Object.keys(array)[0]].search(/[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/) === -1) {
                                errors[Object.keys(array)[0]] = 'At least one special character';
                              }
                            }
                            if (eventInfo.advanceSecurityEnabled === false) {
                              if (!values[Object.keys(array)[0]]) {
                                errors[Object.keys(array)[0]] = Object.values(array)[0];
                              }
                              else if (values[Object.keys(array)[0]].length < 5) {
                                errors[Object.keys(array)[0]] = 'Be at least 6 characters';
                              }
                            }
                            if (values.confirmPassword !== values.password) {
                              errors[Object.keys(array)[0]] = "Password don't Match";
                            }
                          }

                          // validation Schema for other field
                          if (!Object.keys(array)[0].match('password') || !Object.keys(array)[0].match('confirmPassword') || !Object.keys(array)[0].match('url') || !Object.keys(array)[0].match('email')) {
                            if (!values[Object.keys(array)[0]]) {
                              errors[Object.keys(array)[0]] = Object.values(array)[0];
                            }
                          }
                        });
                      }
                      return errors;
                    }}
                    onSubmit={(values, formikBag) => {
                      //alert(JSON.stringify(values, null, 2));
                      setFormButtonClicked(false);
                      setButtonLoading(true);
                      setTimeout(() => {
                        if (registerPageFormValidation.current.reportValidity() !== false) {
                          register(formFields);
                        }
                      }, 5000);
                    }}
                  >
                    {({
                      handleSubmit,
                      errors
                    }) => (
                      <>
                        <form onSubmit={handleSubmit} ref={registerPageFormValidation}>

                          {formElement}
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={(window.location.pathname === '/registerTeamMember' && (isTokenAvailable === null || isTokenAvailable === '')) || buttonLoading}
                            color="primary"
                            className={window.location.pathname === '/registerTeamMember' && (isTokenAvailable === null || isTokenAvailable === '') ? classes.submit2 : classes.submit}
                            role="status"
                            ref={formButton}
                          >
                            {buttonLoading === true ? (
                              <CircularProgress
                                size={24}
                                style={{ 'color': 'white' }}
                                aria-label='Registering User'
                              />
                            ) : (<> Sign Up </>)}
                          </Button>
                          {window.location.pathname === '/registerTeamMember' && (isTokenAvailable === null || isTokenAvailable === '') && (
                            <p style={{color: '#ae0c00', fontWeight:450}}>
                              Token is missing
                            </p>
                          )}
                          <Link href="/login" variant="body1">
                            Already have an account? Sign in
                          </Link>
                        </form>
                      </>)}
                  </Formik>
                }
              </>
            )}
        </>
      )}
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  regStatus: commonApiSelectors.makeSelectRegStatus(),
  eventInfo: commonApiSelectors.makeSelectEventInfo(),
  registrationNotStartedMessage:
    commonApiSelectors.makeSelectRegistrationNotStartedMessage(),
  registrationIsEndedMessage:
    commonApiSelectors.makeSelectRegistrationIsEndedMessage(),
});

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    onError: (errorMessage) => {
      dispatch(
        globalActions.requestResponseReturned({
          error: true,
          message: errorMessage,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
