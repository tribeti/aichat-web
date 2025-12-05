import ChatWidget from "./ChatWidget";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";

const EcommerceStore = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const featuredRef = useRef(null);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5070/products?page=${page}&limit=21`,
      );
      const data = await res.json();
      const mapped = data.products.map((item) => {
        const randomIndex = Math.floor(Math.random() * 9) + 1;
        const randomImage = `/temp${randomIndex}.jpg`;

        return {
          id: item._id,
          name: item.item_name || "Sản phẩm chưa có tên",
          brand: item.brand || "Không rõ thương hiệu",
          price: item.prices?.sale_price || 0,
          description: item.item_description || "Mot san pham tuyet voi :)",
          image: randomImage,
        };
      });
      setProducts(mapped);
      setTotalPages(Math.ceil(data.total / 20));
      setCurrentPage(page);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return products.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    // Tạo thông báo tạm thời
    const notification = document.createElement("div");
    notification.className = "add-to-cart-success";
    notification.innerHTML = `Đã thêm ${product.name} vào giỏ hàng!`;
    document.body.appendChild(notification);

    // Xóa thông báo sau 3 giây
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  };

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <main>
        <section className="mx-auto px-4 py-8 md:py-16">
          <div
            className="flex min-h-1/2 md:min-h-screen flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 pb-10 md:px-12 md:pb-12"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.3) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBXkY2fjuC6B7lj4lg-bC8RoYNZq_W7yb8vQzbZW1jbv_jPHouMzbesU0KKE5wghh96GvWtBhHbU-FOk0WHzOts0Zn1Qgj1dnhDfKH2iwR5sJ33b5MLg9mDs0WefYrQOn7kS0rsDh27vMCU5_ifyieQxGqgHiYhUr7fvuRxJYauRrChqupfzus4vRIlqfrXvm1DJUO9lBCxOKh-hyzUY9oe7lWloHX64Ka5tqVgfJaWHKOY0JQauhN1G-ojnAbc0KfyiiKFsZWr8ec")',
            }}
          >
            <div className="flex flex-col gap-4 text-left max-w-2xl">
              <h1 className="text-white text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl">
                Không Gian Sống Tối Giản, Đậm Chất Bắc Âu
              </h1>
              <h2 className="text-white text-base font-normal leading-normal md:text-lg">
                Khám phá những thiết kế nội thất tinh tế, mang lại sự ấm cúng và
                thanh lịch cho ngôi nhà của bạn.
              </h2>
            </div>

            <button onClick={() => featuredRef.current?.scrollIntoView({ behavior: 'smooth' })} className="flex min-w-[84px] max-w-[480px] bg-zinc-800 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-cta text-white text-base font-bold leading-normal tracking-wide hover:bg-opacity-90">
              <span className="truncate">Khám Phá Bộ Sưu Tập</span>
            </button>
          </div>
        </section>
        <div ref={featuredRef} className="container">
          <div
            className="product-list"
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {filteredResults.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  color: "#e91e63",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Không tìm thấy sản phẩm phù hợp.
              </div>
            ) : (
              filteredResults.map((p, idx) => (
                <ProductCard
                  key={idx}
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  image={p.image}
                  description={p.description}
                  onBuy={() => handleAddToCart(p)}
                />
              ))
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={fetchProducts}
            loading={loading}
          />
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
};

export default EcommerceStore;
