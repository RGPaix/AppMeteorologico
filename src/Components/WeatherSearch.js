import React, { useEffect, useState } from "react";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    setError(null);

    const fetchCity = async () => {
      try {
        const apiKey = "fe0e7ff5f4443bdae32661fd41df5a07";
        const encodedCity = encodeURIComponent(city);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error("Cidade não encontrada");
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchCity();
    }, 500); // Aguarda 500 ms antes de executar a busca

    return () => clearTimeout(delayDebounceFn);
  }, [city]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : weatherData ? (
        <div>
          <h3>{weatherData.name}</h3>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Condição climática: {weatherData.weather[0].description}</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
          <p>Velocidade do vento: {weatherData.wind.speed} Km/h</p>
        </div>
      ) : (
        <p>Pesquise uma cidade para ver o clima.</p>
      )}
    </div>
  );
};

export default WeatherSearch;
