import Part from "./Part";
function Content(props) {
  const { parts } = props;
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part}></Part>
      ))}
    </>
  );
}

export default Content;
