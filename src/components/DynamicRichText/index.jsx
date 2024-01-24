import * as yup from "yup";
import 'froala-editor/js/plugins/char_counter.min.js'
import FroalaEditor from "react-froala-wysiwyg";
import { Grid, Typography } from "@material-ui/core";
import React, { useRef } from "react";
import EditIcon from '@material-ui/icons/Edit';
import { useRefCustomValidation } from "hooks/useRefCustomValidation";

import { dynamicHtml, getCleanTextFromHtmlString ,getCleanTextFromHtmlString2 } from "utils/helpers";
import { Field as FormikField, Form, Formik, FormikProps } from 'formik';

const FROALA_API_KEY = process.env.REACT_APP_FROALA_API_KEY;
export default function DynamicRichText({
  /* handleChange, */
  fieldAnswer,
  disabled,
  field,
  extendSchema,
  isEntryFormSubmited,
  fieldType,
  onFormFieldUpdate,
  setIsDynamicRichTextboxRequired,
  isFocusAllowed,
  formButtonClicked,
  setFormButtonClicked,
  disableFormNextPhase
}) {
  /* const handleTextEditorChange = (value) => {
    handleChange({ target: { value: value } });
  };
 */
  const handleChange = (value) => {
    if (getCleanTextFromHtmlString2(value).trim() !== '' || !value) {
      const answer = value;
      const sectionId = fieldAnswer.sectionId;
      onFormFieldUpdate({
        answer,
        sectionId,
        type: fieldType,
        fieldAnswer: fieldAnswer.answer
        /* nativeEvent: event, */
      });
    }
  };
  const [editor, setEditor] = React.useState(null);
  /* const [isEmpty, setIsEmpty] = React.useState(false); */
  const isRequired = field.required === "required";
  const dynamicRichTextRef = useRef(null);
  const focusRef = useRef(null);
  const { refRichTextBoxValidation, setRichTextBoxValidation } = useRefCustomValidation(
    field,
    isRequired,
    dynamicRichTextRef,
    fieldAnswer.answer,
    setIsDynamicRichTextboxRequired
  );


  React.useEffect(() => {
    if (dynamicRichTextRef && focusRef) {
      if (dynamicRichTextRef.current !== null && dynamicRichTextRef.current !== undefined && focusRef !== null && focusRef !== undefined) {
        if (isRequired) {
          dynamicRichTextRef.current.el.setAttribute('required', true);
        }
        dynamicRichTextRef.current.el.setAttribute("aria-label", field.labelText);
        dynamicRichTextRef.current.el.setAttribute("aria-required", isRequired);
        if (dynamicRichTextRef.current.editor !== null && dynamicRichTextRef.current.editor !== undefined) {
          dynamicRichTextRef.current.editor.$el[0].setAttribute("aria-label", field.labelText)
          dynamicRichTextRef.current.editor.$el[0].setAttribute('aria-required', isRequired);
          if (formButtonClicked)
            if (refRichTextBoxValidation && isFocusAllowed) {
              dynamicRichTextRef.current.editor.$el[0].scrollIntoView({ behavior: 'smooth' })
              setRichTextBoxValidation(false);
              setFormButtonClicked(false)
            }
          // console.log(dynamicRichTextRef.current.editor)
          if (dynamicRichTextRef.current.editor.$box[0]) {
            if (dynamicRichTextRef.current.editor.$box[0].children[2] !== null && dynamicRichTextRef.current.editor.$box[0].children[2] !== undefined) {
              if (dynamicRichTextRef.current.editor.$box[0].children[2].classList.contains('show-placeholder')) {
                dynamicRichTextRef.current.editor.$box[0].children[2].children[1].setAttribute('style', 'color:#767676;background-color:#FFFFFF;font-size: 14px;line-height:22.4px;margin-top:14px;padding-top:20px;padding-left:20px;margin-left:0px;padding-right:20px;margin-right:0px;text-align:left;')
              }
            }
          }
          if (dynamicRichTextRef.current.editor.$second_tb) {
            dynamicRichTextRef.current.editor.$second_tb[0].children[0].setAttribute('style', 'color:#767676');
          }
        }
      }
    }
    if (!editor) return;
    if (disabled) {
      editor.off();
      setRichTextBoxValidation(false);
      setIsDynamicRichTextboxRequired(false);
    } else editor.on();
  }, [disabled, editor, dynamicRichTextRef, refRichTextBoxValidation, isFocusAllowed, formButtonClicked]);


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
    <Grid item sm={12} aria-label={getCleanTextFromHtmlString(field.labelText)}>
      {isEntryFormSubmited || disableFormNextPhase === true ?
        <>
          <div /* className={classes.label */>
            {/* <EditIcon style={{ fill: !isEntryFormSubmited ? "#89ba39" : '#9B9B9B' }} noWrap /> */}
            {dynamicHtml(field.labelText, isRequired, {
              style: { display: 'inline-block', fontWeight: 'bold' },
            })}
          </div>
          {/* <Typography variant="body1" style={{ fontSize: 16, wordBreak: 'break-all' }}>
            {fieldAnswer?.answer || ''}
          </Typography> */}
          <div
            dangerouslySetInnerHTML={{ __html: fieldAnswer?.answer }}
          ></div>
        </>
        :
        <>
          <div style={{ display: "flex", fontSize: "16px" }} ref={focusRef}>
            <EditIcon style={{ fill: !isEntryFormSubmited ? "#89ba39" : '#9B9B9B' }} noWrap />
            {dynamicHtml(field.labelText, isRequired, {
              style: { paddingBottom: 40, display: 'inline-block', marginLeft: '5px', fontWeight: 'bold' },
            })}
          </div>

          <FroalaEditor
            tag="textarea"
            ref={dynamicRichTextRef}
            aria-required={isRequired}

            config={{
              key: FROALA_API_KEY,
              charCounterMax: field.maxLength,
              charCounterCount: true,
              toolbarButtons: {
                'moreText': {

                  'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']

                },

                'moreParagraph': {

                  'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'quote']

                },

                'moreRich': {

                  'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']

                },

                'moreMisc': {

                  'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],

                  'align': 'right',



                }
              },
              attribution: false,
              pastePlain: true,
              reactIgnoreAttrs: ['class', 'id', 'style'],
              events: {
                initialized: function () {
                  setEditor(this.edit);
                },
                'charCounter.exceeded': function () {
                  alert('Max character limit of this field is ' + field.maxLength + ' characters');
                },
              },
            }}
            model={fieldAnswer?.answer || ""}
            onModelChange={handleChange}
          />
          <FormikField name={'richText' + fieldAnswer.sectionId}>
            {({
              field, // { name, value, onChange, onBlur }
              form: { status }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta,
            }) => (
              <>
                <br />
                {status === true && meta.error !== undefined /* || isEmpty */ ? <span style={{ color: '#AE0C00', fontWeight: 450 }}>{getCleanTextFromHtmlString(meta.error)}</span> : null}
              </>
            )}
          </FormikField>
        </>}
    </Grid >
  );
}
