import { useState } from "react";
import { CitiesSupported, WeatherRequestType } from "./types";

export const AddCardForm = ({
  onAdd,
}: {
  onAdd: (city: CitiesSupported, type: WeatherRequestType) => void;
}) => {
  const [city, setCity] = useState("Berlin");
  const [type, setType] = useState("Temperature");

  return (
    <div className="flex mb-5">
      <select
        name="city"
        className="bg-black border border-fuchsia-300 p-3"
        onChange={(e) => {
          setCity(e.target.value);
        }}
      >
        <option>Berlin</option>
        <option>New York</option>
      </select>

      <select
        onChange={(e) => {
          setType(e.target.value);
        }}
        name="type"
        className="bg-black border border-fuchsia-300 p-3"
      >
        <option>Temperature</option>
        <option>Windspeed</option>
        <option>Humidity</option>
      </select>

      <button
        type="button"
        className="bg-fuchsia-700 text-white whitespace-nowrap px-2 border"
        onClick={() => {
          onAdd(city as any, type as any);
        }}
      >
        Add Card
      </button>
    </div>
  );
};
