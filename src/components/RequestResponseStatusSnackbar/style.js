import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  success: {
    "& .MuiSnackbarContent-root": {
      background: "#3a863d",
      color: "#FFFFFF",
      left:'55%'
    },
  },
  error: {
    "& .MuiSnackbarContent-root": {
      background: "#e91c0d",
      color: "#FFFFFF",
      left:'55%'
    },
  },
}));

export default useStyles;
