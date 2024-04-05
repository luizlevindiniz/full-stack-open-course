import { createContext, useContext, useReducer } from "react";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INC":
      return state + 1;
    case "DEC":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

const AppContext = createContext();

export const useCounterValue = () => {
  const context = useContext(AppContext);
  return context[0];
};

export const useCounterDispatcher = () => {
  const context = useContext(AppContext);
  return context[1];
};

export const CounterContextProvider = (props) => {
  const [counter, counterDispatcher] = useReducer(counterReducer, 0);

  return (
    <AppContext.Provider value={[counter, counterDispatcher]}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
