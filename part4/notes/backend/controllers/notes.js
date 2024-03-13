const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) response.json(note);
  else response.status(404).end();
});

notesRouter.post("/", async (request, response) => {
  const body = request.body;
  const createdBy = await User.findById(body.userId);

  if (!createdBy)
    return response.status(400).json({ message: "user not found!" });

  const rawToken = getTokenFrom(request);
  const decodedToken = jwt.verify(rawToken, process.env.SECRET);
  if (!decodedToken) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id,
  });

  const newNote = await note.save();
  createdBy.notes = createdBy.notes.concat(newNote._id);
  createdBy.save();

  response.status(201).json(newNote);
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

notesRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const note = {
    content: body.content,
    important: body.important,
  };

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
  });
  response.json(updatedNote);
});

module.exports = notesRouter;
