import React, { useContext, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { Box, Container } from "@mui/material";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";

import ExploreIcon from '@mui/icons-material/Explore';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentIcon from "@mui/icons-material/Payment";

import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { AuthContext } from "../context/auth-context";
import { signOut } from "./utils/signOut";
const pages = [
  { name: "Explore", path: "/explore", icon: <ExploreIcon/>, id: 0 },

  {
    name: "Trips",
    path: "/trips",
    icon: <FlightTakeoffIcon/>,
    id: 1,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: <ReceiptIcon/>,
    id: 2,
  },
  {
    name: "Account",
    path: "/account",
    icon: <AccountBoxIcon/>,
    id: 3,
  },
  {
    name: "Saved Places",
    path: "/saved_places",
    icon: <FavoriteBorderIcon/>,
    id: 4,
  },
  {
    name: "Payment",
    path: "/payment",
    icon: <PaymentIcon/>,
    id: 5,
  },

  {
    name: "Help",
    path: "/help",
    icon: <HelpCenterIcon/>,
    id: 6,
  },
];
const dFlex = {
  display: "flex",
  flexDirection: "row",
};
const flexBetweenCenter = {
  display: "flex",
  justifyContent: { xs: "center", md: "space-between" },
  alignItems: "center",
};
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "start",
}));

const drawerWidth = 370;
export default function Layout() {
  const [input, setInput] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const logOutHandler = () => {
    authCtx.logout();
    signOut().then((res) => {
      console.log(res);
      navigate("/home");
    });
    setOpenDrawer(false);
  };
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    setOpenDrawer(false);
  };
  const inputChangeHandler = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };
  const removeInputHandler = () => {
    setInput("");
  };
  const drawerOpenHandler = () => {
    setOpenDrawer(true);
  };

  const drawerCloseHandler = () => {
    setOpenDrawer(false);
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
              onRemoveInput={removeInputHandler}
              onDrawerOpen={drawerOpenHandler}
            ></HeaderLeft>
            <HeaderRight></HeaderRight>
          </Box>
        </Container>
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            //很关键，这里的"& .MuiDrawer-paper"不能写错，这个是决定弹出来的sidebar的
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        onClose={drawerCloseHandler}
        open={openDrawer}
      >
        <DrawerHeader>
          <IconButton onClick={drawerCloseHandler}>
            <CancelPresentationIcon></CancelPresentationIcon>
          </IconButton>
        </DrawerHeader>

        <List>
          {pages.map((page, index) => {
            return (
              <div key={index}>
                <ListItemButton
                  key={index}
                  component={Link}
                  to={page.path}
                  onClick={() => handleListItemClick(page.id)}
                  selected={selectedIndex === page.id}
                >
                  <ListItemIcon key={`icon${index}`}>{page.icon}</ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                    primary={page.name}
                    key={`text${index}`}
                  ></ListItemText>
                </ListItemButton>

                <Divider key={`key${index}`}></Divider>
              </div>
            );
          })}
          <ListItemButton onClick={logOutHandler}>
            <ListItemIcon>
              <LogoutIcon></LogoutIcon>
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
              primary="Sign Out"
            ></ListItemText>
          </ListItemButton>

          <Divider></Divider>
        </List>
      </Drawer>
    </>
  );
}
