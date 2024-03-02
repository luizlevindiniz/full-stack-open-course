import { useState } from "react";
import { useEffect } from "react";
import CountriesList from "./components/CountriesList";
import { getAllCountries } from "./services/countries";

function App() {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [countryName, setCountryName] = useState("");

  const getCountriesInitialState = async () => {
    const allCountries = await getAllCountries();
    setCountries(allCountries);
    setFilteredCountries(allCountries);
  };
  useEffect(() => {
    getCountriesInitialState();
  }, []);

  const handleCountryNameChange = (e) => {
    setCountryName(e.target.value);
  };

  useEffect(() => {
    if (countries === null) return;
    const filteredCountries = countries.filter((c) =>
      c.name.common.toLowerCase().includes(countryName.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
  }, [countryName]);

  if (countries === null) {
    return null;
  } else {
    return (
      <>
        <div>
          <label htmlFor="filter">find countries: </label>
          <input
            type="text"
            name="filter"
            id="filter"
            value={countryName}
            onChange={handleCountryNameChange}
          />
        </div>
        <h5>Countries: </h5>
        <CountriesList filteredCountries={filteredCountries}></CountriesList>
      </>
    );
  }
}

export default App;
