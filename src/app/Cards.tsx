"use client";

import { useMutation, useQuery } from "react-query";
import { AddCard } from "./AddCard";
import { WeatherComponent } from "./WeatherComponent";

let cardState: Array<{
  city: "New York" | "Berlin";
  type: "Temperature" | "Windspeed" | "Humidity";
}> = [
  {
    city: "New York",
    type: "Temperature",
  },
];

export const Cards = () => {
  const cardQuery = useQuery({
    queryKey: ["weatherCards"],
    queryFn: async () => {
      return cardState;
    },
  });

  const addCardMutation = useMutation({
    mutationFn: async (cityTypeObj: any) => {
      cardState.push(cityTypeObj);
    },
  });

  return (
    <div>
      <AddCard
        onAdd={(city, type) => {
          addCardMutation.mutate({
            city,
            type,
          });
        }}
      />

      {cardQuery.data?.map((cardData, key) => {
        return (
          <WeatherComponent
            key={key}
            type={cardData.type}
            city={cardData.city}
          />
        );
      })}
    </div>
  );
};
