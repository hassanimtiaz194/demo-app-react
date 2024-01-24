import { useEffect, useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  fname: yup.string().required().label("First name"),
  lname: yup.string().required().label("First name"),
  email: yup.string().email().required().label("Email"),
  personalMsg: yup.string(),
});

export const useValidation = (state) => {
  const [err, setErr] = useState("");
  const [errorField, setErrorField] = useState("");

  useEffect(() => {
    try {
      if(Object.keys(state).length !== 0)
        schema.validateSync(state);
       else {
        setErr("There is error");
        setErrorField("email,fname,lname");
        return;
       }

      setErr("");
      setErrorField("");
    } catch (error) {
      setErr(error.message);
      setErrorField(error.path);
    }
  }, [state]);

  const isErrorInField = (fieldName) => {
   
    const arr = errorField.split(",");
    return arr.includes(fieldName);
  };

  return [err, isErrorInField];
};
