import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Container } from "@mui/material";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const dFlex = {
  display: "flex",
  flexDirection: "row",
};
const flexBetweenCenter = {
  display: "flex",
  justifyContent: { xs: "center", md: "space-between" },
  alignItems: "center",
};
export default function Layout() {
  const [input, setInput] = useState("");

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      <Box
        sx={{
          ...dFlex,
          minHeight: 70,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Container maxWidth="2000px">
          <Box
            sx={{
              ...flexBetweenCenter,
              minHeight: 70,
              px: 8,
            }}
          >
            <HeaderLeft
              onInputChange={inputChangeHandler}
              value={input}
            ></HeaderLeft>
            <HeaderRight></HeaderRight>
          </Box>
        </Container>
      </Box>
    </>
  );
}
