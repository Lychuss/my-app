"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bgImage from "../../public/images/background.jpeg";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    let valid = true;

    if (!username.trim()) {
      setUsernameError("Username is required");
      valid = false;
    } else setUsernameError("");

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else setPasswordError("");

    if (!valid) return;

    const response = await fetch(`http://localhost:5000/enrollment/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(true);
      setMessage(data.message);
      return;
    }

    router.push("/home/dashboard");
  };

  return (
    <div style={pageContainer}>
      <Image
        src={bgImage}
        alt="Background"
        fill
        style={{
          objectFit: "cover",
          filter: "brightness(50%)",
          zIndex: -1,
        }}
      />

      <div style={loginCard}>
        <h2 style={titleStyle}>Login</h2>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>{message}</p>
        )}

        <form onSubmit={(e) => e.preventDefault()} style={{ width: "100%" }}>
          <div style={inputGroup}>
            <input
              type="text"
              placeholder="Username"
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <small style={errorStyle}>{usernameError}</small>
          </div>

          <div style={inputGroup}>
            <input
              type="password"
              placeholder="Password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small style={errorStyle}>{passwordError}</small>
          </div>

          <button type="button" onClick={handleLogin} style={loginBtn}>
            Login
          </button>
        </form>

        <p style={{ marginTop: "10px", color: "black" }}>
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#0066cc" }}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

const pageContainer = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Inter', 'Fira Code', 'JetBrains Mono', sans-serif",
  overflow: "hidden",
};

const loginCard = {
  width: "350px",
  padding: "25px",
  backgroundColor: "rgba(255,255,255,0.85)",
  borderRadius: "10px",
  border: "2px solid black",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
};

const titleStyle = {
  marginBottom: "20px",
  fontSize: "24px",
  color: "black",
};

const inputGroup = {
  width: "100%",
  marginBottom: "15px",
  textAlign: "left",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "14px",
  border: "1px solid black",
  borderRadius: "5px",
  color: "black",
};

const errorStyle = {
  color: "red",
  fontSize: "12px",
  marginTop: "5px",
  display: "block",
};

const loginBtn = {
  width: "100%",
  padding: "10px",
  fontSize: "15px",
  backgroundColor: "#4CAF50",
  border: "none",
  borderRadius: "5px",
  color: "white",
  cursor: "pointer",
};
