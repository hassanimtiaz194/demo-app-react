import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  heading2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
    padding: '0px 20px 0px 5px'
  },

  heading1: {
    fontSize: '1.05rem',
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
    padding: '0px 20px 0px 5px'
  },

  embedContainer: {

    position:"relative",
    overflow:"hidden",
    width:"100%",
    paddingTop:"56.25%",

    "& iframe, & object, & embed": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    }
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    paddingLeft: 0,
    paddingRight: 0,
  },
  title: {
    display: "flex",
    flexDirection: "row",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
}));

export default useStyles;
