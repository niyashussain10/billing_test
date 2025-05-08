import React, { useState, useEffect } from "react";
import './AddFranchise.css';

const AddFranchise = () => {
  const [franchise, setFranchise] = useState({
    name: "",
    franchiseId: "",
    address: "",
    contact: ""
  });

  const [franchises, setFranchises] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/").then(data=>data.json()).then(data=>setFranchise(data))
    const stored = JSON.parse(localStorage.getItem("franchises")) || [];
    setFranchises(stored);
  }, []);

  const handleChange = (e) => {
    setFranchise({ ...franchise, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exists = franchises.some(f => f.franchiseId === franchise.franchiseId);

    if (exists) {
      alert("Franchise ID already exists!");
      return;
    }

    const updated = [...franchises, franchise];
    localStorage.setItem("franchises", JSON.stringify(updated));
    setFranchises(updated);
    alert("Franchise added!");

    setFranchise({
      name: "",
      franchiseId: "",
      address: "",
      contact: ""
    });
  };

  return (
    <div className="franchise-form">
      <h2>Add Franchise</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={franchise.name}
          onChange={handleChange}
          placeholder="Franchise Name"
          required
        />
        <input
          name="franchiseId"
          value={franchise.franchiseId}
          onChange={handleChange}
          placeholder="Franchise ID"
          required
        />
        <input
          name="address"
          value={franchise.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          name="contact"
          value={franchise.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          required
          pattern="[0-9]{10}"
          title="Enter 10-digit contact number"
        />
        <button type="submit">Add</button>
      </form>

      <h3>Existing Franchises</h3>
      <ul className="franchise-list">
        {franchises.map((f, index) => (
          <li key={index}>
            <strong>{f.name}</strong> (ID: {f.franchiseId})<br />
            Address: {f.address}<br />
            Contact: {f.contact}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddFranchise;
