import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {
  Button,
  CircularProgress,
  DialogContent,
  Grid,
} from "@material-ui/core";
import { Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./style";
import DangerouslySetHtmlContent from "dangerously-set-html-content";
import { globalActions } from "redux/actions";
import {
  authSelectors,
  commonApiSelectors,
  profileSelectors,
} from "redux/selectors";

import { useSocialSignInRegistrationForm } from "hooks/useSocialSignInRegistrationForm";
import { useFormElement } from "hooks/useFormElement";
import { useCompleteRegistration } from "hooks/useCompleteRegistration";
import ProgressBar from "@ramonak/react-progress-bar";
import { Formik } from "formik";
import { submitRegFormData } from "api";
import { useSocialSignInValidationSchema } from "hooks/useSocialSignInValidationSchema";
import { useSocialSignInFormikIntialValues } from "hooks/useSocialSignInFormikIntialValues";

export function SocialSigninRegistration(props) {
  const comRef = useRef();
  const classes = useStyles();
  const {
    token,
    userType,
    onRegError,
    eventInfo,
    socialRegComplete,
    socialRegistrationCompleted,
  } = props;
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const { sections, totalPages, regFormPageNumber, setRegFormPageNumber } =
    useSocialSignInRegistrationForm(token, userType);
  let [formButtonClicked, setFormButtonClicked] = useState(false);
  const { formFields, formElement } = useFormElement(
    sections,
    1,
    true,
    classes.inputField
  );
  const { formikIntialValuesObj } = useSocialSignInFormikIntialValues(
    sections,
    formFields,
    eventInfo
  );
  const { entryValidationSchema } = useSocialSignInValidationSchema(
    sections,
    eventInfo
  );

  const { errorMessage, completeRegistration } = useCompleteRegistration(token);
  // progressbar value passed to component ProgessLinear(BootstrapComponent)
  const [progressValue, setProgressValue] = useState(0);
  // change label of next/submit button
  const [regFormComplete, setRegistrationFormComplete] = useState(false);
  const [previousBtnActive, setPreviousBtnActive] = useState(false);
  const [loading, setLoading] = useState(false);
  let tempRegFormPageNumber = 0;
  const completeRegFormValidation = useRef(null);
  const formButton = useRef(null);
  let [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    //console.log(open);
    if (socialRegComplete) {
      setOpen(true);
    }
  }, [socialRegComplete]);

  const onPrevious = (event) => {
    event.preventDefault();
    setShouldRender(true);
    if (regFormPageNumber < totalPages && regFormPageNumber >= 2) {
      setLoading(true);
      setRegFormPageNumber(regFormPageNumber - 1);
      formFields.forEach((textBoxValue, index) => {
        textBoxValue.answer = "";
      });
    }
    if (regFormPageNumber === totalPages) {
      setLoading(true);
      setRegistrationFormComplete(false);
      setRegFormPageNumber(regFormPageNumber - 1);
      formFields.forEach((textBoxValue, index) => {
        textBoxValue.answer = "";
      });
    }
  };

  useEffect(() => {
    const totalRegFormIndex = totalPages - 1;
    const perPageProgess = 100 / totalRegFormIndex;
    if (regFormPageNumber === 2) {
      setProgressValue(0);
    } else if (regFormPageNumber === totalPages) {
      setRegistrationFormComplete(true);
      setProgressValue(100);
    } else {
      setProgressValue(Math.round((regFormPageNumber - 2) * perPageProgess));
    }
  }, [regFormPageNumber]);

  /*   useEffect(() => {
      if (comRef.current && shouldRender === true) {
        comRef.current.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
        setShouldRender(false)
      }
    }, [formFields,shouldRender]); */

  useEffect(() => {
    if (regFormPageNumber === totalPages) {
      setRegistrationFormComplete(true);
    }
    if (regFormPageNumber > tempRegFormPageNumber) {
      setLoading(false);
    }
    if (errorMessage) {
      onRegError(errorMessage);
    }
    if (regFormPageNumber > 2) {
      setPreviousBtnActive(true);
    }
    if (regFormPageNumber === 2) {
      setPreviousBtnActive(false);
    }
  }, [errorMessage, onRegError, regFormPageNumber, totalPages]);
  useEffect(() => {
    if (formButton && completeRegFormValidation) {
      if (
        formButton.current !== null &&
        completeRegFormValidation.current !== null
      ) {
        formButton.current.addEventListener("click", (evt) => {
          if (completeRegFormValidation.current.reportValidity() === false) {
            setFormButtonClicked(true);
          }
        });
      }
    }
  }, [
    formButtonClicked,
    formButton,
    formikIntialValuesObj,
    entryValidationSchema,
  ]);

  // state actions

  const handleClick = (ev) => {
    setOpen(!open);
  };

  return (
    <>
      <Dialog
        maxWidth="xl"
        className={classes.socialSignInContainer}
        /* onClose={handleClick} */ open={open}
      >
        <DialogTitle className={classes.title} disableTypography={true}>
          <Grid
            container
            /* direction="column" */
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={6} style={{ width: "100%" }}>
              <Typography
                className={classes.heading1}
                role="heading"
                variant="span"
                aria-level="2"
              >
              Registration Progress
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ width: "100%" }}>
              <ProgressBar
                completed={progressValue}
                maxCompleted={100}
                bgColor="#3f51b5"
                height="40px"
                borderRadius="10px"
              />
            </Grid>
          </Grid>

          {/*     <IconButton className={classes.closeButton} onClick={handleClick} aria-label='Close'>
            <CloseIcon />
          </IconButton> */}
        </DialogTitle>
        <DialogContent>
          <List>
            {formFields && (
              <>
                <div ref={comRef} />
                {loading ? (
                  <Grid
                    style={{
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    className={classes.loadingContainer}
                    item
                    sm={12}
                  >
                    <CircularProgress />
                  </Grid>
                ) : (
                  <>
                    {formikIntialValuesObj !== null &&
                      entryValidationSchema && (
                        <Formik
                          enableReinitialize={true}
                          isSubmitting={true}
                          isValidating={true}
                          initialStatus={formButtonClicked}
                          validateOnMount={true}
                          initialValues={
                            formikIntialValuesObj === null
                              ? ""
                              : formikIntialValuesObj
                          }
                          validate={(values) => {
                            const errors = {};
                            if (
                              entryValidationSchema !== null &&
                              entryValidationSchema !== undefined
                            ) {
                              entryValidationSchema.map((array) => {
                                // validation Schema for Required url field only
                                if (Object.keys(array)[0].match("url")) {
                                  if (!values[Object.keys(array)[0]]) {
                                    errors[Object.keys(array)[0]] =
                                      Object.values(array)[0];
                                  } else if (
                                    !/^(http:\/\/|https:\/\/|www\.)?[a-zA-Z0-9\-$]+\.[a-zA-Z]{1,5}?[a-zA-Z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\{\[\}\}\|\\\:\;\'\"\,\<\.\>\/?\*\+]{1,500}/g.test(
                                      values[Object.keys(array)[0]]
                                    )
                                  ) {
                                    errors[Object.keys(array)[0]] =
                                      "Enter a valid URL";
                                  }
                                }

                                // validation Schema for Email field
                                if (Object.keys(array)[0].match("email")) {
                                  if (!values[Object.keys(array)[0]]) {
                                    errors[Object.keys(array)[0]] =
                                      Object.values(array)[0];
                                  } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                      values[Object.keys(array)[0]]
                                    )
                                  ) {
                                    errors[Object.keys(array)[0]] =
                                      "Enter a valid Email Address";
                                  }
                                }
                                //validation for confirm Email
                                if (
                                  Object.keys(array)[0].match("confirmEmail")
                                ) {
                                  if (!values[Object.keys(array)[0]]) {
                                    errors[Object.keys(array)[0]] =
                                      Object.values(array)[0];
                                  } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                      values[Object.keys(array)[0]]
                                    )
                                  ) {
                                    errors[Object.keys(array)[0]] =
                                      "Enter a valid Email Address";
                                  }
                                  if (values.email !== values.confirmEmail) {
                                    errors[Object.keys(array)[0]] =
                                      "Emails don't Match";
                                  }
                                }

                                // validation Schema for password field
                                if (Object.keys(array)[0].match("password")) {
                                  //passord is true
                                  if (
                                    eventInfo.advanceSecurityEnabled === true
                                  ) {
                                    if (!values[Object.keys(array)[0]]) {
                                      errors[Object.keys(array)[0]] =
                                        Object.values(array)[0];
                                    } else if (
                                      values[Object.keys(array)[0]].length < 7
                                    ) {
                                      errors[Object.keys(array)[0]] =
                                        "Be at least 8 characters";
                                    } else if (
                                      values[Object.keys(array)[0]].search(
                                        /[A-Z]/
                                      ) === -1
                                    ) {
                                      errors[Object.keys(array)[0]] =
                                        "At least one character";
                                    } else if (
                                      values[Object.keys(array)[0]].search(
                                        /[0-9]/
                                      ) === -1
                                    ) {
                                      errors[Object.keys(array)[0]] =
                                        "At least one number";
                                    } else if (
                                      values[Object.keys(array)[0]].search(
                                        /[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/
                                      ) === -1
                                    ) {
                                      errors[Object.keys(array)[0]] =
                                        "At least one special character";
                                    }
                                  }
                                  if (
                                    eventInfo.advanceSecurityEnabled === false
                                  ) {
                                    if (!values[Object.keys(array)[0]]) {
                                      errors[Object.keys(array)[0]] =
                                        Object.values(array)[0];
                                    } else if (
                                      values[Object.keys(array)[0]].length < 5
                                    ) {
                                      errors[Object.keys(array)[0]] =
                                        "Be at least 6 characters";
                                    }
                                  }
                                  if (
                                    values.password !== values.confirmPassword
                                  ) {
                                    errors[Object.keys(array)[0]] =
                                      "Password don't Match";
                                  }
                                }

                                // validation Schema for confirm password field
                                if (
                                  Object.keys(array)[0].match("confirmPassword")
                                ) {
                                  //passord is true
                                  if (
                                    eventInfo.advanceSecurityEnabled === true
                                  ) {
                                    if (!values[Object.keys(array)[0]]) {
                                      errors[Object.keys(array)[0]] =
                                        Object.values(array)[0];
                                    } else if (
                                      values[Object.keys(array)[0]].length < 7
                                    ) {
                                      errors[Object.keys(array)[0]] =
                                        "Be at least 8 characters";
                                    } else if (
                                      values[Object.keys(array)[0]].search(
                                        /[A-Z]/
                                      ) === -1
                                    ) {
                                      errors[Object.keys(array)[0]] =
                                        "At least one character";
                                    } else if (
                                      values[Object.keys(array)[0]].search(
                                        /[0-9]/
                                      ) === -1
                                    ) {
                                      errors[Object.keys(array)[0]] =
                                        "At least one number";
                                    } else if (
                                      values[Object.keys(array)[0]].search(
                                        /[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/
                                      ) === -1
                                    ) {
                                      errors[Object.keys(array)[0]] =
                                        "At least one special character";
                                    }
                                  }
                                  if (
                                    eventInfo.advanceSecurityEnabled === false
                                  ) {
                                    if (!values[Object.keys(array)[0]]) {
                                      errors[Object.keys(array)[0]] =
                                        Object.values(array)[0];
                                    } else if (
                                      values[Object.keys(array)[0]].length < 5
                                    ) {
                                      errors[Object.keys(array)[0]] =
                                        "Be at least 6 characters";
                                    }
                                  }
                                  if (
                                    values.confirmPassword !== values.password
                                  ) {
                                    errors[Object.keys(array)[0]] =
                                      "Password don't Match";
                                  }
                                }

                                // validation Schema for other field
                                if (
                                  !Object.keys(array)[0].match("password") ||
                                  !Object.keys(array)[0].match(
                                    "confirmPassword"
                                  ) ||
                                  !Object.keys(array)[0].match("url") ||
                                  !Object.keys(array)[0].match("email")
                                ) {
                                  if (!values[Object.keys(array)[0]]) {
                                    errors[Object.keys(array)[0]] =
                                      Object.values(array)[0];
                                  }
                                }
                              });
                            }
                            return errors;
                          }}
                          onSubmit={(values, formikBag) => {
                            if (regFormComplete === false) {
                              setShouldRender(true);
                              if (
                                completeRegFormValidation.current.reportValidity() !==
                                false
                              ) {
                                if (regFormPageNumber < totalPages) {
                                  setLoading(true);
                                  tempRegFormPageNumber = regFormPageNumber;
                                  submitRegFormData(
                                    formFields,
                                    regFormPageNumber,
                                    token
                                  );
                                  setRegFormPageNumber(regFormPageNumber + 1);
                                  setFormButtonClicked(false);
                                }
                                formFields.forEach((textBoxValue, index) => {
                                  textBoxValue.answer = "";
                                });
                              }
                            }
                            if (regFormComplete === true) {
                              if (
                                completeRegFormValidation.current.reportValidity() !==
                                false
                              ) {
                                socialRegistrationCompleted();
                                completeRegistration(
                                  formFields,
                                  regFormPageNumber
                                );
                                setOpen(false);
                              }
                            }
                          }}
                        >
                          {({ handleSubmit, errors }) => (
                            <>
                              <form
                                className={classes.form}
                                ref={completeRegFormValidation}
                              >
                                <Grid
                                  direction="column"
                                  justify="space-between"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {formElement}
                                </Grid>
                                <Grid
                                  container
                                  /* direction="column" */
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Grid item xs={6} style={{ width: "100%" }}>
                                    <Button
                                      fullWidth
                                      variant="contained"
                                      color="primary"
                                      className={
                                        !previousBtnActive
                                          ? classes.btnDisabled
                                          : classes.prevBtn /* `${classes.prevBtn}${!previousBtnActive ? ` ${classes.btnDisabled}` : ''}` */
                                      }
                                      onClick={onPrevious}
                                    >
                                      Previous
                                    </Button>
                                  </Grid>
                                  <Grid item xs={6} style={{ width: "100%" }}>
                                    <Button
                                      fullWidth
                                      variant="contained"
                                      color="primary"
                                      className={`${classes.submit} ${regFormComplete ? classes.btn1 : classes.btn2}`}
                                      onClick={handleSubmit}
                                      ref={formButton}
                                    >
                                      {regFormComplete ? "Submit" : "Next"}
                                    </Button>
                                  </Grid>
                                </Grid>
                              </form>
                            </>
                          )}
                        </Formik>
                      )}
                  </>
                )}
              </>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default connect(null, null)(SocialSigninRegistration);
