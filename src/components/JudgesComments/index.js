import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { commonApiSelectors, contestantFormTemplateSelectors, contestantFormSelectors } from "redux/selectors";
import { Grid, Typography, Card, useMediaQuery, Box } from "@material-ui/core";
import { commonApiActions } from "redux/actions";
import Avatar from "@material-ui/core/Avatar";
import useStyles from "./styles";

function JudgesComments(props) {
    const isActive = useMediaQuery('(max-width:700px)');
    const classes = useStyles();
    const { selectedBracketId, judgesComments, planId, comments } = props;
    const { scoreVisibility } = props.eventInfo;
    const commentsVisible = scoreVisibility.find((areCommentsVisible) => {
        return areCommentsVisible.bracketId === selectedBracketId;
    });

    useEffect(() => {
        if (typeof planId !== "undefined") {
            judgesComments(planId);
        }
    }, [planId]);

    return (
        <>
            {comments?.commentsList ? (
                <>
                    {commentsVisible?.contestantJudgecommentVisibility === true && (
                        <>
                            <Typography variant="h6"
                                className={isActive ? classes.title : ''}
                            >
                                Judging Comments
                            </Typography>
                            <br />
                            <Box sx={{ flexGrow: 1 }}>
                                <Card
                                    style={{
                                        boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
                                        borderRadius: 10,
                                        padding:' 20px 20px 20px 20px'
                                    }}>
                                    {comments?.commentsList?.map((item, i) => (
                                        <Grid container spacing={isActive ? 6 : 2}>
                                            <Grid item xs={1}>
                                                <Avatar className={isActive ? ' ' : classes.avatar} /* variant="rounded" */ src={item.judgePicture} />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <span className={isActive ? classes.judgeNameSmallScreen : classes.judgeName}>{item.judgeName.replace('/small/','/large/')}</span> <br />
                                                <span className={isActive ? classes.comment : ''}>{item.comment}</span>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Card>
                            </Box>
                        </>
                    )}
                </>
            ) : (' ')
            }
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    eventInfo: commonApiSelectors.makeSelectEventInfo(),
    selectedBracketId:
        contestantFormTemplateSelectors.makeSelectContestantFormTemplateSelectedBracketId(),
    planId: contestantFormSelectors.makeSelectContestantFormPlanId(),
    comments: commonApiSelectors.makeSelectJudgesComments(),
});
const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        judgesComments: (planId) => {
            dispatch(commonApiActions.judgesComments(planId))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JudgesComments);
