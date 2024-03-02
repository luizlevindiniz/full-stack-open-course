import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function HighlightCountry({ country }) {
  const [lat, lgn] = country.latlng;
  const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lgn}&current=temperature_2m,wind_speed_10m&wind_speed_unit=ms`;

  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const res = await axios.get(weatherAPI);
    if (res.status >= 200 && res.status < 300) {
      const weather = res.data.current;
      setWeather({
        temperature: weather.temperature_2m,
        wind: weather.wind_speed_10m,
      });
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <br />
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <br />
      <h5>languages: </h5>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => {
          return <li key={key}>{value}</li>;
        })}
      </ul>
      <div>
        <img src={country.flags.png} alt="flag" />
      </div>
      {weather && (
        <>
          <h3>Weather in {country.name.common}</h3>
          <p>temperature {weather.temperature} Celcius </p>
          <p>wind {weather.wind} m/s </p>
        </>
      )}
    </div>
  );
}

export default HighlightCountry;
