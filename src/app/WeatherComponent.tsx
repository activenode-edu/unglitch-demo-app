import { useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { requestWeatherFromAPI } from "@/weather-api/getCurrentWeather";

type CitiesSupported = "New York" | "Berlin";

type WeatherRequestType = "Temperature" | "Windspeed" | "Humidity";

type CurrentWeater = {
  windspeed: number;
  temperature: number;
  humidity: number;
};

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
  const geoData = geoLocations[city];
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<CurrentWeater | null>(null);

  useEffect(() => {
    setIsLoading(true);
    requestWeatherFromAPI(geoData.lat, geoData.lon)
      .then((data) => {
        setWeatherData({
          windspeed: data.wind,
          temperature: data.temperature,
          humidity: data.humidity,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="card">
      {isLoading && <LoadingSpinner />}

      <h5 className="card-title">
        {type} in {city}
      </h5>

      <p className="card-content ">
        <span className="text-xl font-bold text-fuchsia-800">
          {weatherData?.[type.toLowerCase() as keyof CurrentWeater]}
        </span>

        <WeatherUnit type={type} />
      </p>
    </div>
  );
};
