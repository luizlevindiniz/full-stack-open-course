const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  } else {
    return (
      <div>
        <h3 style={{ color: "red" }} className="notification">
          Warning: {notification}
        </h3>
      </div>
    );
  }
};

export default Notification;
