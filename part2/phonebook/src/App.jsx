import { useState } from "react";
import PersonsList from "./components/PersonsList";
import FilterByName from "./components/FilterByName";
import FormStructure from "./components/form/FormStructure";
import db from "./database/persons";

const App = () => {
  const [persons, setPersons] = useState(db);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterByName, setFilterByName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (persons.filter((p) => p.name.trim() === newName.trim()).length === 0) {
      setPersons(
        persons.concat({
          name: newName,
          number: newPhone,
          id: persons.length + 1,
        })
      );
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewPhone("");
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterByName(event.target.value);
  };

  const personsToList =
    filterByName === ""
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filterByName.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterByName
        filter={filterByName}
        onChange={handleFilter}
      ></FilterByName>
      <br />
      <FormStructure
        handleNewName={handleNewName}
        handleSubmit={handleSubmit}
        handleNewPhone={handleNewPhone}
        newName={newName}
        newPhone={newPhone}
      ></FormStructure>
      <br />
      <h2>Numbers</h2>
      <PersonsList persons={personsToList}></PersonsList>
    </div>
  );
};

export default App;
