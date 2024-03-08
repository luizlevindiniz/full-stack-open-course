const mongoose = require("mongoose");
const logger = require("../utils/logger");

const url =
  "mongodb+srv://luizd97:feaporra123@cluster0.cpwe1yl.mongodb.net/testOfNoteApp?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", false);

logger.info("connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

for (let n of initialNotes) {
  let note = new Note({
    content: n.content,
    important: n.important,
  });

  note.save();
}
