import { useState, useEffect } from "react";
import PersonsList from "./components/PersonsList";
import FilterByName from "./components/FilterByName";
import FormStructure from "./components/form/FormStructure";
import Notification from "./components/Notification";
import {
  findPersonByName,
  createPerson,
  getAllPersons,
  deletePerson,
  findPersonByID,
  updatePerson,
} from "./services/persons";
import { handleNotification } from "./services/notifications";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterByName, setFilterByName] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    variant: null,
  });

  // HANDLERS
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterByName(event.target.value);
  };

  // CREATE or UPDATE
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const person = findPersonByName(persons, newName);
    try {
      if (!person) {
        const payload = {
          name: newName,
          number: newPhone,
        };
        const newPerson = await createPerson(payload);
        setPersons(persons.concat(newPerson));
        handleNotification(
          `Added ${newPerson.name}`,
          "success",
          setNotification
        );
      } else {
        const proceedToUpdate =
          confirm(`${newName} is already added to phonebook, replace the
      old number with the new one?`);

        if (proceedToUpdate) {
          const toUpdate = {
            ...person,
            number: newPhone,
          };
          await updatePerson(person.id, toUpdate);
          setPersons(
            persons.map((person) =>
              person.id === toUpdate.id ? toUpdate : person
            )
          );
          handleNotification(
            `${toUpdate.name} number has changed`,
            "success",
            setNotification
          );
        }
      }
    } catch (err) {
      console.log(err);
      const errMsg = err.response.data.error;
      handleNotification(
        errMsg.substring(errMsg.indexOf(":") + 1).trim(),
        "error",
        setNotification
      );
    } finally {
      setNewName("");
      setNewPhone("");
    }
  };

  // READ
  const getListOfPersons = async () => {
    try {
      return await getAllPersons();
    } catch (err) {
      console.log(err);
      handleNotification(
        "Error while reading list of persons!",
        "error",
        setNotification
      );
    }
  };

  useEffect(() => {
    getListOfPersons().then((data) => setPersons(data));
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    const person = findPersonByID(persons, id);
    try {
      if (person && confirm(`Delete ${person.name}?`)) {
        await deletePerson(id);
        setPersons(persons.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.log(err);
      handleNotification(
        "Error while handling delete!",
        "error",
        setNotification
      );
    }
  };

  // Display
  const personsToList =
    filterByName === ""
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filterByName.toLowerCase())
        );

  // Rendered Component
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        variant={notification.variant}
      ></Notification>
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
      <PersonsList
        persons={personsToList}
        deletePerson={handleDelete}
      ></PersonsList>
    </div>
  );
};

export default App;
