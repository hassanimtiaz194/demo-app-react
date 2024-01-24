import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    paddingLeft: 5,
    color: "white",
    margin: 24,
    padding: 12
  },
  greenBg: {
    background: "#7bbd23",
    borderLeft: "6px solid #278700"
  },
  redBg: {
    background: "#f44336",
    borderLeft: "6px solid #d02f23"
  },
  message: {
    display: "flex",
    width: "100%",
    "& p": {
      margin: "auto",
      width: "100%",
      textAlign: "left"
    }
  },
  message2: {
    display: "flex",
    width: "200%",
    "& p": {
      margin: "auto",
      width: "100%",
      textAlign: "left"
    }
  },
  buttons: {
    width: 350,
    textAlign: "right",
    "& button": {
      color: "white"
    }
  },
  unsubmitButton:{
    '&.Mui-disabled':{
      backgroundColor:'#dcdcdc',
      color:'#a3a3a3'
    }  
  },
  downloadButton:{
    '&.Mui-disabled':{
      backgroundColor:'#000000',
      color:'#ffffff'
    }  
  }
}));

export default useStyles;
