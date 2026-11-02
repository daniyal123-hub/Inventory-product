import React from 'react';
import ProductCard from './ProductCard.js';
import { PackageOpen, SearchX, RotateCcw } from 'lucide-react';

/**
 * ProductList Component
 * Displays the grid list of products or relevant empty states
 */
const ProductList = ({ products, totalCatalogCount, searchTerm, onResetSearch, onDeleteProduct }) => {
  // Empty State 1: Search returned zero results
  if (products.length === 0 && searchTerm) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-circle">
          <SearchX size={36} />
        </div>
        <h3 className="empty-title">No products found</h3>
        <p className="empty-subtitle">
          No matches found for <mark className="search-highlight">"{searchTerm}"</mark>. Check for typos or try searching by category.
        </p>
        <button type="button" className="reset-search-btn" onClick={onResetSearch}>
          <RotateCcw size={16} />
          <span>Clear Search Filter</span>
        </button>
      </div>
    );
  }

  // Empty State 2: Entire inventory is empty
  if (products.length === 0 && totalCatalogCount === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-circle">
          <PackageOpen size={36} />
        </div>
        <h3 className="empty-title">Your inventory is empty</h3>
        <p className="empty-subtitle">
          There are currently no items in your catalog. Use the form on the left to add your first product.
        </p>
      </div>
    );
  }

  return (
    <section className="product-list-section">
      <div className="product-list-header">
        <h2 className="section-title">
          Inventory Items{' '}
          <span className="count-badge">
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </span>
        </h2>
        {searchTerm && (
          <span className="filter-active-note">
            Filtered by keyword: <strong>"{searchTerm}"</strong>
          </span>
        )}
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={onDeleteProduct}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
