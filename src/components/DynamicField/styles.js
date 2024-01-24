import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    boxShadow: "none",
    padding: (props) => props.padding,
  },
  textArea: {
    width: "100%",
  },
  heading1: {
    //fontSize: "2em",
    marginTop: 5,
    marginBottom: 5,
  },
  subLabelHeading: {
    fontSize: "1.17em",
    fontStyle: "italic",
    marginTop: 5,
    marginBottom: 5,
  },
  heading2: {
    //fontSize: "1.5em",
    marginTop: 5,
    marginBottom: 5,
  },
  heading3: {
    //fontSize: "1.17em",
    marginTop: 5,
    marginBottom: 5,
  },
  label: {
    display: "flex", 
    fontSize: "17px"
  },
  isDynamicRichTextRequired:{
    border:'dashed',
    borderColor:'#ff1744',
  },
  embedContainer: {
    display:'contents',
    /* position:"relative",  */ 
     width:"100%",
    height:"100%", 
     paddingTop:"56.25%", 
     "& iframe, & object, & embed": { 
         /* position: "absolute",  */
         top: 0,
        left: 0,
        width: "100%",
        height: "40vw"
    } 
   }, 
}));
