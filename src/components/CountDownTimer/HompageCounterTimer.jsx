import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Card, Divider, Grid, useMediaQuery } from "@material-ui/core";
import useStyles from "./style";
/* import styled from 'styled-components' */

function HompageCounterTimer(props) {
    const classes = useStyles();
    const { isSubmissionPeriodStarted } = props;
    /*   const TimeBody = styled.span`
      font-size: 30px;
      font-weight: bold;
      @media (min-width:0px) and (max-width:600px){
       font-size: 15px; 
       font-weight: bold;
      }
      `;
      const TimeStaticBody = styled.span`
      font-size: 18px;
      @media (min-width:0px) and (max-width:600px){
       font-size: 12px;   
      }
      `; */

    /*  const isActive = useMediaQuery('(max-width:700px)');*/
    const isZoom = useMediaQuery('screen and (max-width: 1300px)');
    const isActive = useMediaQuery('screen and (max-width: 600px)');
    return (
        <>
            {isActive ?
                (
                    <Grid item xs={6} >
                        <Card
                            style={{
                                height: isZoom && !isActive ? 210 : 150,/* props.counterCardHeight, */
                                boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
                                borderRadius: 10,
                                backgroundColor: props.timerColor ? "#ee0000" : "#0d0c0b",
                                color: props.timerColor ? "#ffffff " : "Black",
                            }}>
                            <div
                                style={{
                                    /*    border: 'solid', */
                                    margin: "4px 4px",
                                    borderRadius: 10,
                                    height: 123,
                                    paddingTop: 20
                                }}
                            >
                                <Typography variant="body1"
                                    style={{ color: props.timerColor ? "#ffffff" : "#ffffff", textAlign: "center", lineHeight: '15px' }}
                                >
                                    <span style={{ fontSize: 11, color: '#ffffff', fontWeight: 501 }}> Time Left To Submit </span><br />
                                    {isSubmissionPeriodStarted ? (
                                        <>

                                            <div className={classes.timerBoxListSmall}>
                                                <span className={props.timerColor ? classes.timerBoxSmallRed : classes.timerBoxSmall}>{props.timer.Days} <br aria-hidden='true' />
                                                    <span className={classes.ariahiddenText}>&nbsp;Days&nbsp;</span>
                                                    <span aria-hidden='true' className={props.timerColor ? classes.timerBoxTextSmallRed : classes.timerBoxTextSmall}>days</span>
                                                </span>
                                            </div>
                                            <div className={classes.timerBoxListSmall}>
                                                <span className={props.timerColor ? classes.timerBoxSmallRed : classes.timerBoxSmall}>{props.timer.Hours} <br aria-hidden='true' />
                                                    <span className={classes.ariahiddenText}>&nbsp;Hours&nbsp;</span>
                                                    <span aria-hidden='true' className={props.timerColor ? classes.timerBoxTextSmallRed : classes.timerBoxTextSmall}>Hours</span>
                                                </span>
                                            </div>
                                            <div className={classes.timerBoxListSmall}>
                                                <span className={props.timerColor ? classes.timerBoxSmallRed : classes.timerBoxSmall}>{props.timer.Mins} <br aria-hidden='true' />
                                                    <span className={classes.ariahiddenText}>&nbsp;Minutes&nbsp;</span>
                                                    <span aria-hidden='true' className={props.timerColor ? classes.timerBoxTextSmallRed : classes.timerBoxTextSmall}>Mins</span>
                                                </span>
                                            </div>
                                            <div className={classes.timerBoxListSmall}>
                                                <span className={props.timerColor ? classes.timerBoxSmallRed : classes.timerBoxSmall}>{props.timer.Sec} <br />
                                                    <span className={classes.ariahiddenText} >&nbsp;Seconds</span>
                                                    <span aria-hidden='true' className={props.timerColor ? classes.timerBoxTextSmallRed : classes.timerBoxTextSmall}>Secs</span>
                                                </span>
                                            </div>
                                        </>
                                    ) : (<span style={{ fontSize: 14, fontWeight: 'bold' }}>NA</span>)

                                    }
                                </Typography>
                            </div>
                        </Card >
                    </Grid >) :
                (<Grid item xs={6} >
                    <Card
                        style={{
                            height: isZoom && !isActive ? 210 : 150,
                            boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
                            borderRadius: 10,
                            backgroundColor: props.timerColor ? "#ee0000" : "#0d0c0b",
                            color: props.timerColor ? "#ffffff" : "#ffffff",
                        }}>
                        <div
                            style={{
                                /*  border: 'solid', */
                                margin: "4px 4px",
                                borderRadius: 10,
                                height: 123,
                                paddingTop: 10
                            }}
                        >
                            <Typography variant="body1"
                                style={{ color: props.timerColor ? "#ffffff" : "#ffffff", textAlign: "center", lineHeight: '45px' }}
                            >
                                <span style={{ fontSize: 18, color: '#ffffff', fontWeight: 501 }}> Time Left To Submit </span><br />
                                {isSubmissionPeriodStarted ? (
                                    <>
                                        <div className={classes.timerBoxList}>
                                            <span className={props.timerColor ? classes.timerBoxRed : classes.timerBox}>{props.timer.Days}&nbsp;<br aria-hidden='true' />
                                                <span className={classes.ariahiddenText}>&nbsp;Days&nbsp;</span>
                                                <span aria-hidden='true' className={props.timerColor ? classes.timerBoxTextRed : classes.timerBoxText}>Days</span>
                                            </span>
                                        </div>
                                        <div className={classes.timerBoxList}>
                                            <span className={props.timerColor ? classes.timerBoxRed : classes.timerBox}>{props.timer.Hours}<br aria-hidden='true' />
                                                <span className={classes.ariahiddenText}>&nbsp;Hours&nbsp;</span>
                                                <span aria-hidden='true' className={props.timerColor ? classes.timerBoxTextRed : classes.timerBoxText}>Hours</span>
                                            </span>
                                        </div>
                                        <div className={classes.timerBoxList}>
                                            <span className={props.timerColor ? classes.timerBoxRed : classes.timerBox}>{props.timer.Mins}&nbsp;<br aria-hidden='true' />
                                                <span className={classes.ariahiddenText}>&nbsp;Minutes&nbsp;</span>
                                                <span aria-hidden='true' className={props.timerColor ? classes.timerBoxTextRed : classes.timerBoxText}>Mins</span>

                                            </span>
                                        </div>
                                        <div className={classes.timerBoxList}>
                                            <span className={props.timerColor ? classes.timerBoxRed : classes.timerBox}>{props.timer.Sec}&nbsp;<br aria-hidden='true' />
                                                <span className={classes.ariahiddenText}>&nbsp;Seconds</span>
                                                <span aria-hidden='true' className={props.timerColor ? classes.timerBoxTextRed : classes.timerBoxText}>Secs</span>
                                            </span>
                                        </div>
                                    </>)
                                    : (
                                        <span style={{ fontSize: 25, fontWeight: 'bold' }}>NA</span>)
                                }
                            </Typography>
                        </div>
                    </Card >
                </Grid >
                )
            }

            {isActive ?
                (<Grid item xs={6} >
                    <Card className={classes.phaseNameCard} style={{
                        marginLeft: 0,
                        height: isZoom && !isActive ? 210 : 150,
                        boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
                        borderRadius: 10
                    }} >
                        <div
                            style={{
                                border: 'solid',
                                margin: "4px 4px",
                                borderRadius: 10,
                                height: isZoom && !isActive ? 201 : 142,
                                paddingTop: 20
                            }}
                        >
                            <Typography variant="body1"
                                style={{ textAlign: "center", lineHeight: '15px' }}
                            >
                                <span style={{ fontSize: 11 }}> The event is currently in </span><br />
                                <br />
                                <span style={{ fontSize: 14, fontWeight: 'bold' }}>{props.phase}</span>
                            </Typography>
                        </div>
                    </Card>
                </Grid>
                ) :
                (<Grid item xs={6} >
                    <Card className={classes.phaseNameCard} style={{
                        marginLeft: 0,
                        height: isZoom && !isActive ? 210 : 150,
                        boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
                        borderRadius: 10
                    }} >
                        <div
                            style={{
                                border: 'solid',
                                margin: "4px 4px",
                                borderRadius: 10,
                                height: isZoom && !isActive ? 201 : 142,
                                paddingTop: 20
                            }}
                        >
                            <Typography variant="body1"
                                style={{ textAlign: "center", lineHeight: '45px' }}
                            >
                                <span style={{ fontSize: 18 }}> The event is currently in </span><br />
                                <span style={{ fontSize: 25, fontWeight: 'bold' }}>{props.phase}</span>
                            </Typography>
                        </div>
                    </Card>
                </Grid>)
            }

        </>
    );
}


export default HompageCounterTimer;
