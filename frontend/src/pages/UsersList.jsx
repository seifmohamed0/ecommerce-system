import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ يرجى تسجيل الدخول أولاً");
      navigate("/");
      return;
    }
  
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "ADMIN") {
        alert("❌ هذه الصفحة خاصة بالأدمين فقط");
        navigate("/home");
        return;
      }
    } catch {
      alert("❌ توكن غير صالح");
      navigate("/");
      return;
    }
  
    api.get("/admin/users")
      .then(res => {
        console.log("Returned Users Data:", res.data);
        setUsers(Array.isArray(res.data) ? res.data : res.data.users || []);
      })
      .catch(() => alert("❌ خطأ في جلب المستخدمين"))
      .finally(() => setLoading(false));
  }, [navigate]);
  
  

  if (loading) return <p>جاري التحميل...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>قائمة المستخدمين</h2>
      <table border="1" width="100%" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد</th>
            <th>الدور</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role || u.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
