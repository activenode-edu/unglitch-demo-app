import { WeatherDataReturn } from "@/weather-api/getCurrentWeather";
import { CitiesSupported, WeatherRequestType } from "./types";
import { create } from "unglitch";

type MyState = {
  cards: Array<{
    city: CitiesSupported;
    type: WeatherRequestType;
  }>;
  weatherData: {
    [key in CitiesSupported]?: WeatherDataReturn;
  };
};

const initialState: MyState = {
  cards: [
    {
      city: "Berlin",
      type: "Windspeed",
    },
  ],
  weatherData: {},
};

const store = create(() => initialState);

export const { update, useFetchData, useStore } = store;
