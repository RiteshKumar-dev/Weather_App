import SearchBox from "./SearchBox.jsx";
import InfoBox from "./InfoBox.jsx";
import { useState } from "react";

function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "United States",
    feelsLike: 24.8,
    temp: 25.05,
    tempMin: 25.05,
    tempMax: 25.02,
    humidity: 47,
    weather: "haze",
  });

  let updateWeath = (weatResult) => {
    setWeatherInfo(weatResult);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACT WEATHER APP...</h1>
      <SearchBox weatInfo={updateWeath} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}
export default WeatherApp;
