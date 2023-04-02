import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import HomePage from './scenes/pages/HomePage'
import WeatherComponentPage from './scenes/pages/WeatherComponentPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/selectedWeather' element={<WeatherComponentPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
