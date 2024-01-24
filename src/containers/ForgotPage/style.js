import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  resetButtonContainer: {
    display: "flex",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  TextField: {
    "& .Mui-error": {
      color: '#AE0C00',
    },
    "& .MuiFormHelperText-root": {
      /* color: "#e91c0d !important" */
      marginLeft:5,
      color: '#AE0C00',
      fontWeight: 450
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#919191'
      },
      '&:hover fieldset': {
        borderColor: '#3f51b5',
      },
      "& .Mui-error": {
        color: '#AE0C00',
        borderColor:'#AE0C00',
      },
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