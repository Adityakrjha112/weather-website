import React, { useEffect, useState } from "react";
import "../style/style.css";
import Weather from "./Weather";
function Temp() {
  const API = process.env.REACT_APP_NEWS_API;
  const [searchValue, setSearchValue] = useState("jaipur");
  const [tempInforomation, setTempInforomation] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${API}`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, pressure, humidity } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myNewWeather = {
        temp,
        pressure,
        humidity,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInforomation(myNewWeather);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="serach">
          <input
            type="search"
            placeholder="serach your city"
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <Weather tempInforomation={tempInforomation} />
    </>
  );
}

export default Temp;
