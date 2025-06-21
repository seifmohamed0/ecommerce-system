import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const token = localStorage.getItem("token");
  let isAdmin = false;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.role === "ADMIN";
    } catch (error) {
      console.error("توكن غير صالح");
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🏠 Welcome to the Dashboard</h1>

      <nav>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: "2em" }}>
          <li><Link to="/add-category">➕ Add Category</Link></li>
          <li><Link to="/add-product">📦 Add Product</Link></li>
          <li><Link to="/products">🛒 View Products</Link></li>
          <li><Link to="/wishlist">❤️ المفضلة</Link></li>
          {isAdmin && (
            <li><Link to="/users">👥 قائمة المستخدمين</Link></li>
          )}
        </ul>
      </nav>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        🔓 Logout
      </button>
    </div>
  );
}

export default Home;
