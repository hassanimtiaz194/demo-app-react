import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardsContainer: {
    marginTop: 20,
    borderTop: "1px solid #d8d8d8",
    paddingTop: 40,
    maxWidth: 720,
  },
  media: {
    height: 140,
  },
  addCard: {
    width: 200,
    minHeight: 300,
    background: "white",
    display: "flex",
    textAlign: "center",
    height: "100%",
    boxShadow: "none",
    flexDirection: "column",
  },
  addIcon: {
    width: 50,
    height: 50,
    borderRadius: "100%",
    color: "#bdbdbd",
  },
}));
