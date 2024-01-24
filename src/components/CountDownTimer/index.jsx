import React, { useEffect, useReducer, useState } from "react";
import HompageCounterTimer from './HompageCounterTimer';
import { useLocation } from "react-router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { dashboardSelectors } from "redux/selectors";
import HeaderCounterTimer from "./HeaderCounterTimer ";

const UPDATE_TIMER = 'UPDATE_TIMER';
const RESET = 'RESET';

const INITIAL_STATE = {
    Days: '--',
    Hours: '--',
    Mins: '--',
    Sec: '--'
}
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_TIMER:
            const { Days, Hours, Mins, Sec } = action.payload;
            return { ...state, Days, Hours, Mins, Sec }
        case RESET:
            return { ...state, ...INITIAL_STATE }
        default:
            return state
    }
}

function CountDownTimer(props) {
    const { currentPhase, isSubmissionPeriod, setDownloadEntryFormPeriod, setIsSubmissionPeriodOverEditView } = props;
    const [countDownTimer, dispatch] = useReducer(reducer, INITIAL_STATE)
    const [timerColor, setTimerColor] = useState(false);
    const [isSubmissionPeriodStarted, setIsSubmissionPeriodStarted] = useState(false);
    const [phaseName, setPhaseName] = useState(' ');
    let countDownDate = 0;
    const location = useLocation();

    function getDuration(duration) {
        return String(Math.floor(duration)).padStart(2, '0');
    }

    function timer() {
        // Get today's date and time
        const now = new Date().getTime();
        // Find the distance between now and the count down date
        const distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        dispatch({
            type: UPDATE_TIMER,
            payload: {
                Days: getDuration(distance / (1000 * 60 * 60 * 24)),
                Hours: getDuration((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                Mins: getDuration((distance % (1000 * 60 * 60)) / (1000 * 60)),
                Sec: getDuration((distance % (1000 * 60)) / 1000)
            }
        })
        // If the count down is finished, write some text
        if (distance < 0) {
            /* dispatch({ type: RESET }); */
            dispatch({
                type: UPDATE_TIMER,
                payload: {
                    Days: '00',
                    Hours: '00',
                    Mins: '00',
                    Sec: '00'
                }
            })
            setTimerColor(true);
            /* setPhaseName('NA'); */
            if (location.pathname === '/applications') {
                setIsSubmissionPeriodOverEditView(true);
            }
        }
        if (distance < 259200743) {
            setTimerColor(true);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentPhase === 0) {
                setPhaseName('NA');
                /* setTimerColor(true); */
            }
            if (currentPhase > 0) {
                const todayDate = new Date();
                const submissionStartDate = new Date(props.phaseList[currentPhase - 1].submissionStartDate);
                const phaseEndDate = new Date(props?.phaseList[currentPhase - 1].phaseEndDate);
                countDownDate = new Date(props.phaseList[currentPhase - 1].submissionEndDate).getTime();
                if (todayDate > phaseEndDate) {
                    setTimerColor(false);
                    if (location.pathname === '/applications') {
                        setDownloadEntryFormPeriod(false);
                        isSubmissionPeriod(false);
                    }
                }
                if (todayDate >= submissionStartDate && todayDate <= phaseEndDate) {
                    if (location.pathname === '/applications') {
                        setDownloadEntryFormPeriod(true);
                        setIsSubmissionPeriodOverEditView(true);
                    }
                    setIsSubmissionPeriodStarted(true);
                    setPhaseName(props.phaseList[currentPhase - 1].phaseName);
                    timer();

                } else {
                    setPhaseName(props.phaseList[currentPhase - 1].phaseName);
                    /* dispatch({ type: RESET });*/
                    if (location.pathname === '/applications') {
                        isSubmissionPeriod(false);
                    }
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [currentPhase, isSubmissionPeriod, phaseName, isSubmissionPeriodStarted]);

    return (
        <>
            {/*   { */}
            {/*    isHomePage ? */} <HompageCounterTimer isSubmissionPeriodStarted={isSubmissionPeriodStarted} timer={countDownTimer} phase={phaseName} counterCardHeight={150} timerColor={timerColor} /> {/* : <HeaderCounterTimer timer={countDownTimer} phase={phaseName} counterCardHeight={60} timerColor={timerColor} /> */}
            {/* } */}
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    phaseList: dashboardSelectors.makeSelectTimelinePhaseList(),
    currentPhase: dashboardSelectors.makeSelectCurrentPhaseNumber(),
});

export default connect(mapStateToProps, null)(CountDownTimer);
