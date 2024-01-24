import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "#37b6fc",
    textAlign: "center",
    color: "white",
  },
  container: {
    paddingRight: 50,
    overflow: "auto",
    padding: 25,
    maxHeight: 250,
  },
  closeIcon: {
    float: "right",
    right: 5,
    position: "absolute",
    top: "50%",
    marginTop: -20,
  },
}));
