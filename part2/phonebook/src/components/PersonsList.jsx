function PersonsList({ persons, deletePerson }) {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li className="person" key={person.name}>
            {person.name} {person.number}
            <div className="person-button">
              <button type="button" onClick={() => deletePerson(person.id)}>
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PersonsList;
