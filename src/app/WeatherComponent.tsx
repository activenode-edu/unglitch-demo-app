import {
  WeatherDataReturn,
  requestWeatherFromAPI,
} from "@/weather-api/getCurrentWeather";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./utils/LoadingSpinner";
import { CitiesSupported, WeatherRequestType } from "./utils/types";
import { useQuery } from "react-query";
import { useFetchData } from "./utils/store";

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
  const unglitchWeather = useFetchData(
    async () => {
      return requestWeatherFromAPI(
        geoLocations[city].lat,
        geoLocations[city].lon
      );
    },
    {
      token: `weather_${city}`,
      refreshInterval: 5000,
      data: (s) => s.weatherData[city],
      onSuccess(update, data) {
        update((s) => ({
          weatherData: {
            ...s.weatherData,
            [city]: data,
          },
        }));
      },
    }
  );

  const weatherData = unglitchWeather.data;

  return (
    <div className="card mb-3">
      {!!unglitchWeather.isFetching && <LoadingSpinner />}

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
