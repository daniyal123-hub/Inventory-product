import React, { useState } from 'react';
import { PlusCircle, Tag, DollarSign, Box, Image as ImageIcon, FileText, CheckCircle2 } from 'lucide-react';

/**
 * AddProductForm Component
 * Controlled form allowing users to add new inventory products
 */
const AddProductForm = ({ onAddProduct, existingCategories }) => {
  // Controlled form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Predefined category suggestions
  const defaultCategories = ['Electronics', 'Audio', 'Accessories', 'Home & Kitchen', 'Fitness', 'Office'];
  const allCategoryOptions = Array.from(new Set([...defaultCategories, ...(existingCategories || [])]));

  // Handle controlled input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Enter a valid price greater than $0';
    }

    if (formData.stock === '' || isNaN(formData.stock) || Number(formData.stock) < 0) {
      newErrors.stock = 'Enter valid stock count (0 or higher)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent full page reload

    if (!validateForm()) {
      return;
    }

    // Generate fallback product image based on category or default
    const fallbackImage = formData.imageUrl.trim() || 
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80';

    const newProduct = {
      id: Date.now(), // Unique ID
      name: formData.name.trim(),
      category: formData.category.trim(),
      price: parseFloat(Number(formData.price).toFixed(2)),
      stock: parseInt(formData.stock, 10),
      description: formData.description.trim() || 'No description provided.',
      imageUrl: fallbackImage,
      sku: `PRD-${formData.category.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`
    };

    // Add to state in parent App component
    onAddProduct(newProduct);

    // Reset controlled inputs
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      imageUrl: '',
    });
    setErrors({});

    // Show temporary success feedback
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <div className="form-header-icon">
          <PlusCircle size={22} />
        </div>
        <div>
          <h2 className="form-title">Add New Product</h2>
          <p className="form-subtitle">Fill in details to add item to live inventory</p>
        </div>
      </div>

      {showSuccessToast && (
        <div className="form-toast-success" role="alert">
          <CheckCircle2 size={18} />
          <span>Product successfully added to inventory!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Product Name */}
        <div className="form-group">
          <label htmlFor="product-name" className="form-label">
            Product Name <span className="required-star">*</span>
          </label>
          <div className="input-with-icon">
            <input
              id="product-name"
              type="text"
              name="name"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="e.g. Wireless Noise-Cancelling Earbuds"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* Category & Price in 2 columns */}
        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="product-category" className="form-label">
              Category <span className="required-star">*</span>
            </label>
            <div className="input-with-icon">
              <input
                id="product-category"
                type="text"
                list="category-suggestions"
                name="category"
                className={`form-input ${errors.category ? 'input-error' : ''}`}
                placeholder="Select or type..."
                value={formData.category}
                onChange={handleChange}
              />
              <datalist id="category-suggestions">
                {allCategoryOptions.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group flex-1">
            <label htmlFor="product-price" className="form-label">
              Price ($) <span className="required-star">*</span>
            </label>
            <div className="input-with-icon">
              <input
                id="product-price"
                type="number"
                step="0.01"
                min="0.01"
                name="price"
                className={`form-input ${errors.price ? 'input-error' : ''}`}
                placeholder="49.99"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>
        </div>

        {/* Stock & Image URL in 2 columns */}
        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="product-stock" className="form-label">
              Initial Stock <span className="required-star">*</span>
            </label>
            <div className="input-with-icon">
              <input
                id="product-stock"
                type="number"
                min="0"
                step="1"
                name="stock"
                className={`form-input ${errors.stock ? 'input-error' : ''}`}
                placeholder="10"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
            {errors.stock && <span className="error-message">{errors.stock}</span>}
          </div>

          <div className="form-group flex-1">
            <label htmlFor="product-image" className="form-label">
              Image URL <span className="optional-tag">(Optional)</span>
            </label>
            <div className="input-with-icon">
              <input
                id="product-image"
                type="url"
                name="imageUrl"
                className="form-input"
                placeholder="https://... (or leave empty)"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="product-description" className="form-label">
            Description <span className="optional-tag">(Optional)</span>
          </label>
          <textarea
            id="product-description"
            name="description"
            rows="2"
            className="form-textarea"
            placeholder="Brief item features or specifications..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          <PlusCircle size={18} />
          <span>Add Product to Inventory</span>
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
