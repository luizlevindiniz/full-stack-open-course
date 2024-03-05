const errorStyles = {
  color: "red",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

const successStyles = {
  color: "green",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

function Notification({ message, variant }) {
  if (message === null) {
    return null;
  }

  return (
    <div style={variant === "error" ? errorStyles : successStyles}>
      {message}
    </div>
  );
}

export default Notification;
