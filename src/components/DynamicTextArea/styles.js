import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  field: {
    "padding-top": "20px",
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#919191'
      },
      '&:hover fieldset': {
        borderColor: '#3f51b5',
      }
    }
  },
  label: {
    display: "flex",
    fontSize: "16px"
  }
}));
