import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  name: { "font-size": "24px" },
  teamPageButton: {
    '&:focus': {
      color: '#DEDEDE',
      backgroundColor: '#2E2E2E'
    }
  }
}));
