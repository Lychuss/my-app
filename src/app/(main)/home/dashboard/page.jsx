"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import bgImage from "../../../public/images/background.jpeg";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editValues, setEditValues] = useState({
    id: "",
    student_id: "",
    course: "",
    year_level: "",
    enrolled: "",
    document_id: "",
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

  const yearLevelOptions = ["1", "2", "3", "4"];
  const enrolledOptions = ["Yes", "No", "Pending"];

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
    setEditValues(student); // load selected student's data
    setEditOpen(true);
  };

  const handleInputChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    console.log("Updated student:", editValues);

    try {
      const response = await fetch(
        `http://localhost:5000/enrollmentsystem/slsu/data/${editValues.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editValues),
        }
      );

      const result = await response.json();

      if (!result.success) {
        alert("Failed to update: " + result.message);
        return;
      }

      alert("Student updated successfully!");

      const tableResponse = await fetch("http://localhost:5000/enrollmentsystem/slsu/data");
      const tableResult = await tableResponse.json();
      if (tableResult.success) {
        setData(tableResult.data);
      }

      setEditOpen(false); // close modal

    } catch (error) {
      console.error("Error updating student:", error);
      alert("An error occurred while updating.");
    }
  };

      const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this student?")) return;

        try {
          const response = await fetch(`http://localhost:5000/enrollmentsystem/slsu/data/${id}`, {
            method: "DELETE",
          });
          const result = await response.json();

          if (!result.success) {
            alert("Failed to delete: " + result.message);
            return;
          }

          alert("Student deleted successfully!");
          
          setData(data.filter((item) => item.id !== id));
        } catch (error) {
          console.error("Error deleting student:", error);
          alert("An error occurred while deleting.");
        }
      };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
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

      {/* Edit Pop-up Modal */}
      {editOpen && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
              Edit Student
            </h2>

            <label style={labelStyle}>Student ID</label>
            <input
              style={inputStyle}
              name="student_id"
              value={editValues.student_id}
              readOnly      
            />

            <label style={labelStyle}>Course</label>
            <select
              style={inputStyle}
              name="course"
              value={editValues.course}
              onChange={handleInputChange}
            >
              {courseOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <label style={labelStyle}>Year Level</label>
            <select
              style={inputStyle}
              name="year_level"
              value={editValues.year_level}
              onChange={handleInputChange}
            >
              {yearLevelOptions.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <label style={labelStyle}>Enrolled</label>
            <select
              style={inputStyle}
              name="enrolled"
              value={editValues.enrolled}
              onChange={handleInputChange}
            >
              {enrolledOptions.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>

            <label style={labelStyle}>Document ID</label>
            <input
              style={inputStyle}
              name="document_id"
              value={editValues.document_id}
              readOnly
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button style={saveBtn} onClick={handleSave}>Save</button>
              <button style={cancelBtn} onClick={() => setEditOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div
        style={{
          maxHeight: "80vh",
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
              <th style={thStyle}>Delete</th> 
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{item.student_id}</td>
                <td style={tdStyle}>{item.course}</td>
                <td style={tdStyle}>{new Date(item.date_enrolled).toLocaleDateString()}</td>
                <td style={tdStyle}>{item.year_level}</td>
                <td style={tdStyle}>{item.enrolled}</td>
                <td style={tdStyle}>{item.document_id}</td>
                <td style={tdStyle}>
                  <button style={editButtonStyle} onClick={() => handleEdit(item)}>Edit</button>
                </td>
                <td style={tdStyle}>
                  <button style={deleteButtonStyle} onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Styles ---------------- */
const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
};

const modalBox = {
  width: "350px",
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  color: "black",
};

const labelStyle = { fontSize: "14px", fontWeight: "bold" };
const inputStyle = { padding: "6px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", color: "black" };
const saveBtn = { padding: "6px 12px", backgroundColor: "green", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };
const cancelBtn = { padding: "6px 12px", backgroundColor: "gray", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };
const thStyle = { border: "1px solid black", padding: "6px", background: "#e0e0e0", fontWeight: "bold", color: "black", fontSize: "14px", textAlign: "center" };
const tdStyle = { border: "1px solid black", padding: "6px", color: "black", fontSize: "13px", textAlign: "center" };
const editButtonStyle = { padding: "3px 6px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" };
const deleteButtonStyle = { padding: "3px 6px", backgroundColor: "#f44336", color: "white", border: "none",borderRadius: "4px", cursor: "pointer", fontSize: "13px"};
