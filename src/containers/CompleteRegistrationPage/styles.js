import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  inputField: {
    background: "none",
    padding: 0,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  btnDisabled: {
    marginTop: "20px",
    width: "191px",
    marginLeft: "4.5px",
    pointerEvents: "none",
    backgroundColor: "darkgray",
  },
  prevBtn: {
    marginTop: "20px",
    width: "191px",
    marginLeft: "4.5px",
    "&:focus": {
      color: "#FFFFFF",
      backgroundColor: '#2E3B84',
    }
  },

  submit: {
    marginTop: "20px",
    width: "191px",
    marginLeft: "4.5px",
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
  error: {
    padding: 25,
    width: "100%",
    background: "#fff2f2",
    color: "#f44336",
    marginTop: 100,
  },
}));