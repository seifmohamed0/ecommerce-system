import React, { useEffect, useState } from "react";
import api from "../api/axios";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/wishlist")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setWishlist(res.data);
        } else {
          console.error("بيانات غير متوقعة:", res.data);
          setError("⚠️ بيانات غير متوقعة من السيرفر");
        }
      })
      .catch(err => {
        console.error("خطأ أثناء جلب المفضلة:", err);
        setError("❌ حدث خطأ أثناء جلب المفضلة");
      });
  }, []);
  

  const handleRemove = (productId) => {
    api.delete(`/api/wishlist/${productId}`)
      .then(() => {
        setWishlist(wishlist.filter(item => item.productId !== productId));
      })
      .catch(() => setError("حدث خطأ أثناء إزالة المنتج"));
  };
  

  return (
    <div>
      <h2>قائمة المفضلة</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
      {wishlist.map(item => (
        <li key={item.id}>
          {item.productName || "منتج غير متوفر"}
          <button onClick={() => handleRemove(item.productId)}>إزالة</button>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default WishlistPage;
