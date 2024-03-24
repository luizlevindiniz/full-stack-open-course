import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [showForm, setShowForm] = useState(false);

  const showStyles = { display: showForm ? "none" : "" };
  const hideStyles = { display: showForm ? "" : "none" };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleForm,
    };
  });

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  return (
    <div className="togglableContent">
      <div style={showStyles}>
        <button type="button" onClick={toggleForm}>
          {buttonLabel}
        </button>
      </div>
      <div style={hideStyles}>
        {children}
        <button type="button" onClick={toggleForm}>
          cancel
        </button>
      </div>
      <hr />
    </div>
  );
});

Togglable.displayName = "Toggable";

export default Togglable;
