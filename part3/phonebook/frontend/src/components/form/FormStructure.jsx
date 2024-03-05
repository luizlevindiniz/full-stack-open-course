function FormStructure({
  handleSubmit,
  handleNewName,
  handleNewPhone,
  newName,
  newPhone,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nameInput">name: </label>
        <input
          type="text"
          name="nameInput"
          id="nameInput"
          value={newName}
          onChange={handleNewName}
          required={true}
        />
      </div>
      <div>
        <label htmlFor="phoneInput">number: </label>
        <input
          type="text"
          name="phoneInput"
          id="phoneInput"
          value={newPhone}
          onChange={handleNewPhone}
          required={true}
        />
      </div>
      <div>
        <button type="submit" id="submitFormButton">
          add
        </button>
      </div>
    </form>
  );
}

export default FormStructure;
