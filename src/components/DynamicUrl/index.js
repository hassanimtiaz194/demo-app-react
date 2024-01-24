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
import { Grid, Link, TextField, Typography, FormHelperText } from "@material-ui/core";

import VideoIcon from '@material-ui/icons/VideoLibrary';
import LinkIcon from '@material-ui/icons/Link';
import { Field as FormikField, Form, Formik, FormikProps } from 'formik';

/* const urlRequiredValidation = yup.object({
  urlValid: yup.string()
    .matches(
      /^(http:\/\/|https:\/\/)?(www\.)?[a-zA-Z0-9\-$]+\.[a-zA-Z]{2,5}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
      'Enter correct url!'
    )
    .required('Please enter website'),
}); */
const urlNotRequiredValidation = yup.object({
  urlValid: yup.string()
    .matches(
      /^(http:\/\/|https:\/\/|www\.)?[a-zA-Z0-9\-$]+\.[a-zA-Z]{1,5}?[a-zA-Z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\{\[\}\}\|\\\:\;\'\"\,\<\.\>\/?\*\+]{1,500}/g,
      'Enter a valid url!'
    )
});

export default function DynamicUrl(props) {
  const classes = useStyles();
  /**
   * @type {Field} field
   */
  const field = props.field;
  /**
   * @type {ContestantFormFieldAnswer} fieldAnswer
   */
  const fieldAnswer = props.fieldAnswer;
  const fieldType = props.field.type;
  const isRequired = field.required === "required";
  const { disabled, extendSchema, handleChange, isEntryFormSubmited, onFormFieldUpdate } = props;
  const [isStandardUrl, setIsStandardUrl] = useState(false);
  const [isNotRequiredUrl, setIsNotRequiredUrl] = useState(false);
  const sectionId = fieldAnswer.sectionId;
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [isFieldError, setIsFieldError] = useState((isRequired && triedSubmit && !(fieldAnswer?.answer || props?.value)));
  const onFieldFocus = (event) => {
    setTriedSubmit(true);
  }
  React.useEffect(() => {
    extendSchema &&
      extendSchema({
        [fieldAnswer.sectionId]: isRequired
          ? yup.string().url().required()
          : yup.string().url(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldAnswer]);
  React.useEffect(() => {
    if (field?.urlType === 'standard') {
      setIsStandardUrl(true);
    }
  }, [isStandardUrl]);

  React.useEffect(() => {
    setIsFieldError((isRequired && triedSubmit && !(fieldAnswer?.answer || props?.value)) ? true : false);
  }, [triedSubmit]);
  const handleUrlSubmission = (evt) => {
    evt.persist()
    const answer = evt.target.value.trim();

   onFormFieldUpdate({
    answer,
    sectionId,
    type: fieldType,
    nativeEvent: evt,
    fieldAnswer: fieldAnswer.answer
  });
  }

  function youtubeParseUrl(url) {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);

    if (match && match[2].length == 11) {
      return 'https://www.youtube.com/embed/' + match[2];
    } else {
      return 'https://www.youtube.com/embed/error';
    }
  }

  function vimeoParseUrl(url) {
    let vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
    if (url.match(vimeoRegex)) {
      let parsed = url.match(vimeoRegex);
      return "https://player.vimeo.com/video/" + parsed[1];
    } else {
      return "https://player.vimeo.com/video/error";
    }
  };

  function tiktokParseUrl(url) {
    if (url.indexOf('tiktok') > -1) {
      let tiktokUrl = url.split('?');
      tiktokUrl = tiktokUrl[0];
      tiktokUrl = tiktokUrl.split('/');
      tiktokUrl = tiktokUrl[tiktokUrl.length - 1];
      return 'https://www.tiktok.com/embed/' + tiktokUrl;
    } else {
      return 'https://www.tiktok.com/embed/error';
    }
  };
  function screenRParseUrl(url) {
    if (url.indexOf('screenr') > -1) {
      let screenRUrl = url.split('/');
      screenRUrl = screenRUrl[screenRUrl.length - 1];
      return 'http://www.screenr.com/' + screenRUrl;
    } else {
      return 'http://www.screenr.com/error';
    }
  };

  function getVideo(url) {
    // for youtube
    if (field.urlType === 'youtube' && url !== undefined) {
      if (url.indexOf('youtube') > -1 || url.indexOf('youtu.be') > -1) {
        return (<div className={classes.embedContainer}>
          <iframe src={youtubeParseUrl(url)} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="560" height="315" frameborder="0" aria-label="Youtube Video"></iframe>
        </div>);
      } else {
        return (<Typography style={{ color: '#e91c0d' }}>Youtube link not valid</Typography>);
      }
    }
    // for vimeo
    if (field.urlType === 'vimeo' && url !== undefined) {
      if (url.indexOf('vimeo') > -1) {
        return (<div className={classes.embedContainer}>
          <iframe aria-label="Vimeo Video" src={vimeoParseUrl(url)} width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        </div>);
      } else {
        return (<Typography style={{ color: '#e91c0d' }}>Vimeo link not valid</Typography>);
      }
    }
    // for tiktok
    if (field.urlType === 'tiktok' && url !== undefined) {
      if (url.indexOf('tiktok') > -1) {
        return (<div className={classes.embedContainer}>
          <iframe
            aria-label="Tiktok Video"
            src={tiktokParseUrl(url)}
            className={classes.iframeTiktok}
            scrolling="no"
            allow="encrypted-media;"
          ></iframe>
        </div>);
      } else {
        return (<Typography style={{ color: '#e91c0d' }}>Tiktok link not valid</Typography>);
      }
    }

    // for ScreenR
    if (field.urlType === 'screenR' && url !== undefined) {
      if (url.indexOf('screenr') > -1) {
        return (
          <div className={classes.embedContainer}>
            <iframe aria-label="ScreenR Video" src={screenRParseUrl(url)} width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
          </div>
        );
      } else {
        return (<Typography style={{ color: '#e91c0d' }}>ScreenR link not valid</Typography>);
      }
    }
  }
  function getStandardUrl(url) {
    if (url !== undefined) {
      let standardUrl = url;
      if (standardUrl.indexOf("http://") == 0 || standardUrl.indexOf("https://") == 0) {
        return standardUrl;
      } else {
        return 'https://' + standardUrl;
      }
    }
  };
  return (
    <Grid item sm={12}>
      {isEntryFormSubmited || props.disableFormNextPhase === true ?
        <>
          <div className={classes.label}>
            {!isEntryFormSubmited ? isStandardUrl ? <LinkIcon style={{ fill: "#89ba39" }} noWrap /> : <VideoIcon style={{ fill: "#89ba39" }} noWrap /> : ''}
            {dynamicHtml(field.labelText, isRequired, {
              style: { display: 'inline-block', fontWeight: 'bold' },
            })}

          </div>
          {(fieldAnswer?.answer || props?.value) && field.urlType === 'youtube' && (
            getVideo(fieldAnswer?.answer || props?.value)
          )}
          {(fieldAnswer?.answer || props?.value) && field.urlType === 'vimeo' && (
            getVideo(fieldAnswer?.answer || props?.value)
          )}
          {(fieldAnswer?.answer || props?.value) && field.urlType === 'tiktok' && (
            getVideo(fieldAnswer?.answer || props?.value)
          )}
          {(fieldAnswer?.answer || props?.value) && field.urlType === 'screenR' && (
            getVideo(fieldAnswer?.answer || props?.value)
          )}
          {(fieldAnswer?.answer || props?.value) && field.urlType === 'standard' && (
            <>
              <Link href={getStandardUrl(fieldAnswer?.answer || props?.value)} target="_blank" underline="hover" style={{ fontSize: 16, wordBreak: 'break-all' }}>
                {fieldAnswer?.answer || props?.value}
              </Link>
            </>
          )}
        </>
        :
        <>
          <div className={classes.label}>
            {isStandardUrl ? <LinkIcon style={{ fill: !isEntryFormSubmited ? "#89ba39" : '#9B9B9B' }} noWrap /> : <VideoIcon style={{ fill: !isEntryFormSubmited ? "#89ba39" : '#9B9B9B' }} noWrap />}
            {dynamicHtml(field.labelText, isRequired, {
              style: { display: 'inline-block', marginLeft: '5px', fontWeight: 'bold' },
            })}
          </div>
          <FormikField name={'url' + fieldAnswer.sectionId /* + props?.section.sectionId */}>
            {({
              field, // { name, value, onChange, onBlur }
              form: { status, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta,
            }) => (
              <>
                <TextField
                  /* {...field} */
                  inputProps={{
                    "aria-label": props.field.labelText + ' ' + (props.field.sublabel ? props.field.sublabel : '') + ' ' + (isFieldError ? 'alert ' + props.field.labelText + ' is required' : ''),
                    "aria-required": isRequired,
                    /* "aria-describedby": sectionId, */
                  }}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onInput={(event) => {
                    const pattern = /^(http:\/\/|https:\/\/|www\.)?[a-zA-Z0-9\-$]+\.[a-zA-Z]{1,5}?[a-zA-Z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\{\[\}\}\|\\\:\;\'\"\,\<\.\>\/?\*\+]{1,500}/g;
                    if (!isRequired) {
                      if(event.target.value !== '' && !pattern.test(event.target.value)){
                        setIsNotRequiredUrl(true);
                      }else{
                        setIsNotRequiredUrl(false);
                      }
                    }
                  }}
                  disabled={disabled}
                  variant="outlined"
                  required={isRequired}
                  onChange={handleUrlSubmission}
                  onKeyPress={(ev) => {
                    // console.log(`Pressed keyCode ${ev.key}`);
                    if (ev.key === 'Enter') {
                      // Do code here
                      ev.preventDefault();
                    }
                  }}
                  //onBlur={handleChange}
                  defaultValue={fieldAnswer?.answer || props?.value}
                  className={classes.field}
                  margin="normal"
                  error={(status === true && meta.error !== undefined) || (meta.error !== undefined && meta.touched === true)}
                /* type="url" */
                //helperText={field.sublabel}
                />
                <FormHelperText style={{ color: "#000000", fontWeight: 410, }} id={sectionId}>{getCleanTextFromHtmlString(props.field.sublabel)}</FormHelperText>
                {(status === true && meta.error !== undefined) || (meta.error !== undefined && meta.touched === true) ? <span style={{ color: '#AE0C00', fontWeight: 450 }}>{getCleanTextFromHtmlString(meta.error)}</span> : isNotRequiredUrl ? <span style={{ color: '#AE0C00', fontWeight: 450 }}>Enter a valid url!</span> :null }
              </>
            )}
          </FormikField>
        </>
      }
    </Grid >
  );
}
