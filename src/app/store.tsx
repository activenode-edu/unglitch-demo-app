import { WeatherDataReturn } from "@/weather-api/getCurrentWeather";
import { create } from "unglitch";

type OurStore = {
  weatherCards: Array<{
    city: "New York" | "Berlin";
    type: "Temperature" | "Windspeed" | "Humidity";
  }>;

  weatherData: {
    [k in "Berlin" | "New York"]?: WeatherDataReturn;
  };
};

let initialStore: OurStore = {
  weatherCards: [],
  weatherData: {},
};

const store = create<OurStore>(() => {
  return initialStore;
});

export const { useStore, getSnapshot, update, useFetchData } = store;
