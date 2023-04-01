import { Box, Typography, Divider } from "@mui/material"
import React from "react"
import { BsCloud } from "react-icons/bs"
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';

export default function WeatherComponent() {
  return (
    <Box
      backgroundColor="lightGreen"
      // width="85%"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* Top Box */}
      <Box
        backgroundColor="green"
        width="100%"
        display="flex"
        justifyContent="space-between"
        padding="2rem"
        borderRadius="0.75rem 0.75rem 0 0"
      >
        {/* top left */}
        <Box backgroundColor="lightYellow" textAlign="center" marginLeft="2rem">
          <Typography fontSize="2.5rem" fontWeight="700" fontFamily='Open Sans'>
            Colombo, LK
          </Typography>
          <Typography fontFamily='Open Sans'>9.19am, Feb 8</Typography>
          <Box
            display="flex"
            backgroundColor="red"
            gap="1rem"
            alignItems="center"
            justifyContent="center"
            marginTop="1.5rem"
          >
            <BsCloud size={50} />
            <Typography fontFamily='Open Sans'>Few Clouds</Typography>
          </Box>
        </Box>

        {/* top right */}
        <Box
          backgroundColor="lightGreen"
          display="flex"
          flexDirection="column"
          textAlign="center"
          marginRight="2rem"
        >
          <Box display="flex" backgroundColor="yellow">
            <Typography fontSize="5rem" fontWeight="700" lineHeight="1" fontFamily='Open Sans'>
              27&deg;
            </Typography>
            <Box alignSelf="flex-end">
              <Typography fontSize="4rem" fontWeight="500" lineHeight="1" fontFamily='Open Sans'>
                C
              </Typography>
            </Box>
          </Box>

          <Box
            backgroundColor="red"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            marginTop="1rem"
          >
            <Typography fontFamily='Open Sans'>Temp Min: 25C</Typography>
            <Typography fontFamily='Open Sans'>Temp Max: 25C</Typography>
          </Box>
        </Box>
      </Box>



      {/* Bottom Box */}
      <Box
        backgroundColor="lightpink"
        width="100%"
        display="flex"
        justifyContent="space-evenly"
        padding="2rem"
        borderRadius="0 0 0.75rem 0.75rem"
      >
        <Box display="flex" flexDirection="column" justifyContent="center" gap="0.25rem" marginRight="1rem">
          <Box display="flex" alignItems="baseline" gap="0.5em">
            <Typography fontWeight="bold" fontFamily='Open Sans'>Pressure:</Typography>
            <Typography fontFamily='Open Sans'>1018hPa</Typography>
          </Box>
          <Box display="flex" alignItems="baseline" gap="0.5rem">
            <Typography fontWeight="bold" fontFamily='Open Sans'>Humidity:</Typography>
            <Typography fontFamily='Open Sans'>78%</Typography>
          </Box>
          <Box display="flex" alignItems="baseline" gap="0.5rem">
            <Typography fontWeight="bold" fontFamily='Open Sans'>Visibility:</Typography>
            <Typography fontFamily='Open Sans'>8.0km</Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem/>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="0.5rem" margin="0 1rem">
          <NearMeOutlinedIcon fontSize="large"/>
          <Typography fontFamily='Open Sans'>4.0m/s 120 Degree</Typography>
        </Box>
        <Divider orientation="vertical" flexItem/>
        <Box display="flex" flexDirection="column" justifyContent="center" gap="0.25rem" marginLeft="1rem">
        <Box display="flex" alignItems="baseline" gap="0.5em" >
            <Typography fontWeight="bold" fontFamily='Open Sans'>Sunrise:</Typography>
            <Typography fontFamily='Open Sans'>6:05am</Typography>
          </Box>
          <Box display="flex" alignItems="baseline" gap="0.5rem">
            <Typography fontWeight="bold" fontFamily='Open Sans'>Sunset:</Typography>
            <Typography fontFamily='Open Sans'>6:05pm</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
