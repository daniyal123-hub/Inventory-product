import React, { useState } from 'react';
import { Trash2, Tag, Box, AlertCircle, CheckCircle, PackageX } from 'lucide-react';

/**
 * ProductCard Component
 * Displays individual product card with interactive Delete action
 */
const ProductCard = ({ product, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const { id, name, category, price, stock, description, imageUrl, sku } = product;

  // Determine stock status styling
  const getStockBadge = (stockCount) => {
    const count = Number(stockCount);
    if (count <= 0) {
      return (
        <span className="badge badge-out-of-stock">
          <PackageX size={13} /> Out of Stock
        </span>
      );
    }
    if (count <= 5) {
      return (
        <span className="badge badge-low-stock">
          <AlertCircle size={13} /> Low Stock ({count} left)
        </span>
      );
    }
    return (
      <span className="badge badge-in-stock">
        <CheckCircle size={13} /> {count} in Stock
      </span>
    );
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
    // Smooth micro-animation before removal
    setTimeout(() => {
      onDelete(id);
    }, 200);
  };

  return (
    <article className={`product-card ${isDeleting ? 'deleting' : ''}`}>
      {/* Product Image Container */}
      <div className="card-image-wrapper">
        <img
          src={
            imageLoaded && imageUrl
              ? imageUrl
              : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80'
          }
          alt={name}
          className="card-image"
          onError={() => setImageLoaded(false)}
          loading="lazy"
        />
        <span className="card-category-tag">
          <Tag size={12} /> {category}
        </span>
      </div>

      {/* Product Content */}
      <div className="card-body">
        <div className="card-header">
          <h3 className="product-title" title={name}>
            {name}
          </h3>
          {sku && <span className="product-sku">SKU: {sku}</span>}
        </div>

        {description && (
          <p className="product-desc" title={description}>
            {description}
          </p>
        )}

        <div className="card-meta">
          <div className="price-tag">
            <span className="currency-symbol">$</span>
            <span className="price-amount">{Number(price).toFixed(2)}</span>
          </div>
          <div>{getStockBadge(stock)}</div>
        </div>

        {/* Card Actions */}
        <div className="card-footer">
          <button
            type="button"
            className="delete-btn"
            onClick={handleDeleteClick}
            title={`Delete ${name}`}
            aria-label={`Delete ${name}`}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
