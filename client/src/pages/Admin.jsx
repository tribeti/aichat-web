import React, { useState } from "react";
import Pagination from "../components/Pagination";
import "./admin.css";
import { useAuth } from "@clerk/clerk-react";

export default function Admin() {
  const { isLoaded, has } = useAuth();
  const isAdmin = has({ role: "org:admin" });

  if (!isLoaded) {
    return <p>Loading...</p>;
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

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Panel</h2>
      </div>
      {error && <div className="error-message">{error}</div>}
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
