import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@material-ui/core";

import DynamicField from "components/DynamicField";
import { initFormFields, updateFormAnswerList } from "utils/helpers";

import {
  FIELD_TYPE,
  // eslint-disable-next-line no-unused-vars
  SectionList,
  // eslint-disable-next-line no-unused-vars
  ContestantFormFieldAnswer,
} from "../typedefs/contestantFormTemplate.typedef";

/**
 * @typedef {Object} UseBootstrapFormState
 * @property {JSX.Element} formElement
 * @property {ContestantFormFieldAnswer[]} formFields
 */

/**
 * @param {SectionList[]} sections
 * @param {0 | 1} [whichPart] - which part to load from the sections, default is 0 which means first part
 * @param {boolean} [fullWidth] - whether the form fields should be full width, default is false
 * @param {string} [inputFieldClassName] - CSS class name for input fields
 * @returns {JSX.Element}
 */
export function useFormElement(
  sections,
  whichPart = 0,
  fullWidth = false,
  inputFieldClassName
) {
  const [formElement, setFormElement] = useState(<></>);
  const [formFields, setFormFields] = useState(null);
  const [passInputTarget, setPassInputTarget] = useState(null);
  const isText = (filedType) => {
    return (
      filedType === FIELD_TYPE.HEADING || filedType === FIELD_TYPE.PARAGRAPH
    );
  };

  useEffect(() => {
    if (!sections || !sections.length) return;
    setFormFields(initFormFields(sections));
  }, [sections]);

  const checkPasswords = (event, password1) => {
    const password2 = event.target.value;
    if (passInputTarget) passInputTarget.setCustomValidity("");
    setPassInputTarget(event.target);
    if (password1 !== password2) {
      event.target.setCustomValidity("Passwords do not match");
    } else event.target.setCustomValidity("");
  };

  const onFormFieldUpdate = (event) => {
    const { nativeEvent, ...restEvent } = event;
    if (event.type === FIELD_TYPE.PASSWORD) {
      // Find the other password field
      const otherPasswordField = formFields.find(({ type, sectionId }) => {
        return type === FIELD_TYPE.PASSWORD && sectionId !== event.sectionId;
      });
      if (otherPasswordField)
        checkPasswords(nativeEvent, otherPasswordField.answer);
    }
    setFormFields(updateFormAnswerList(formFields, restEvent));
  };

  /**
   *
   * @param {SectionList} section
   * @param {number} index
   * @returns
   */
  const createFieldElement = (section, index) => {
    return (
      <Grid
        key={`dynamic-field-${section.sectionId}`}
        item
        md={12}
        sm={isText(section.paramMap.type) || fullWidth ? 12 : 6}
        style={{ paddingTop: 25 }}
      >
        <DynamicField
          onFormFieldUpdate={onFormFieldUpdate}
          inputFieldClassName={inputFieldClassName}
          inputProps={{
            type:
              section.paramMap.type === FIELD_TYPE.PASSWORD
                ? "password"
                : section.paramMap.type === FIELD_TYPE.EMAIL
                ? "email"
                : "",
          }}
        
          fieldAnswer={formFields[index]}
          field={section.paramMap}
          value={section.userValue}
        ></DynamicField>
      </Grid>
    );
  };

  useEffect(() => {
    if (!formFields || !formFields.length) return; 
    let formElementsData = [];
    sections.forEach((section, index) => {
      formElementsData.push(createFieldElement(section, index));
    });
    setFormElement(formElementsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, formFields]);

  return {
    formFields,
    formElement,
  };
}
