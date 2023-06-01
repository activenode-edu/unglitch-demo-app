"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { WeatherComponent } from "./WeatherComponent";
import { useState } from "react";
import { Cards } from "./Cards";

export default function Home() {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center gap-3 p-24">
        {/* <WeatherComponent city="New York" type="Temperature" /> */}

        <Cards />
      </main>
    </QueryClientProvider>
  );
}
