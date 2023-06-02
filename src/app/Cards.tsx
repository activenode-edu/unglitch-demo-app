"use client";

import { useMutation, useQuery } from "react-query";
import { AddCard } from "./AddCard";
import { WeatherComponent } from "./WeatherComponent";
import { update, useStore } from "./store";

export const Cards = () => {
  const [cards] = useStore((state) => {
    return state.weatherCards;
  });

  return (
    <div>
      <AddCard
        onAdd={(city, type) => {
          update((state) => {
            return {
              ...state,
              weatherCards: [...state.weatherCards, { city, type }],
            };
          });
        }}
      />

      {cards.map((cardData, key) => {
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
