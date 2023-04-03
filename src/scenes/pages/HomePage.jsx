import React, { useState, useEffect } from "react"
import cities from "../../data/cities.json"
import getWeatherDataAPI from "../../api/weather_api"
import WeatherComponent from "../components/WeatherComponent"
import { Box, Typography, useMediaQuery, TextField, Button} from "@mui/material"
import { Grid } from "@mui/material";
import randomHueValue from "../../utils/random_hue"
import backgroundImage from "../../assets/header_bg.png"
import Footer from "../components/Footer"
import Header from "../components/Header"


export default function HomePage() {

  const [weatherData, setWeatherData] = useState([])
  const [colors, setColors] = useState([])

  const getWeatherData = async (cityCode) => {
    const weatherData = await getWeatherDataAPI(cityCode)
    // console.log(weatherData)
    return weatherData
  }
  
  const cityCodes = cities.List.map((city) => {
    return city.CityCode
  })

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = [];
      for (const code of cityCodes) {
        const weather = await getWeatherData(code);
        data.push(weather);
      }
      setWeatherData(data);
  
      const tempColors = [];
      for (let i = 0; i < data.length; i++) {
        tempColors.push(randomHueValue());
      }
      setColors(tempColors);
    };
    fetchWeatherData();
  }, []);
  
  

  const isGridToggle = useMediaQuery('(min-width:1536px)');
  const isThousandPixelWide = useMediaQuery('(max-width:1000px)')
  const isMobileScreen = useMediaQuery('(max-width:500px)');
  const isTabletScreen = useMediaQuery('(max-width:1750px)');

  const handleClose = (index) => {
    console.log("close")
    const newData = [...weatherData];
    newData.splice(index, 1)
    setWeatherData(newData)
  }


  return (
    <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" 
      backgroundColor="#1f2128"
      // backgroundColor="lightgreen"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}

    >
      
      <Header/>
      <Box 
        className="searchBox"
        width="80%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={isMobileScreen ? "2rem" : "3.4rem"}
      >
        <TextField 
          size="small"
          label="Enter a city"
          inputProps={{style: {height: "2rem"}}}
          InputLabelProps={{style: {color: "gray" , marginTop: "5px" }}}
          sx={{width: "25rem", backgroundColor: "#1f2128", borderRadius: '8px 0 0 8px' }}
        />
        <Button 
          variant="contained"
          style={{ 
            height: "3rem",
            textTransform: "none",
            fontSize: isMobileScreen ? "0.8rem" : "1rem",
            width: isMobileScreen ? "12.3rem" : "8.3rem",
          }}
          sx={{
            backgroundColor: "#6c5dd3",
            '&:hover': {
              backgroundColor: "#5443c0",
            },
            borderRadius: "0 8px 8px 0",
          }}
        >
          Add City
        </Button>
      </Box>


      <Box 
      // backgroundColor="lightyellow" 
      width={isMobileScreen? "94%" : isTabletScreen? "78%" : "64%"
      } padding="0rem 0rem" display="flex" justifyContent="center" alignItems="center" textAlign="center">

        <Grid 
          container 
          // backgroundColor="lightblue"
        >
          {weatherData.map((data, index) => (
            <Grid key={index} item xs={12} xl={6} justifySelf="center" width="100%">
              <Box width={isGridToggle? "85%" : isThousandPixelWide? "85%" :  "65%"} display="flex" justifyContent="center" alignItems="center" marginTop="2rem"mx="auto" >
              <WeatherComponent
                index={index}
                data={{ 
                  name: data.name,
                  country: data.sys.country,
                  weather: data.weather[0].main,
                  description: data.weather[0].description,
                  temp: parseInt(data.main.temp),
                  tempMax: parseInt(data.main.temp_max),
                  tempMin: parseInt(data.main.temp_min),
                  pressure: data.main.pressure,
                  humidity: data.main.humidity,
                  visibility: data.visibility,
                  windSpeed: data.wind.speed,
                  windDegree: data.wind.deg,
                  sunrise: data.sys.sunrise,
                  sunset: data.sys.sunset,
                  dummy : data,
                  icon: data.weather[0].icon,
                  lon: data.coord.lon,
                  lat: data.coord.lat,
                  hue: colors[index]
                }} 
                onRemove={handleClose}
              />
              {/* <h1>Heloooo</h1> */}
              </Box>
            </Grid>
          ))}
        </Grid>
        
      </Box>
      <Footer/>
    </Box>
  );
}
