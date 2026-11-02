import React from 'react';
import { Search, X, Filter } from 'lucide-react';

/**
 * SearchBar Component
 * Allows real-time filtering of products by name and category
 */
const SearchBar = ({ searchTerm, onSearchChange, totalMatches, totalProducts, selectedCategory, onSelectCategory, categories }) => {
  return (
    <div className="searchbar-container">
      <div className="searchbar-main">
        {/* Search Input Box */}
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Search products by name or category (e.g. 'Apple', 'Electronics', 'Audio')..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search products"
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Live Match Counter */}
        <div className="search-status">
          <span className="results-badge">
            {searchTerm ? (
              <>
                <strong>{totalMatches}</strong> of {totalProducts} items match
              </>
            ) : (
              <>
                <strong>{totalProducts}</strong> products in catalog
              </>
            )}
          </span>
        </div>
      </div>

      {/* Category Quick Filter Chips */}
      {categories && categories.length > 0 && (
        <div className="category-chips-row">
          <span className="chips-label">
            <Filter size={14} /> Quick filter:
          </span>
          <button
            type="button"
            className={`chip-btn ${selectedCategory === 'All' && !searchTerm ? 'active' : ''}`}
            onClick={() => {
              onSelectCategory('All');
              onSearchChange('');
            }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip-btn ${searchTerm.toLowerCase() === cat.toLowerCase() || selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                onSelectCategory(cat);
                onSearchChange(cat);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
