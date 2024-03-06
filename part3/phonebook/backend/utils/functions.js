const getRequestDate = () => {
  let date = new Date().toDateString();
  let time = new Date().toLocaleTimeString();
  return `${date} ${time}`;
};

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const generateID = () => {
  return Number(Math.floor(Math.random() * 1000000));
};

module.exports = { getRequestDate, generateID };
