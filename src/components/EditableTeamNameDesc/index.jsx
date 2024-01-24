import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { teamActions } from "redux/actions";
import useStyles from "./style";
import DoneIcon from '@material-ui/icons/Done';
import { createStructuredSelector } from "reselect";
import { profileSelectors } from "redux/selectors";
import { useEffect } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import { useEventListener } from "hooks/useEventListener";

function EditableTeamNameDesc(props) {
    const {
        changeTeamNameDescription,
        profile
    } = props;
    const [state, setState] = useState({
        teamName: props.teamName,
        teamHeadline: props.teamHeadline,
        teamDescription: props.teamDescription
    })
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [isEditable, setIsEditable] = React.useState(false);
    const classes = useStyles();
    const [show, setShow] = React.useState(false)

    const handler = React.useCallback((e) => {
        if (e.key === "Escape") {
            setShow(false)
        }
    }, []);

    useEventListener("keydown", handler);

    useEffect(() => {
        if (profile?.userType === 'ContestantLeader') {
            setIsDisabled(true);
        }
    }, [isDisabled])
    return (
        <>
            {!isEditable ? (
                <>
                    <div style={{ display: 'flex' }}>

                        <Typography
                            style={{ fontSize: '2.125rem', fontWeight: 500 }}
                            variant='h2'//{props.Hvariant}
                        >
                            {state.teamName}
                        </Typography>
                        <Tooltip
                            open={show}
                            disableHoverListener
                            disableFocusListener
                            onFocus={() => setShow(true)}
                            onBlur={() => setShow(false)}
                            onMouseEnter={() => setShow(true)}
                            onMouseLeave={() => setShow(false)}
                            title="Edit Team Name"
                            aria-label="Edit Team Name">

                            <IconButton
                                disabled={isDisabled ? false : true}
                                className={classes.teamPageButton}
                                onClick={() => {
                                    setIsEditable(true);
                                }}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </div>
                    {/*       <Typography
                        variant={props.Bvariant}
                    >
                        {state.teamHeadline}
                    </Typography>
                    <Typography
                        variant={props.Bvariant}
                    >
                        {state.teamDescription}
                    </Typography> */}
                </>
            ) : (
                <>
                    <Grid container
                        direction="row"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Grid item xs={5}
                        >
                            <TextField
                                fullWidth
                                /*    style={{ width: '50%' }} */
                                autoFocus
                                label="Edit Team Name"
                                inputProps={{ className: classes.name }}
                                value={state.teamName}
                                onChange={event => setState({
                                    teamName: event.target.value,
                                    teamHeadline: state.teamHeadline,
                                    teamDescription: state.teamDescription
                                })}
                            />
                        </Grid>

                        <Grid item  /* style={{ display: "flex" }}  */ xs={2}>
                            <Tooltip title="Confirm Team Name" aria-label="Confirm Team Name">
                                <IconButton
                                    className={classes.teamPageButton}
                                    onClick={() => {
                                        setIsEditable(false);
                                        changeTeamNameDescription(state);

                                    }}>
                                    <DoneIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>

                    {/*                     
                    <TextField
                        style={{ width: 550 }}
                        label="Team Headline"
                        inputProps={{ className: classes.name }}
                        value={state.teamHeadline}
                        onChange={event => setState({
                            teamName: state.teamName,
                            teamHeadline: event.target.value,
                            teamDescription:state.teamDescription
                        
                        })}
                    />
                    <br />
                    <TextField
                        style={{ width: 550 }}
                        label="Team Description"
                        inputProps={{ className: classes.name }}
                        value={state.teamDescription}
                        onChange={event => setState({
                            teamName: state.teamName,
                            teamHeadline: state.teamHeadline,
                            teamDescription: event.target.value
                        })} 

                    />*/}
                </>
            )}
        </>
    );
}
const mapStateToProps = createStructuredSelector({
    profile: profileSelectors.makeSelectProfile(),
});
const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        changeTeamNameDescription: (teamName) => {
            dispatch(teamActions.changeTeamNameDescription(teamName))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditableTeamNameDesc);

