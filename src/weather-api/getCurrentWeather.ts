export type WeatherDataReturn = {
  temperature: number;
  humidity: number;
  windspeed: number;
};

const waitWeatherDataReturn = (weatherData: WeatherDataReturn) =>
  new Promise<WeatherDataReturn>((res) => {
    setTimeout(() => {
      res(weatherData);
    }, 300);
  });

export const requestWeatherFromAPI = async (
  lat: number,
  long: number
): Promise<WeatherDataReturn> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&timezone=CET`;

  const weatherData = (await fetch(url).then((res) => res.json())) as {
    hourly: {
      time: string[];
      temperature_2m: number[];
      relativehumidity_2m: number[];
      windspeed_10m: number[];
    };
  };

  // console.log(weatherData);

  const currentDate = new Date();

  const month = (currentDate.getMonth() + 1 + "").padStart(2, "0");
  const day = (currentDate.getDate() + "").padStart(2, "0");
  const hour = (currentDate.getHours() + "").padStart(2, "0");
  const currentDateString = `${currentDate.getFullYear()}-${month}-${day}T${hour}:00`;

  const currentWeatherIndex = weatherData.hourly.time.findIndex((time) =>
    time.startsWith(currentDateString)
  );

  // console.log("currentWeatherIndex", currentWeatherIndex, currentDateString);

  const currentWeather: WeatherDataReturn = {
    temperature: weatherData.hourly.temperature_2m[currentWeatherIndex],
    humidity: weatherData.hourly.relativehumidity_2m[currentWeatherIndex],
    windspeed: weatherData.hourly.windspeed_10m[currentWeatherIndex],
  };

  return waitWeatherDataReturn(currentWeather);
};
