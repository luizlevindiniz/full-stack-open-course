import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NotesForm from "./components/NotesForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedUser, setLoggedUser] = useState(null);

  const compareTime = (past, now) => {
    // diff in hours
    return Math.abs(now - past) / (1000 * 60 * 60);
  };

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    let existingUser = window.localStorage.getItem("loggedUser");

    if (existingUser) {
      let userToStore = JSON.parse(existingUser);
      let dateString = userToStore.timestamp;

      let diffInHours = compareTime(dateString, new Date().getTime());
      if (diffInHours >= 0.5) {
        window.localStorage.removeItem("loggedUser");
        setLoggedUser(null);
        noteService.setToken(null);
      } else {
        setLoggedUser(userToStore);
        noteService.setToken(userToStore.token);
      }
    }
  }, []);

  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    try {
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } finally {
      setNewNote("");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const payloadToLogin = {
      username: username,
      password: password,
    };
    try {
      const user = await loginService.login(payloadToLogin);
      const userWithTimeStamp = { ...user, timestamp: new Date().getTime() };

      window.localStorage.setItem(
        "loggedUser",
        JSON.stringify(userWithTimeStamp)
      );

      setLoggedUser(userWithTimeStamp);
      noteService.setToken(userWithTimeStamp.token);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    try {
      const returnedNote = await noteService.update(id, changedNote);
      if (!returnedNote) {
        setErrorMessage(
          `Note '${changedNote.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      } else {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {loggedUser === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
          password={password}
          username={username}
        ></LoginForm>
      ) : (
        <>
          <div>{`Welcome ${loggedUser.name}`}</div>
          <NotesForm
            addNote={addNote}
            handleNoteChange={handleNoteChange}
            newNote={newNote}
            notesToShow={notesToShow}
            setShowAll={setShowAll}
            showAll={showAll}
            toggleImportanceOf={toggleImportanceOf}
          ></NotesForm>
        </>
      )}
    </div>
  );
};

export default App;
