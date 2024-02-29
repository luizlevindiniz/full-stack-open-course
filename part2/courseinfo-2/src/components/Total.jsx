function Total(props) {
  const { parts } = props;
  return (
    <p>
      Number of exercises{" "}
      <b>
        {parts.reduce((accumulator, part) => accumulator + part.exercises, 0)}
      </b>
    </p>
  );
}

export default Total;
