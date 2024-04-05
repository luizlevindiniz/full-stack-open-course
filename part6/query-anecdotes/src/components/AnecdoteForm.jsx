import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createNewAnecdote } from "../requests";
import { useNotificationDispatcher } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatcher = useNotificationDispatcher();

  // creating
  const createAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: (createdNote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(createdNote));
      notificationDispatcher({ type: "CREATED", payload: createdNote.content });
      setTimeout(() => {
        notificationDispatcher({ type: "ERASE" });
      }, 3000);
    },
    onError: (err) => {
      const message = err.response.data.error;
      notificationDispatcher({ type: "ERROR", payload: message });
      setTimeout(() => {
        notificationDispatcher({ type: "ERASE" });
      }, 3000);
    },
  });

  const handleNoteCreation = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    const anecdoteToCreate = {
      content: content,
      votes: 0,
    };

    createAnecdoteMutation.mutate(anecdoteToCreate);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleNoteCreation}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
