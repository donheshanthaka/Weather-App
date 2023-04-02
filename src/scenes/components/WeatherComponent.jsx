import { Box, Typography, Divider, IconButton, useMediaQuery } from "@mui/material"
import React from "react"
import { BsCloud } from "react-icons/bs"
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import cloudImage from '../../assets/weather_card_cloud.png'

export default function WeatherComponent() {
  const isSelected = false;

  const isSmallScreen = useMediaQuery("(max-width:725px)")

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
      sx={{
            // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-in-out',
            '&:hover': 
            {cursor: 'pointer',
            // boxShadow: `0px 0px 25px 0px rgba(0, 0, 0, 0.3)`,
            transform: "scale(1.02)",
            }
          
          }}
    >
      {/* Top Box */}
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
          backgroundSize: 'contain',
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
        {isSelected && (
        <Box position="absolute"  left="-4%" top="2%">
          <IconButton>
            <ArrowBackIcon sx={{color: "white"}}/>
          </IconButton>
        </Box>

        )}
        <Box 
        // backgroundColor="lightYellow"
        textAlign="center" 
        marginLeft={isSmallScreen ? "0rem" : "2rem"}
        >
          <Typography fontSize="1.8rem" fontWeight="700" fontFamily='Open Sans' sx={{fontSize: "clamp(1rem, calc(4vw + 0.25rem), 1.8rem)"}}>
            Colombo, LK
          </Typography>
          <Typography fontFamily='Open Sans' sx={{fontSize: "clamp(0.8rem, calc(2vw + 0.25rem), 1rem)"}}>9.19am, Feb 8</Typography>
          <Box
            display="flex"
            // backgroundColor="red"
            gap="1rem"
            alignItems="center"
            justifyContent="center"
            marginTop="1.5rem"
          >
            <BsCloud size={40} />
            <Typography fontFamily='Open Sans' fontWeight="500" fontSize="1.2rem" sx={{fontSize: "clamp(0.8rem, calc(2vw + 0.25rem), 1.2rem)"}}>Few Clouds</Typography>
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
              27&deg;
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
              Temp Min: 25&deg;
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
              Temp Max: 25&deg;
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
          <IconButton >
            <CloseIcon sx={{color: "white"}}/>
          </IconButton>
        </Box>
      </Box>



      {/* Bottom Box */}
      <Box
        backgroundColor="#383b47"
        width="100%"
        display="flex"
        justifyContent="space-evenly"
        padding="2rem"
        borderRadius="0 0 0.75rem 0.75rem"
      >
        <Box display="flex" flexDirection="column" justifyContent="center" gap="0.25rem" marginRight="1rem">
          <Box display="flex" alignItems="baseline" gap="0.5em">
            <Typography fontWeight="bold" fontFamily='Open Sans' sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>Pressure:</Typography>
            <Typography fontFamily='Open Sans' sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>1018hPa</Typography>
          </Box>
          <Box display="flex" alignItems="baseline" gap="0.5rem">
            <Typography fontWeight="bold" fontFamily='Open Sans' sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>Humidity:</Typography>
            <Typography fontFamily='Open Sans'  sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>78%</Typography>
          </Box>
          <Box display="flex" alignItems="baseline" gap="0.5rem">
            <Typography fontWeight="bold" fontFamily='Open Sans' sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>Visibility:</Typography>
            <Typography fontFamily='Open Sans'  sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>8.0km</Typography>
          </Box>
        </Box>
        <Divider color="gray" orientation="vertical" flexItem/>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="0.5rem" margin="0 1rem">
          <NearMeOutlinedIcon fontSize={isSmallScreen ? "small" : "large"}/>
          <Typography sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}} fontFamily='Open Sans' fontWeight="500">4.0m/s 120 Degree</Typography>
        </Box>
        <Divider color="gray" orientation="vertical" flexItem/>
        <Box display="flex" flexDirection="column" justifyContent="center" gap="0.25rem" marginLeft="1rem">
        <Box display="flex" alignItems="baseline" gap="0.5em" >
            <Typography fontWeight="bold" fontFamily='Open Sans'  sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>Sunrise:</Typography>
            <Typography fontFamily='Open Sans'  sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>6:05am</Typography>
          </Box>
          <Box display="flex" alignItems="baseline" gap="0.5rem">
            <Typography fontWeight="bold" fontFamily='Open Sans'  sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>Sunset:</Typography>
            <Typography fontFamily='Open Sans'  sx={{fontSize: "clamp(0.8rem, calc(1vw + 0.25rem), 1rem)"}}>6:05pm</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
