import * as yup from "yup";
import React, { useEffect, Fragment, useState } from "react";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import { Fade, Grid, Typography, Box, Divider, Card, IconButton, CircularProgress, useMediaQuery } from "@material-ui/core";
import {
  // eslint-disable-next-line no-unused-vars
  ContestantFormTemplate,
  // eslint-disable-next-line no-unused-vars
  ContestantForm,
  FIELD_TYPE,
} from "../../typedefs/contestantFormTemplate.typedef";



import BackdropLoading from "components/BackdropLoading";
import Timeline from "components/Timeline";
import SubmissionStateInfo from "components/SubmissionStateInfo";
import DynamicField from "components/DynamicField";

import useStyles from "./styles";
import connectStore from "./connectStore";
import { useOnSaveMessage } from "./useOnSaveMessage";
import { useValidation } from "./useValidation";
import CountDownTimer from "components/CountDownTimer";
import JudgesComments from "components/JudgesComments";
import ReactGA from "react-ga4";
import { useConfirmDialog } from "hooks/useConfirmDialog";
import { useRef } from "react";
import { useAutoSaveEntryForm } from "hooks/useAutoSaveEntryForm"
import { Formik, useFormik, useFormikContext } from "formik";
import { useEntryFormFomikIntialsValues } from "hooks/useEntryFormFomikIntialsValues";
import { useEntryFormValidationSchema } from "hooks/useEntryFormValidationSchema";
import { SocialSigninRegistration } from "components/SocialSigninRegistration";




