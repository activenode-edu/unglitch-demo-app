import { WeatherDataReturn } from "@/weather-api/getCurrentWeather";
import { CitiesSupported, WeatherRequestType } from "./types";
import { create } from "unglitch";

type MyStore = {
  cards: Array<{
    city: CitiesSupported;
    type: WeatherRequestType;
  }>;

  weatherData: {
    [k in CitiesSupported]?: WeatherDataReturn;
  };
};

const store = create<MyStore>(() => {
  return {
    cards: [],
    weatherData: {},
  };
});

export const { useStore, update, useFetchData } = store;
