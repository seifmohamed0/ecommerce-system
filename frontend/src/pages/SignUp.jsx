import React, { useState } from "react";
import api from "../api/axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",       
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password.length < 6) {
      alert("❌ كلمة المرور يجب أن تكون على الأقل 6 حروف");
      return;
    }
  
    try {
      await api.post("/auth/register", formData);
      alert("✅ تم التسجيل بنجاح");
    } catch (error) {
      alert("❌ حدث خطأ أثناء التسجيل: " + (error.response?.data || error.message));
    }
  };
  

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>إنشاء حساب جديد</h2>

      <input
        name="username"
        placeholder="اسم المستخدم"
        onChange={handleChange}
        value={formData.username}
        required
      />

      <input
        name="name"
        placeholder="الاسم الكامل"
        onChange={handleChange}
        value={formData.name}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="البريد الإلكتروني"
        onChange={handleChange}
        value={formData.email}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="كلمة المرور"
        onChange={handleChange}
        value={formData.password}
        required
      />

      <button type="submit">تسجيل</button>
    </form>
  );
};

export default SignUp;
