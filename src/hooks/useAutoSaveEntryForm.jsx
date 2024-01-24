import React, {useState, useEffect} from "react";
export const useAutoSaveEntryForm = (saveContestantForm = window) =>  {
   

    let [inputTime, setInputTime] = useState(0);
    let [timeOfActivity, setTimeOfActivity] = useState(0);
  
 
  
    useEffect(() => {

      let interval = setInterval(() => {

       
           if(isThereAnyActivity())  {
             saveContestantForm();
           }
        
       }, 60 * 1000);
        
       return () => clearInterval(interval);
     }, []);


    const isThereAnyActivity = () => {


      let latestInputTime, latestTimeOfActiviy;
      setInputTime(p => { 
        latestInputTime = p
        return p
       });

        setTimeOfActivity(p => {
         latestTimeOfActiviy = p;
         return p;
       });

      if (latestInputTime > latestTimeOfActiviy) {
        setTimeOfActivity(p => {
          return latestInputTime;
        });
        return true;
      } else {
        return false;
      }
    }

    const getTime = () => {
      if (!Date.now)
        Date.now = function() {
          return new Date().getTime();
        }
      return Date.now()
    }

    const updateInputTime = () => {
      setInputTime(getTime());
    }

    return {
      updateInputTime
    };

  }