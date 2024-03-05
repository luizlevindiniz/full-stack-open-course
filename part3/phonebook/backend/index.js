// utils functions
const getRequestDate = () => {
  let date = new Date().toDateString();
  let time = new Date().toLocaleTimeString();
  return `${date} ${time}`;
};

const generateID = () => {
  return Number(Math.floor(Math.random() * 1000000));
};

// middleware functions
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// DB
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// express
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

morgan.token("postData", function getPostData(req) {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

const app = express();
const PORT = process.env.PORT || 3001;
const router = express.Router();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("dist"));
app.use(
  morgan(
    ":method :url :status :res[Content-Length] - :response-time ms :postData"
  )
);

app.use("/api", router);
// routes
app.get("/status", (req, res) => res.send("Online!"));

router.get("/info", (req, res) => {
  res.send(
    `
    <div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${getRequestDate()}</p>
    </div>
    `
  );
});

router.get("/persons", (req, res) => {
  res.status(200);
  res.json(persons);
});

router.get("/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.status(200);
    res.json(person);
  } else {
    res.status(400);
    res.statusMessage = "Person not found!";
    res.json({ message: "Person not found!" });
  }
});

router.delete("/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.statusMessage = "Person deleted!";
  res.status(204).end();
});

router.put("/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  persons = persons.map((p) => (p.id === id ? body : p));
  res.statusMessage = "Person updated!";
  res.status(200).end();
});

router.post("/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    res.status(400);
    res.json({ message: "Name or number is missing" });
  }
  const person = persons.find(
    (p) => p.name.toLowerCase() === body.name.toLowerCase()
  );
  if (person) {
    res.status(400);
    res.json({ message: "Name must be unique" });
  } else {
    const newPerson = {
      name: body.name,
      number: body.number,
      id: generateID(),
    };
    persons = persons.concat(newPerson);
    res.status(201);
    res.json(newPerson);
  }
});

// no route has handled the request
app.use(unknownEndpoint);
// listening
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
