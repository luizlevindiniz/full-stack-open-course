import { useState } from "react";
import Quote from "./components/Quote";
import Button from "./components/Button";
import { useEffect } from "react";

const quoteStyle = {
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 10,
};

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const App = () => {
  const getRandomInteger = (topValue) => {
    return Math.floor(Math.random() * topValue);
  };

  const handleClick = () => {
    setSelected(getRandomInteger(anecdotes.length));
  };

  const handleVotes = () => {
    const updatedVotes = { ...votes };
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  function createZeroFilledObject(n) {
    const obj = {};
    for (let i = 0; i < n; i++) {
      obj[i] = 0;
    }
    return obj;
  }

  function getMostVotedAnecdote(votes) {
    if (Object.keys(votes) == 0) {
      return undefined;
    }
    return Object.keys(votes).reduce(
      (max, value) => (votes[max] > votes[value] ? max : value),
      Object.keys(votes)[0]
    );
  }

  const [votes, setVotes] = useState(createZeroFilledObject(anecdotes.length));

  const [selected, setSelected] = useState(0);

  const [mostVotedAnectode, setMostVotedAnectode] = useState(0);

  console.log(votes);
  useEffect(() => {
    const mostVoted = getMostVotedAnecdote(votes);
    setMostVotedAnectode(mostVoted);
  }, [votes]);

  return (
    <div>
      <h3>Anecdote of the Day</h3>
      <Quote style={quoteStyle} anecdote={anecdotes[selected]}></Quote>
      <p>This anecdote has {votes[selected]} votes!</p>
      <p>
        <Button onClick={handleVotes} label={"Vote"}></Button>
        <Button onClick={handleClick} label={"Next Anecdote"}></Button>
      </p>
      <h3>Most Voted Anecdote</h3>
      <Quote style={quoteStyle} anecdote={anecdotes[mostVotedAnectode]}></Quote>
      <p>This anecdote has {votes[mostVotedAnectode]} votes!</p>
    </div>
  );
};

export default App;
