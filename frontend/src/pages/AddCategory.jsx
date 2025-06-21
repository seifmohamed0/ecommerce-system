import { useState, useEffect } from "react";
import api from "../api/axios";

function AddCategory() {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/api/categories?page=0&size=100")
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
      await api.post("/api/categories", {
        name,
        parentId: parentId ? Number(parentId) : null,
      });
      alert("Category added!");
      setName("");
      setParentId("");
      const res = await api.get("/api/categories?page=0&size=100");
      setCategories(res.data.content || []);
    } catch (err) {
      console.error("Error adding category:", err);
      alert("Error adding category");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Category</h2>
      <input
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={parentId} onChange={(e) => setParentId(e.target.value)}>
        <option value="">No Parent</option>
        {Array.isArray(categories) && categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddCategory;
