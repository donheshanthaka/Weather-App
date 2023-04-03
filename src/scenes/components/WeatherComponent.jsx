import { Box, Typography, Divider, IconButton, useMediaQuery } from "@mui/material"
import React from "react"
import { BsCloud } from "react-icons/bs"
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import cloudImage from '../../assets/weather_card_cloud.png'
import { useNavigate } from "react-router-dom";

export default function WeatherComponent(props) {

  const navigate = useNavigate()

  const isSelected = props.selected ? true : false;

  const isSmallScreen = useMediaQuery("(max-width:725px)")
  const isThousandPixelWide = useMediaQuery("(max-width:1000px)")
  const isFiveHundredPixelWide = useMediaQuery("(max-width:500px)")

  console.log(props.index)

  const {
    name,
    country,
    description,
    temp,
    tempMax,
    tempMin,
    pressure,
    humidity,
    visibility,
    windSpeed,
    windDegree,
    sunrise,
    sunset
   } = props.data

  const currentDate = new Date();

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "short",
    day: "numeric",
  };

  const formattedDate = currentDate.toLocaleString("en-US", options);
  const timeString = formattedDate.split(', ')[1];
  const dateString = formattedDate.split(', ')[0];

  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);

  const optionsTwo = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

const formattedSunrise = sunriseTime.toLocaleString('en-US', optionsTwo);
const formattedSunset = sunsetTime.toLocaleString('en-US', optionsTwo);


  const handleBackArrow = (event) => {
    event.stopPropagation()
    navigate('/')
  }

  const handleSelect = () => {
    if (isSelected) {
      return
    }
    navigate("/selectedWeather", {state: {data: props.data}})
  }

  const handleRemove = (event) => {
    event.stopPropagation()
    props.onRemove(props.index)
  }

  return (
    <Box
      // backgroundColor="lightGreen"
      // width="85%"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
      onClick={handleSelect}
      sx={{
            // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-in-out',
            '&:hover': isSelected ? "" : {cursor: 'pointer',
            // boxShadow: `0px 0px 25px 0px rgba(0, 0, 0, 0.3)`,
            transform: "scale(1.02)",
            }
          
          }}
    >
      {/* Top Box */}

      {!isSelected ? (
          <Box
          // backgroundColor="#388ee7"
          width="100%"
          display="flex"
          justifyContent="space-between"
          padding="2rem"
          paddingBottom="2.5rem"
          borderRadius="0.75rem 0.75rem 0 0"
          sx={{
            backgroundImage: `url(${cloudImage})`,
            backgroundSize: isSelected ? "cover" : "contain",
            backgroundPosition: 'center 70px',
            backgroundRepeat: "no-repeat",
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            //  HCL (hue, chroma, luminance)
            backgroundColor: "hsl(200, 85%, 35%)",
          }}
        >
          {/* top left */}
          
          
          <Box 
          // backgroundColor="lightYellow"
          textAlign="center" 
          marginLeft={isSmallScreen ? "0rem" : "2rem"}
          >
            <Typography fontSize="1.8rem" fontWeight="700" fontFamily='Open Sans' sx={{fontSize: "clamp(1rem, calc(4vw + 0.25rem), 1.8rem)"}}>
            {`${name}, ${country}`}
            </Typography>
            <Typography fontFamily='Open Sans' sx={{fontSize: "clamp(0.8rem, calc(2vw + 0.25rem), 1rem)"}}>{`${timeString}, ${dateString}`}</Typography>
            <Box
              display="flex"
              // backgroundColor="red"
              gap="1rem"
              alignItems="center"
              justifyContent="center"
              marginTop="1.5rem"
            >
              <BsCloud size={40} />
              <Typography fontFamily='Open Sans' fontWeight="500" fontSize="1.2rem" sx={{fontSize: "clamp(0.8rem, calc(2vw + 0.25rem), 1.2rem)"}}>{description}</Typography>
            </Box>
          </Box>
  
          {/* top right */}
          
          <Box
            // backgroundColor="lightGreen"
            display="flex"
            flexDirection="column"
            textAlign="center"
            marginRight={isSmallScreen ? "0rem" : "3rem"}
            // alignItems="flex-end"
          >
            <Box 
            display="flex" 
            // backgroundColor="yellow"
            >
              <Typography fontSize="4rem" fontWeight="500" lineHeight="1" fontFamily='Open Sans' sx={{fontSize: "clamp(2rem, calc(8vw + 0.25rem), 4rem)"}}>
              {`${temp}`}&deg;
              </Typography>
              <Box alignSelf="flex-end">
                <Typography fontSize="3rem" fontWeight="500" lineHeight="1" fontFamily='Open Sans' sx={{fontSize: "clamp(1.5rem, calc(6vw + 0.25rem), 3rem)"}}>
                  C
                </Typography>
              </Box>
            </Box>
  
            <Box
              // backgroundColor="red"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              // textAlign="left"
              height="100%"
              marginTop="1rem"
            >
              <Box 
                display="flex" 
                // backgroundColor="yellow"
              >
                <Typography fontFamily='Open Sans' sx={{fontSize: "clamp(0.8rem, calc(2vw + 0.25rem), 1rem)"}}>
                Temp Min: {`${tempMin}`}&deg;
                </Typography>
                <Box alignSelf="flex-end">
                  <Typography fontSize="0.8rem" fontFamily='Open Sans' sx={{fontSize: "clamp(0.6rem, calc(1.5vw + 0.25rem), 0.8rem)"}}>
                    C
                  </Typography>
                </Box>
              </Box>
              <Box 
                display="flex" 
                // backgroundColor="yellow"
              >
                <Typography fontFamily='Open Sans' sx={{fontSize: "clamp(0.8rem, calc(2vw + 0.25rem), 1rem)"}}>
                Temp Max: {`${tempMin}`}&deg;
                </Typography>
                <Box alignSelf="flex-end">
                  <Typography fontSize="0.8rem" fontFamily='Open Sans' sx={{fontSize: "clamp(0.6rem, calc(1.5vw + 0.25rem), 0.8rem)"}}>
                    C
                  </Typography>
                </Box>
              </Box>
              {/* <Typography fontFamily='Open Sans'>Temp Min: 25C</Typography>
              <Typography fontFamily='Open Sans'>Temp Max: 25C</Typography> */}
            </Box>
          </Box>

            <Box position="absolute"  left="98%" top="2%">
              <IconButton onClick={handleRemove}>
                <CloseIcon sx={{color: "white"}}/>
              </IconButton>
            </Box>

        </Box>
          ) : (
            <Box
          // backgroundColor="#388ee7"
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding="2rem"
          paddingBottom="2.5rem"
          borderRadius="0.75rem 0.75rem 0 0"
          sx={{
            backgroundImage: `url(${cloudImage})`,
            backgroundSize: isSelected ? "cover" : "contain",
            backgroundPosition: 'center 70px',
            backgroundRepeat: "no-repeat",
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            //  HCL (hue, chroma, luminance)
            backgroundColor: "hsl(200, 85%, 35%)",
          }}
        >
          {/* top  */}
          <Box position="absolute"  left={isFiveHundredPixelWide ? "-8%" : "-2.5%"} top="2%"  zIndex="10">
            <IconButton onClick={handleBackArrow} >
              <ArrowBackIcon sx={{color: "white"}}/>
            </IconButton>
          </Box>
          <Box 
          // backgroundColor="green"
          textAlign="center" 
          // marginLeft={isSmallScreen ? "0rem" : "2rem"}
          >
            <Typography fontSize="1.8rem" fontWeight="700" fontFamily='Open Sans' sx={{fontSize: "clamp(1.5rem, calc(4vw + 0.25rem), 1.8rem)"}}>
              {`${name}, ${country}`}
            </Typography>
            <Typography marginTop="1rem" fontFamily='Open Sans' sx={{fontSize: "clamp(0.8rem, calc(2vw + 0.25rem), 1rem)"}}>{`${timeString}, ${dateString}`}</Typography>
            
          </Box>
  
          {/* top right */}
          <Box 
            display="flex"
            // backgroundColor="blue"
            alignItems="center"
            justifyContent="space-evenly"
            width={isThousandPixelWide ? "90%" : "60%"}
            marginTop="3.5rem"
            marginBottom="2rem"
          >

            <Box>
              <Box
                // display="flex"
                // backgroundColor="red"
                gap="1rem"
                alignItems="center"
                justifyContent="center"
              >
                <BsCloud size={isFiveHundredPixelWide ? 45 : 65} />
                <Typography marginTop="1rem" fontFamily='Open Sans' fontWeight="500" fontSize="1.2rem" sx={{fontSize: "clamp(0.9rem, calc(2vw + 0.25rem), 1.2rem)"}}>{description}</Typography>
              </Box>
            </Box>

            {/* ---------------------------------------------- */}
            <Divider color="white" orientation="vertical" flexItem/>

            <Box
              // backgroundColor="lightGreen"
              textAlign="center"
            >
              <Box 
                display="flex" 
                justifyContent="center"
                backgroundColor=""
              >
                <Typography fontSize="4rem" fontWeight="500" lineHeight="1" fontFamily='Open Sans' sx={{fontSize: "clamp(3rem, calc(8vw + 0.25rem), 4.5rem)"}}>
                  {`${temp}`}&deg;
                </Typography>
                <Box alignSelf="flex-end">
                  <Typography fontSize="3rem" fontWeight="500" lineHeight="1" fontFamily='Open Sans' sx={{fontSize: "clamp(2rem, calc(6vw + 0.25rem), 3.2rem)"}}>
                    C
                  </Typography>
                </Box>
              </Box>
    
              <Box
                // backgroundColor="red"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                // textAlign="left"
                height="100%"
                marginTop="1rem"
              >
                <Box 
                  display="flex" 
                  // backgroundColor="yellow"
                >
                  <Typography fontFamily='Open Sans' sx={{fontSize: "clamp(0.9rem, calc(2vw + 0.25rem), 1.25rem)"}}>
                  Temp Min: {`${tempMin}`}&deg;
                  </Typography>
                  <Box alignSelf="flex-end">
                    <Typography fontSize="0.8rem" fontFamily='Open Sans' sx={{fontSize: "clamp(0.7rem, calc(1.5vw + 0.25rem), 1rem)"}}>
                      C
                    </Typography>
                  </Box>
                </Box>
                <Box 
                  display="flex" 
                  // backgroundColor="yellow"
                >
                  <Typography fontFamily='Open Sans' sx={{fontSize: "clamp(0.9rem, calc(2vw + 0.25rem), 1.25rem)"}}>
                  Temp Max: {`${tempMax}`}&deg;
                  </Typography>
                  <Box alignSelf="flex-end">
                    <Typography fontSize="0.8rem" fontFamily='Open Sans' sx={{fontSize: "clamp(0.7rem, calc(1.5vw + 0.25rem), 1rem)"}}>
                      C
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            
            {/* ---------------------------------- */}


        </Box>
         
        </Box>
          )}

      



      {/* Bottom Box */}
      <Box
        backgroundColor="#383b47"
        width="100%"
        display="flex"
        justifyContent="space-evenly"
        // padding="2rem"
        padding={isSelected ? "4rem 2rem 4rem 2rem" : "2rem"}
        borderRadius="0 0 0.75rem 0.75rem"
      >
        <Box display="flex" flexDirection="column" justifyContent="center" gap="0.25rem" marginRight="1rem">
          <Box display="flex" alignItems="baseline" gap="0.5em" flexDirection={isFiveHundredPixelWide ? "column" : "row"} >
            <Typography fontWeight="bold" fontFamily='Open Sans' sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>Pressure:</Typography>
            <Typography fontFamily='Open Sans' sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>{pressure}hPa</Typography>
          </Box>
          <Box display="flex" alignItems="baseline" gap="0.5rem" flexDirection={isFiveHundredPixelWide ? "column" : "row"} >
            <Typography fontWeight="bold" fontFamily='Open Sans' sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>Humidity:</Typography>
            <Typography fontFamily='Open Sans'  sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>{humidity}%</Typography>
          </Box>
          <Box display="flex" alignItems="baseline" gap="0.5rem" flexDirection={isFiveHundredPixelWide ? "column" : "row"} >
            <Typography fontWeight="bold" fontFamily='Open Sans' sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>Visibility:</Typography>
            <Typography fontFamily='Open Sans'  sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>{visibility / 1000}km</Typography>
          </Box>
        </Box>
        <Divider color="gray" orientation="vertical" flexItem/>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="0.5rem" margin="0 1rem">
          <NearMeOutlinedIcon fontSize={isSmallScreen ? "small" : "large"}/>
          <Typography sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}} fontFamily='Open Sans' fontWeight="500">{windSpeed}m/s {windDegree} Degree</Typography>
        </Box>
        <Divider color="gray" orientation="vertical" flexItem/>
        <Box display="flex" flexDirection="column" justifyContent="center" gap="0.25rem" marginLeft="1rem" >
          <Box display="flex" alignItems="baseline" gap="0.5em"  flexDirection={isFiveHundredPixelWide ? "column" : "row"} >
            <Typography fontWeight="bold" fontFamily='Open Sans'  sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>Sunrise:</Typography>
            <Typography fontFamily='Open Sans'  sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>{formattedSunrise}</Typography>
          </Box>
          <Box display="flex" alignItems="baseline" gap="0.5rem" flexDirection={isFiveHundredPixelWide ? "column" : "row"} >
            <Typography fontWeight="bold" fontFamily='Open Sans'  sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>Sunset:</Typography>
            <Typography fontFamily='Open Sans'  sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>{formattedSunset}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
