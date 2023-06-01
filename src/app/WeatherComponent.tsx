import {
  WeatherDataReturn,
  requestWeatherFromAPI,
} from "@/weather-api/getCurrentWeather";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { useQuery } from "react-query";

type CitiesSupported = "New York" | "Berlin";

type WeatherRequestType = "Temperature" | "Windspeed" | "Humidity";

let GlobalWeatherData: {
  [k in "Berlin" | "New York"]: null | WeatherDataReturn;
} = {
  Berlin: null,
  "New York": null,
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
  const weatherQuery = useQuery({
    queryKey: ["weather", city],
    queryFn: async () => {
      return requestWeatherFromAPI(
        geoLocations[city].lat,
        geoLocations[city].lon
      );
    },
    refetchInterval: 5000,
  });

  const weatherData = weatherQuery.data;

  return (
    <div className="relative mb-2">
      <div className="card">
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
      {!!weatherQuery.isFetching && <LoadingSpinner />}
    </div>
  );
};
