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

import EditIcon from '@material-ui/icons/Edit';

import useStyles from "./styles";
import { Grid, TextField, Typography, FormHelperText } from "@material-ui/core";
import { Field as FormikField, Form, Formik, FormikProps } from 'formik';
import { useLocation } from "react-router-dom";

export default function DynamicTextArea(props) {
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
  const { disabled, extendSchema, onFormFieldUpdate, isEntryFormSubmited } = props;
  const fieldType = props.field.type;
  const CHARACTER_LIMIT = props.field.maxLength;
  const [characterCount, setCharacterCount] = useState(location.pathname === '/completeRegistration' ? props?.value?.length : fieldAnswer?.answer?.length);
  const [triedSubmit, setTriedSubmit] = useState(false);
  /* let unique = Math.floor(Math.random() * 11); */
  //const sectionId = fieldAnswer.sectionId;

  const [isFieldError, setIsFieldError] = useState((isRequired && triedSubmit && !(fieldAnswer?.answer || props?.value)));
  //const [isFieldError, setIsFieldError] = useState((isRequired && !(fieldAnswer?.answer || props?.value)));
  /*  let unique = Math.floor(Math.random() * 11); */
  const sectionId = fieldAnswer?.sectionId;

  const onFieldFocus = (event) => {
    setTriedSubmit(true);
  }

  React.useEffect(() => {
    setIsFieldError((isRequired && triedSubmit && !(fieldAnswer?.answer || props?.value)) ? true : false);
  }, [triedSubmit]);

  const handleChange = (event) => {
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

  const onBlur = (event) => {
    const answer = event.target.value;
    onFormFieldUpdate({
      answer,
      sectionId,
      type: fieldType,
      nativeEvent: event,
      fieldAnswer: fieldAnswer.answer
    });
  };

  React.useEffect(() => {
    extendSchema &&
      extendSchema({
        [fieldAnswer.sectionId]: isRequired
          ? yup.string().required()
          : yup.string(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (typeof characterCount == 'undefined') {
      setCharacterCount(0);
    }
  }, [characterCount]);

  return (
    <Grid item sm={12}>
      {isEntryFormSubmited || props.disableFormNextPhase === true ?
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
          <div className={classes.label}>
            <EditIcon style={{ fill: !isEntryFormSubmited ? "#89ba39" : '#9B9B9B' }} noWrap />
            {dynamicHtml(field.labelText, isRequired, {
              style: { display: 'inline-block', marginLeft: '5px', fontWeight: 'bold' },
            })}
          </div>
          <FormikField name={'textArea' + sectionId}>
            {({
              field, // { name, value, onChange, onBlur }
              form: { status }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta,
            }) => (
              <>
                <TextField
                  /*   {...field} */
                  inputProps={{
                    "aria-label": getCleanTextFromHtmlString(props.field.labelText) + ' Characters ' + characterCount + '/' + CHARACTER_LIMIT + " " + (isFieldError ? 'alert ' + props.field.labelText + ' is required' : ''),
                    "aria-required": isRequired,
                    "aria-describedby": sectionId,
                    maxLength: CHARACTER_LIMIT
                  }}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={disabled}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required={isRequired}
                  onChange={handleChange}
                  //onBlur={onBlur}
                  defaultValue={fieldAnswer?.answer || props?.value}
                  className={classes.field}
                  margin="normal"
                  // helperText={field.sublabel}
                  error={(status === true && meta.error !== undefined) || (meta.error !== undefined && meta.touched === true)}
                /* aria-labelledby={'dynamicTextArea' + unique} */
                />
                <FormHelperText style={{ color: "#000000", fontWeight: 410, }} id={sectionId}>{getCleanTextFromHtmlString(props.field.sublabel)}</FormHelperText>
                <span style={{ color: "#3D3D3D" }} /* id={'dynamicTextArea' + unique} */ role='status'>Characters {characterCount}/{CHARACTER_LIMIT}</span>
                <br />
                {(status === true && meta.error !== undefined) || (meta.error !== undefined && meta.touched === true) ? <span style={{ color: '#AE0C00', fontWeight: 450 }}>{getCleanTextFromHtmlString(meta.error)}</span> : null}
              </>
            )}

          </FormikField>
        </>
      }
    </Grid>
  );
}