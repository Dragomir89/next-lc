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

const handleClick01 = () => {
  const reqBody = { test: "test" };
  fetch("/api/test02", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export default function DrawerAppBar(props) {
  return (
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
              <Link href={item.path}>
                <Button key={item} sx={{ color: "#fff" }}>
                  {item.title}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
