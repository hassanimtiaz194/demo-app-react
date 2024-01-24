import React, { Fragment } from "react";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import clsx from "clsx";

import {
  dashboardSelectors,
  contestantFormSelectors,
  commonApiSelectors,
  profileSelectors,
  contestantFormTemplateSelectors,
} from "redux/selectors";

import useStyles from "./style";
import { contestantFormActions } from "redux/actions";
import { SUBMISSION_STARTED } from "redux/reducers/dashboardReducer";
import { Tooltip, Grid } from "@material-ui/core";
import ReactGA from "react-ga4";
import { styled } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { formHasBeenDownloaded } from "redux/actions/contestantFormActions";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";

export function SubmissionStateInfo(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showEditButton, setShowEditButton] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  const [downloadError, setDownloadError] = React.useState(false);
  const [disableDownload, setDisableDownload] = React.useState(false);
  const [downloadDialog, setDownloadDialog] = React.useState(false);
  let [timerCounter, setTimerCounter] = React.useState(0);

  //   state props
  const {
    outsideSubmissionPeriodMessage,
    submissionDate,
    editMode,
    submissionStatus,
    downloadedForm,
    profile,
    eventInfo,
    isSubmissionPeriod,
    downloadEntryFormPeriod,
    selectedBracketId,
    currentPhaseNumber,
    downloadedFormResponse,
    resetDownloadResponse,
    currentPhaseTimeline,
    formHasBeenDowloaded,
    contestantFormTemplate,
    CMSMsg,
  } = props;

  //   state actons
  const { unsubmitForm, downloadForm, canSubmitEntry } = props;

  const RedButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  }));
  const currentDate = moment();
  const startDate = new Date(currentPhaseTimeline?.submissionStartDate);
  const endDate = new Date(currentPhaseTimeline?.submissionEndDate);
  React.useEffect(() => {
    if (submissionDate) {
      setMessage(
        `Your entry was submitted on ${
          submissionDate /* .format(
          "MMM DD, YYYY, LT"
        ) */
        }.`
      );
    }
    if ((currentDate.isBefore(startDate) || currentDate.isAfter(endDate)) && submissionDate === null) {
      setMessage(CMSMsg);
    }
    else if (submissionDate === null) {
      setMessage("");
    }
  }, [CMSMsg, submissionDate]);

  React.useEffect(() => {
    setShowEditButton(submissionStatus === SUBMISSION_STARTED);
  }, [submissionStatus]);

  React.useEffect(() => {
    if (downloadedForm !== null && downloading) {
      const { filename, url } = downloadedForm;
      setDownloading(false);

      /*     const a = document.createElement("a");
          a.setAttribute("download", filename);
          a.setAttribute("href", url);
          a.click(); */
    }
  }, [downloadedForm, downloading]);

  React.useEffect(() => {
    if (downloadedFormResponse !== null) {
      setDownloadDialog(true);
      if (downloadedFormResponse.statusText !== "OK") {
        setDownloadError(false);
      }
    }
  }, [downloadedFormResponse, downloadError]);

  React.useEffect(() => {
    if (
      /* profile?.userType ==='ContestantLeader' || */ eventInfo?.allowUnsubmit
    ) {
      setIsDisabled(true);
    }
  }, [isDisabled]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setOpen(true);
    setTimerCounter(0);
  };

  const handleConfirm = () => {
    handleClose();
    unsubmitForm();
    formHasBeenDowloaded();
    setDisableDownload(false);
    const params = {
      entry_action: "unsubmit",
      phase: currentPhaseNumber,
      bracket: selectedBracketId,
      contestant_Id: profile.userId,
    };
    ReactGA.event("entry", params);
    ReactGA.event("entry_unsubmit", params);
  };

  const handleDownloadDialogClose = () => {
    resetDownloadResponse();
    setDownloadDialog(false);
    setDownloadError(false);
  };

  const handleDownload = (evt) => {
    evt.preventDefault();
    //formHasBeenDowloaded();
    setDownloading(true);
    downloadForm();
    //setDownloadDialog(true);
    setDisableDownload(true);
    setTimerCounter(60);
    setTimeout(() => setDisableDownload(false), 60000);
  };

  React.useEffect(() => {
    if (timerCounter > 0) {
      let interval = setInterval(() => {
        setTimerCounter(timerCounter - 1);
        // Display 'counter' wherever you want to display it.
        if (timerCounter <= 0) {
          clearInterval(interval);
          //return;
        } /*  else {
          console.log("Timer --> " + timerCounter);
        } */
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerCounter]);
  return (
    message && (
      <Fragment>
        <Grid
          className={clsx(classes.root, {
            [classes.greenBg]: submissionDate,
            [classes.redBg]: !submissionDate,
          })}
        >
          <Grid item xs={6}>
            <div
              className={
                submissionDate && !editMode && downloadEntryFormPeriod
                  ? classes.message
                  : classes.message2
              }
            >
              <Typography variant="subtitle2" component="p">
                {message}
              </Typography>
            </div>
          </Grid>
          {submissionDate && !editMode && downloadEntryFormPeriod && (
            <Grid
              item
              xs={6}
              container
              justifyContent="space-between"
              spacing={2}
              style={{ paddingLeft: "29%" }}
            >
              <Tooltip title="Download PDF" aria-label="Download PDF">
                <Button
                  style={{ minWidth: "120px" }}
                  onClick={handleDownload}
                  size="small"
                  variant="contained"
                  color="primary"
                  disabled={disableDownload}
                  className={classes.downloadButton}
                >
                  {disableDownload ? (
                    timerCounter
                  ) : (
                    <>
                      <GetAppOutlinedIcon /> Download
                    </>
                  )}
                </Button>
              </Tooltip>
              {showEditButton &&
                isDisabled &&
                (profile?.userType === "ContestantLeader" ||
                  profile?.userType === "ContestantMember") &&
                !editMode &&
                isSubmissionPeriod && (
                  <Tooltip title="Unsubmit Entry" aria-label="Edit Entry">
                    <RedButton
                      disabled={
                        !isDisabled ||
                        contestantFormTemplate.disableForm === true
                      }
                      onClick={handleEdit}
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ minWidth: "120px" }}
                      className={classes.unsubmitButton}
                    >
                      <EditOutlinedIcon /> Unsubmit
                    </RedButton>
                  </Tooltip>
                )}
            </Grid>
          )}
        </Grid>

        {canSubmitEntry != null && !canSubmitEntry && (
          <div
            className={clsx(classes.root, {
              [classes.greenBg]: submissionDate,
              [classes.redBg]: !submissionDate,
            })}
          >
            <div className={classes.message}>
              <Typography variant="subtitle2" component="p">
                {
                  " Sorry, you are not entitled to participate in the current phase."
                }
              </Typography>
            </div>
          </div>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle tabIndex={0}>Edit the entry?</DialogTitle>
          <DialogContent tabIndex={0}>
            <DialogContentText>
              If you choose to edit your entry, it will be un-submitted. You
              will be able to re-submit the entry after you've completed your
              edits. Please confirm to continue.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={downloadDialog} onClose={handleDownloadDialogClose}>
          {/*  <DialogTitle tabIndex={0}>
            <IconButton className={classes.closeButton} onClick={handleDownloadDialogClose} aria-label='Close'>
              <CloseIcon />
            </IconButton>
          </DialogTitle> */}
          <DialogContent tabIndex={0}>
            <DialogContentText
              style={{ textAlign: "center", padding: 20 /* ,color:"black" */ }}
            >
              {downloadError === true ? (
                <>
                  Something unexpected has occurred.
                  <br />
                  Please contract your support administrator.
                </>
              ) : (
                <>
                  We sent you an email! <br />
                  <strong> {profile.email}</strong>
                  <br />
                  Please check your email for detailed instructions.
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} color="primary">
              Cancel
            </Button> */}
            <Button
              onClick={handleDownloadDialogClose}
              color="primary"
              autoFocus
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  );
}

const mapStateToProps = createStructuredSelector({
  profile: profileSelectors.makeSelectProfile(),
  outsideSubmissionPeriodMessage:
    dashboardSelectors.makeSelectOutsideSubmissionPeriodMessage(),
  submissionDate: contestantFormSelectors.makeSelectSubmissionDateIfAny(),
  editMode: dashboardSelectors.makeSelectFormEditMode(),
  submissionStatus: dashboardSelectors.makeSelectSubmissionStatus(),
  downloadedForm: contestantFormSelectors.makeSelectDownloadedForm(),
  downloadedFormResponse:
    contestantFormSelectors.makeSelectDownloadFormResponse(),
  eventInfo: commonApiSelectors.makeSelectEventInfo(),
  contestantFormTemplate:
    contestantFormTemplateSelectors.makeSelectContestantFormTemplateForm(),
  selectedBracketId:
    contestantFormTemplateSelectors.makeSelectContestantFormTemplateSelectedBracketId(),
  currentPhaseNumber: dashboardSelectors.makeSelectCurrentPhaseNumber(),
  conform: contestantFormSelectors.makeSelectContestantForm(),
  CMSMsg: contestantFormTemplateSelectors.makeSelectCMSMsg(),
  currentPhaseTimeline: dashboardSelectors.makeSelectCurrentPhase(),
});

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    unsubmitForm: () => {
      dispatch(contestantFormActions.unsubmitForm());
    },
    downloadForm: () => {
      dispatch(contestantFormActions.downloadForm());
    },
    formHasBeenDowloaded: () => {
      dispatch(contestantFormActions.formHasBeenDownloaded());
    },
    resetDownloadResponse: () => {
      dispatch(contestantFormActions.resetDownloadResponse());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionStateInfo);
