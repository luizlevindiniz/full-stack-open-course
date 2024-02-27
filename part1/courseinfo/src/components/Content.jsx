import Part from "./Part";
function Content(props) {
  const { parts } = props;
  return (
    <>
      <Part part={parts[0]}></Part>
      <Part part={parts[1]}></Part>
      <Part part={parts[2]}></Part>
    </>
  );
}

export default Content;
