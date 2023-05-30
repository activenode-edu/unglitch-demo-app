"use client";

import { WeatherComponent } from "./WeatherComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-3 p-24">
      <WeatherComponent city="New York" type="Temperature" />

      <WeatherComponent city="New York" type="Windspeed" />

      <WeatherComponent city="New York" type="Humidity" />

      <hr />

      <WeatherComponent city="New York" type="Temperature" />

      <WeatherComponent city="New York" type="Windspeed" />

      <WeatherComponent city="New York" type="Humidity" />
    </main>
  );
}
