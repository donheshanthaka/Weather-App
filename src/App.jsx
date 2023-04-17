import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import HomePage from "./scenes/pages/HomePage"
import WeatherComponentPage from "./scenes/pages/WeatherComponentPage"
import { WeatherProvider } from "./state"
import LogRocket from "logrocket"

function App() {
  LogRocket.init(
    import.meta.env.VITE_APP_lOGROCKET_APP_ID ||
      process.env.VITE_APP_lOGROCKET_APP_ID,
    {
      console: true,
    }
  )

  return (
    <>
      <WeatherProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/selectedWeather/:cityCode"
              element={<WeatherComponentPage />}
            />
          </Routes>
        </BrowserRouter>
      </WeatherProvider>
    </>
  )
}

export default App
