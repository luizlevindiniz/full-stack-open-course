import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotes, createNote, updateNote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();

  // add new note
  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(["notes"]);
      queryClient.setQueryData(["notes"], notes.concat(newNote));
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    newNoteMutation.mutate({ content: content, important: true });
  };

  // update
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (toggledNote) => {
      const notes = queryClient.getQueryData(["notes"]);
      queryClient.setQueryData(
        ["notes"],
        notes.map((note) => (note.id === toggledNote.id ? toggledNote : note))
      );
    },
  });

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };
  // fetching data
  const result = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id}>
          {note.content}
          <strong> {note.important ? "important" : ""}</strong>
          <button onClick={() => toggleImportance(note)}>toggle</button>
        </li>
      ))}
    </div>
  );
};

export default App;
