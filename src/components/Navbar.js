import React from 'react';
import { Package, Layers, DollarSign, AlertTriangle } from 'lucide-react';

/**
 * Navbar Component
 * Displays the application brand, header, and key inventory metrics
 */
const Navbar = ({ products }) => {
  // Calculate summary counts
  const totalProducts = products.length;
  const totalUnits = products.reduce((sum, item) => sum + (Number(item.stock) || 0), 0);
  const totalValue = products.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.stock) || 0)), 0);
  const lowStockCount = products.filter(item => Number(item.stock) <= 5).length;
  const categoriesCount = new Set(products.map(item => item.category.trim())).size;

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Brand Logo and Title */}
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <Package className="brand-icon" size={26} />
          </div>
          <div>
            <h1 className="brand-title">InventoryPulse</h1>
            <p className="brand-subtitle">Product Catalog & Inventory Dashboard</p>
          </div>
        </div>

        {/* Product Summary Counts */}
        <div className="navbar-metrics">
          <div className="metric-pill">
            <div className="metric-icon-box blue">
              <Layers size={18} />
            </div>
            <div className="metric-details">
              <span className="metric-label">Products</span>
              <span className="metric-value">{totalProducts}</span>
            </div>
          </div>

          <div className="metric-pill">
            <div className="metric-icon-box purple">
              <Package size={18} />
            </div>
            <div className="metric-details">
              <span className="metric-label">Total Units</span>
              <span className="metric-value">{totalUnits.toLocaleString()}</span>
            </div>
          </div>

          <div className="metric-pill">
            <div className="metric-icon-box emerald">
              <DollarSign size={18} />
            </div>
            <div className="metric-details">
              <span className="metric-label">Total Value</span>
              <span className="metric-value">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="metric-pill">
            <div className={`metric-icon-box ${lowStockCount > 0 ? 'amber' : 'gray'}`}>
              <AlertTriangle size={18} />
            </div>
            <div className="metric-details">
              <span className="metric-label">Low Stock</span>
              <span className={`metric-value ${lowStockCount > 0 ? 'text-amber' : ''}`}>
                {lowStockCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
