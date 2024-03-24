import PropTypes from "prop-types";
import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [showForm, setShowForm] = useState(false);

  const toggleToShow = { display: showForm ? "none" : "" };
  const toggleToHide = { display: showForm ? "" : "none" };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleFormVisibility,
    };
  });

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  return (
    <div>
      <button style={toggleToShow} onClick={toggleFormVisibility}>
        {buttonLabel}
      </button>
      <div style={toggleToHide}>
        {children}
        <button onClick={toggleFormVisibility}>close</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
