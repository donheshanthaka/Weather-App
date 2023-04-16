import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import HomePage from "./scenes/pages/HomePage"
import WeatherComponentPage from "./scenes/pages/WeatherComponentPage"
import { WeatherProvider } from "./state"

function App() {
  return (
    <>
      <WeatherProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/selectedWeather" element={<WeatherComponentPage />} />
          </Routes>
        </BrowserRouter>
      </WeatherProvider>
    </>
  )
}

export default App
