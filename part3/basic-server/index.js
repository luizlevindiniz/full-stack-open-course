const express = require("express");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const generateID = () => {
  const max = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return max + 1;
};

const app = express();
const PORT = 3001;
const router = express.Router();

router.get("/", (req, res) => res.send("Hello World!"));

router.get("/notes", (req, res) => res.json(notes));

router.get("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (note) {
    res.json(note);
  } else {
    res.statusMessage = "Note not found!";
    res.status(404).end();
  }
});

router.post("/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    res.status(400).json({ message: "Invalid note content" });
  } else {
    const createdNote = {
      id: generateID(),
      content: body.content,
      important: Boolean(body.important) || false,
    };

    notes = notes.concat(createdNote);
    res.statusMessage = "Note Created!";
    res.status(201);
    res.json(createdNote);
  }
});

router.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (note) {
    notes = notes.filter((n) => n.id !== id);
    res.statusMessage = "Note deleted!";
    res.status(204).end();
  } else {
    res.statusMessage = "Note not found!";
    res.status(404).end();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
