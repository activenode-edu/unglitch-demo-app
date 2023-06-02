"use client";

import { WeatherComponent } from "./WeatherComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-3 p-24">
      <WeatherComponent city="New York" type="Temperature" />

      <WeatherComponent city="New York" type="Windspeed" />

      <WeatherComponent city="New York" type="Humidity" />

      <div className="bg-indigo-800 flex flex-col gap-3 p-3 rounded-lg">
        <h2 className="text-lg font-bold">Windspeed only</h2>
        <WeatherComponent city="New York" type="Windspeed" />

        <WeatherComponent city="Berlin" type="Windspeed" />
      </div>
    </main>
  );
}
