function FilterByName({ filter, onChange }) {
  return (
    <div>
      <label htmlFor="findByName">Find By Name: </label>
      <input
        type="text"
        name="findByName"
        id="findByName"
        value={filter}
        onChange={onChange}
      />
    </div>
  );
}

export default FilterByName;
