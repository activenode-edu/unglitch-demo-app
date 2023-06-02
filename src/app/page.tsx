"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { WeatherComponent } from "./WeatherComponent";
import { useState } from "react";
import { CardManager } from "./CardManager";

export default function Home() {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <main className="flex min-h-screen flex-col items-center gap-3 p-24">
        <CardManager />
        {/* <WeatherComponent city="New York" type="Temperature" /> */}
      </main>
    </QueryClientProvider>
  );
}
