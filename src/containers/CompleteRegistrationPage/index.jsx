import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ProgressBar from "components/ProgressLinear";
import { connect, useDispatch } from "react-redux";
import { globalActions } from "redux/actions";
import useStyles from "./styles";
import { useFormElement } from "hooks/useFormElement";
import { useRegistrationForm } from "hooks/useRegistrationForm";
import { useCompleteRegistration } from "hooks/useCompleteRegistration";
import { CircularProgress } from "@material-ui/core";
import { submitRegFormData } from "api";
import { Formik, useFormik } from "formik";
import { commonApiSelectors } from "redux/selectors";
import { createStructuredSelector } from "reselect";
import { useEntryFormFomikIntialsValues } from "hooks/useEntryFormFomikIntialsValues";
import { useEntryFormValidationSchema } from "hooks/useEntryFormValidationSchema";
export function CompleteRegistrationPage(props) {
  const classes = useStyles();

  // state actions
  const { onRegError, eventInfo } = props;
  const comRef = useRef();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const { sections, totalPages, regFormPageNumber, setRegFormPageNumber } = useRegistrationForm();
  let [formButtonClicked, setFormButtonClicked] = useState(false);
  const { formFields, formElement } = useFormElement(
    sections,
    1,
    true,
    classes.inputField
  );
  const {
    formikIntialValuesObj
  } = useEntryFormFomikIntialsValues(sections, formFields, eventInfo);
  const {
    entryValidationSchema
  } = useEntryFormValidationSchema(sections, eventInfo);

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
  let [shouldRender,setShouldRender] = useState(true);

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

  useEffect(() => {
    if (comRef.current && shouldRender === true) {
      comRef.current.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
      setShouldRender(false)
    }
  }, [formFields,shouldRender]);

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
      if (formButton.current !== null && completeRegFormValidation.current !== null) {
        formButton.current.addEventListener('click', (evt) => {
          if (completeRegFormValidation.current.reportValidity() === false) {
            setFormButtonClicked(true)
          }
        })
      }
    }
  }, [formButtonClicked, formButton, formikIntialValuesObj, entryValidationSchema])

  return (
    formFields && (
      <>

        <ProgressBar
          title={'Registration Form {percentage}% Completed'}
          percentage={progressValue}
          strokeWidth={15}
          trailWidth={50}
          strokeColor={'#3f51b5'}
          strokeLinecap="square"
          style={{
            borderRadius: "5px",
          }}
        />
        <div ref={comRef} />
        {loading ? (
          <Grid style={{ marginTop: 150 }} className={classes.loadingContainer} item sm={12}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            {formikIntialValuesObj !== null && entryValidationSchema && (
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
                  if (regFormComplete === false) {
                    setShouldRender(true)
                    if (completeRegFormValidation.current.reportValidity() !== false) {
                      if (regFormPageNumber < totalPages) {
                        setLoading(true);
                        tempRegFormPageNumber = regFormPageNumber;
                        submitRegFormData(formFields, regFormPageNumber, token);
                        setRegFormPageNumber(regFormPageNumber + 1);
                        setFormButtonClicked(false);
                      }
                      formFields.forEach((textBoxValue, index) => {
                        textBoxValue.answer = "";
                      });
                    }
                  }
                  if (regFormComplete === true) {
                    if (completeRegFormValidation.current.reportValidity() !== false) {
                      completeRegistration(formFields, regFormPageNumber);
                    }
                  }
                }}
              >
                {({
                  handleSubmit,
                  errors
                }) => (
                  <>
                    <form className={classes.form} ref={completeRegFormValidation}>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        {formElement}
                      </Grid>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={!previousBtnActive ? classes.btnDisabled : classes.prevBtn/* `${classes.prevBtn}${!previousBtnActive ? ` ${classes.btnDisabled}` : ''}` */}
                        onClick={onPrevious}
                      >
                        Previous
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        ref={formButton}
                      >
                        {regFormComplete ? "Submit" : "Next"}
                      </Button>
                    </form>
                  </>)}
              </Formik>)}
          </>
        )
        }
      </>
    )
  );
}
const mapStateToProps = createStructuredSelector({
  eventInfo: commonApiSelectors.makeSelectEventInfo(),
});

const mapDispatchToProps = function (dispatch) {
  return {
    onRegError: (err) => {
      dispatch(
        globalActions.requestResponseReturned({
          error: true,
          message: err.message,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteRegistrationPage);





