function Button({ text }) {
  return (
    <button id="sendNote" formAction="/" type="submit">
      {text}
    </button>
  );
}

export default Button;
