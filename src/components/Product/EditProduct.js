import React, { useEffect, useState } from 'react';
import './EditProduct.css';

const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [editedProduct, setEditedProduct] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(stored);
  }, []);

  // Auto-fetch by ID or Name
  useEffect(() => {
    const trimmed = searchInput.trim().toLowerCase();

    if (trimmed === '') {
      setEditedProduct(null);
      setSelectedId('');
      return;
    }

    const found = products.find(
      (p) =>
        p.productId?.toLowerCase() === trimmed ||
        p.name?.toLowerCase() === trimmed
    );

    if (found) {
      setSelectedId(found.productId);
      setEditedProduct({ ...found });
    } else {
      setEditedProduct(null);
    }
  }, [searchInput, products]);

  const handleSelectChange = (e) => {
    const selected = products.find((p) => p.productId === e.target.value);
    setSelectedId(e.target.value);
    setEditedProduct({ ...selected });
    setSearchInput(e.target.value);
  };

  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const updatedList = products.map((p) =>
      p.productId === selectedId ? editedProduct : p
    );
    localStorage.setItem('products', JSON.stringify(updatedList));
    alert('Product updated');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const filtered = products.filter((p) => p.productId !== selectedId);
      localStorage.setItem('products', JSON.stringify(filtered));
      setProducts(filtered);
      setEditedProduct(null);
      setSelectedId('');
      setSearchInput('');
      alert('Product deleted');
    }
  };

  return (
    <div className="product-form">
      <h2>Edit Product</h2>

      <div className="search-section">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter Product ID or Name"
        />
      </div>

      <select value={selectedId} onChange={handleSelectChange}>
        <option value="">Select Product</option>
        {products.slice(-5).map((p) => (
          <option key={p.productId} value={p.productId}>
            {p.name}
          </option>
        ))}
      </select>

      {editedProduct && (
        <div className="form-container">
          <div className="row">
            <input
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
              placeholder="Product Name"
            />
            <input
              type="text"
              name="productId"
              value={editedProduct.productId}
              onChange={handleChange}
              placeholder="Product ID"
            />
          </div>

          <div className="row">
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleChange}
              placeholder="Selling Price"
            />
            <input
              type="number"
              name="mrp"
              value={editedProduct.mrp}
              onChange={handleChange}
              placeholder="MRP"
            />
          </div>

          <div className="row">
            <input
              type="text"
              name="material"
              value={editedProduct.material}
              onChange={handleChange}
              placeholder="Material"
            />
            <input
              type="text"
              name="color"
              value={editedProduct.color}
              onChange={handleChange}
              placeholder="Color"
            />
          </div>

          <div className="row">
            <input
              type="number"
              name="length"
              value={editedProduct.length}
              onChange={handleChange}
              placeholder="Length"
            />
            <input
              type="number"
              name="width"
              value={editedProduct.width}
              onChange={handleChange}
              placeholder="Width"
            />
            <input
              type="number"
              name="height"
              value={editedProduct.height}
              onChange={handleChange}
              placeholder="Height"
            />
          </div>

          <textarea
            name="productionDescription"
            value={editedProduct.productionDescription}
            onChange={handleChange}
            placeholder="Product Description"
          />

          <div className="edit-buttons">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
