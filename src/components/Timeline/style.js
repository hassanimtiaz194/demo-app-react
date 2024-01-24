import { makeStyles, withStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    width: "100%"
  },
  stepCircleActive: {
    border: "8px solid #89ba39 !important",
    background: "white !important",
    width: "24px !important",
    height: "24px !important",
    marginTop:"1px",
    marginLeft:'7px',
  },
  stepCircleCompleted: {
    background: "#999999 !important"
  },
  stepCircleNextActive: {
    background: "#57b2f8 !important"
  },
  bold: {
    fontWeight: "bold",
    marginLeft:'10px',
    marginTop:"-1px"
  },
  stepCircle: {
    width: 24,
    height: 24,
    background: "#e1e3e3",
    borderRadius: "100%"
  },
  stepUpperLabel: {
    position: "absolute",
    marginTop: -50,
    left: 0,
    width: "100%",
    textAlign: "center",
  },
  stepper: {
    paddingTop: "50",
    background: "none"
  },
  nextActiveLine: {
    "& .MuiStepConnector-line": {
      backgroundImage: "linear-gradient( 95deg, #89bb39 0%, #57b2f8 100%)"
    }
  },
}));

export const connectorStyle = withStyles({
  alternativeLabel: {
    top: 12,
    left: "calc(-50% + 12px)",
    right: "calc(50% + 12px)"
  },

  completed: {
    "& $line": {
      background: "#999999"
    }
  },
  active: {
    "& $line": {
      background: "#999999"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  },
});
