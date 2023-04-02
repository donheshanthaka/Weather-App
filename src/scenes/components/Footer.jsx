import React from "react"
import { Box, Typography } from "@mui/material"

export default function Footer() {
  return (
    <Box
      backgroundColor="#30333d"
      width="100%"
      textAlign="center"
      marginTop="5.5rem"
      padding="2.3rem 0"
    >
      <Typography
        color="#a4a4a7"
        fontWeight="500"
        sx={{ letterSpacing: "0.12rem" }}
      >
        2021 Fidenz Technologies
      </Typography>
    </Box>
  )
}
