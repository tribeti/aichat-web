import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

export default function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState({
    item_name: '',
    item_description: '',
    brand: '',
    city: '',
    country: '',
    full_price: '',
    sale_price: '',
    categories: '',
    notes: '',
  });

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      navigate('/admin-login');
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5070/products?page=${page}&limit=20`);
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 20));
      setCurrentPage(page);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const product = {
      item_name: form.item_name,
      item_description: form.item_description,
      brand: form.brand,
      manufacturer_address: { city: form.city, country: form.country },
      prices: { full_price: parseFloat(form.full_price), sale_price: parseFloat(form.sale_price) },
      categories: form.categories.split(',').map(c => c.trim()),
      user_reviews: [],
      notes: form.notes,
    };
    try {
      if (editing) {
        await fetch(`http://localhost:5070/admin/products/${editing._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-admin-auth': 'authenticated' },
          body: JSON.stringify(product),
        });
      } else {
        await fetch('http://localhost:5070/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-auth': 'authenticated' },
          body: JSON.stringify(product),
        });
      }
      fetchProducts();
      resetForm();
      setModalOpen(false);
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditing(product);
    setForm({
      item_name: product.item_name || '',
      item_description: product.item_description || '',
      brand: product.brand || '',
      city: product.manufacturer_address?.city || '',
      country: product.manufacturer_address?.country || '',
      full_price: product.prices?.full_price?.toString() || '',
      sale_price: product.prices?.sale_price?.toString() || '',
      categories: product.categories?.join(', ') || '',
      notes: product.notes || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setLoading(true);
    setError('');
    try {
      await fetch(`http://localhost:5070/admin/products/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-auth': 'authenticated' },
      });
      fetchProducts();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete product.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setForm({
      item_name: '',
      item_description: '',
      brand: '',
      city: '',
      country: '',
      full_price: '',
      sale_price: '',
      categories: '',
      notes: '',
    });
    setModalOpen(false);
  };

  const openAddModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const filteredProducts = products.filter(p =>
    p.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Admin Panel</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <button onClick={openAddModal} style={{ padding: '10px 20px', marginBottom: '20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add New Product</button>
      {loading && <div>Loading...</div>}
      <h3>Products</h3>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name or brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px', width: '300px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Brand</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Full Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Sale Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Categories</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{p.item_name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{p.brand}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{p.prices?.full_price}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{p.prices?.sale_price}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{p.categories?.join(', ')}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => handleEdit(p)} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(p._id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
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
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '400px', maxHeight: '80%', overflowY: 'auto' }}>
            <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label>Name:</label>
                <input type="text" value={form.item_name} onChange={(e) => setForm({ ...form, item_name: e.target.value })} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Description:</label>
                <textarea value={form.item_description} onChange={(e) => setForm({ ...form, item_description: e.target.value })} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Brand:</label>
                <input type="text" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>City:</label>
                <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Country:</label>
                <input type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Full Price:</label>
                <input type="number" value={form.full_price} onChange={(e) => setForm({ ...form, full_price: e.target.value })} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Sale Price:</label>
                <input type="number" value={form.sale_price} onChange={(e) => setForm({ ...form, sale_price: e.target.value })} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Categories (comma separated):</label>
                <input type="text" value={form.categories} onChange={(e) => setForm({ ...form, categories: e.target.value })} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Notes:</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <button type="submit" disabled={loading} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>{loading ? 'Saving...' : (editing ? 'Update' : 'Add')} Product</button>
              <button type="button" onClick={resetForm} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
