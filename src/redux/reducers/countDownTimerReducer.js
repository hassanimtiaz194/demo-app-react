import { combineReducers } from "redux";
import { ADJUST_TIMER } from "./../actions/countDownTimerAction";

const IntialState = [{
    daysLeft='00',
    hoursLeft='00',
    minsLeft='00',
    secLeft='00'
}]
const  countDownTimerReducer = (state = IntialState, action) => {
    switch (action.type) {
        case ADJUST_TIMER:
            return [action.payload.Task];
        default:
            return state;
    }

}

const RootReducer = combineReducers({
 Timer: countDownTimerReducer
});

export default RootReducer;
