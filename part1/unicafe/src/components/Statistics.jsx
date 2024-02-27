import StatisticLine from "./StatisticLine";

function Statistics({ all, average, positiveFeedback }) {
  if (all === 0) {
    return (
      <tr>
        <td>No feedback yet!</td>
      </tr>
    );
  }
  return (
    <>
      <StatisticLine text={"all"} value={all}></StatisticLine>
      <StatisticLine text={"average"} value={average}></StatisticLine>
      <StatisticLine
        text={"positive feedback (%)"}
        value={positiveFeedback}
      ></StatisticLine>
    </>
  );
}

export default Statistics;
