import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#FFFFFF",
    backgroundColor: '#2E3B84',
    "&:focus": {
      "&:focus": {
        color: "#FFFFFF",
        backgroundColor: '#000000',
        border:'solid',
        borderColor:'#ff5e5e',
        borderWidth:'5px',
      }
    }
  },
  submissionStatusAlert: {
    padding: 25,
    width: "100%",
    background: "#fff2f2",
    color: "#e41b0d !important",
  },
  TextField: {
    color: "#e41b0d !important",
    borderColor: '#e41b0d !important',
    "& .Mui-error": {
      color: '#AE0C00',
    }, 
    "& .MuiFormHelperText-root": {
      paddingTop:10,
      color: '#AE0C00',
      fontWeight: 450
    },
    "& fieldset": {
      color: '#e41b0d',
      borderColor: '#e41b0d !important'
    }
  },
  Checkbox: {
    '&.Mui-disabled': {
      color: '#85002E',
    },
    '&.Mui-checked': {
      color: '#85002E',
      '&.Mui-focusVisible': {
        color: '#ffffff',
        backgroundColor: '#85002E'
      }
    }
  },
  hrdivider:{
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    '& center' : {
      position: 'absolute',
      top: -11,
      background: '#fff',
      padding: '0 20px',
      fontWeight: 'bold',
      fontSize: 16,
    }
  }
  
}));


export default useStyles;
