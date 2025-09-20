import { SignIn } from "@clerk/clerk-react";

const Login = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <SignIn />
  </div>
);

export default Login;
