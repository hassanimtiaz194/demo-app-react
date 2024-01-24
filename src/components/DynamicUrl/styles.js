import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  field: {
    marginTop: 5,
    marginBottom: 0,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#919191'
      },
      '&:hover fieldset': {
        borderColor: '#3f51b5',
      }
    }
  },
  label: {
    display: "flex",
    fontSize: "16px"
  },
  embedContainer: {
    position: "relative",
    /*   overflow:"hidden", */
    width: "100%",
    height: "100%",
    paddingTop: "56.25%",

    "& iframe, & object, & embed": {
      position: "absolute",
      top: 20,
      left: 0,
      width: "100%",
      height: "100%"
    }
  },
  iframe_container: {
    left: 0,
    width: "100%",
    height: 500,
    position: "relative"
  },
  iframeTiktok: {
    top: 20,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    border: 0
  }
}));
