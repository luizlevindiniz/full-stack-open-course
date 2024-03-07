require("dotenv").config();
const { getRequestDate } = require("./utils/functions.js");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { Person } = require("./models/person.js");

morgan.token("postData", function getPostData(req) {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

// express
const app = express();
const router = express.Router();

// middleware
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan(
    ":method :url :status :res[Content-Length] - :response-time ms :postData"
  )
);

// routes
app.use("/api", router);
app.get("/status", (req, res) => res.send("Online!"));

router.get("/info", (req, res) => {
  Person.find({}).then((result) => {
    res.status(200);
    res.send(
      `
      <div>
      <p>Phonebook has info for ${result.length} people</p>
      <p>${getRequestDate()}</p>
      </div>
      `
    );
  });
});

router.get("/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.status(200);
    res.json(result);
  });
});

router.post("/persons", (req, res, next) => {
  const body = req.body;

  Person.find({ name: body.name })
    .then((result) => {
      if (result.length === 0) {
        const person = new Person({
          name: body.name,
          number: body.number,
        });
        person
          .save()
          .then((savedPerson) => {
            res.status(201);
            res.json(savedPerson);
          })
          .catch((err) => next(err));
      } else {
        res.status(201);
        res.json({ message: "This person is already added to database" });
      }
    })
    .catch((err) => next(err));
});

router.get("/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((result) => {
      if (result) {
        res.status(200);
        res.json(result);
      } else {
        res.status(404);
        res.json({ message: "Person not found!" });
      }
    })
    .catch((err) => next(err));
});

router.delete("/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(() => {
      res.statusMessage = "Person deleted!";
      res.status(204).end();
    })
    .catch((err) => next(err));
});

router.put("/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  Person.findByIdAndUpdate(
    id,
    {
      $set: { name: body.name, number: body.number },
    },
    { new: true, runValidators: true, context: "query" }
  )
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => next(err));
});

// no route has handled the request
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

// listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
