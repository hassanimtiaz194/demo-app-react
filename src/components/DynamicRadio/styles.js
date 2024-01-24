import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    RadioBoxButton: {
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
