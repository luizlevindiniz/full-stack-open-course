const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const allCountriesUrl = `${baseUrl}/all/`;
import axios from "axios";

async function getAllCountries() {
  const res = await axios.get(allCountriesUrl, { responseType: "json" });
  if (res.status >= 200 && res.status < 300) return res.data;
}

export { getAllCountries };
