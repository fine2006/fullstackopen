import { useEffect, useState } from "react";
import axios from "axios";

const CountryListElement = ({ text, onShow }) => {
  return (
    <div>
      {text} <button onClick={() => onShow(text)}>Show</button>
    </div>
  );
};

const CountryDescription = ({ country, api_key }) => {
  const [weather, setWeather] = useState(null);
  const hook = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${api_key}`,
      )
      .then((response) => response.data)
      .then((result) => setWeather(result));
  };
  useEffect(hook, []);

  if (weather != null)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        <ul>
          {Object.keys(country.languages).map((key) => (
            <li key={key}>{country.languages[key]}</li>
          ))}
        </ul>
        <img src={country.flags.png} />
        <h2>Weather in {country.capital}</h2>
        <div>Temperature {weather.main.temp} Celcius</div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
        <div>Wind {weather.wind.speed} m/s</div>
      </div>
    );
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      <h2>Weather in {country.capital}</h2>
      <div>Loading...</div>
    </div>
  );
};

const CountryList = ({ countrylist, onShow, api_key }) => {
  if (countrylist.length === 1) {
    const country = countrylist[0];
    return <CountryDescription country={country} api_key={api_key} />;
  } else if (countrylist.length > 10)
    return <div>Too many matches, specify another filter</div>;
  else {
    return (
      <div>
        {countrylist.map((country) => (
          <CountryListElement
            key={country.name.official}
            text={country.name.common}
            onShow={onShow}
          />
        ))}
      </div>
    );
  }
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);
  const hook = () => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => response.data)
      .then((result) => setCountries(result));
  };
  useEffect(hook, []);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleShow = (name) => {
    setSearch(name);
  };

  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  if (countries != null) {
    const filteredCountries = countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase()) ===
        true,
    );
    return (
      <div>
        find countries <input value={search} onChange={handleSearch} />
        <CountryList
          countrylist={filteredCountries}
          onShow={handleShow}
          api_key={api_key}
        />
      </div>
    );
  }
  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      <div>Loading...</div>
    </div>
  );
};

export default App;
