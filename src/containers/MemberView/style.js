import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .Mui-error": {
      color: '#AE0C00',
    /*   color: "#e91c0d !important"*/
     }, 
    "& .MuiFormHelperText-root": {
      /* color: "#e91c0d !important" */
      marginLeft:5,
      color: '#AE0C00',
      fontWeight: 450
    }
  },
  error: {
    "& .Mui-error": {
      color: '#AE0C00',
    /*   color: "#e91c0d !important"
 */    }, 
    "& .MuiFormHelperText-root": {
      /* color: "#e91c0d !important" */
      marginLeft:5,
      color: '#AE0C00',
      fontWeight: 450
    }
  },
  toolbar: {
    padding: 0,
  },
  container: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3, 3),
    marginTop: "30px",
  },
  title: {
    width: "100%",
    textAlign: "center",
    marginBottom: "30px",
  },
  textField: {

    /* '& .MuiOutlinedInput-input': {
      color: "#e91c0d"
    }, */
    /* "& .MuiFormHelperText-root": {
      color: '#b40d00',
      fontWeight: 450
    }, */
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#919191'
      },
      '&:hover fieldset': {
        borderColor: '#3f51b5',
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
  }
}));
