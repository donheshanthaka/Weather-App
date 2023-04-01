import React from "react"
import cities from "../../data/cities.json"
import dummyData from "../../data/dummy.json"
import getWeatherDataAPI from "../../api/weather_api"
import WeatherComponent from "../components/WeatherComponent"
import { Box, Typography, useMediaQuery } from "@mui/material"
import { Grid } from "@mui/material";
// import { makeStyles } from "@mui/styles";



export default function HomePage() {
  const getWeatherData = async (cityCode) => {
    const weatherData = await getWeatherDataAPI(cityCode)
    console.log(weatherData)
  }

  const cityCodes = cities.List.map((city) => {
    return city.CityCode
  })

  const isLargeScreen = useMediaQuery('(min-width:1200px)');
  const isMobileScreen = useMediaQuery('(max-width:500px)');
  const isTabletScreen = useMediaQuery('(max-width:1750px)');


  // getWeatherData("1248991")

  // console.log(Array.isArray(cityCodes))
  // console.log(cityCodes)

  return (
    <Box width="100%" display="flex" justifyContent="center" alignItems="center" >

      <Box backgroundColor="lightyellow" width={isMobileScreen? "90%" : isTabletScreen? "82%" : "66%"
      } padding="10rem 0rem" display="flex" justifyContent="center" alignItems="center" textAlign="center">

        <Grid container spacing={0} backgroundColor="lightblue" justifyContent={isLargeScreen? "null" : "center" } >
          {[...Array(5)].map((_, index) => (
            <Grid key={index} item sx={12} lg={6} justifySelf="center" width="100%">
              <Box width="85%" display="flex" justifyContent="center" alignItems="center" marginTop="2rem" backgroundColor="red" mx="auto" >
              <WeatherComponent />
              {/* <h1>Heloooo</h1> */}
              </Box>
            </Grid>
          ))}
        </Grid>
        
      </Box>
    </Box>
  );
}
