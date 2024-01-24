import { makeStyles } from "@material-ui/core/styles";
export const drawerWidth = 240;

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    textAlign: "left",
  },
  logo: {
    maxWidth: "100%",
    objectFit: "contain",
    marginTop: "5px",
    background: "transparent",
  },
  link: {
    marginLeft: 5,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  yourTimeZone: {
    textAlign: "center",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    "& .MuiListItemText-primary": {
      fontSize: 13,
      fontWeight: "400 !important",
      textTransform: "initial",
    },
  },
  nestedItemsContainer: { background: "#3b4854" },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    "& .MuiToolbar-root": {
      "min-height": "80px",
    },
    "background-color": "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    "min-height": "80px !important",
  },
  listItem: {
    color: "white",
    "& .MuiListItemText-primary": {
      fontWeight: 500,
    },
    "&:focus": {
      outline: "none !important",
      border: "2px solid #3f51b5",
      boxShadow: "0 0 10px #719ECE",
      color: "FFFFFF ",
      backgroundColor: "black",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#2a3845",
  },
  contentShiftRight: {
    marginLeft: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  selected: {
    "&.Mui-selected": {
      backgroundColor: "#158479",
      borderColor: "#a2acdf",
      color: "#ffff",
      fontWeight: 600,
    },
    "&.Mui-selected:hover": {
      backgroundColor: "#455f79",
      color: "#ffff",
      fontWeight: 600,
    },
  },
  nested: {
    padding: "0px 0px 0px 10px",
    textAlign: "left",
    fontSize: "8px",
    color: "white",
    "& .MuiListItemText-primary": {
      fontSize: "12px",
      fontWeight: "normal",
    },
  },
  skipToContentLink: {
    position: "absolute",
    left: -1000,
    top: "60px",
    zIndex: "-1",
    marginLeft: "7px",
    padding: "7px 8px 7px 8px",
    textDecoration: "none",
    color: "#ffffff",
    //display:'none',
    "&:focus": {
      // display:,
      left: 0,
      color: "black",
      fontWeight: 700,  
      zIndex: "500",
      backgroundColor: "#fff",
      border: "1px solid #555",
      borderRadius: "3px",
      //display:'inline',
    },
  },
}));
