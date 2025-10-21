import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./DetailPage.css";
import { useCart } from "../context/CartContext";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:5070"
          }/products/${id}`
        );
        if (!res.ok) throw new Error("Item not found");
        const data = await res.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchItem();
  }, [id]);

  if (loading) return <div className="detail-page-root">Loading...</div>;
  if (error) return <div className="detail-page-root">Error: {error}</div>;
  if (!item) return <div className="detail-page-root">No item found.</div>;

  const handleAddToCart = (product) => {
    addToCart(product);
    // Tạo thông báo tạm thời
    const notification = document.createElement("div");
    notification.className = "add-to-cart-success";
    notification.innerHTML = `Đã thêm ${product.item_name} vào giỏ hàng!`;
    document.body.appendChild(notification);

    // Xóa thông báo sau 3 giây
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="detail-page-root">
      <div className="detail-page">
        <div className="detail-left">
          {item.image ? (
            <img
              src={item.image}
              alt={item.item_name}
              className="detail-image"
            />
          ) : (
            <div className="detail-image-empty">Không có hình ảnh</div>
          )}

          <div className="detail-card">
            <div className="price-row">
              {item.prices?.full_price && (
                <span className="price-old">${item.prices.full_price}</span>
              )}
              <span className="price">${item.prices?.sale_price || 0}</span>
            </div>
            <div className="btn-row">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow(item);
                }}
              >
                Mua ngay
              </button>
              <button
                className="btn btn-outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
              >
                Thêm giỏ hàng
              </button>
            </div>
          </div>
        </div>

        <div className="detail-right">
          <Link to="/" className="detail-back">
            ← Quay lại cửa hàng
          </Link>
          <h2 className="detail-title">{item.item_name}</h2>

          <div className="detail-meta">
            <span>Thương hiệu: {item.brand || "Không rõ"}</span>
          </div>

          {item.item_description && (
            <div className="detail-description">{item.item_description}</div>
          )}

          {/* Categories */}
          {item.categories && item.categories.length > 0 && (
            <div className="badges">
              {item.categories.map((cat, idx) => (
                <span key={idx} className="badge">
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Manufacturer info */}
          {item.manufacturer_address && (
            <div className="detail-grid">
              <div className="detail-item">
                City: {item.manufacturer_address.city}
              </div>
              <div className="detail-item">
                Country: {item.manufacturer_address.country}
              </div>
            </div>
          )}

          {/* Reviews */}
          {item.user_reviews && item.user_reviews.length > 0 && (
            <div className="reviews">
              <h3>Đánh giá người dùng</h3>
              {item.user_reviews.map((review, idx) => (
                <div key={idx} className="review">
                  <div className="meta">
                    <span>{review.review_date}</span>
                    <span>⭐ {review.rating}</span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {item.notes && <div className="detail-description">{item.notes}</div>}
        </div>
      </div>
    </div>
  );
}
