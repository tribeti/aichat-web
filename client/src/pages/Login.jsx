import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(-45deg, #ff6b6b, #feca57, #48dbfb, #1dd1a1)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 10s ease infinite",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",

          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          transform: "scale(1.75)",
        }}
      >
        <SignIn />
      </div>
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
