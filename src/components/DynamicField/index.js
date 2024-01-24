import React, { useState } from "react";
import DangerouslySetHtmlContent from "dangerously-set-html-content";
import { createStructuredSelector } from "reselect";
import { contestantFormSelectors, contestantFormTemplateSelectors } from "redux/selectors";

import { Grid, Paper } from "@material-ui/core";

import { connect } from "react-redux";

import {
  // eslint-disable-next-line no-unused-vars
  Field,
  // eslint-disable-next-line no-unused-vars
  FIELD_TYPE,
  // eslint-disable-next-line no-unused-vars
  ContestantFormFieldAnswer,
  HEADING_SIZE,
} from "../../typedefs/contestantFormTemplate.typedef";

import useStyles from "./styles";
import DynamicSelect from "../DynamicSelect";
import FileField from "../FileField";
import DynamicCheckbox from "../DynamicCheckbox/index";
import DynamicRichText from "../DynamicRichText";
import DynamicRadio from "../DynamicRadio";
import DynamicUrl from "../DynamicUrl";
import DynamicTextField from "../DynamicTextField";
import DynamicTextArea from "../DynamicTextArea";
import { commonApiActions } from "redux/actions";
import { commonApiSelectors } from "redux/selectors";

function DynamicField({ inputFieldClassName, ...props }) {
  const classes = useStyles(props);
  const [isDynamicRichTextboxRequired, setIsDynamicRichTextboxRequired] = useState(false)
  /**
   * @type {Field} field
   */
  const field = props.field;
  /**
   * @type {ContestantFormFieldAnswer} fieldAnswer
   */
  const fieldAnswer = props.fieldAnswer;
  const fieldType = field.type;
  const { onFormFieldUpdate, noInputs } = props;
  const [isAriaExpanded, setIsAriaExpanded] = useState(false);
  const handleChange = (event) => {
    const answer = event.target.value;
    const sectionId = fieldAnswer.sectionId;
    onFormFieldUpdate({
      answer,
      sectionId,
      type: fieldType,
      nativeEvent: event,
      fieldAnswer: fieldAnswer.answer
    });
  };
  const handleFileUpload = (files) => {
    handleChange({ target: { value: files } });
  };

  const extractContent = (str) => {
    var span = document.createElement('span');
    span.innerHTML = str;
    return span.textContent || span.innerText;
  }

  const setImgAlt = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    let content = extractContent(html);

    let links = doc.getElementsByTagName('img');

    [...links].forEach((link) => {
      link.setAttribute('alt', content);

    });

    let serializer = new XMLSerializer();
    return serializer.serializeToString(doc);

  }

  switch (fieldType) {
    case FIELD_TYPE.HEADING:
      let headingClass, htmlContent;

      switch (field.size) {
        case HEADING_SIZE.SMALL:
          headingClass = classes.heading3;
          htmlContent = "<h3>" + field.labelText + "</h3>";
          break;
        case HEADING_SIZE.MEDIUM:
          headingClass = classes.heading2;
          htmlContent = "<h2>" + field.labelText + "</h2>";
          break;
        default:
          headingClass = classes.heading1;
          htmlContent = "<h1>" + field.labelText + "</h1>";
      }


      return (
        <>
          <DangerouslySetHtmlContent
            className={headingClass}
            html={setImgAlt(htmlContent)}
          />
          {field.sublabel && field.sublabel !== null && field.sublabel !== undefined && (
            <DangerouslySetHtmlContent
              className={classes.subLabelHeading}
              html={field.sublabel}
            />
          )}
        </>
      );

    case FIELD_TYPE.PARAGRAPH:
      return (
        <DangerouslySetHtmlContent
          html={field.labelText}
          className={classes.embedContainer + " margin-bottom-top-5 " + classes.label}
        />
      );
    default:
      if (noInputs) return "";
  }
  if (!noInputs)
    switch (fieldType) {
      case FIELD_TYPE.CHECKBOX:
        return (
          <Paper className={`${classes.paper} ${inputFieldClassName || ""}`}>
            <DynamicCheckbox {...props} handleChange={handleChange} />
          </Paper>
        );
      case FIELD_TYPE.RADIO:
        return (
          <Paper className={`${classes.paper} ${inputFieldClassName || ""}`}>
            <DynamicRadio {...props} handleChange={handleChange} />
          </Paper>
        );
      case FIELD_TYPE.RICH_TEXT:
        return (
          <Paper className={isDynamicRichTextboxRequired ? `${classes.paper} ${classes.isDynamicRichTextRequired} ${inputFieldClassName || ""}` : `${classes.paper} ${inputFieldClassName || ""}`}>
            <DynamicRichText {...props} handleChange={handleChange} setIsDynamicRichTextboxRequired={setIsDynamicRichTextboxRequired} />
          </Paper>
        );
      case FIELD_TYPE.URL:
        return (
          <Paper className={`${classes.paper} ${inputFieldClassName || ""}`}>
            <DynamicUrl {...props} handleChange={handleChange} />
          </Paper>
        );
      case FIELD_TYPE.TEXTBOX:
      case FIELD_TYPE.PASSWORD:
      case FIELD_TYPE.EMAIL:
        return (
          <Paper className={`${classes.paper} ${inputFieldClassName || ""}`}>
            <DynamicTextField {...props} handleChange={handleChange} fieldUpdate={onFormFieldUpdate} />
          </Paper>
        );
      case FIELD_TYPE.TEXTAREA:
        return (
          <Paper className={`${classes.paper} ${inputFieldClassName || ""}`}>
            <DynamicTextArea {...props} handleChange={handleChange} />
          </Paper>
        );
      case FIELD_TYPE.SELECT:
        return (
          <Paper className={`${classes.paper} ${inputFieldClassName || ""}`}>
            <Grid item sm={12}>
              <DynamicSelect {...props} handleChange={handleChange} isAriaExpanded={isAriaExpanded} setIsAriaExpanded={setIsAriaExpanded} />
            </Grid>
          </Paper>
        );
      case FIELD_TYPE.FILE:
      case FIELD_TYPE.VIDEO:
        return (
          <Paper className={`${classes.paper} ${inputFieldClassName || ""}`}>
            <Grid item sm={12}>
              <FileField {...props} handleChange={handleFileUpload} />
            </Grid>
          </Paper>
        );
      default:
        return "";
    }
}

const mapStateToProps = createStructuredSelector({
  planId: contestantFormSelectors.makeSelectContestantFormPlanId(),
  eventInfo: commonApiSelectors.makeSelectEventInfo(),
  entry: contestantFormTemplateSelectors.makeSelectContestantFormTemplateEntry(),
  jobStatus: commonApiSelectors.makeSelectTranscoderJobStatus(),
});
const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    removeUploadedFile: (file) => {
      dispatch(commonApiActions.removeUploadedFile(file))
    },
    transcoderJobStatus: (file) => {
      dispatch(commonApiActions.transcoderJobStatus(file))
    },
    deleteTranscoderJobStatus: () => {
      dispatch(commonApiActions.deleteTranscoderJobStatus())
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicField);
