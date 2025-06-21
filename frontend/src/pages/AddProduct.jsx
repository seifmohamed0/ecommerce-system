import { useState, useEffect } from "react";
import api from "../api/axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/api/categories?page=0&size=100")
      .then((res) => {
        console.log("Fetched categories:", res.data);
        setCategories(res.data.content || []);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/api/products",
        {
          name,
          description,
          price: parseFloat(price),
          categoryId: Number(categoryId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added!");
      setName("");
      setDescription("");
      setPrice("");
      setCategoryId("");
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err);
      alert("Error adding product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        min={1}
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {Array.isArray(categories) &&
          categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddProduct;
