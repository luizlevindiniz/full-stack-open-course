function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>
        {text}: {value.toFixed(2)}
      </td>
    </tr>
  );
}

export default StatisticLine;
