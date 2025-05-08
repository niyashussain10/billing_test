import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import AddProduct from "./components/Product/AddProduct";
import ViewProducts from "./components/Product/ViewProducts";
import EditProduct from "./components/Product/EditProduct";
import AddFranchise from "./components/Franchise/AddFranchise";
import ViewFranchises from "./components/Franchise/ViewFranchises";
import BillingHistory from "./components/Invoice/BillingHistory";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "20px", flex: 1 }}>
          <Routes>
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/product/view" element={<ViewProducts />} />
            <Route path="/product/edit" element={<EditProduct />} /> {/* Fixed */}
            <Route path="/franchise/add" element={<AddFranchise />} />
            <Route path="/franchise/view" element={<ViewFranchises />} />
            <Route path="/invoice/history" element={<BillingHistory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
