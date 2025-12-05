"use client";
import { useState } from "react";
import Image from "next/image";
import bgImage from "../../public/images/background.jpeg";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [signupValues, setSignupValues] = useState({
    admin_id: "",
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    address: "",
    contact: "",
    course: "",
    username: "",
    password: ""
  });

  const courseOptions = [
    "BS Accountancy",
    "BS Business Administration Financial Management",
    "BS Business Administration Marketing Management",
    "BS Business Administration Human Resource Management",
    "Bachelor of Public Administration",
    "BS Hospitality Management",
    "BS Information Technology",
    "BS Agriculture Animal Science",
    "BS Agriculture Crop Science",
    "BS Agriculture Organic Agriculture",
    "BS Environmental Science",
    "BS Forestry",
    "BS Civil Engineering",
    "BS Computer Engineering",
    "BS Electrical Engineering",
    "BS Electronics Engineering",
    "BS Industrial Engineering",
    "BS Mechanical Engineering",
    "BS Nursing",
    "BS Radiologic Technology",
    "BS Midwifery",
    "BA Communication",
    "BA History",
    "BA Psychology",
    "BS Biology",
    "BS Mathematics"
  ];

  const genderOptions = ["Male", "Female", "Other"];

  const handleInputChange = (e) => {
    setSignupValues({ ...signupValues, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:5000/enrollment/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupValues)
      });
      const result = await response.json();

      if (!result.success) {
        alert("Failed to sign up: " + result.message);
        return;
      }

      alert("Sign up successful!");
      router.replace("/login"); // redirect to login page

    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during sign up.");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter', 'Fira Code', 'JetBrains Mono', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
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

      {/* Sign-Up Form */}
      <div style={modalBox}>
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Admin Sign-Up</h2>

        <label style={labelStyle}>Admin ID</label>
        <input
          style={inputStyle}
          name="admin_id"
          value={signupValues.admin_id}
          onChange={handleInputChange}
        />

        <label style={labelStyle}>First Name</label>
        <input
          style={inputStyle}
          name="first_name"
          value={signupValues.first_name}
          onChange={handleInputChange}
        />

        <label style={labelStyle}>Last Name</label>
        <input
          style={inputStyle}
          name="last_name"
          value={signupValues.last_name}
          onChange={handleInputChange}
        />

        <label style={labelStyle}>Gender</label>
        <select
          style={inputStyle}
          name="gender"
          value={signupValues.gender}
          onChange={handleInputChange}
        >
          <option value="">Select Gender</option>
          {genderOptions.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <label style={labelStyle}>Date of Birth</label>
        <input
          style={inputStyle}
          type="date"
          name="dob"
          value={signupValues.dob}
          onChange={handleInputChange}
        />

        <label style={labelStyle}>Address</label>
        <input
          style={inputStyle}
          name="address"
          value={signupValues.address}
          onChange={handleInputChange}
        />

        <label style={labelStyle}>Contact</label>
        <input
          style={inputStyle}
          name="contact"
          value={signupValues.contact}
          onChange={handleInputChange}
        />

        <label style={labelStyle}>Course</label>
        <select
          style={inputStyle}
          name="course"
          value={signupValues.course}
          onChange={handleInputChange}
        >
          <option value="">Select Course</option>
          {courseOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label style={labelStyle}>Username</label>
        <input
          style={inputStyle}
          name="username"
          value={signupValues.username}
          onChange={handleInputChange}
        />

        <label style={labelStyle}>Password</label>
        <input
          style={inputStyle}
          type="password"
          name="password"
          value={signupValues.password}
          onChange={handleInputChange}
        />

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <button style={saveBtn} onClick={handleSignup}>Sign Up</button>
          <button style={cancelBtn} onClick={() => router.replace("/login")}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Styles ---------------- */
const modalBox = {
  width: "400px",
  background: "white",
  padding: "25px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  color: "black",
  zIndex: 10,
};

const labelStyle = { fontSize: "14px", fontWeight: "bold" };
const inputStyle = { padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", color: "black" };
const saveBtn = { padding: "8px 16px", backgroundColor: "green", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };
const cancelBtn = { padding: "8px 16px", backgroundColor: "gray", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };
