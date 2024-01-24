import * as yup from "yup";
import React, { useState, useEffect } from "react";

import {
  Button,
  Typography,
  FormHelperText,
  LinearProgress,
  Fade,
  useMediaQuery,
  Box,
  TextField
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageIcon from '@material-ui/icons/Image';
import FileUploadIcon from '@material-ui/icons/CloudUploadRounded';
import { useDropzone } from "react-dropzone";
import Link from "@material-ui/core/Link";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { saveAs } from "file-saver";
import {
  // eslint-disable-next-line no-unused-vars
  FIELD_TYPE,
  // eslint-disable-next-line no-unused-vars
  Field,
  // eslint-disable-next-line no-unused-vars
  ContestantFormFieldAnswer,
} from "../../typedefs/contestantFormTemplate.typedef";
import { Field as FormikField, Form, Formik, FormikProps } from 'formik';
import {
  dynamicHtml,
  formatBytes,
  getCleanTextFromHtmlString,
} from "utils/helpers";

import useStyles from "./styles";
import { useDownloadFile } from "hooks/useDownloadFile";
import { useFileUploadInfo } from "hooks/useFileUploadInfo";
import { useRefCustomValidation } from "hooks/useRefCustomValidation";
import Video from "components/Video";
import LinearProgressWithLabel from "../LinearProgressWithLabel";
import { useRef } from "react";


const isImage = (name) => {
  return name.match(/.(jpg|jpeg|png|gif)$/i);
};

export default function FileField(props) {
  /**
   * @type {Field} field
   */
  const field = props.field;
  /**
   * @type {ContestantFormFieldAnswer} fieldAnswer
   */
  const fieldAnswer = props.fieldAnswer;
  const isRequired = field.required === "required";
  const { disabled,
    extendSchema,
    handleChange,
    section,
    transcoderJobStatus,
    deleteTranscoderJobStatus,
    entry,
    jobStatus,
    isFocusAllowed,
    formButtonClicked,
    setFormButtonClicked,
    setDeletedFileField,
    downloadEntryFile
  } = props;
  let status;
  const focusRef = useRef(null);
  const [currentJobStatus, setCurrentJobStatus] = useState(true);
  const isActive = useMediaQuery('(max-width:600px)');
  const sectionId = fieldAnswer.sectionId;
  const [state, setState] = useState({
    type: field.type,
    sectionId: fieldAnswer.sectionId,
    planId: props.planId
  });
  const [fileType, setFileType] = useState('');
  const { removeUploadedFile, isEntryFormSubmited } = props;

  const { getRootProps, getInputProps, open, isDragActive, acceptedFiles, inputRef } =
    useDropzone({
      noClick: true,
      noKeyboard: true,
      multiple: true,
      disabled: disabled,
      onDrop: handleChange,
      accept: fileType,
      maxSize: field.maxFileSizeNumber,
    });
  const { downloadedFilename, downloadedUrl, download } = useDownloadFile(
    (fieldAnswer || {}).answer
  );
  const { fileUploadProgress, loading } = useFileUploadInfo(
    fieldAnswer.sectionId
  );

  useEffect(() => {
    if (typeof field?.filetype !== "undefined") {
      var arr = field.filetype.split(',');
      arr = arr.map(function (value) { return '.' + value; });
      arr = arr.toString();
      setFileType(arr);
    } else {
      setFileType('');
    }
  }, [fileType])

  useEffect(() => {
    if (entry) {
      if (entry.planList) {
        status = entry.planList[0].contentList.find((jobId) => {
          return jobId.sectionId === section.sectionId;
        });
        if (status) {
          if (status.jobStatus === 'Error' || status.jobStatus === 'Canceled') {
            setCurrentJobStatus(false);
          } else {
            setCurrentJobStatus(true);
          }
        }
      }
    }
  }, [entry, currentJobStatus])

  /*  if (downloadedUrl) {
     const a = document.createElement("a");
     a.setAttribute("download", downloadedFilename);
     a.setAttribute("href", downloadedUrl);
     a.click();
   } */



  const classes = useStyles({ isDragActive });
  const [fileExists, setFileExists] = useState(false);
  const [wantsToReplace, setWantsToReplace] = useState(false);
  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);

  useEffect(() => {
    if (acceptedFiles?.length) {
      setFileExists(false);
      setWantsToReplace(false);
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (fieldAnswer && fieldAnswer.answer) {
      setFileExists(true);
      setRefFileFieldValidation(false);
    } else {
      setFileExists(false);
    }
  }, [fieldAnswer]);

  const { refFileFieldValidation, setRefFileFieldValidation } = useRefCustomValidation(
    field,
    isRequired,
    inputRef,
    fieldAnswer.answer,
  );

  React.useEffect(() => {
    extendSchema &&
      extendSchema({
        [fieldAnswer.sectionId]: isRequired
          ? yup.string().required()
          : yup.string(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (focusRef) {
      if (focusRef.current) {
        if (isRequired === true && isFocusAllowed) {
          if (formButtonClicked) {
            if (refFileFieldValidation) {
              focusRef.current.scrollIntoView({ behavior: 'smooth' });
              setRefFileFieldValidation(false)
              setFormButtonClicked(false)
            }
          }
        }
      }
    }
  }, [focusRef, refFileFieldValidation, isFocusAllowed, formButtonClicked])

  function formikFieldName(section) {
    if (section?.type === 'file') {
      return ('file' + sectionId)
    }
    if (section?.type === 'skild-video') {
      return ('video' + sectionId)
    }
  };

  function getFileName(url) {
    if (url !== undefined && url !== null) {
      let fileName = url;
      fileName = fileName.split('/');
      fileName = fileName[fileName.length - 1];
      fileName = fileName.split('-');
      fileName = fileName[fileName.length - 1];
      return fileName;
    }
  };
  function downloadFileFieldFile(url) {
    let fileName = url;
    fileName = fileName.split('/');
    fileName = fileName[fileName.length - 1];
    let originalFileName = fileName.split('-');
    originalFileName = originalFileName[originalFileName.length - 1];
    saveAs(url, originalFileName);
    // downloadEntryFile({ name: fileName, orginalFileName: originalFileName });
  }

  const handleDeleteFileDialog = () => {
    setdeleteDialogOpen(true);
  };
  const handleDeleteFileDialogClose = () => {
    setdeleteDialogOpen(false);
  };
  const handleConfirmDeleteFileUpload = () => {
    setDeletedFileField({
      sectionId: sectionId
    })
    deleteTranscoderJobStatus();
    removeUploadedFile(state);
    setdeleteDialogOpen(false);
    if (isRequired) {
      setRefFileFieldValidation(true);
    }
  };

  const showFile = (/* isEntryFormSubmited */value) => {
    // If it's video
    if (field.type === FIELD_TYPE.VIDEO) {
      if (currentJobStatus === true) {
        return <Video section={section} entry={entry} transcoderJobStatus={transcoderJobStatus} jobStatus={jobStatus} src={/* fieldAnswer.answer */value} alt='Uploaded Video' />;
      } else {
        return <Typography style={{ color: '#e91c0d' }}>An error occurred. Please check the file you uploaded.</Typography>
      }
    }
    // If it's image
    if (isImage(/* fieldAnswer.answer */value || "")) {
      const imagee = /* fieldAnswer.answer */value.replace('/small/', '/large/');
      return <img style={{ maxWidth: isActive ? 270 : 500 }} alt="Uploaded Image" src={imagee} />;
    }
    // If it's file attachment
    return (
      <div style={{display: 'flex'}}>
          <AttachFileIcon />
          {fieldAnswer !== undefined && (
            /* <Link underline="none" onClick={() => { downloadFileFieldFile(value); }}> */
            <div style={{color:'black', fontSize: '1.125rem', paddingTop: 2}}>
              {getFileName(value)}
            </div>
            /* </Link> */
          )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <FormikField name={formikFieldName(section)}>
        {({
          field, // { name, value, onChange, onBlur }
          form: { status }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <>
            <div
              className={classes.fieldHeaderWrapper}
              aria-label={getCleanTextFromHtmlString(props.field.labelText)}
            /* tabIndex={0} */
            >
              <div className={classes.fieldHeader}>
                <div className={classes.fieldLabel} id={'fileField ' + sectionId} /* ref={ focusRef} */>
                  {!isEntryFormSubmited || props.disableFormNextPhase === false ? <AttachFileIcon style={{ fill: "#89ba39" }} noWrap /> : <></>}
                  {dynamicHtml(props.field.labelText, isRequired, {
                    style: { display: 'inline-block', fontWeight: 'bold' },
                  })}
                </div>

                {/*     {fileExists && (
            <Button
              color={wantsToReplace ? "primary" : "default"}
              onClick={() => {
                setWantsToReplace(!wantsToReplace);
              }}
              disabled={disabled}
            >
              {wantsToReplace ? "Cancel" : "Replace"}
            </Button>
          */}
                {/* fileExists */ field.value && (
                  <>
                    {!isEntryFormSubmited && (<>
                      {props.disableFormNextPhase !== true && (
                        <>
                          <Button
                            color={wantsToReplace ? "primary" : "default"}
                            onClick={handleDeleteFileDialog}
                            disabled={disabled || props.disableFormNextPhase === true}
                            aria-label={props.field.labelText + ' Delete'/* (field?.uploadType||field?.type) */}
                          //aria-labelledby={'fileField '+sectionId}
                          >
                            <DeleteIcon style={{ fill: 'red' }} />Delete
                          </Button>
                        </>)}
                    </>)}
                  </>)}
              </div>
              {(!fieldAnswer.answer || wantsToReplace) && (
                <Typography id={sectionId} className={classes.subLabel} variant="caption">
                  {!isEntryFormSubmited || props.disableFormNextPhase === false ? props.field.filetype : ''}
                </Typography>
              )}
            </div>
            <Fade in={loading}>
              <LinearProgressWithLabel value={fileUploadProgress || 0} loading={loading} />
            </Fade>
            {
              /* fileExists */ field.value ? (
                showFile(field.value)
              ) : (

                isEntryFormSubmited || props.disableFormNextPhase === true ?
                  <></>
                  :
                  <div style={{ borderColor: refFileFieldValidation ? '#ff1744' : '#eeeeee' }} {...getRootProps()} className={classes.dropzone}>
                    <input aria-label="Upload File" aria-describedby={sectionId} disabled={disabled} {...getInputProps()} required={isRequired} />

                    {isDragActive ? (
                      <Typography>Drop the file here ...</Typography>
                    ) : (
                      <>
                        <AttachFileIcon />
                        <Typography style={{ color: "#3c3c3c" }}>Drag and drop a file you want to upload </Typography>
                        <Typography style={{ fontWeight: "bold", color: "#3c3c3c", marginTop: "5px" }}> OR</Typography>
                      </>
                    )}{/* 
            {!wantsToReplace && (
              <Typography style={{ fontStyle: "italic", wordBreak: "break-all" }}>
                {acceptedFiles && acceptedFiles.length
                  ? acceptedFiles[0].name
                  : ""}
              </Typography>
            )} */}
                    <Button
                      onClick={open}
                      variant="outlined"
                      color="primary"
                      className={classes.uploadBtn}
                      aria-required={isRequired}
                      aria-label={'Select a file, ' + props.field.labelText + ' Maximum file size ' + formatBytes(props.field.maxFileSizeNumber) + (refFileFieldValidation ? ' alert Required file must be uploaded' : '')}
                      aria-describedby={sectionId}
                      component="label"
                      disabled={disabled || loading}
                      ref={focusRef}
                    >
                      Select a file
                    </Button>
                    {loading ? (
                      <Typography style={{ marginTop: 10 }} variant="caption">
                        {/* {`${fileUploadProgress}%`} */}
                      </Typography>
                    ) : (
                      props.field.maxFileSizeNumber && (
                        <Typography style={{ marginTop: 10, color: '#6C6F81', fontWeight: 800 }} variant="caption">
                          <div id={sectionId}>Maximum file size {formatBytes(props.field.maxFileSizeNumber)}</div>
                        </Typography>
                      )
                    )}
                  </div>
              )
            }
            {!isEntryFormSubmited || props.disableFormNextPhase === false ? <FormHelperText style={{ color: "#000000", fontWeight: 410, }}>{getCleanTextFromHtmlString(props.field.sublabel)}</FormHelperText> : ''}
            <br />
            {status === true && meta.error !== undefined ? <span style={{ color: '#AE0C00', fontWeight: 450 }}>Required file must be uploaded</span> : null}
          </>
        )}
      </FormikField>
      <Dialog aria-labelledby="dialog-title" aria-describedby="dialog-description" open={deleteDialogOpen} onClose={handleDeleteFileDialogClose} >
        <DialogTitle id="dialog-title" /* tabIndex={0} */>Delete Confirmation</DialogTitle>
        <DialogContent id="dialog-description">
          <DialogContentText /* tabIndex={0} */>
            Do you want to delete the uploaded file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteFileDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDeleteFileUpload} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment >
  );
}
