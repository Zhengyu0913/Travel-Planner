import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Link } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";

const displayOnDesktop = { display: { xs: "none", md: "block" } };

export default function HeaderLeft(props) {
  const inputChangeHandler = (e) => {
    props.onInputChange(e);
  };
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton onClick={props.onDrawerOpen}>
        <MenuIcon></MenuIcon>
      </IconButton>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          textDecoration: "none",
          underline: "none",
          boxShadow: "none",
        }}
        component={Link}
        to="/"
      >
        <DiamondIcon color="primary"></DiamondIcon>

        <Typography variant="h5" color="primary" fontWeight="bold">
          Travel Planner
        </Typography>
      </Box>

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: { xs: 200, md: 400 },
          border: "1px solid #ccc",
          borderRadius: 20,
        }}
      >
        <Box component={Link} to={`/home/${props.value}`}>
          <IconButton sx={{ p: "10px" }}>
            <SearchIcon />
          </IconButton>
        </Box>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search place or activities"
          onChange={inputChangeHandler}
        />
      </Paper>
    </Stack>
  );
}
