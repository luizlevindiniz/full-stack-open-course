import { useState } from "react";
import HighlightCountry from "./HighlightCountry";

const styles = {
  display: "inline",
  marginLeft: "0.1rem",
  padding: "0.1rem",
};

function Country({ country }) {
  const [highlight, setHighlight] = useState(false);
  const handleClick = () => {
    setHighlight(!highlight);
  };
  if (!highlight) {
    return (
      <li>
        {country.name.common}
        <div style={styles}>
          <button type="button" onClick={handleClick}>
            show
          </button>
        </div>
      </li>
    );
  } else {
    return (
      <>
        <HighlightCountry country={country}></HighlightCountry>
        <button type="button" onClick={handleClick}>
          unshow
        </button>
      </>
    );
  }
}

export default Country;
