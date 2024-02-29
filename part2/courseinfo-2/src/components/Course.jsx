import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

function Course({ course }) {
  return (
    <>
      <Header name={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </>
  );
}

export default Course;
