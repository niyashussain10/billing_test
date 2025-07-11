import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Optional: Style it separately

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Billing App</h2>

      <div className="sidebar-section">
        <h4>Product</h4>
        <ul>
          <li><Link to="/product/add">Add Product</Link></li>
          <li><Link to="/product/edit">Edit Product</Link></li>
          <li><Link to="/product/view">View Products</Link></li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h4>Franchise</h4>
        <ul>
          <li><Link to="/franchise/add">Add Franchise</Link></li>
          <li><Link to="/franchise/edit">Edit Franchise</Link></li>
          <li><Link to="/franchise/view">View Franchises</Link></li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h4>Invoice</h4>
        <ul>
          <li><Link to="/invoice/history">Billing History.</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
