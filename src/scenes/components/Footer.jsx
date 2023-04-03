import React from "react"
import { Box, Typography } from "@mui/material"

export default function Footer() {
  return (
    <Box
      display="flex"
      backgroundColor="#30333d"
      width="100%"
      height="10vh"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Typography
        color="#a4a4a7"
        fontWeight="600"
        fontFamily="Open Sans"
        sx={{ letterSpacing: "0.12rem" }}
      >
        2021 Fidenz Technologies
      </Typography>
    </Box>
  )
}
