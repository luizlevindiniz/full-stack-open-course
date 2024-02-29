import { useEffect, useState } from "react";

function Clock(props) {
  const { cidade } = props;
  const [time, setTime] = useState(new Date());

  const handleTime = (time) => {
    setTime(time);
  };

  useEffect(() => {
    setInterval(() => {
      handleTime(new Date());
    }, 1000);
  }, []);

  return (
    <div>
      <p>
        Now is {time.toLocaleTimeString()} in {cidade}
      </p>
    </div>
  );
}

export default Clock;
