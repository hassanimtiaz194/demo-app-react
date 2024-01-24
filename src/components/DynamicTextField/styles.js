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
  invalid: {
    color: '#e91c0d',
    position: 'relative',
    left: -25,
  },

  valid: {
    color: 'green',
    position: 'relative',
    left: -25,
  },
  divInvalid: {
    backgroundColor: '#f9cccc',
    border: 'dotted',
    bordercolor: '#e91c0d'
  },
  divValid: {
    backgroundColor: 'green',
    border: 'dotted',
    borderColor: 'green'
  },
  /*   '& .MuiFormControl-root': {
      '& .MuiInputBase-root': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'orange',
        }
      }
    }, */
}));
