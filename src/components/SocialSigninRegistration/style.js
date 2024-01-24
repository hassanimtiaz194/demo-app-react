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
    fontSize: '1.25rem',
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
  embedContainer2: {
    position:"relative",
    overflow:"hidden",
    width:"100%",
    // paddingTop:"56.25%",

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
  quickLinksButton: {
  padding:0,
  width:'240px',
  textAlign:'left',
  color:'white', 
  "& .MuiButton-text": {
    fontSize:'12px',
  },
  media: {
    height: 140,
  },
  },

  socialSignInContainer:{
    "& .MuiDialog-paper": {
      width:'40%'
    },
  },

  inputField: {
    background: "none",
    padding: 0,
  },
  form: {
    width: "100%",
    //marginTop: theme.spacing(3),
  },
  btnDisabled: {
    marginTop: "20px",
    width: "100%",
    marginLeft: "4.5px",
    pointerEvents: "none",
    backgroundColor: "darkgray",
  },
  prevBtn: {
    marginTop: "20px",
    width: "100%",
    marginLeft: "4.5px",
    "&:focus": {
      color: "#FFFFFF",
      backgroundColor: '#2E3B84',
    }
  },

  submit: {
    marginTop: "20px",
    width: "100%",
    marginLeft: "4.5px",
    color: "#FFFFFF",
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

  btn1:{
    backgroundColor: '#0A8A0A',
  },

  btn2:{
    backgroundColor: '#2E3B84',
  },

  skipButton: {
    marginTop: "20px",
    width: "100%",
    marginLeft: "4.5px",
    color: "#FFFFFF",
    backgroundColor: '#f44336',
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

  error: {
    padding: 25,
    width: "100%",
    background: "#fff2f2",
    color: "#f44336",
    marginTop: 100,
  },
}));

export default useStyles;
