import * as yup from "yup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import {
  // eslint-disable-next-line no-unused-vars
  Field,
  // eslint-disable-next-line no-unused-vars
  ContestantFormFieldAnswer,
} from "../../typedefs/contestantFormTemplate.typedef";
import { dynamicHtml, getCleanTextFromHtmlString } from "utils/helpers";

import { Radio, RadioGroup } from "@material-ui/core";
import useStyles from "./styles";
import { Field as FormikField, Form, Formik, FormikProps } from 'formik';

export default function DynamicRadio(props) {
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
  const { disabled, extendSchema, handleChange, isEntryFormSubmited } = props;

  const [localValue, setLocalValue] = useState(props.fieldAnswer?.answer ?? props.value ?? '');
  const [isRequiredFullfilled, setIsRequiredFullfilled] = useState(false);

  const handleLocalChange = (event) => {
    setIsRequiredFullfilled(false)
    setLocalValue(event.target.value);
    if (handleChange) {
      handleChange(event);
    }
  };

  useEffect(() => {
    setLocalValue(props.fieldAnswer?.answer ?? props?.value ?? '')
    if (fieldAnswer?.answer === undefined || fieldAnswer?.answer === null) {
      setIsRequiredFullfilled(true)
    } else {
      setIsRequiredFullfilled(false)
    }
  }, [props?.fieldAnswer?.answer]);

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
    <FormControl disabled={disabled || props.disableFormNextPhase === true} required={isRequired} >
      <FormikField name={'radio' + fieldAnswer?.sectionId/*+ props.section.sectionId */}>
        {({
          field, // { name, value, onChange, onBlur }
          form: { status }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <>
            <div style={{ display: "flex", fontSize: "16px" }}>
              {!isEntryFormSubmited ? <EditIcon style={{ fill: "#89ba39" }} noWrap /> : <></>}
              {dynamicHtml(props.field.labelText, isRequired, {
                style: { display: 'inline-block', fontWeight: 'bold' },
              })}
            </div>
            <RadioGroup
              className={classes.RadioSection}
              {...field}
              aria-label={getCleanTextFromHtmlString(props.field.labelText)}
              value={localValue}
              onChange={handleLocalChange}
              onKeyPress={(ev) => {
                // console.log(`Pressed keyCode ${ev.key}`);
                if (ev.key === 'Enter') {
                  // Do code here
                  ev.preventDefault();
                }
              }}
            >
              {props.field.optionName.map((option, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={option}

                    control={<Radio
                      className={classes.RadioBoxButton}
                      inputProps={
                        {
                          "aria-required": isRequired
                        }}
                      required={isRequired} />}
                    label={<label style={{ color: 'black' }} >{option}</label>}
                    inputProps={
                      {
                        "aria-label": option + (isRequiredFullfilled ? ' Please select one option' : ''),
                      }}
                  />
                );
              })}
            </RadioGroup>
            {(status === true && meta.error !== undefined) || (meta.error !== undefined && meta.touched === true) ? <span style={{ color: '#AE0C00', fontWeight: 450 }}>Please select one option</span> : null}
          </>
        )}
      </FormikField>
    </FormControl >
  );
}
