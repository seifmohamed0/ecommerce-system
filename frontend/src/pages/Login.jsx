import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");

  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        username: username,
        password,
      });
      console.log(res.data);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        alert("✅ Login Successful!");
        navigate("/home");
      } else {
        alert("❌ Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Login Failed: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 400, margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>تسجيل الدخول</h2>
      
      <input
        placeholder="اسم المستخدم"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: "block", width: "100%", padding: "8px", marginBottom: "12px" }}
        required
      />
      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", padding: "8px", marginBottom: "12px" }}
        required
      />
      <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        دخول
      </button>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        ليس لديك حساب؟{" "}
        <button 
          type="button" 
          onClick={() => navigate("/signup")} 
          style={{ color: "blue", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "1em" }}
        >
          سجل الآن
        </button>
      </p>
        <p style={{ marginTop: "20px", textAlign: "center", color: "gray", fontSize: "0.9em" }}>
        Login as Admin: <br />
        اسم المستخدم: <strong>admin</strong> <br />
        كلمة المرور: <strong>admin</strong>
       </p>
    </form>
  );
}

export default Login;
