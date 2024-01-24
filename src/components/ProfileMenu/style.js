import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    position: "absolute",
    right: "20px",
    backgroundColor:'#2a3845',
    '&:focus':{
      outline: 'none !important',
      border:'2px solid #3f51b5',
      boxShadow: '0 0 10px #719ECE',
    },
  }
}));
