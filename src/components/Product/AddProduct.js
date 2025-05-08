import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    sku: "",
    mrp: "",
    productId: "",
    mainImage: null,
    subsidiaryImages: [],
    productionDescription: "",
    shortDescription: "",
    material: "",
    color: "",
    length: "",
    width: "",
    height: "",
  });

  const [mainImageFile, setMainImageFile] = useState(null);
  const [subImageFiles, setSubImageFiles] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    setMainImageFile(file);
  };

  const handleSubImagesChange = (e) => {
    setSubImageFiles(Array.from(e.target.files));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const mainImageBase64 = mainImageFile ? await convertToBase64(mainImageFile) : null;
      const subImagesBase64 = await Promise.all(
        subImageFiles.map((file) => convertToBase64(file))
      );

      const newProduct = {
        ...product,
        mainImage: mainImageBase64,
        subsidiaryImages: subImagesBase64,
      };

      const existing = JSON.parse(localStorage.getItem("products") || "[]");
      existing.push(newProduct);
      localStorage.setItem("products", JSON.stringify(existing));
      alert("Product added!");

      // Reset form
      setProduct({
        name: "",
        price: "",
        sku: "",
        mrp: "",
        productId: "",
        mainImage: null,
        subsidiaryImages: [],
        productionDescription: "",
        shortDescription: "",
        material: "",
        color: "",
        length: "",
        width: "",
        height: "",
      });
      setMainImageFile(null);
      setSubImageFiles([]);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <input name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
        <input name="productId" value={product.productId} onChange={handleChange} placeholder="Product ID" required />
        <input name="sku" value={product.sku} onChange={handleChange} placeholder="SKU" required />
        <input name="price" value={product.price} onChange={handleChange} placeholder="Selling Price" type="number" required />
        <input name="mrp" value={product.mrp} onChange={handleChange} placeholder="MRP" type="number" required />
        <textarea name="productionDescription" value={product.productionDescription} onChange={handleChange} placeholder="Production Description" required />
        <textarea name="shortDescription" value={product.shortDescription} onChange={handleChange} placeholder="Short Description" required />
        <input type="file" onChange={handleMainImageChange} accept="image/*" required />
        <input type="file" multiple onChange={handleSubImagesChange} accept="image/*" />
        <input name="material" value={product.material} onChange={handleChange} placeholder="Material" />
        <input name="color" value={product.color} onChange={handleChange} placeholder="Color" />
        <input name="length" value={product.length} onChange={handleChange} placeholder="Length (cm)" type="number" />
        <input name="width" value={product.width} onChange={handleChange} placeholder="Width (cm)" type="number" />
        <input name="height" value={product.height} onChange={handleChange} placeholder="Height (cm)" type="number" />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
