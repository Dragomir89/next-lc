import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

const navItems = [
  { title: "Начало", path: "/" },
  {
    title: "Добави Опции",
    path: "/add-options",
  },
  {
    title: "Добави Оферта",
    path: "/add-offer",
  },
  {
    title: "Оферти",
    path: "/show-offers/1",
  },
];

function MainHeader() {
  return (
    <header>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              LC-BROKERS
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Link key={item.title} href={item.path}>
                  <Button sx={{ color: "#fff" }}>{item.title}</Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
}

export default MainHeader;
