import { Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";
export default function HeaderRight() {
  const authCtx = useContext(AuthContext);
  const clickHandler = () => {
    console.log("clicked!");
  };
  return (
    <div>
      <Button
        href="/explore"
        disableRipple
        variant="text"
        sx={{
          "&:hover": {
            backgroundColor: "#D5D5D5",
            boxShadow: "none",
          },
        }}
        onClick={clickHandler}
      >
        <Typography
          color="#010101"
          component={"div"}
          sx={{ textTransform: "capitalize", fontWeight: "bold" }}
        >
          Explore
        </Typography>
      </Button>
      <Button
        href="/trips"
        disableRipple
        variant="text"
        sx={{
          "&:hover": {
            backgroundColor: "#D5D5D5",
            boxShadow: "none",
          },
        }}
        onClick={clickHandler}
      >
        <Typography
          color="#010101"
          component={"div"}
          sx={{ textTransform: "capitalize", fontWeight: "bold" }}
        >
          Trips
        </Typography>
      </Button>
      <Button
        href="/signup"
        disableRipple
        variant="text"
        sx={{
          "&:hover": {
            backgroundColor: "#D5D5D5",
            boxShadow: "none",
          },
        }}
        onClick={clickHandler}
      >
        <Typography
          color="#010101"
          component={"div"}
          sx={{ textTransform: "capitalize", fontWeight: "bold" }}
        >
          Sign up
        </Typography>
      </Button>
      {!authCtx.isLoggedIn && (
        <Button
          href="/signin"
          disableRipple
          variant="text"
          sx={{
            "&:hover": {
              backgroundColor: "#D5D5D5",
              boxShadow: "none",
            },
          }}
          onClick={clickHandler}
        >
          <Typography
            color="#010101"
            component={"div"}
            sx={{ textTransform: "capitalize", fontWeight: "bold" }}
          >
            Log in
          </Typography>
        </Button>
      )}
    </div>
  );
}