export function Applications(props) {
  //   state actions
  const {
    submitContestantForm,
    loadContestantFormTemplate,
    updateFormField,
    saveContestantForm,
    uploadFile,
  } = props;

  //   state props
  const {
    contestantFormSubmissionResponse,
    selectedBracketId,
    formEditMode,
    formSavedId,
    currentPhaseNumber,
    canSubmitEntry,
    profile,
    eventInfo,
    entryFormLoading,
    entryFormExist,
    onError,
    downloadEntryFile,
    token,
    onRegError,
    socialRegComplete,
    socialRegistrationCompleted
  } = props;
  const isActive = useMediaQuery('(max-width:600px)');

  const { updateInputTime } = useAutoSaveEntryForm(saveContestantForm);

  /**
   * @type {ContestantFormTemplate} contestantFormTemplate
   */
  const contestantFormTemplate = props.contestantFormTemplate;
  /**
   * @type {ContestantForm} contestantForm
   */
  const contestantForm = props.contestantForm;

  const classes = useStyles();
  //   local state
  let [content, setContent] = useState(null);
  let [loading, setLoading] = useState(false);
  let [isLastMessage, setIsLastMessage] = useState(false);
  let [isSubmissionPeriodOver, setIsSubmissionPeriodOver] = useState(true);
  let [downloadEntryFormPeriod, setDownloadEntryFormPeriod] = useState(false);
  let [userCanEditField, setUserCanEditField] = useState(false);
  let [userCanSubmitForm, setUserCanSubmitForm] = useState(false);
  let [isSubmissionPeriodOverEditView, setIsSubmissionPeriodOverEditView] = useState(false);
  const [isFocusAllowed, setIsFocusAllowed] = useState(false);
  /* const [schema, setSchema] = React.useState(yup.object()); */
  const saveMessageOpen = useOnSaveMessage(formSavedId);
  const { open, dialog } = useConfirmDialog();
  const formButton = useRef(null);
  const entryForm = useRef(null);
  let [formButtonClicked, setFormButtonClicked] = useState(false);
  let [initialStatus, setInitialStatus] = useState(false);
  let [updatedField, setUpdatedField] = useState(null);
  let [deletedFileField, setDeletedFileField] = useState(null);
  const sections = contestantFormTemplate.sectionList || [];
  let [formikErrors, setFormikError] = useState({});
  let formikk;
  let count = 0;
  const {
    formikIntialValuesObj,
    formikIntialValuesObj2
  } = useEntryFormFomikIntialsValues(sections, contestantForm.answerList, eventInfo, updatedField, deletedFileField, setDeletedFileField);
  const {
    entryValidationSchema
  } = useEntryFormValidationSchema(sections, eventInfo);
  let initialValuesFormik = {
    ...formikIntialValuesObj,
    ...formikIntialValuesObj2
  }

  const onFormFieldUpdate = (event) => {
    const { type, answer, sectionId, fieldAnswer } = event;
    setUpdatedField({
      type: type,
      sectionId: sectionId,
      answer: answer
    })

    updateInputTime();

    if (type === FIELD_TYPE.FILE || type === FIELD_TYPE.VIDEO) {
      const file = (answer || [])[0];
      uploadFile({ type, file, sectionId });
      return;
    }
    updateFormField({ type, answer, sectionId });
  };

  useEffect(() => {
    ReactGA.set({ user_id: profile?.userId, skild_id: profile?.userId });
    if (profile?.userType !== 'ContestantLeader') {
      if (isSubmissionPeriodOverEditView === true) {
        if (formEditMode === true) {
          if (eventInfo?.teamMembersCanEdit === true) {
            setUserCanEditField(false);
          } else if ((eventInfo?.teamMembersCanEdit === false)) {
            setUserCanEditField(true);
          }
          if (canSubmitEntry === true) {
            setUserCanSubmitForm(false);
          } else if (canSubmitEntry === false) {
            setUserCanSubmitForm(true);
          }
        } else if (formEditMode === false) {
          setUserCanEditField(true);
          setUserCanSubmitForm(true);
        }
      }
    } else {
      if (isSubmissionPeriodOverEditView === true) {
        if (formEditMode === true) {
          setUserCanEditField(false);
          setUserCanSubmitForm(false);
        } else {
          setUserCanEditField(true);
          setUserCanSubmitForm(true);
        }
      }
    }

  }, [userCanEditField, userCanSubmitForm, formEditMode, canSubmitEntry, isSubmissionPeriodOverEditView, eventInfo?.teamMembersCanEdit]);


  useEffect(() => {
    if (contestantFormSubmissionResponse) setLoading(false);
  }, [contestantFormSubmissionResponse, entryFormLoading]);

  useEffect(() => {
    if (selectedBracketId && (currentPhaseNumber || currentPhaseNumber === 0)) {
      loadContestantFormTemplate(selectedBracketId, currentPhaseNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBracketId, currentPhaseNumber]);
  useEffect(() => {
    if (contestantForm.bracketId !== contestantFormTemplate.bracketId) return;
    setContent(
      sections.map((section, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <DynamicField
            /*  extendSchema={handleExtendSchema} */
            section={section}
            onFormFieldUpdate={onFormFieldUpdate}
            padding={20}
            fieldAnswer={contestantForm.answerList[index]}
            field={section.paramMap}
            disabled={userCanEditField}
            isEntryFormSubmited={!formEditMode}
            isFocusAllowed={isFocusAllowed}
            setFormButtonClicked={setFormButtonClicked}
            formButtonClicked={formButtonClicked}
            setDeletedFileField={setDeletedFileField}
            disableFormNextPhase={contestantFormTemplate.disableForm}
            downloadEntryFile={downloadEntryFile}
          />
        </div>
      ))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contestantFormTemplate, /* contestantForm, */ formEditMode, userCanSubmitForm, isFocusAllowed, formButtonClicked]);




  useEffect(() => {
    if (formButton && entryForm) {
      if (formButton.current !== null && entryForm.current !== null) {
        const errorsArray = Object.entries(formikErrors);
        formButton.current.addEventListener('click', (evt) => {
          // saveContestantForm();
          if (entryForm.current.reportValidity() === false) {
            if (errorsArray.length !== 0) {
              onError(errorsArray[0][1]);
            }
            setFormButtonClicked(true)
            setInitialStatus(true)
          } else {
            if (Object.keys(formikErrors).length !== 0) {
              setFormButtonClicked(true);
              count = 1;
            }
          }
        })
      }
    }
  }, [formButtonClicked, initialStatus, contestantFormTemplate, formButton, initialValuesFormik, entryValidationSchema, formikErrors])


  useEffect(() => {
    let count = 0;
    //if (!entryFormLoading) {
    if (formButtonClicked) {
      if (isLastMessage && count === 0 && Object.keys(formikErrors)[0].includes('url')) {
        onError(Object.values(formikErrors)[0]);
        count = count + 1;
      }
    }
    //}
  }, [formButtonClicked])

  return (
    <Fragment>
      {dialog}
      <BackdropLoading show={loading}></BackdropLoading>
      <Snackbar
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={classes.snackBar}
        open={saveMessageOpen}
        message="Changes saved!"
      />
      {entryFormLoading ? '' :
        <>
          {entryFormExist && (<SubmissionStateInfo isSubmissionPeriod={isSubmissionPeriodOver} downloadEntryFormPeriod={downloadEntryFormPeriod} />)}
        </>}
      <Timeline />
      <Box>
        <Grid container spacing={2}
          direction="row"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Grid item xs={11} /* tabIndex={0} */>
            {(eventInfo.eventId === 554 || eventInfo.eventId === 1) && (
              <SocialSigninRegistration socialRegComplete={socialRegComplete} onRegError={onRegError} token={token} userType={profile.userType} eventInfo={eventInfo} socialRegistrationCompleted={socialRegistrationCompleted} />
            )}
            <br />
            <Typography component='h2' variant="h6">
              Event Status
            </Typography>
            <br />
            <Grid container spacing={1} >
              <CountDownTimer isSubmissionPeriod={setIsSubmissionPeriodOver} setDownloadEntryFormPeriod={setDownloadEntryFormPeriod} setIsSubmissionPeriodOverEditView={setIsSubmissionPeriodOverEditView} />
            </Grid>
            <br />
            <JudgesComments />
            <br />
            <Divider variant="middle" />
          </Grid>
        </Grid>
      </Box>
      <br />
      {currentPhaseNumber === 0 && (
        <Typography variant="h5" style={{ textAlign: 'center', color: 'red' }}>
          {eventInfo?.phaseList[0]?.phaseName} has not Started
        </Typography>
      )}
      {initialValuesFormik !== null && entryValidationSchema &&
        <Formik
          enableReinitialize={true}
          isSubmitting={true}
          isValidating={true}
          initialStatus={initialStatus}
          validateOnMount={true}
          initialValues={
            initialValuesFormik === null ? '' : initialValuesFormik
          }
          validate={values => {
            const errors = {};
            formikk = errors;
            if (entryValidationSchema !== null && entryValidationSchema !== undefined) {
              entryValidationSchema.map((array) => {
                // validation Schema for Required url field only
                if (Object.keys(array)[0].match('url')) {
                  if (!values[Object.keys(array)[0]]) {
                    errors[Object.keys(array)[0]] = Object.values(array)[0];
                  } else if (!/^(http:\/\/|https:\/\/|www\.)?[a-zA-Z0-9\-$]+\.[a-zA-Z]{1,5}?[a-zA-Z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\{\[\}\}\|\\\:\;\'\"\,\<\.\>\/?\*\+]{1,500}/g.test(values[Object.keys(array)[0]])) {
                    errors[Object.keys(array)[0]] = 'Enter a valid URL';
                  }
                }

                // validation Schema for Email field
                if (Object.keys(array)[0].match('email')) {
                  if (!values[Object.keys(array)[0]]) {
                    errors[Object.keys(array)[0]] = Object.values(array)[0];
                  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values[Object.keys(array)[0]])) {
                    errors[Object.keys(array)[0]] = 'Enter a valid Email Address';
                  }
                }

                // validation Schema for other field
                if (!Object.keys(array)[0].match('password') || !Object.keys(array)[0].match('confirmPassword') || !Object.keys(array)[0].match('url') || !Object.keys(array)[0].match('email')) {
                  if (!values[Object.keys(array)[0]]) {
                    errors[Object.keys(array)[0]] = Object.values(array)[0];
                  }
                }
              });
            }
            // this code is for stopping depth issue 
            //=====================================================
            const errors2 = Object.keys(errors)
              .filter((key) => {
                return (key.match('checkbox') || key.match('textBox') || key.match('url')
                  || key.match('email') || key.match('confirmEmail') || key.match('password')
                  || key.match('confirmPassword') || key.match('textArea') || key.match('radio')
                  || key.match('select'))
              })
            const errors3 = Object.keys(errors)
              .filter((key) => {
                return (key.match('file') || key.match('video') || key.match('richText'))
              })
            if (errors2.length === 0 && errors3.length !== 0) {
              setIsFocusAllowed(true)
            }
            if (errors2.length === 0) {
              setFormButtonClicked(false)
            }
            if (errors2.length !== 0) {
              setIsFocusAllowed(false)
            }
            if (errors3.length === 0) {
              setIsFocusAllowed(false)
            }
            setFormikError(errors);
            if (Object.keys(errors).length === 1) {
              setIsLastMessage(true);
            }
            if (Object.keys(errors).length === 0) {
              setIsLastMessage(false);
            }
            //=====================================================
            return errors;
          }

          }
          onSubmit={async (values, formikBag) => {
            setFormButtonClicked(false);
            const confirmed = await open(
              "Submit Entry",
              <Typography>Are you sure you want to Submit?</Typography>
            );
            if (confirmed) {
              //if (evt !== undefined && evt.preventDefault) evt.preventDefault();
              setLoading(true);
              const params = {
                entry_action: 'submit',
                phase: currentPhaseNumber,
                bracket: selectedBracketId,
                contestant_Id: profile.userId,
              }
              ReactGA.event('entry', params);
              ReactGA.event('entry_submit', params);
              submitContestantForm();
              window.scrollTo(0, 0);
            }
          }}

        >
          {({
            handleSubmit,
            errors
          }) => (
            <>
              <form className={isActive ? '' : classes.form} onSubmit={handleSubmit} ref={entryForm}>
                <Container maxWidth="lg">
                  {entryFormLoading ?
                    <Grid className={classes.loadingContainer} item sm={12}>
                      <CircularProgress />
                    </Grid> :
                    <>
                      {/* isSubmissionPeriodOver && canSubmitEntry && */ entryFormExist && (content)}
                      {entryFormExist ? '' : <Typography variant="h5" style={{ textAlign: 'center' }}>
                        No Entry Form to Display
                      </Typography>}
                    </>
                  }
                  {/* {canSubmitEntry &&  === false  ? (
           <Typography align="center" variant="subtitle1">
              Sorry, you are not entitled to participate in the current phase.
            </Typography>
          
          ) :  ( 
            content
          )} */}
                  {entryFormLoading ? '' :
                    <>
                      {content && isSubmissionPeriodOver && canSubmitEntry && entryFormExist ? (
                        <Button
                          disabled={userCanSubmitForm}
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={() => { saveContestantForm() }}
                          ref={formButton}
                        >
                          Save & Submit
                        </Button>
                      ) : (
                        ""
                      )}
                    </>}
                </Container>
              </form>
            </>)}
        </Formik>
      }
    </Fragment>
  );
}

export default connectStore(Applications);
