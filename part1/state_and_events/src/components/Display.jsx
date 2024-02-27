const Display = ({ showing }) => {
  if (showing instanceof Object && showing.length === 0) {
    return <h5>EMPTY!</h5>;
  }

  return <div>{showing}</div>;
};

export default Display;
