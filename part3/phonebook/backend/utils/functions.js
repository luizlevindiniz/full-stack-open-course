const getRequestDate = () => {
  let date = new Date().toDateString();
  let time = new Date().toLocaleTimeString();
  return `${date} ${time}`;
};
