import Hello from "./components/Hello";
import { useState } from "react";
import Counter from "./components/Counter";

const App = () => {
  const name = "Peter";
  const age = 10;

  const [counter, setCounter] = useState(0);
  const [clicks, setClicks] = useState([]);

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10}>
        <h4>I am a children component!</h4>
      </Hello>
      <Hello name={name} age={age} />
      <hr />
      <Counter
        counter={counter}
        onChange={setCounter}
        clicks={clicks}
        onClick={setClicks}
      ></Counter>
    </div>
  );
};

export default App;
