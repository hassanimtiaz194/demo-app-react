import { makeStyles } from "@material-ui/core/styles";
import { Block } from "@material-ui/icons";

export default makeStyles((theme) => ({

  ariahiddenText: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
  }
}));
