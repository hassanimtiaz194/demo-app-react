import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  inputRoot: {
    padding: "0px !important"
  },
  field: {
    width: "300px"
  },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18
    }
  }
}));
