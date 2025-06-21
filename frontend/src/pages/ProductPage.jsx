import React, { useEffect, useState } from "react";
import api from "../api/axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: null,
  });
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api.get("/api/products?page=0&size=10")
      .then((res) => {
        const productList = res.data.content || [];
        console.log("Fetched products:", productList);
        setProducts(productList);
      })
      .catch(() => setProducts([]));
  };

  const handleAddToWishlist = (productId) => {
    api.post(`/api/wishlist/${productId}`)
      .then(() => alert("✅ تمت الإضافة إلى المفضلة!"))
      .catch(() => alert("❌ حدث خطأ أثناء الإضافة"));
  };

  const handleDelete = (productId) => {
    if (window.confirm("هل أنت متأكد من حذف المنتج؟")) {
      api.delete(`/api/products/${productId}`)
        .then(() => {
          alert("✅ تم حذف المنتج");
          fetchProducts();
        })
        .catch(() => alert("❌ حدث خطأ أثناء الحذف"));
    }
  };
  const handleEditClick = (product) => {
    console.log("Product selected for editing:", product);
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.category ? product.category.id : null,
    });
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (!editingProduct || !editingProduct.id) {
      alert("خطأ: لا يوجد منتج محدد للتحديث");
      console.error("editingProduct أو editingProduct.id غير معرف:", editingProduct);
      return;
    }
  
    console.log("Updating product with id:", editingProduct.id);
  
    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      categoryId: formData.categoryId ? Number(formData.categoryId) : null,
    };
  
    api.put(`/api/products/${editingProduct.id}`, payload)
      .then(() => {
        alert("✅ تم تحديث المنتج");
        setEditingProduct(null);
        fetchProducts();
      })
      .catch((err) => {
        alert("❌ حدث خطأ أثناء التحديث");
        console.error("Update error:", err.response?.data || err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 المنتجات المتاحة</h2>

      {editingProduct && (
        <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>تعديل المنتج: {editingProduct.name}</h3>
          <input
            type="text"
            name="name"
            placeholder="الاسم"
            value={formData.name}
            onChange={handleInputChange}
          />
          <br />
          <textarea
            name="description"
            placeholder="الوصف"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
          />
          <br />
          <input
            type="number"
            name="price"
            placeholder="السعر"
            value={formData.price  || ""}
            onChange={handleInputChange}
          />
          <br />
          <button onClick={handleUpdate}>حفظ التعديلات</button>
          <button onClick={handleCancelEdit} style={{ marginLeft: "10px" }}>إلغاء</button>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", width: "250px" }}>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>💵 {product.price} جنيه</p>
            <p>👤 صاحب المنتج: {product.ownerUsername || "غير معروف"}</p>
            <p>🏷️ التصنيف: {product.categoryName || "غير مصنف"}</p>
            <button onClick={() => handleAddToWishlist(product.id)}>❤️ أضف إلى المفضلة</button>
            <button onClick={() => handleEditClick(product)} style={{ marginLeft: "10px" }}>✏️ تعديل</button>
            <button onClick={() => handleDelete(product.id)} style={{ marginLeft: "10px", color: "red" }}>🗑️ حذف</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
