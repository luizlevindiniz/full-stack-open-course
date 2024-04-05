import Display from "./Display";
import Button from "./Button";

function App() {
  return (
    <div>
      <Display></Display>
      <div className="card">
        <Button type={"INC"} label={"+"}></Button>
        <Button type={"DEC"} label={"-"}></Button>
        <Button type={"ZERO"} label={"0"}></Button>
      </div>
    </div>
  );
}

export default App;
