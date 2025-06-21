import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import WishlistPage from "./pages/WishlistPage";
import Signup from "./pages/SignUp";
import UsersList from "./pages/UsersList";
import { jwtDecode } from "jwt-decode"; 

const AdminRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token); 
    return decoded.role === "ADMIN" ? element : <Navigate to="/home" />;
  } catch {
    return <Navigate to="/" />;
  }
};

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/add-category" element={<PrivateRoute element={<AddCategory />} />} />
        <Route path="/add-product" element={<PrivateRoute element={<AddProduct />} />} />
        <Route path="/products" element={<PrivateRoute element={<ProductPage />} />} />
        <Route path="/wishlist" element={<PrivateRoute element={<WishlistPage />} />} />
        <Route path="/users" element={<AdminRoute element={<UsersList />} />} />
      </Routes>
    </Router>
  );
}

export default App;
