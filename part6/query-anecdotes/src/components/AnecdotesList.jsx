import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnecdote } from "../requests";
import { useNotificationDispatcher } from "../NotificationContext";

const AnecdotesList = ({ anecdotes }) => {
  const queryClient = useQueryClient();
  const notificationDispatcher = useNotificationDispatcher();

  // voting
  const putAnecdotesMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (upToDateAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anec) =>
          anec.id !== upToDateAnecdote.id ? anec : upToDateAnecdote
        )
      );
      notificationDispatcher({
        type: "VOTED",
        payload: upToDateAnecdote.content,
      });
      setTimeout(() => {
        notificationDispatcher({ type: "ERASE" });
      }, 3000);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleVote = (anecdote) => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    putAnecdotesMutation.mutate(changedAnecdote);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => {
        return (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnecdotesList;
