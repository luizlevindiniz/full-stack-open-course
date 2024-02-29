function FormInput({ name, type, id, onChange, label, value }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default FormInput;
