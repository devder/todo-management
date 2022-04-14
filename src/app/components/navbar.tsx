import { Button, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AuthContext } from "modules/auth/context/auth-context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import AccountMenu from "../../modules/auth/components/account-menu";

export const Navbar: React.VFC = () => {
  const router = useRouter();
  const { user, signOut } = useContext(AuthContext);

  const navigateToAuth = () => {
    router.push("/auth");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" id="app_bar">
        <Toolbar>
          <Link href="/" passHref>
            <Typography sx={{ flexGrow: 1 }} variant="h6" component="div">
              {`📝 Derick`}
            </Typography>
          </Link>
          <Stack>
            {user ? (
              <AccountMenu signOut={signOut} username={user.username} navigateToAuth={navigateToAuth} />
            ) : (
              <Button variant="outlined" color="inherit" sx={{ textTransform: "none" }} onClick={navigateToAuth}>
                Sign In
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};
