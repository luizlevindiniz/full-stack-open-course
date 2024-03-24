import { useState, useRef } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NotesList from "./components/NotesList";
import Togglable from "./components/Togglable";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <Togglable buttonLabel="log in">
          <LoginForm
            setLoggedUser={setLoggedUser}
            setErrorMessage={setErrorMessage}
          ></LoginForm>
        </Togglable>
      </div>

      <>
        {loggedUser !== null && <div>Welcome {loggedUser.name}</div>}
        <NotesList setErrorMessage={setErrorMessage}></NotesList>
      </>
    </div>
  );
};

export default App;
