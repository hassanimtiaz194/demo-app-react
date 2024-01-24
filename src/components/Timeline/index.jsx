import React, { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import StepConnector from "@material-ui/core/StepConnector";

import { connect } from "react-redux";
import clsx from "clsx";
import * as moment from "moment";

import { dashboardSelectors } from "redux/selectors";
import useStyles, { connectorStyle } from "./style";

function ColorlibStepIcon(props) {
  const classes = useStyles();
  const { active, activestep, label, icon, completed } = props;

  return (
    <div>
      <div
        className={clsx(classes.stepCircle, {
          [classes.stepCircleActive]: active,
          [classes.stepCircleCompleted]: completed,
          [classes.stepCircleNextActive]: activestep === icon - 2,
        })}
      ></div>
      <div className={classes.stepUpperLabel}>
        <Typography
          className={clsx({
            [classes.bold]: active,
          })}
        >
          {label}
        </Typography>
      </div>
    </div>
  );
}

const ColorlibConnector = connectorStyle((props) => {
  const classes = useStyles();

  const { index, activestep } = props;

  return (
    <StepConnector
      className={clsx({
        [classes.nextActiveLine]: activestep === index - 1,
      })}
      {...props}
    />
  );
});

const getLabel = (phase, currentPhase, isLast) => {
  if (phase.phaseNumber < currentPhase)
    return (
      <div>
        <Typography>Ended</Typography>
        <Typography>
          {moment(phase.phaseStartDate).format("MMM DD, YYYY, LT")}
        </Typography>
      </div>
    );
  if (phase.phaseNumber === currentPhase + 1) {
    const days = moment(phase.phaseStartDate).diff(moment(), "days");
    return (
      <div>
        <Typography>
          {moment(phase.phaseStartDate).format("MMM DD, YYYY, LT")}
        </Typography>
        <Typography>{`${days} Days Remaining`}</Typography>
      </div>
    );
  }

  if (phase.phaseNumber === currentPhase) {
    if (isLast) {
      return (
        <div>
          <Typography>Ended</Typography>
          <Typography>
            {moment(phase.phaseEndDate).format("MMM DD, YYYY, LT")}
          </Typography>
        </div>
      );
    }
    return (
      <div>
        <Typography style={{marginTop:"-1.6"}}>
          {`Started: ${moment(phase.phaseStartDate).format(
            "MMM DD, YYYY, LT"
          )}`}
        </Typography>
        <Typography>
          {`Ends: ${moment(phase.phaseEndDate).format("MMM DD, YYYY, LT")}`}
        </Typography>
      </div>
    );
  }

  return "";
};

export function Timeline(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const { phaseList, currentPhase } = props;

  useEffect(() => {
    if (currentPhase) setActiveStep(currentPhase - 1);
  }, [currentPhase, phaseList]);

  if (!phaseList) return "";
  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        /* connector={<ColorlibConnector activestep={activeStep} />} */
        alternativeLabel
      >
        {phaseList.map((phase, index) => (
          phase.phaseDateVisible === true && (
          <Step key={phase.phaseName}>
            <StepLabel
              StepIconProps={{ activestep: activeStep, label: phase.phaseName }}
              /* StepIconComponent={ColorlibStepIcon} */
            >
              {phase.phaseName }
              {/* {getLabel(phase, currentPhase, index === phaseList.length - 1)}  */}
            </StepLabel>
          </Step>)
        ))}
      </Stepper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  phaseList: dashboardSelectors.makeSelectTimelinePhaseList(),
  currentPhase: dashboardSelectors.makeSelectCurrentPhaseNumber(),
});

export default connect(mapStateToProps, null)(Timeline);
