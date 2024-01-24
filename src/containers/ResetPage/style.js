import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  resetButtonContainer: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    width: "100%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  invalid: {
    color: '#e91c0d',
    position: 'relative',
    left: -25,
  },

  valid: {
    color: 'green',
    position: 'relative',
    left: -25,
  },
  divInvalid: {
    backgroundColor: '#f9cccc',
    border: 'dotted',
    borderColor: 'red',
    marginLeft: 10,
    width: '100%',
    marginRight: 10,
  },
  divValid: {
    backgroundColor: 'green',
    border: 'dotted',
    borderColor: 'green'
  },
  textField: {
    "& .Mui-error": {
      color: '#AE0C00',
    },
    "& .MuiFormHelperText-root": {
      /* color: "#e91c0d !important" */
      marginLeft: 5,
      color: '#AE0C00',
      fontWeight: 450
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#919191'
      },
      '&:hover fieldset': {
        borderColor: '#3f51b5',
      }
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