# Product & Inventory Dashboard (React.js)

An interactive, responsive **Product Catalog & Inventory Dashboard** built with **React.js Functional Components**, demonstrating modern React state management (`useState`), controlled forms, and instant live search filtering.

---

## 🚀 Key Features

1. **Component-Based Modular Architecture**
   - Cleanly separated into reusable functional components.
   - Strictly organized folder structure for maintainability.

2. **State Management (`useState`)**
   - Initialized with an array of 5 realistic dummy products.
   - Dynamic real-time additions without page reloading.
   - Instant item deletion with feedback.

3. **Live Search & Category Filtering**
   - Instant real-time filtering as you type.
   - Dual-criteria search matching both product name and product category.
   - Interactive quick category chips and clear filter button.

4. **Summary & Inventory KPI Metrics**
   - Live header metrics displaying Total Products, Total Stock Units, and Catalog Valuation ($).
   - Low-stock badge indicators for inventory management.

---

## 📁 Component-Based Architecture

```
product-inventory-dashboard/
├── index.html                     # HTML5 template
├── package.json                   # Project scripts and dependencies
├── vite.config.js                 # Vite bundler configuration
├── Assignment_Cover_Page.html     # Printable Cover Page + Screenshots
├── src/
│   ├── main.js                    # React root entry point
│   ├── App.js                     # Root state container (useState, handlers)
│   ├── index.css                  # Modern responsive styling & design tokens
│   ├── components/
│   │   ├── Navbar.js              # Application header & summary KPI counters
│   │   ├── SearchBar.js           # Controlled live search input & quick filters
│   │   ├── AddProductForm.js      # Controlled form with validation to add items
│   │   ├── ProductList.js         # Responsive grid container & empty states
│   │   └── ProductCard.js         # Individual card details & Delete action
│   └── data/
│       └── initialProducts.js     # 5 initial dummy products array
└── screenshots/
    ├── screenshot-1-main-dashboard.png
    ├── screenshot-2-search-filtered.png
    └── screenshot-3-code-structure.png
```

### Component Roles

| Component | File | Responsibilities |
| :--- | :--- | :--- |
| **Navbar** | `src/components/Navbar.js` | Displays header brand, logo, and live inventory summary counts (Total Products, Units, Valuation, Low Stock). |
| **SearchBar** | `src/components/SearchBar.js` | Controlled search input that filters products by name and category in real time, with clear action. |
| **AddProductForm** | `src/components/AddProductForm.js` | Controlled form using `useState` for each field with client-side validation to append new items without reloading. |
| **ProductCard** | `src/components/ProductCard.js` | Renders product image, title, category tag, SKU, price, stock status badge, and an interactive **Delete** button. |
| **ProductList** | `src/components/ProductList.js` | Maps through filtered items to render `ProductCard` components, with dedicated zero-result empty state. |
| **App** | `src/App.js` | Top-level state manager holding `products` and `searchTerm` state, plus add/delete/filter logic. |

---

## 🛠️ How to Run the Project Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Steps

1. **Clone the repository or extract the ZIP file:**
   ```bash
   cd product-inventory-dashboard
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open [http://localhost:3000](http://localhost:3000) (or the URL shown in terminal) to view the application.

5. **Build for production (optional):**
   ```bash
   npm run build
   ```

---

## 📸 Screenshots Required for Assignment Submission

The application includes automated screenshots captured during execution:

1. **Main Dashboard View (`screenshots/screenshot-1-main-dashboard.png`)**
   - Shows header navbar with live KPI counts, controlled product form, and full grid of products.
2. **Search Filtered View (`screenshots/screenshot-2-search-filtered.png`)**
   - Shows live search filtering in action when typing product keywords or category names.
3. **Project Code Structure (`screenshots/screenshot-3-code-structure.png`)**
   - Shows the clean component architecture and project layout.

---

## 🖨️ Assignment Cover Page & Submission Kit

A ready-to-print front page template is provided in [`Assignment_Cover_Page.html`](file:///C:/Users/HP/.gemini/antigravity/scratch/product-inventory-dashboard/Assignment_Cover_Page.html):
- Contains University Name, Assignment Title, Student Name, Roll Number, Section, Submitted To, and Submission Date.
- Includes embedded print views of all 3 required screenshots.
- Open `Assignment_Cover_Page.html` in any browser, click **"Print / Save as PDF"** (or press `Ctrl+P`) to print your hard copy.

---

## 📦 Submission Guide

1. **GitHub Repository:**
   - Initialize git: `git init`
   - Add and commit: `git add . && git commit -m "Complete Product & Inventory Dashboard assignment"`
   - Push to your GitHub account and copy the repository URL.

2. **LMS ZIP Submission:**
   - A clean ZIP package (`product-inventory-dashboard.zip`) without heavy `node_modules` is ready in the workspace for uploading directly to your LMS.
