import { useState } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
const App = () => {
  const [notification, setNotification] = useState(null);

  return (
    <div>
      <Notification notification={notification}></Notification>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm setNotification={setNotification} />
    </div>
  );
};

export default App;
