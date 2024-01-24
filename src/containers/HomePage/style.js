import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dividerr: {
    width: 910,
  },
  daysLeft: {
    height: 160,
    boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
  },
  daysLeftHeading: {
    textAlign: "center",
    fontSize: 18,
  },
  daysLeftCount: {
    textAlign: "center",
    fontSize: 48,
    color: "#30D5C8"
  },
  phaseName: {
    color: "#30D5C8",
    textAlign: "center",
    fontSize: 60,
    marginTop: -4
  },
  phaseNameCard: {
    height: 160,
    boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
  },
  daysDivider: {
    width: 267,
  },
  daysLeftTimer: {
    textAlign: "center",
    fontSize: 23,
    color: "#30D5C8"
  },
  embedContainer: {

    position: "relative",
    /*   overflow:"hidden", */
    width: "100%",
    height: "100%",
    paddingTop: "56.25%",

    "& iframe, & object, & embed": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }
  },
  submit: {
    color: "#FFFFFF",
    backgroundColor: '#2E3B84',
    "&:focus": {
      "&:focus": {
        color: "#FFFFFF",
        backgroundColor: '#000000',
        border: 'solid',
        borderColor: '#ff5e5e',
        borderWidth: '5px',
      }
    }
  },
}));
