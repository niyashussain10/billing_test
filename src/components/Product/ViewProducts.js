import React, { useState, useEffect } from "react";
import './ViewProduct.css';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    console.log("Fetched Products from LocalStorage:", storedProducts);
    setProducts(storedProducts);
  }, []);

  const handleViewMore = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImageSrc = (image) => image || null;

  return (
    <div className="view-product-container">
      <h2>Product List</h2>
      <input
        type="text"
        placeholder="Search product by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-info">
                <h3>{product.name}</h3>
                <p><strong>Product ID:</strong> {product.productId}</p>
                <p><strong>MRP:</strong> ₹{product.mrp}</p>
                <div className="product-actions">
                  <button onClick={() => handleViewMore(product)}>View More</button>
                </div>
              </div>
              <div className="product-image">
                {getImageSrc(product.mainImage) && (
                  <img
                    src={getImageSrc(product.mainImage)}
                    alt={product.name}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseModal}>&times;</span>
            <h3>{selectedProduct.name}</h3>
            {getImageSrc(selectedProduct.mainImage) && (
              <img
                src={getImageSrc(selectedProduct.mainImage)}
                alt={selectedProduct.name}
                width="200"
              />
            )}
            <p><strong>Short Description:</strong> {selectedProduct.shortDescription}</p>
            <p><strong>MRP:</strong> ₹{selectedProduct.mrp}</p>
            <p><strong>Selling Price:</strong> ₹{selectedProduct.price}</p>
            <p><strong>Material:</strong> {selectedProduct.material}</p>
            <p><strong>Color:</strong> {selectedProduct.color}</p>
            <p><strong>Dimensions:</strong> {selectedProduct.length} × {selectedProduct.width} × {selectedProduct.height}</p>

            <div className="sub-images">
              {selectedProduct.subsidiaryImages &&
                selectedProduct.subsidiaryImages.map((img, idx) =>
                  img ? (
                    <img
                      key={idx}
                      src={img}
                      alt={`Sub image ${idx}`}
                      width="50"
                    />
                  ) : null
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
