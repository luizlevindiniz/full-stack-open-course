import Country from "./Country";
import HighlightCountry from "./HighlightCountry";

function CountriesList({ filteredCountries }) {
  if (filteredCountries.length > 10) {
    return <p>Too many matches</p>;
  } else if (filteredCountries.length === 1) {
    return <HighlightCountry country={filteredCountries[0]}></HighlightCountry>;
  } else {
    return (
      <ul id="countriesToShow">
        {filteredCountries.map((country) => {
          return <Country key={country.cca3} country={country}></Country>;
        })}
      </ul>
    );
  }
}

export default CountriesList;
