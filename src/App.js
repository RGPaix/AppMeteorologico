import "./styles.css";
import WeatherSearch from "./Components/WeatherSearch";

export default function App() {
  return (
    <div className="App">
      <h1>Tempo agora</h1>
      <h2>Condição meteorológica na sua cidade</h2>
      <WeatherSearch />
    </div>
  );
}
