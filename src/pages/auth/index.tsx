import CssBaseline from "@mui/material/CssBaseline";
import { Layout } from "app/components/layout";
import AuthForm from "modules/auth/components/auth-form";

export default function SignIn() {
  return (
    <Layout>
      <div className="container">
        <CssBaseline />
        <AuthForm />
      </div>
    </Layout>
  );
}
