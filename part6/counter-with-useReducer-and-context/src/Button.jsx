import { useCounterDispatcher } from "./AppContext";
const Button = ({ type, label }) => {
  const counterDispatcher = useCounterDispatcher();
  return <button onClick={() => counterDispatcher({ type })}>{label}</button>;
};

export default Button;
