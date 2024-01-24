import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    field: {
      marginTop: 5,
      marginBottom: 0,
      '&.Mui-disabled': {
        color: 'Black',
      }
    },
    label: {
      display: "flex", 
      fontSize: "16px"
    }
  }));