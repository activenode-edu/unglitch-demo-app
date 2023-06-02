import { useMutation, useQuery } from "react-query";
import { WeatherComponent } from "./WeatherComponent";
import { AddCardForm } from "./utils/AddCardForm";
import { WeatherRequestType } from "./utils/types";
import { CitiesSupported } from "./utils/types";

const cards: Array<{
  city: CitiesSupported;
  type: WeatherRequestType;
}> = [
  {
    city: "Berlin",
    type: "Windspeed",
  },
];

export const CardManager = () => {
  const cardQuery = useQuery({
    queryKey: ["cards"],
    queryFn: async () => cards,
  });

  const mutationFn = useMutation({
    mutationFn: async (obj: {
      city: CitiesSupported;
      type: WeatherRequestType;
    }) => {
      cards.push(obj);
    },
  });

  return (
    <div>
      <AddCardForm
        onAdd={(city, type) => {
          mutationFn.mutate({ city, type });
        }}
      />
      {cardQuery.data?.map((c, index) => {
        return <WeatherComponent key={index} city={c.city} type={c.type} />;
      })}
    </div>
  );
};
