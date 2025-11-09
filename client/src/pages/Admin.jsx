import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import "./admin.css";
import { useAuth } from "@clerk/clerk-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Admin() {
  const { isLoaded, has } = useAuth();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const isAdmin = has({ role: "org:admin" });

  if (!isAdmin) {
    return <p className="access-denied">TRUY CẬP BỊ TỪ CHỐI. CHỈ DÀNH CHO QUẢN TRỊ VIÊN.</p>;
  }



  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    item_name: "",
    item_description: "",
    brand: "",
    city: "",
    country: "",
    full_price: "",
    sale_price: "",
    categories: "",
    notes: "",
  });
  const [activeTab, setActiveTab] = useState('products');
  const [salesData, setSalesData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    activeCustomers: 0,
    revenue: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchReportsData();
  }, []);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:5070/products?page=${page}&limit=20`,
      );
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 20));
      setCurrentPage(page);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // Thêm hoặc cập nhật sản phẩm
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const product = {
      item_name: form.item_name,
      item_description: form.item_description,
      brand: form.brand,
      manufacturer_address: { city: form.city, country: form.country },
      prices: {
        full_price: parseFloat(form.full_price),
        sale_price: parseFloat(form.sale_price),
      },
      categories: form.categories.split(",").map((c) => c.trim()),
      user_reviews: [],
      notes: form.notes,
    };

    try {
      if (editing) {
        await fetch(`http://localhost:5070/admin/products/${editing._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-admin-auth": "authenticated",
          },
          body: JSON.stringify(product),
        });
      } else {
        await fetch("http://localhost:5070/admin/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-auth": "authenticated",
          },
          body: JSON.stringify(product),
        });
      }
      fetchProducts();
      resetForm();
      setModalOpen(false);
    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  //Chỉnh sửa sản phẩm
  const handleEdit = (product) => {
    setEditing(product);
    setForm({
      item_name: product.item_name || "",
      item_description: product.item_description || "",
      brand: product.brand || "",
      city: product.manufacturer_address?.city || "",
      country: product.manufacturer_address?.country || "",
      full_price: product.prices?.full_price?.toString() || "",
      sale_price: product.prices?.sale_price?.toString() || "",
      categories: product.categories?.join(", ") || "",
      notes: product.notes || "",
    });
    setModalOpen(true);
  };

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    setLoading(true);
    setError("");
    try {
      await fetch(`http://localhost:5070/admin/products/${id}`, {
        method: "DELETE",
        headers: { "x-admin-auth": "authenticated" },
      });
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setForm({
      item_name: "",
      item_description: "",
      brand: "",
      city: "",
      country: "",
      full_price: "",
      sale_price: "",
      categories: "",
      notes: "",
    });
    setModalOpen(false);
  };

  const openAddModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Fetch reports data
  const fetchReportsData = async () => {
    try {
      const res = await fetch("http://localhost:5070/admin/reports");
      const data = await res.json();

      setSalesData(data.salesData);
      setCustomerData(data.customerData);
      setCustomerList(data.customerList);
      setStats(data.stats);
    } catch (err) {
      console.error("Error fetching reports data:", err);
      // Fallback to sample data if API fails
      const categories = {};
      products.forEach(product => {
        product.categories?.forEach(cat => {
          categories[cat] = (categories[cat] || 0) + 1;
        });
      });

      const salesDataSample = Object.keys(categories).map(cat => ({
        name: cat,
        sales: categories[cat] * Math.floor(Math.random() * 50) + 10
      }));

      const customerDataSample = [
        { name: 'New Customers', value: Math.floor(Math.random() * 100) + 50 },
        { name: 'Returning Customers', value: Math.floor(Math.random() * 100) + 30 },
        { name: 'VIP Customers', value: Math.floor(Math.random() * 50) + 10 },
        { name: 'Corporate', value: Math.floor(Math.random() * 30) + 5 }
      ];

      setSalesData(salesDataSample);
      setCustomerData(customerDataSample);
      setCustomerList([]);
      setStats({
        totalProducts: products.length,
        totalSales: 0,
        activeCustomers: 0,
        revenue: 0
      });
    }
  };

  // Tab navigation
  const renderTabNavigation = () => (
    <div className="tab-navigation">
      <button
        className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
        onClick={() => setActiveTab('products')}
      >
        Products
      </button>
      <button
        className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
        onClick={() => setActiveTab('reports')}
      >
        Reports & Analytics
      </button>
    </div>
  );

  // Reports section
  const renderReports = () => (
    <div className="reports-section">
      <h3>Sales & Customer Reports</h3>

      <div className="charts-container">
        <div className="chart-item">
          <h4>Product Sales Overview</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-item">
          <h4>Customer Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {customerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Products</h4>
          <p>{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h4>Total Sales</h4>
          <p>{stats.totalSales}</p>
        </div>
        <div className="stat-card">
          <h4>Active Customers</h4>
          <p>{stats.activeCustomers}</p>
        </div>
        <div className="stat-card">
          <h4>Revenue</h4>
          <p>${stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="customer-list-section">
        <h4>Top Customers</h4>
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Total Purchases</th>
              <th>Last Purchase</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>${customer.totalPurchases.toLocaleString()}</td>
                <td>{customer.lastPurchase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        {/*Nút đăng xuất */}
        {/* <button onClick={handleLogout} className="logout-button">
          Logout
        </button> */}
      </div>

      {renderTabNavigation()}

      {error && <div className="error-message">{error}</div>}

      {activeTab === 'products' && (
        <>
          <button onClick={openAddModal} className="add-button">
            Add New Product
          </button>
          {loading && <div className="loading">Loading...</div>}

          <div className="products-section">
            <h3>Products</h3>
            <input
              type="text"
              placeholder="Search by name or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />

            <table className="products-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Full Price</th>
                  <th>Sale Price</th>
                  <th>Categories</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p._id}>
                    <td>{p.item_name}</td>
                    <td>{p.brand}</td>
                    <td>{p.prices?.full_price}</td>
                    <td>{p.prices?.sale_price}</td>
                    <td>{p.categories?.join(", ")}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleEdit(p)} className="edit-button">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={fetchProducts}
              loading={loading}
            />
          </div>
        </>
      )}

      {activeTab === 'reports' && renderReports()}

      {/* Modal thêm/sửa sản phẩm */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editing ? "Edit Product" : "Add Product"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={form.item_name}
                  onChange={(e) =>
                    setForm({ ...form, item_name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={form.item_description}
                  onChange={(e) =>
                    setForm({ ...form, item_description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Brand:</label>
                <input
                  type="text"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>City:</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Country:</label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Full Price:</label>
                <input
                  type="number"
                  value={form.full_price}
                  onChange={(e) =>
                    setForm({ ...form, full_price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Sale Price:</label>
                <input
                  type="number"
                  value={form.sale_price}
                  onChange={(e) =>
                    setForm({ ...form, sale_price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Categories (comma separated):</label>
                <input
                  type="text"
                  value={form.categories}
                  onChange={(e) =>
                    setForm({ ...form, categories: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Notes:</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              <div className="form-buttons">
                <button
                  type="submit"
                  disabled={loading}
                  className="submit-button"
                >
                  {loading ? "Saving..." : editing ? "Update" : "Add"} Product
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
