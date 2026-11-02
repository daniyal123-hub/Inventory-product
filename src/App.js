import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar.js';
import SearchBar from './components/SearchBar.js';
import AddProductForm from './components/AddProductForm.js';
import ProductList from './components/ProductList.js';
import { initialProducts } from './data/initialProducts.js';
import { RefreshCw } from 'lucide-react';

/**
 * Main Application Component
 * Manages inventory state and live filtering
 */
function App() {
  // 1. Initial State: 4-5 dummy products maintained via useState
  const [products, setProducts] = useState(initialProducts);

  // 2. Search state for real-time filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 3. Computed unique categories from current inventory
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category.trim()))).filter(Boolean);
  }, [products]);

  // 4. Live Filtering: Filters in real time by name OR category
  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;

    return products.filter((product) => {
      const matchName = product.name.toLowerCase().includes(term);
      const matchCategory = product.category.toLowerCase().includes(term);
      return matchName || matchCategory;
    });
  }, [products, searchTerm]);

  // 5. Handler: Add new product to state
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // 6. Handler: Delete product by id
  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  // 7. Handler: Reset sample inventory
  const handleResetSampleData = () => {
    setProducts(initialProducts);
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="app-layout">
      {/* 1. Navbar: Header & Product summary counts */}
      <Navbar products={products} />

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-container">
          {/* Top Control Bar: Search Filter & Sample Reset */}
          <section className="search-section">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              totalMatches={filteredProducts.length}
              totalProducts={products.length}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categories={uniqueCategories}
            />
          </section>

          {/* Two-Column Responsive Layout */}
          <div className="dashboard-grid">
            {/* Left Column: Controlled Add Product Form */}
            <aside className="sidebar-column">
              <AddProductForm
                onAddProduct={handleAddProduct}
                existingCategories={uniqueCategories}
              />

              {/* Quick Reset Helper */}
              {products.length === 0 && (
                <div className="reset-helper-box">
                  <p>Catalog is currently empty.</p>
                  <button
                    type="button"
                    className="reset-pill-btn"
                    onClick={handleResetSampleData}
                  >
                    <RefreshCw size={14} /> Restore Sample Products
                  </button>
                </div>
              )}
            </aside>

            {/* Right Column: Dynamic Product List */}
            <section className="catalog-column">
              <ProductList
                products={filteredProducts}
                totalCatalogCount={products.length}
                searchTerm={searchTerm}
                onResetSearch={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                onDeleteProduct={handleDeleteProduct}
              />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            <strong>Product & Inventory Dashboard</strong> &bull; React.js Functional Components Assignment
          </p>
          <p className="footer-credits">
            Built with React 18, Vite, and Modern Responsive CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
