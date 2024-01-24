export const ADJUST_TIMER="ADJUST_TIMER";

export const AdjustTimer=(daysLeft,hoursLeft,minsLeft,secLeft)=>{
    return{
        type:ADJUST_TIMER,
        payload:{daysLeft,hoursLeft,minsLeft,secLeft}
    }
}