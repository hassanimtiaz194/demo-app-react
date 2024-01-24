import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    boxShadow: "none",
  },
  cardContent: {
    textAlign: "center",
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: 'auto',
    width: "68%",
    height: "130px",
  },
  cardActions: {
    justifyContent: "center",
  },
  email: {
    wordBreak: "break-all",
    margin: 10,
    PointerEvent: 'none',
    cursor: 'default',
  },
  avatarText: {
    backgroundColor: '#2a3845',
    fontSize: 60,
    margin: 'auto',
    width: "68%",
    height: "130px",
  },
  teamPageButton: {
    '&:focus': {
      color:'#DEDEDE',
      backgroundColor:'#2E2E2E'
    }
  }
}));
