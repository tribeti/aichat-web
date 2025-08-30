import React from "react";

const productInfos = [
  {
    id: "beauty-0",
    name: "Kem chống nắng",
    brand: "SunCare",
    origin: "Việt Nam",
    price: "120.000 VND",
    desc: "Kem chống nắng bảo vệ da khỏi tia UV, phù hợp mọi loại da.",
    image: "https://product.hstatic.net/200000617989/product/anh-01_638f8a72aae5481d882402a0a11951da.png"
  },
  {
    id: "clothing-0",
    name: "Áo thun nam",
    brand: "Coolmate",
    origin: "Việt Nam",
    price: "220.000 VND",
    desc: "Áo thun nam chất liệu cotton, thoáng mát, dễ phối đồ.",
    image: "https://product.hstatic.net/1000369857/product/aht08_renew_0010_layer_2_623e7d3ba67d4cd4937f4e119c9dc9a2.jpg"
  },
  {
    id: "electronics-0",
    name: "Smartphone X",
    brand: "SamTech",
    origin: "Hàn Quốc",
    price: "5.000.000 VND",
    desc: "Điện thoại thông minh màn hình lớn, pin lâu, camera sắc nét.",
    image: "https://dienthoaixachtay.com.vn/public/upload/images/hinhsanpham/samsung-note-20-ultra-chinh-hang-99-85191617426304.jpg"
  },
  {
    id: "homeKitchen-0",
    name: "Bình giữ nhiệt",
    brand: "Lock&Lock",
    origin: "Hàn Quốc",
    price: "180.000 VND",
    desc: "Bình giữ nhiệt dung tích 500ml, giữ nóng/lạnh lâu.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3PbYhRe33An8pdotq2Wqm5GXJJ7fD78djg&s"
  },
  {
    id: "deals-0",
    name: "Smart Watch giảm giá",
    brand: "TechFit",
    origin: "Trung Quốc",
    price: "1.900.000 VND",
    desc: "Đồng hồ thông minh đo nhịp tim, kết nối Bluetooth.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Gr8N4FSkgTIC8SLbaScCZXNOnQAAMri9Kw&s"
  },
  {
    id: "sports-0",
    name: "Giày chạy bộ",
    brand: "Nike",
    origin: "Việt Nam",
    price: "650.000 VND",
    desc: "Giày chạy bộ nhẹ, êm, phù hợp tập luyện thể thao.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTm1GJZGJlMdA8BPOnYpaHMW_JMBYN5Kgjyw&s"
  }
];

export default function ProductInfo() {
  return (
    <div style={{maxWidth:'900px',margin:'2rem auto',padding:'2rem',background:'#fff',borderRadius:'12px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
      <h2 style={{textAlign:'center',marginBottom:'2rem'}}>Thông tin cơ bản các sản phẩm</h2>
      <div style={{display:'flex',flexWrap:'wrap',gap:'2rem',justifyContent:'center'}}>
        {productInfos.map(product => (
          <div key={product.id} style={{width:'260px',border:'1px solid #eee',borderRadius:'8px',padding:'1rem',background:'#fafafa'}}>
            <img src={product.image} alt={product.name} style={{width:'100%',borderRadius:'6px',marginBottom:'1rem'}} />
            <h3 style={{margin:'0 0 0.5rem 0'}}>{product.name}</h3>
            <p><b>Thương hiệu:</b> {product.brand}</p>
            <p><b>Xuất xứ:</b> {product.origin}</p>
            <p><b>Giá:</b> {product.price}</p>
            <p style={{fontSize:'0.95rem'}}>{product.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
