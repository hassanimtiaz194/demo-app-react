import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";


import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { dashboardSelectors, contestantFormTemplateSelectors, authSelectors, commonApiSelectors } from "redux/selectors";
import { profileSelectors } from "redux/selectors";
import { useHistory } from "react-router";
import { authActions, dashboardActions, globalActions, profileActions } from "redux/actions";
import ReactGA from "react-ga4";

import useStyles from "./style";
import { Button, Card, Divider, Grid, Box } from "@material-ui/core";
import BracketSelected from "components/BracketSelected";
import CountDownTimer from "components/CountDownTimer";
import BracketSelectedDialog from "components/BracketSelectedDialog";
import { SocialSigninRegistration } from "components/SocialSigninRegistration";

function HomePage(props) {
    const { currentPhase, selectedBracketId, loadDashboardMsg, dashboardMsg, profile, token, onRegError, eventInfo, socialRegComplete, socialRegistrationCompleted } = props;
    const [showDialog, setShowDialog] = useState(false);
    /*   const [phaseName, setPhaseName] = useState(''); */
    const history = useHistory();
    const classes = useStyles();
    const onSubmit = (evt) => {
        /* evt.preventDefault(); */
        if (selectedBracketId === null || selectedBracketId === undefined) {
            setShowDialog(true);
        } else {
            history.push("/applications");
        }
    };
    useEffect(() => {
        ReactGA.set({ user_id: profile?.userId, skild_id: profile?.userId });
        if (selectedBracketId === null && currentPhase === null) {
            loadDashboardMsg(selectedBracketId, currentPhase);
        } else if (selectedBracketId === null) {
            loadDashboardMsg(selectedBracketId, currentPhase);
        } else if (currentPhase === null) {
            loadDashboardMsg(selectedBracketId, currentPhase);
        }
    }, [currentPhase, selectedBracketId]);

    return (
        <>
            {(eventInfo.eventId === 554 || eventInfo.eventId === 1) && (
                <SocialSigninRegistration socialRegComplete={socialRegComplete} onRegError={onRegError} token={token} userType={profile.userType} eventInfo={eventInfo} socialRegistrationCompleted={socialRegistrationCompleted} />
            )}
            <Box /* style={{ margin: '0px 30px' }} */ >
                <Grid container spacing={2}
                    direction="row"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Grid item xs={10} /* tabIndex={0} */>
                        <div style={{ padding: 20, textAlign: 'justify', }}
                            className={classes.dangerousHtml}
                            dangerouslySetInnerHTML={{ __html: dashboardMsg?.message }}
                        ></div>
                        {(dashboardMsg?.embeVideo !== "" && dashboardMsg?.embeVideo !== null) ? <div className={classes.embedContainer}
                            dangerouslySetInnerHTML={{
                                __html: dashboardMsg?.embeVideo,
                            }}
                        ></div> : ''}
                    </Grid>
                    <Grid item xs={10} /* tabIndex={0} */>
                        <br />
                        <Divider variant="middle" />
                        <br />
                        <Typography style={{ fontSize: '1.25rem', fontWeight: 500 }} variant="h2">
                            Event Status
                        </Typography>
                        <br />
                        <Grid container spacing={1} >
                            <CountDownTimer />
                        </Grid>
                        <br />
                        <br />
                        <Divider variant="middle" />
                        <br />
                        <BracketSelected bracketSelectWidth={'66vw'} /* tabIndex={0} */ />
                        <br />
                        <br />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={onSubmit}
                            className={classes.submit}
                        /* tabIndex={0} */
                        >
                            Go to Application Page
                        </Button>

                    </Grid>
                </Grid>
            </Box>
            {showDialog && (<BracketSelectedDialog showDialog={showDialog} setShowDialog={setShowDialog} />)}
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    token: authSelectors.makeSelectToken(),
    eventInfo: commonApiSelectors.makeSelectEventInfo(),
    dashboardMsg: dashboardSelectors.makeSelectDashboardMsg(),
    phaseList: dashboardSelectors.makeSelectTimelinePhaseList(),
    currentPhase: dashboardSelectors.makeSelectCurrentPhaseNumber(),
    selectedBracketId:
        contestantFormTemplateSelectors.makeSelectContestantFormTemplateSelectedBracketId(),
    profile: profileSelectors.makeSelectProfile(),
    socialRegComplete: profileSelectors.makeSelectSocialRegComplete(),
});
const mapDispatchToProps = function (dispatch) {
    return {
        loadDashboardMsg: (bracketId, phaseNumber) => {
            dispatch(dashboardActions.loadDashboardMsg(bracketId, phaseNumber));
        },
        onRegError: (err) => {
            dispatch(
                globalActions.requestResponseReturned({
                    error: true,
                    message: err.message,
                })
            );
        },
        socialRegistrationCompleted: () => {
            dispatch(profileActions.socialLoginRegistrationComplete({ socialRegComplete: false }));
        },

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
