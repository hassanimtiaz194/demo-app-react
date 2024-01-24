import React from "react";
import Typography from "@material-ui/core/Typography";
import { Card, Grid } from "@material-ui/core";
import useStyles from "./style";
import { useLocation } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";



function HeaderCounterTimer(props) {
    const location = useLocation()
    const classes = useStyles();
    return (
        <>
            <Grid item xs={2} style={{ textAlign: 'center' }}>
                <h2>Event Status</h2>
            </Grid>
            <Grid item xs={4}>
                <Card
                    style={{
                        maxWidth: '90%',
                        height: props.counterCardHeight,
                        boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
                        backgroundColor: props.timerColor ? "red" : "White",
                        color: props.timerColor ? "White" : "Black",
                    }}>
                    <div
                        style={{
                            borderStyle: 'solid',
                            marginTop: 3.5,
                            maxWidth: 400,
                            height: 113,
                            margin: '4px 4px',
                            marginLeft: 4,
                            marginRight: 4,
                        }}
                    >
                        <Typography variant="body1" className={classes.daysLeftHeading}>
                            <span style={{ fontSize: 30 }}> {props.timer.Days} </span> DAYS :
                            <span style={{ fontSize: 30 }}> {props.timer.Hours} </span> HR :
                            <span style={{ fontSize: 30 }}> {props.timer.Mins} </span> MIN :
                            <span style={{ fontSize: 30 }}> {props.timer.Sec} </span> SEC
                        </Typography>
                    </div>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <h3 style={{ textAlign: "center", marginTop: 20 }}>You are currently in <span style={{ color: "Black" }}>{props.phase}</span></h3>
            </Grid>
        </>
    );
}


export default HeaderCounterTimer;
