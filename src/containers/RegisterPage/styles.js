import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  titleWrapper: {
    width: "100%",
  },
  loadingContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
  },
  inputField: {
    background: "none",
    padding: 0,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: '32px 0px 16px',
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
  submit2: {
    margin: '32px 0px 0px',
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
  },
}));
