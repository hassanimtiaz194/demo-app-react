import * as yup from "yup";
import React, { useRef } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from '@material-ui/icons/Edit';
// eslint-disable-next-line no-unused-vars
import {
  // eslint-disable-next-line no-unused-vars
  Field,
  // eslint-disable-next-line no-unused-vars
  ContestantFormFieldAnswer,
} from "../../typedefs/contestantFormTemplate.typedef";
import { dynamicHtml, getCleanTextFromHtmlString } from "utils/helpers";
import { Field as FormikField, Form, Formik, FormikProps } from 'formik';
import useStyles from "./styles";
import { FormLabel } from "@material-ui/core";

export default function DynamicCheckbox(props) {
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
  React.useEffect(() => {
    extendSchema &&
      extendSchema({
        [fieldAnswer.sectionId]: isRequired
          ? yup.string().required()
          : yup.string(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [answer, setAnswer] = React.useState(fieldAnswer?.answer || props?.value);
  const [requiredFullfilled, setRequiredFullfilled] = React.useState(true);
  /*  const [isRequiredFullfilled, setIsRequiredFullfilled] = React.useState(false); */

  let timeout;

  React.useEffect(() => {

    if (isRequired) {
      if (answer !== null && answer !== undefined && answer !== '') {
        let answerArray = (answer || "").split("|");
        if (answerArray.length >= 1) {
          setRequiredFullfilled(false);
        } else if (answerArray.length < 1) {
          setRequiredFullfilled(true);
        }
      } else {
        setRequiredFullfilled(true);
      }
    } else if (isRequired === false) {
      setRequiredFullfilled(false);
    }
  }, [answer, requiredFullfilled]);

  const isChecked = (value) => {
    //let answer = (fieldAnswer?.answer || props?.value || "").split(",");
    let answerArray = (answer || "").split("|");
    return answerArray.indexOf(value) !== -1;
  };

  const onChecked = (event) => {
    const value = event.target.name;
    const isChecked = event.target.checked;
    let answerArray = (answer || "").split("|");
    if (isChecked) {
      answerArray.push(value);
      if (answerArray[0] === '') {
        answerArray.shift();
      }
    } else {
      const index = answerArray.indexOf(value);
      answerArray.splice(index, 1);
    }
    let updatedAnswer = answerArray.join('|').toString();
    setAnswer(updatedAnswer);

    //clearTimeout(timeout);
    // timeout = setTimeout(() => {
    handleChange({ target: { value: updatedAnswer } });
    //}, 1000);
  };

  return (
    <FormControl
      disabled={disabled || props.disableFormNextPhase === true}
      component='div'
      error
    >
      <FormikField name={'checkbox' + fieldAnswer?.sectionId}>
        {({
          field, // { name, value, onChange, onBlur }
          form: { status }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <>
            <FormLabel
              className={classes.label}
              component='legend'
              style={{ color: 'black', fontSize: 17, display: 'inline-block', fontWeight: 'bold' }}>
              {!isEntryFormSubmited ? <EditIcon style={{ fill: "#89ba39" }} noWrap /> : <></>}
              {/*  {field.labelText}
        {isRequired ? <span style={{ color: '#e91c0d', marginLeft: 5, fontSize: 24, }}>*</span> : ""} */}
              {/* <span style={{color:'black',fontWeight:'bold',fontSize:16}}>{field.labelText}</span> */}
              {dynamicHtml(props.field.labelText, isRequired, {
                style: { display: 'inline-block', fontWeight: 'bold', color: 'black' },
              })}
            </FormLabel>
            <FormGroup
              className={classes.field}
              aria-label={getCleanTextFromHtmlString(props.field.labelText)}
            >
              {props.field.optionName.map((option, index) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      className={classes.Checkbox}
                      name={option}
                      required={requiredFullfilled}
                      checked={isChecked(option)}
                      onChange={onChecked}
                      onKeyPress={(ev) => {
                        // console.log(`Pressed keyCode ${ev.key}`);
                        if (ev.key === 'Enter') {
                          // Do code here
                          ev.preventDefault();
                        }
                      }}
                      aria-required={isRequired}
                      value={option}
                      inputProps={{
                        "aria-label": option + (requiredFullfilled ? ' Please check at least one option' : ''),
                        "aria-required": isRequired
                      }}
                    />
                  }
                  label={<label
                    style={{ color: 'black' }}>{option}</label>}
                  key={index}
                />
              ))}
            </FormGroup>
            {(status === true && meta.error !== undefined) || (meta.error !== undefined && meta.touched === true) ?
              <span style={{ color: '#AE0C00', fontWeight: 450 }}>Please check at least one option</span>
              : null}
          </>
        )}
      </FormikField>
    </FormControl>
  );
}
