import React from "react"
import { Box, Typography } from "@mui/material"
import weatherAppLogo from "../../assets/weather_app_logo.png"

export default function Header() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="20vh"
    >
      <Box
        sx={{
          backgroundImage: `url(${weatherAppLogo})`,
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          width: "55px",
          height: "50px",
          zIndex: 1,
        }}
      />
      <Typography
        marginLeft="1.1rem"
        fontSize="2rem"
        fontWeight="600"
        fontFamily="Open Sans"
        sx={{ fontSize: "clamp(1.2rem, calc(8vw + 0.25rem), 2rem)" }}
      >
        Weather App
      </Typography>
    </Box>
  )
}
