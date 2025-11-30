"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import bgImage from "../../../public/images/background.jpeg";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:5000/enrollmentsystem/slsu/data",
        { method: "GET" }
      );
      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      setData(result.data);
    };

    fetchData();
  }, []);

  const handleEdit = (student) => {
    alert(`Edit student ID: ${student.student_id}`);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // this centers vertically
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

      {/* Table Container */}
      <div
        style={{
          maxHeight: "80vh", // prevent table from exceeding screen
          overflowY: "auto",
          border: "2px solid black",
          borderRadius: "5px",
          width: "90%",
          maxWidth: "1000px",
          backgroundColor: "rgba(255,255,255,0.85)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Student ID</th>
              <th style={thStyle}>Course</th>
              <th style={thStyle}>Date Enrolled</th>
              <th style={thStyle}>Year Level</th>
              <th style={thStyle}>Enrolled</th>
              <th style={thStyle}>Document ID</th>
              <th style={thStyle}>Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>{item.id}</td>
                <td style={tdStyle}>{item.student_id}</td>
                <td style={tdStyle}>{item.course}</td>
                <td style={tdStyle}>
                  {new Date(item.date_enrolled).toLocaleDateString()}
                </td>
                <td style={tdStyle}>{item.year_level}</td>
                <td style={tdStyle}>{item.enrolled}</td>
                <td style={tdStyle}>{item.document_id}</td>
                <td style={tdStyle}>
                  <button
                    style={editButtonStyle}
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  border: "1px solid black",
  padding: "6px",
  background: "#e0e0e0",
  fontWeight: "bold",
  color: "black",
  fontSize: "14px",
  textAlign: "center",
};

const tdStyle = {
  border: "1px solid black",
  padding: "6px",
  color: "black",
  fontSize: "13px",
  textAlign: "center",
};

const editButtonStyle = {
  padding: "3px 6px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "13px",
};
