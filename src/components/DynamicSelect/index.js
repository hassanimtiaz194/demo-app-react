import * as yup from "yup";
import React, { useEffect, useState } from "react";

import {
  FormHelperText,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";

// eslint-disable-next-line no-unused-vars
import {
  // eslint-disable-next-line no-unused-vars
  Field,
  // eslint-disable-next-line no-unused-vars
  ContestantFormFieldAnswer,
} from "../../typedefs/contestantFormTemplate.typedef";

import { dynamicHtml, getCleanTextFromHtmlString } from "utils/helpers";
import EditIcon from '@material-ui/icons/Edit';
import { Field as FormikField, Form, Formik, FormikProps } from 'formik';

import useStyles from "./styles";

export default function DynamicSelect(props) {
  const classes = useStyles();
  /**
   * @type {Field} field
   */
  const field = props.field;
  /**
   * @type {ContestantFormFieldAnswer} fieldAnswer
   */
  const fieldAnswer = props.fieldAnswer;
  const isRequired = field.required === "required";
  const { disabled, extendSchema, handleChange, isEntryFormSubmited, isAriaExpanded, setIsAriaExpanded } = props;
  const [localValue, setLocalValue] = useState(props.fieldAnswer?.answer ?? props?.value ?? '');
 
  const [triedSubmit, setTriedSubmit] = useState(false);

  const sectionId = fieldAnswer?.sectionId;

  const [isFieldError, setIsFieldError] = useState((isRequired && triedSubmit && !(fieldAnswer?.answer || props?.value)));
  /* let unique = Math.floor(Math.random() * 11); */
  const onFieldFocus = (event) => {
    setTriedSubmit(true);
  }

  React.useEffect(() => {
    setIsFieldError((isRequired && localValue === "") ? true : false);
  }, [triedSubmit, localValue]);



  const handleLocalChange = (event) => {

    setLocalValue(event.target.value);
    if (handleChange) {
      handleChange(event);
    }
  };

  useEffect(() => setLocalValue(props.fieldAnswer?.answer ?? props?.value ?? ''), [props?.fieldAnswer?.answer]);

  React.useEffect(() => {
    extendSchema &&
      extendSchema({
        [fieldAnswer.sectionId]: isRequired
          ? yup.string().required()
          : yup.string(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormControl
      disabled={disabled || props.disableFormNextPhase === true}
      fullWidth
      required={isRequired}
    /* error={isFieldError} */
    /* onFocus={onFieldFocus} */
    >
      <FormikField name={'select' + fieldAnswer?.sectionId /* + props?.section.sectionId */}>
        {({
          field, // { name, value, onChange, onBlur }
          form: { status }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <>
            <div className={classes.label} >
              {!isEntryFormSubmited ? <EditIcon style={{ fill: "#89ba39" }} noWrap /> : <></>}
              {dynamicHtml(props?.field?.labelText, isRequired, {
                style: { display: 'inline-block', fontWeight: 'bold' },
                id: sectionId,
              })}
              {/* {!isEntryFormSubmited ? <EditIcon style={{ fill: "#89ba39" }} noWrap /> : <></>}
              <label
                style={{ display: 'inline-block', fontWeight: 'bold' }}
              //id={'dynamicSelect'+unique} 
              >
                {props.field.labelText}{isRequired ? <span style={{ color: '#e91c0d', marginLeft: 5, fontSize: 24, }}>*</span> : ""}</label> */}
            </div>
            <Select
              {...field}
              /* id={'select-options'} */
              inputProps={{
                'aria-labelledby':sectionId,
              }}
              className={classes.field}
              value={localValue}
              aria-required={isRequired}
              aria-describedby={sectionId}
              onChange={handleLocalChange}
              onOpen={setIsAriaExpanded(true)}
              onClose={setIsAriaExpanded(false)}
              error={(status === true && meta.error !== undefined) || (meta.error !== undefined && meta.touched === true)}
              SelectDisplayProps={
                {
                  'aria-label': props.field.labelText + ' ' + props.field.sublabel + ' ' + (isFieldError ? 'alert ' + props.field.labelText + ' is required' : ''),
                  "aria-expanded": isAriaExpanded,
                  "aria-required": isRequired,
                  /* 'aria-labelledby': 'dynamicSelect'+unique, */
                  'role': 'combobox'
                }
              }
              /*  inputProps={{ 'id': 'select-options-input-id'+unique, "aria-required":isRequired, }} */
              displayEmpty
            >
              <MenuItem value={""}>
                Please Select
              </MenuItem>
              {props.field.optionName.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText style={{ color: "#000000", fontWeight: 410, }} id={sectionId}>{getCleanTextFromHtmlString(props.field.sublabel)}</FormHelperText>
            {(status === true && meta.error !== undefined) || (meta.error !== undefined && meta.touched === true) ? <span style={{ color: '#AE0C00', fontWeight: 450 }}>{getCleanTextFromHtmlString(meta.error)} </span> : null}
          </>)}
      </FormikField>
    </FormControl>
  );
}
