import {
  WeatherDataReturn,
  requestWeatherFromAPI,
} from "@/weather-api/getCurrentWeather";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./utils/LoadingSpinner";
import { CitiesSupported, WeatherRequestType } from "./utils/types";

const geoLocations = {
  "New York": {
    lat: 40.73061,
    lon: -73.935242,
  },
  Berlin: {
    lat: 52.520008,
    lon: 13.404954,
  },
};

const WeatherUnit = ({ type }: { type: WeatherRequestType }) => (
  <span className="text-gray-400 text-sm">
    {type === "Temperature" ? "°C" : type === "Windspeed" ? "km/h" : "%"}
  </span>
);

export const WeatherComponent = ({
  city,
  type,
}: {
  city: CitiesSupported;
  type: WeatherRequestType;
}) => {
  const [isLoading, setIsLoading] = useState(0);
  const [weatherData, setWeatherData] = useState<WeatherDataReturn | null>(
    null
  );

  useEffect(() => {
    const refreshWeather = () => {
      setIsLoading((loading) => loading + 1);
      requestWeatherFromAPI(geoLocations[city].lat, geoLocations[city].lon)
        .then((data) => {
          setWeatherData(data);
        })
        .finally(() => {
          setIsLoading((loading) => loading - 1);
        });
    };

    let interval: number;

    refreshWeather();
    interval = window.setInterval(refreshWeather, 5000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <div className="card">
      {!!isLoading && <LoadingSpinner />}

      <h5 className="card-title">
        {type} in {city}
      </h5>

      <p className="card-content text-center">
        <span className="text-xl font-bold text-fuchsia-800">
          {type === "Humidity" && weatherData?.humidity}
          {type === "Temperature" && weatherData?.temperature}
          {type === "Windspeed" && weatherData?.windspeed}
        </span>

        <WeatherUnit type={type} />
      </p>
    </div>
  );
};
