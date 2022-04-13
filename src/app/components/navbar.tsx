import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export const Navbar: React.VFC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="app_bar">
        <Toolbar sx={{ margin: "auto" }}>
          <Link href="/" passHref>
            <Typography sx={{ flexGrow: 1 }} variant="h6" component="div">
              Derick Todo
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};
