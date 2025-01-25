import AnonymousMenu from "./AnonymousMenu.tsx";
import UserMenu from "./UserMenu.tsx";
import { useAppSelector } from "../../../src/app/hooks.ts";
import { selectUser } from "../../../src/features/users/userSlice.ts";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "40px"}}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            component={NavLink}
            to="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            ABC
          </Typography>
          <Box>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;
