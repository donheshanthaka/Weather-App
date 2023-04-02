import React from "react"
import { Box, Typography } from "@mui/material"
import weatherAppLogo from "../../assets/weather_app_logo.png"

export default function Header() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="5.8rem"
      marginBottom="3.4rem"
    >
      <Box
        sx={{
          backgroundImage: `url(${weatherAppLogo})`,
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          width: "50px",
          height: "50px",
          zIndex: 1,
        }}
      />
      <Typography marginLeft="1.1rem" fontSize="2rem" fontWeight="500">
        Weather App
      </Typography>
    </Box>
  )
}
