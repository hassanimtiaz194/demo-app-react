import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  fieldHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  uploadBtn: {
    marginTop: "10px",
      '&:focus': {
        color: '#222C63',
        backgroundColor:"#DFE2F1"
      }
  },
  fieldHeaderWrapper: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
  },
  subLabel: {
    marginTop: 5,
    fontStyle: "italic",
  },
  fieldLabel: {
    display: "flex", 
    fontSize: "16px"
  },
  label: {
    paddingTop: 15,
    paddingBottom: 15,
    color: "rgba(0, 0, 0, 0.54)",
  },
  dropzone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 5,
    padding: 20,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: (props) => (props.isDragActive ? "#57b2f8" : "#fafafa"),
    color: (props) => (props.isDragActive ? "white" : "#bdbdbd"),
    outline: "none",
    transition: "border .24s ease-in-out",
  },
}));
