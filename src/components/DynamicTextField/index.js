import * as yup from "yup";
import React, { useState } from "react";

// eslint-disable-next-line no-unused-vars
import {
  // eslint-disable-next-line no-unused-vars
  Field,
  // eslint-disable-next-line no-unused-vars
  ContestantFormFieldAnswer,
} from "../../typedefs/contestantFormTemplate.typedef";
import { dynamicHtml, getCleanTextFromHtmlString } from "utils/helpers";

import useStyles from "./styles";
import { Grid, TextField, Typography, FormHelperText } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { Field as FormikField, Form, Formik, FormikProps } from 'formik';
import { usePasswordsValidition } from "hooks/usePasswordsValidition";
import { useLocation } from "react-router-dom";

export default function DynamicTextField(props) {
  const classes = useStyles();

  /**
   * @type {Field} field
   */
  const field = props.field;
  /**
   * @type {ContestantFormFieldAnswer} fieldAnswer
   */
  const location = useLocation();
  const fieldAnswer = props.fieldAnswer;
  const isRequired = field.required === "required";
  const { disabled, extendSchema, eventInfo } = props;
  const { advanceSecurityEnabled } = eventInfo;
  const CHARACTER_LIMIT = props.field.maxLength;
  const fieldType = props.field.type;
  const { onFormFieldUpdate, isEntryFormSubmited } = props;
  const [characterCount, setCharacterCount] = useState(location.pathname === '/completeRegistration' ? props?.value?.length : fieldAnswer?.answer?.length);
  /*   const [minCharacters, setMinCharacters] = useState(false);
    const [containDigit, setContainDigit] = useState(false);
    const [containUpperCase, setContainUpperCase] = useState(false);
    const [containSpecialCharacter, setContainSpecialCharacter] = useState(false); */
  const [isError, setIsError] = useState(false);
  const [triedSubmit, setTriedSubmit] = useState(false);
  /* let unique = Math.floor(Math.random() * 11); */
  const sectionId = fieldAnswer?.sectionId;
  const [isFieldError, setIsFieldError] = useState((isRequired && triedSubmit && !(fieldAnswer?.answer || props?.value)));
  const [fieldValue, setFieldValue] = useState(fieldAnswer?.answer)
  const {
    minCharacters,
    containDigit,
    containUpperCase,
    containSpecialCharacter,
    /* isError */
  } = usePasswordsValidition(fieldValue, advanceSecurityEnabled, fieldType);

  const onFieldFocus = (event) => {
    setTriedSubmit(true);
  }

  const onFieldBlur = (event) => {
    const answer = event.target.value;
    onFormFieldUpdate({
      answer,
      sectionId,
      type: fieldType,
      nativeEvent: event,
      fieldAnswer: fieldAnswer.answer
    });
  }

  React.useEffect(() => {
    setIsFieldError((isRequired && triedSubmit && !(fieldAnswer?.answer || props?.value)) ? true : false);
  }, [triedSubmit]);


  const handleChange = (event) => {
    setFieldValue(event.target.value.trim())
    setCharacterCount(event.target.value.trim().length);
    const answer = event.target.value.trim();

    onFormFieldUpdate({
      answer,
      sectionId,
      type: fieldType,
      nativeEvent: event,
      fieldAnswer: fieldAnswer.answer
    });
    (answer === "" && isRequired) ? setIsFieldError(true) : setIsFieldError(false);
  };
  function formikFieldName(section) {
    if (section?.Binding === 'password') {
      return ('password')
    }
    else if (section?.Binding === 'confirmPassword') {
      return ('confirmPassword')
    }
    else if (section?.Binding === 'email') {
      return ('email')
    }
    else if (section?.Binding === 'confirmEmail') {
      return ('confirmEmail')
    }
    else {
      return ('textBox' + sectionId)
    }
  };
  React.useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  React.useEffect(() => {
    if (typeof characterCount == 'undefined') {
      setCharacterCount(0);
    }
  }, [characterCount]);
  return (
    <Grid item sm={12}>
      {isEntryFormSubmited || props.disableFormNextPhase === true  ?
        <>
          <div className={classes.label}>
            {/* <EditIcon style={{ fill: !isEntryFormSubmited ? "#89ba39" : '#9B9B9B' }} noWrap /> */}
            {dynamicHtml(field.labelText, isRequired, {
              style: { display: 'inline-block', fontWeight: 'bold' },
            })}
          </div>
          <Typography variant="body1" style={{ fontSize: 16, wordBreak: 'break-all' }}>
            {fieldAnswer?.answer || props?.value}
          </Typography>
        </>
        :
        <>
          <div className={classes.label} >
            <EditIcon style={{ fill: !isEntryFormSubmited ? "#89ba39" : '#9B9B9B' }} noWrap />
            {dynamicHtml(field.labelText, isRequired, {
              style: { display: 'inline-block', marginLeft: '5px', fontWeight: 'bold' },
            })}
          </div>
          <FormikField name={formikFieldName(props.field)}>
            {({
              field, // { name, value, onChange, onBlur }
              form: { status, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta,
            }) => (
              <>
                <TextField
                  /* {...field} */
                  fullWidth
                  disabled={disabled}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    ...props.inputProps,
                    "aria-label": props.field.labelText + '' + (props.field.sublabel ? props.field.sublabel : '') + ' Characters ' + characterCount + '/' + CHARACTER_LIMIT + ' ' + (isFieldError ? 'alert ' + props.field.labelText + ' is required' : ''),
                    "aria-required": isRequired,
                    ...isError && { "aria-describedby": sectionId + " password-error" },
                    /* "aria-describedby": sectionId+" password-error", */
                    maxLength: CHARACTER_LIMIT,
                    autoComplete: field.Binding === 'firstName' || field.Binding === 'lastName' ? 'on' : 'off',
                    /* 'aria-labelledby':'dynamicTextField'+unique */
                    /* minLength: fieldType === 'password' ? 6 : '', */
                  }
                  }
                  required={isRequired}
                  onChange={handleChange}
                  onFocus={() => { setIsError(true) }}
                  onBlur={() => { setIsError(false) }}
                  onKeyPress={(ev) => {
                    // console.log(`Pressed keyCode ${ev.key}`);
                    if (ev.key === 'Enter') {
                      // Do code here
                      ev.preventDefault();
                    }
                  }}
                  /* onChange={change} */
                  defaultValue={props.field.type !== 'password' ? (fieldAnswer?.answer || props?.value) : null}
                  className={classes.field}
                  margin="normal"
                  // helperText={field.sublabel}
                  error={(status === true && meta.error !== undefined) || (meta.error !== undefined && meta.touched === true)}
                />
                <FormHelperText style={{ color: "#000000", fontWeight: 410, }} /* id={sectionId} */>{getCleanTextFromHtmlString(props.field.sublabel)}</FormHelperText>
                <span /* id={'dynamicTextField'+unique} */ style={{ color: "#3D3D3D" }} role='status'>Characters {characterCount}/{CHARACTER_LIMIT}</span>

                <br />
                {(status === true && meta.error !== undefined && fieldType !== 'password') || (meta.error !== undefined && meta.touched === true && fieldType !== 'password') ? <span style={{ color: '#AE0C00', fontWeight: 450 }}>{getCleanTextFromHtmlString(meta.error)}</span> : null}
                {fieldType === 'password' && (
                  <>
                    {isError /* && values.password !== values.confirmPassword */ && (
                      <>
                        {advanceSecurityEnabled ? (
                          <div className={classes.divInvalid} id={sectionId + " password-error"} role="alert">
                            <h4 style={{ padding: 10, paddingBottom: 0, paddingTop: 0 }}>Password must meet the following requirements:</h4>
                            <ul style={{ fontSize: 12, listStyle: 'none', }}>
                              {minCharacters ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Be at least <strong>8 characters</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Be at least <strong>8 characters</strong></li>}
                              {containDigit ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one number</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one number</strong></li>}
                              {containUpperCase ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one capital letter</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one capital letter</strong></li>}
                              {containSpecialCharacter ? <li className={classes.invalid}>✖ &nbsp;&nbsp;At least <strong>one special character</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;At least <strong>one special character</strong></li>}
                              {/* {location.pathname !== '/registerTeamMember' && (
                                <> */}
                              {
                                values.password === values.confirmPassword && values.password !== null && values.password !== undefined && values.password !== ''
                                  && values.confirmPassword !== null && values.confirmPassword !== undefined && values.confirmPassword !== '' ? <li className={classes.valid}>✔ &nbsp;&nbsp;Passwords <strong>Match</strong></li> : <li className={classes.invalid}>✖ &nbsp;&nbsp;Passwords <strong>do not Match</strong></li>
                              }
                              {/* </>
                              )} */}
                            </ul>
                          </div>
                        ) :
                          <div className={classes.divInvalid} id={sectionId + " password-error"} role="alert">
                            <h4 style={{ padding: 10, paddingBottom: 0, paddingTop: 0 }}>Password must meet the following requirements:</h4>
                            <ul style={{ fontSize: 12, listStyle: 'none', }}>
                              {minCharacters ? <li className={classes.invalid}>✖ &nbsp;&nbsp;Be at least <strong>6 characters</strong></li> : <li className={classes.valid}>✔ &nbsp;&nbsp;Be at least <strong>6 characters</strong></li>}
                              {/* {location.pathname !== '/registerTeamMember' && (
                                <> */}
                              {values.password === values.confirmPassword && values.password !== null && values.password !== undefined && values.password !== ''
                                && values.confirmPassword !== null && values.confirmPassword !== undefined && values.confirmPassword !== ''
                                ? <li className={classes.valid}>✔ &nbsp;&nbsp;Passwords <strong>Match</strong></li> : <li className={classes.invalid}>✖ &nbsp;&nbsp;Passwords <strong>do not Match</strong></li>}
                              {/* </>
                              )} */}
                            </ul>
                          </div>
                        }
                      </>
                    )}
                  </>
                )}
              </>)}
          </FormikField>
        </>}
    </Grid >
  );
}

