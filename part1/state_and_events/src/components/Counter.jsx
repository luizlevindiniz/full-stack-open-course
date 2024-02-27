import Display from "./Display";
import Button from "./Button";

function Counter({ counter, onChange, clicks, onClick }) {
  const handleIncrease = () => {
    onChange(counter + 1);
    onClick(clicks.concat("+"));
  };
  const handleDecrease = () => {
    onChange(counter - 1);
    onClick(clicks.concat("-"));
  };
  const handleReset = () => {
    onChange(0);
    onClick([]);
  };

  return (
    <div>
      <Display showing={counter}></Display>
      <Button onClick={handleIncrease} label={"Plus Ultra!"}></Button>
      <Button onClick={handleReset} label={"Reset!"}></Button>
      <Button onClick={handleDecrease} label={"Minus One!"}></Button>
      <Display showing={clicks}></Display>
    </div>
  );
}

export default Counter;
