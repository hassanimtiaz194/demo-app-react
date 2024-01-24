import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  field: {
    marginTop: 5,
    marginBottom: 0,
  },
  label: {
    display: "flex",
    fontSize: "16px",
  },
  Checkbox: {
    '&.Mui-disabled': {
      color: '#85002E',
    },
    '&.Mui-checked': {
      color: '#85002E',
      '&.Mui-focusVisible': {
        color: '#ffffff',
        backgroundColor: '#85002E'
      }
    }
  },

}));
