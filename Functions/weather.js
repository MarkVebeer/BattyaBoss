const axios = require('axios');

async function getTomorrowsWeather(location) {
  // A helyzetet kérdezzük le a OpenWeatherMap API-tól
  const weatherData = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=5d422b28d4a731f0a5336f8ddb8fccad`
  );

  // A holnapi időjárás adatait keressük meg a válaszban
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().slice(0, 10);

  const tomorrowWeather = weatherData.data.list.find(
    (weather) => weather.dt_txt.includes(tomorrowString)
  );

  // Visszaadjuk a holnapi időjárás adatait olvasható formában
  return [tomorrowWeather.weather[0].description, Math.round(tomorrowWeather.main.temp) ]
}

module.exports = { getTomorrowsWeather };
