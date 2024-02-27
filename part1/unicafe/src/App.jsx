import { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";
import Display from "./components/Display";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + bad + neutral;
  const average = (good * 1 + bad * -1) / all;
  const positiveFeedback = (good / all) * 100;

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button label={"good"} onClick={handleGoodClick}></Button>
      <Button label={"neutral"} onClick={handleNeutralClick}></Button>
      <Button label={"bad"} onClick={handleBadClick}></Button>
      <hr />
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>good: {good}</td>
          </tr>
          <tr>
            <td>neutral: {neutral}</td>
          </tr>
          <tr>
            <td>bad: {bad}</td>
          </tr>
          <Statistics
            all={all}
            average={average}
            positiveFeedback={positiveFeedback}
          ></Statistics>
        </tbody>
      </table>
    </div>
  );
};

export default App;
