import React from "react"
import { Box, useMediaQuery, TextField, Button } from "@mui/material"

export default function SearchBar() {
  const isMobileScreen = useMediaQuery("(max-width:500px)")

  return (
    <Box
      className="searchBox"
      width="80%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      // marginTop="3.4rem"
      marginBottom={isMobileScreen ? "2rem" : "3.4rem"}
    >
      <TextField
        size="small"
        label="Enter a city"
        inputProps={{ style: { height: "2rem", color: "white" } }}
        InputLabelProps={{ style: { color: "gray", marginTop: "5px" } }}
        sx={{
          width: "25rem",
          backgroundColor: "#1f2128",
          borderRadius: "8px 0 0 8px",
        }}
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
          "&:hover": {
            backgroundColor: "#5443c0",
          },
          borderRadius: "0 8px 8px 0",
        }}
      >
        Add City
      </Button>
    </Box>
  )
}
