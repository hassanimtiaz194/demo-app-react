import { createStructuredSelector } from "reselect";
import { contestantFormSelectors } from "redux/selectors";
import { useSelector } from "react-redux";

export function useValidation(schema) {
  const stateSelector = createStructuredSelector({
    isValid: contestantFormSelectors.makeSelectIsValid(schema),
  });

  const { isValid } = useSelector(stateSelector);

  return isValid;
}
