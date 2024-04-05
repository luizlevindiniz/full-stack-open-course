import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "@tanstack/react-query";
import { getAllAnecdotes } from "./requests";
import AnecdotesList from "./components/AnecdotesList";
import { NotificationContextProvider } from "./NotificationContext";

const App = () => {
  // fetching
  const fetchAnecdotes = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAllAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const anecdotes = fetchAnecdotes.data;

  // component
  if (fetchAnecdotes.isLoading) {
    return <div>is loading...</div>;
  } else if (fetchAnecdotes.isError) {
    return <div>anecdote service not available due to server problems</div>;
  } else {
    return (
      <div>
        <h3>Anecdote app</h3>
        <NotificationContextProvider>
          <Notification />
          <AnecdoteForm />
          <AnecdotesList anecdotes={anecdotes} />
        </NotificationContextProvider>
      </div>
    );
  }
};

export default App;
