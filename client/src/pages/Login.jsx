import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
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
          transform: "scale(1.75)",
          width: '50%',
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <SignIn signUpUrl="/register" />
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
    </div >
  );
};

export default Login;
