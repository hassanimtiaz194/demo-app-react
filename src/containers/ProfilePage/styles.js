import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 3),
    marginTop: "30px",
  },
  title: {
    width: "100%",
    textAlign: "center",
    marginBottom: "30px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    float: "left",
    marginLeft: '45px',

  },
  avatarText: {
    backgroundColor: '#2a3845',
    fontSize: 60,
    width: "100px",
    height: "100px",
    float: "left",
    marginLeft: '40px',
  },
  person: {
    width: "100px",
    height: "100px",
  },
  profilePicture: {
    marginTop: '70px',
    marginLeft: '-46px',
  },
  email: {
    background: "#ececec",
    padding: 10,
    display: 'inherit'
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  invalid: {
    color: '#bd0031',
    backgroundColor: '#f9cccc',
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
    borderColor: '#bd0031',
    marginLeft: 10,
    width: '100%',
    marginRight: 10,
    marginBottom: 10
  },
  divInvalid2: {
    backgroundColor: '#f9cccc',
    border: 'dotted',
    borderColor: '#bd0031',
    marginLeft: 0,
    width: '100%',
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10
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
  }
}));