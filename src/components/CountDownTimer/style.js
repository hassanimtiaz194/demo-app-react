import { makeStyles } from "@material-ui/core/styles";
import { Block } from "@material-ui/icons";

export default makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  daysLeftHeading: {
    marginTop: 2,
    textAlign: "center",
  },
  daysLeftCount: {
    textAlign: "center",
    fontSize: 48,
  },
  daysDivider: {
    width: 267,
  },
  daysLeftTimer: {
    textAlign: "center",
    fontSize: 23,
  },
  phaseName: {
    textAlign: "center",
    fontSize: 60,
    marginTop: -4
  },
  timerBoxList: {
    display: 'inline-Block',
    listStyleType: 'none',
    textTransform: 'uppercase',
    padding: '0px 0px 20px 20px',
    whiteSpace: 'nowrap;',
    lineHeight: '20px',
  },
  timerBox: {
    background: '#333433',
    display: 'block',
    padding: '10px 10px 0px 10px',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#06f5ba',
  },
  timerBoxText: {
    fontWeight: 'normal',
    fontSize: 12,
    color: 'white',
  },
  timerBoxListSmall: {
    display: 'inline-Block',
    listStyleType: 'none',
    textTransform: 'uppercase',
    padding: '0px 0px 5px 5px',
    lineHeight: '14px',
  },
  timerBoxSmall: {
    background: '#333433',
    display: 'block',
    padding: '5px 5px 0px 5px',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#06f5ba',
  },
  timerBoxTextSmall: {
    fontWeight: 'normal',
    fontSize: 10,
    color: 'white',
  },
  timerBoxRed: {
    background: 'White',
    display: 'block',
    padding: '10px 10px 0px 10px',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#e91c0d',
  },
  timerBoxTextRed: {
    fontWeight: 'normal',
    fontSize: 16,
    color: 'Black',
  },
  timerBoxSmallRed: {
    background: 'White',
    display: 'block',
    padding: '5px 5px 0px 5px',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#e91c0d',
  },
  timerBoxTextSmallRed: {
    fontWeight: 'normal',
    fontSize: 10,
    color: 'black',
  },
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
