import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({ 
  avatar: {
    width: "60%",
    height: "100%",
    float: "left",
  } ,
  title: {
    fontSize:'11px',
  },
  judgeName: {
    textAlign: 'left',
    fontWeight:'bold',
    justifyContent:'center',
  },
  judgeNameSmallScreen: {
    textAlign: 'left',
    fontSize:'11px',
    fontWeight:'bold',
    justifyContent:'center',
  },
  comment: {
    textAlign: 'left',
    fontSize:'11px',
    justifyContent:'center',
  },
}));
