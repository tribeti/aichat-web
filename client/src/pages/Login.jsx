import { SignIn } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";

const Login = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <SignIn />
    <div style={{ marginTop: "20px" }}>
      <NavLink to="/admin-login">
        <button style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Admin Login
        </button>
      </NavLink>
    </div>
  </div>
);

export default Login;
