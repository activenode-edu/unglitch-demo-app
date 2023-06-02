import { useMutation, useQuery } from "react-query";
import { WeatherComponent } from "./WeatherComponent";
import { AddCardForm } from "./utils/AddCardForm";
import { WeatherRequestType } from "./utils/types";
import { CitiesSupported } from "./utils/types";
import { update, useStore } from "./utils/store";

export const CardManager = () => {
  const [cards] = useStore((state) => state.cards);

  return (
    <div>
      <AddCardForm
        onAdd={(city, type) => {
          update((state) => {
            return {
              cards: [...cards, { city, type }],
            };
          });
        }}
      />
      {cards.map((c, index) => {
        return <WeatherComponent key={index} city={c.city} type={c.type} />;
      })}
    </div>
  );
};
