import { SignUp } from "@clerk/clerk-react";

const Register = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <SignUp />
  </div>
);

export default Register;
