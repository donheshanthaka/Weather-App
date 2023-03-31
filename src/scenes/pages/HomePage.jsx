import React from 'react'
import cities from '../../data/cities.json'
import dummyData from '../../data/dummy.json'
import getWeatherDataAPI from '../../api/weather_api'

export default function HomePage() {

  const getWeatherData = async (cityCode) => {
    const weatherData = await getWeatherDataAPI(cityCode)
    console.log(weatherData)
  }

  const cityCodes = cities.List.map((city) =>{
    return city.CityCode
  })

  getWeatherData("1248991")

  // console.log(Array.isArray(cityCodes))
  // console.log(cityCodes)

  return (
    <>
      <div>Home Page</div>
    </>
  )
}
