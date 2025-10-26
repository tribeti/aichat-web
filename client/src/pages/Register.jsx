import { SignUp } from "@clerk/clerk-react";

const Register = () => {
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
          transform: "scale(1.2)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
          borderRadius: "24px",
          boxShadow: "0 15px 50px rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(12px)",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <SignUp
          appearance={{
            elements: {
              card: {
                boxShadow: "none",
                backgroundColor: "transparent",
                width: "420px",
              },
            },
          }}
          signInUrl="/login"
        />
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

export default Register;
