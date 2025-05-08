import React, { useEffect, useState } from "react";
import "./ViewFranchises.css";

const ViewFranchises = () => {
  const [franchises, setFranchises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("franchises") || "[]");
    setFranchises(data);
  }, []);

  const filteredFranchises = franchises.filter((f) =>
    `${f.name} ${f.franchiseId}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="franchise-container">
      <h2>Franchise List</h2>

      <input
        type="text"
        className="search-input"
        placeholder="Search by name or ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="franchise-grid">
        {filteredFranchises.length > 0 ? (
          filteredFranchises.map((f, index) => (
            <div key={index} className="franchise-card">
              <h3>{f.name}</h3>
              <p><strong>ID:</strong> {f.franchiseId}</p>
              <p><strong>Address:</strong> {f.address || f.location}</p>
              <p><strong>Contact:</strong> {f.contact}</p>
            </div>
          ))
        ) : (
          <p>No franchises found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewFranchises;
