import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  form: {
    padding: "15px",
  },
  snackBar: {
    "& .MuiSnackbarContent-root": { minWidth: 210, left: '55%' },
  },
  loadingContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
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
