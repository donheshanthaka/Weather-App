import { Box, Typography, Divider, useMediaQuery } from "@mui/material"
import React from "react"
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined"
import { useNavigate } from "react-router-dom"
import { useWeatherContext } from "../../../state"
import WeatherComponentHeader from "./WeatherComponentHeader"

export default function WeatherComponentLayout(props) {
  const { weatherData } = useWeatherContext()

  const {
    main: { pressure, humidity },
    visibility,
    wind: { speed: windSpeed, deg: windDegree },
    sys: { sunrise, sunset },
  } = weatherData[props.city]

  const navigate = useNavigate()
  const isSelected = props.selected ? true : false
  const isSmallScreen = useMediaQuery("(max-width:725px)")
  const isFiveHundredPixelWide = useMediaQuery("(max-width:500px)")

  const sunriseTime = new Date(sunrise * 1000)
  const sunsetTime = new Date(sunset * 1000)

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }
  const formattedSunrise = sunriseTime.toLocaleString("en-US", options)
  const formattedSunset = sunsetTime.toLocaleString("en-US", options)

  const handleSelect = () => {
    if (isSelected) {
      return
    }
    navigate(`/selectedWeather/${props.city}`)
  }

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
      onClick={handleSelect}
      sx={{
        transition: "transform 0.2s ease-out, box-shadow 0.2s ease-in-out",
        "&:hover": isSelected
          ? ""
          : { cursor: "pointer", transform: "scale(1.02)" },
      }}
    >
      {/* Top Box */}

      <WeatherComponentHeader
        city={props.city}
        selected={props.selected ?? false}
      />

      {/* Bottom Box */}
      <Box
        backgroundColor="#383b47"
        width="100%"
        display="flex"
        justifyContent="space-evenly"
        padding={
          isSelected
            ? isFiveHundredPixelWide
              ? "2rem 1rem"
              : "4rem 2rem 4rem 2rem"
            : isFiveHundredPixelWide
            ? "1rem"
            : "2rem"
        }
        borderRadius="0 0 0.75rem 0.75rem"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap="0.25rem"
          marginRight="1rem"
        >
          <Box
            display="flex"
            alignItems="baseline"
            gap="0.5em"
            flexDirection={isFiveHundredPixelWide ? "column" : "row"}
          >
            <Typography
              fontWeight="bold"
              fontFamily="Open Sans"
              sx={{ fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)" }}
            >
              Pressure:
            </Typography>
            <Typography
              fontFamily="Open Sans"
              sx={{ fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)" }}
            >
              {pressure}hPa
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="baseline"
            gap="0.5rem"
            flexDirection={isFiveHundredPixelWide ? "column" : "row"}
          >
            <Typography
              fontWeight="bold"
              fontFamily="Open Sans"
              sx={{ fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)" }}
            >
              Humidity:
            </Typography>
            <Typography
              fontFamily="Open Sans"
              sx={{ fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)" }}
            >
              {humidity}%
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="baseline"
            gap="0.5rem"
            flexDirection={isFiveHundredPixelWide ? "column" : "row"}
          >
            <Typography
              fontWeight="bold"
              fontFamily="Open Sans"
              sx={{ fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)" }}
            >
              Visibility:
            </Typography>
            <Typography
              fontFamily="Open Sans"
              sx={{ fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)" }}
            >
              {visibility / 1000}km
            </Typography>
          </Box>
        </Box>
        <Divider color="gray" orientation="vertical" flexItem />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="0.5rem"
          margin="0 1rem"
        >
          <NearMeOutlinedIcon fontSize={isSmallScreen ? "small" : "large"} />
          <Typography
            sx={{ fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)" }}
            fontFamily="Open Sans"
            fontWeight="500"
          >
            {windSpeed}m/s {windDegree} Degree
          </Typography>
        </Box>
        <Divider color="gray" orientation="vertical" flexItem />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap="0.25rem"
          marginLeft="1rem"
        >
          <Box
            display="flex"
            alignItems="baseline"
            gap="0.5em"
            flexDirection={isFiveHundredPixelWide ? "column" : "row"}
          >
            <Typography
              fontWeight="bold"
              fontFamily="Open Sans"
              sx={{ fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)" }}
            >
              Sunrise:
            </Typography>
            <Typography
              fontFamily="Open Sans"
              sx={{ fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)" }}
            >
              {formattedSunrise}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="baseline"
            gap="0.5rem"
            flexDirection={isFiveHundredPixelWide ? "column" : "row"}
          >
            <Typography
              fontWeight="bold"
              fontFamily="Open Sans"
              sx={{ fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)" }}
            >
              Sunset:
            </Typography>
            <Typography
              fontFamily="Open Sans"
              sx={{ fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)" }}
            >
              {formattedSunset}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
