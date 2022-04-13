import { Button, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar: React.VFC = () => {
  const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="app_bar">
        <Toolbar>
          <Link href="/" passHref>
            <Typography sx={{ flexGrow: 1 }} variant="h6" component="div">
              Derick Todo
            </Typography>
          </Link>
          <Stack>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ textTransform: "none" }}
              onClick={() => router.push("/auth")}
            >
              Login
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};
