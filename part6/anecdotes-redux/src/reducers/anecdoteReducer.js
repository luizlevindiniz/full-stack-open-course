const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const vote = (id) => {
  console.log("vote", id);
  const action = {
    payload: { id: id },
    type: "VOTE",
  };

  return action;
};

const create = (content) => {
  const action = {
    payload: asObject(content),
    type: "CREATE_NEW",
  };

  return action;
};

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "VOTE": {
      const id = action.payload.id;

      const anecdoteToChange = state.find((anec) => anec.id === id);
      if (anecdoteToChange) {
        const anecdoteChanged = {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1,
        };

        return state.map((anec) => (anec.id === id ? anecdoteChanged : anec));
      }
      return state;
    }
    case "CREATE_NEW":
      return state.concat(action.payload);
    default:
      return state;
  }
};

export { reducer, vote, create };
