import { useState } from "react";
import "./WeatherCard.css";

function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) return;

    try {
      setError("");

      const response = await fetch(
        `https://p2pclouds.up.railway.app/v1/learn/weather?city=${city}`
      );

      const data = await response.json();

      setWeather({
        temp: data.current.temp_c,
        feels: data.current.feelslike_c,
        windSpeed: data.current.wind_kph,
        windDir: data.current.wind_degree,
        rain: data.current.chance_of_rain || 0,
        snow: data.current.chance_of_snow || 0,
      });
    } catch (err) {
      setWeather(null);
      setError("City not found!");
    }
  };

  return (
    <div className="container">
      <h1>Weather Card</h1>
      <div className="sub">Enter city name to see weather</div>

      <div>
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className="card">
          <div className="city">{city.toUpperCase()}</div>

          <div className="temp">
            {weather.temp} <span>°C</span>
          </div>

          <div className="feels">
            Feels like: {weather.feels}°C
          </div>

          <div className="weather-details">
            <div>
              <div className="label">Wind Speed</div>
              <div className="value">{weather.windSpeed} km/h</div>
            </div>

            <div>
              <div className="label">Wind Direction</div>
              <div className="value">{weather.windDir}°</div>
            </div>

            <div>
              <div className="label">Rain</div>
              <div className="value">{weather.rain}%</div>
            </div>

            <div>
              <div className="label">Snow</div>
              <div className="value">{weather.snow}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;