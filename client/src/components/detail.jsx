//thông tin sản phẩm chi tiết
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./detail.css";

function ProductDetail() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5070/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Không thể tải thông tin sản phẩm');
                }
                const data = await response.json();
                setProduct({
                    id: data.item_id,
                    name: data.item_name || "Sản phẩm chưa có tên",
                    price: data.prices?.sale_price || 0,
                    image: "https://placehold.co/400",
                    description: data.item_description || "Chưa có mô tả cho sản phẩm này"
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            // Tạo thông báo tạm thời
            const notification = document.createElement('div');
            notification.className = 'add-to-cart-success';
            notification.innerHTML = `Đã thêm ${product.name} vào giỏ hàng!`;
            document.body.appendChild(notification);

            // Xóa thông báo sau 3 giây
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 3000);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="product-detail">
                <div>Đang tải thông tin sản phẩm...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-detail">
                <div>Lỗi: {error}</div>
                <button onClick={handleBack} style={{ marginTop: '20px', padding: '10px 20px' }}>
                    Quay lại
                </button>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-detail">
                <div>Không tìm thấy sản phẩm!</div>
                <button onClick={handleBack} style={{ marginTop: '20px', padding: '10px 20px' }}>
                    Quay lại
                </button>
            </div>
        );
    }

    return (
        <div className="product-detail">
            <button
                onClick={handleBack}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    padding: '10px 15px',
                    background: '#f0f0f0',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                ← Quay lại
            </button>
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p className="product-price">{product.price} VND</p>
            <p className="product-description">{product.description}</p>

            <button className="buy-btn" onClick={handleAddToCart}>Mua ngay</button>
        </div>
    );
}

export default ProductDetail;