import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listItem: {
    color: "white",
    "& .MuiListItemText-primary": {
      fontWeight: 500,
    },
    '&:focus':{
      outline: 'none !important',
      border:'2px solid #3f51b5',
      boxShadow: '0 0 10px #719ECE',
    },
  },
  nestedItemsContainer: { 
    background: "#3b4854",
    fontSize:'8px'
  },
  nestedItemsList: { 
    padding:'0px 0px 0px 0px',
    textAlign: 'left',
    
  },
  nested:{
    padding:'0px 0px 0px 10px',
    textAlign: 'left',
    fontSize:'8px',
    color: 'white',
    "& .MuiListItemText-primary": {
      fontSize:'12px'
    },
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  title: {
    display: "flex",
    flexDirection: "row",
  },
  embedContainer: {

    position:"relative",
    overflow:"hidden",
    width:"100%",
    paddingTop:"56.25%",

    "& iframe, & object, & embed": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    }
  },
  dialogListItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    paddingLeft: 0,
    paddingRight: 0,
  },

}));

export default useStyles;
