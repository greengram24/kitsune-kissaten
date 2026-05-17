import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";

const AdminPage = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("menu");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "drink",
    image: "",
    isAvailable: true,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    role: "customer",
  });

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const userData =
      localStorage.getItem("user") || sessionStorage.getItem("user") || "{}";
    const user = JSON.parse(userData);

    if (!token || user.role !== "admin") {
      toast.error("Access denied. Admin login required.");
      navigate("/login");
      return;
    }

    const fetchMenuItems = async () => {
      try {
        const res = await api.get("/menu", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMenuItems(res.data);
      } catch (error) {
        toast.error("Failed to load menu items");
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await api.get("/reviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(res.data);
      } catch (error) {
        toast.error("Failed to load reviews");
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await api.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (error) {
        toast.error("Failed to load users");
      }
    };

    Promise.all([fetchMenuItems(), fetchReviews(), fetchUsers()]).finally(() => {
      setLoading(false);
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (editingItem) {
        const res = await api.put(`/menu/${editingItem._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMenuItems(
          menuItems.map((item) => (item._id === editingItem._id ? res.data : item))
        );
        toast.success("Menu item updated successfully!");
      } else {
        const res = await api.post("/menu", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMenuItems([...menuItems, res.data]);
        toast.success("Menu item added successfully!");
      }
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "drink",
        image: "",
        isAvailable: true,
      });
      setEditingItem(null);
      setShowForm(false);
    } catch (error) {
      toast.error("Failed to save menu item");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      isAvailable: item.isAvailable,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        await api.delete(`/menu/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMenuItems(menuItems.filter((item) => item._id !== id));
        toast.success("Menu item deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete menu item");
      }
    }
  };

  const handleReviewDelete = async (id) => {
    if (window.confirm("Delete this review?")) {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        await api.delete(`/reviews/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(reviews.filter((review) => review._id !== id));
        toast.success("Review deleted successfully");
      } catch (error) {
        toast.error("Failed to delete review");
      }
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUserFormData({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await api.put(`/users/${selectedUser._id}`, userFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.map((user) => (user._id === selectedUser._id ? res.data : user)));
      toast.success("User updated successfully");
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleUserDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        await api.delete(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
        if (selectedUser?._id === id) {
          setSelectedUser(null);
        }
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "drink",
      image: "",
      isAvailable: true,
    });
    setEditingItem(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        <div className="flex flex-col gap-6 mb-8 md:flex-row md:items-center md:justify-between">
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <div className="btn-group">
            <button
              className={`btn ${activeTab === "menu" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setActiveTab("menu")}
            >
              Menu
            </button>
            <button
              className={`btn ${activeTab === "reviews" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
            <button
              className={`btn ${activeTab === "users" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
          </div>
        </div>

        {activeTab === "menu" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-primary">Menu Management</h2>
              <button
                className="btn btn-primary"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Cancel" : "Add New Item"}
              </button>
            </div>

            {showForm && (
              <div className="card bg-base-100 shadow-xl mb-8">
                <div className="card-body">
                  <h2 className="card-title text-primary text-2xl">
                    {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered w-full"
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">
                          <span className="label-text">Price (₱)</span>
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="input input-bordered w-full"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="label">
                          <span className="label-text">Category</span>
                        </label>
                        <select
                          className="select select-bordered w-full"
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                          }
                        >
                          <option value="drink">Drink</option>
                          <option value="food">Food</option>
                          <option value="dessert">Dessert</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">Image URL</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={formData.isAvailable}
                        onChange={(e) =>
                          setFormData({ ...formData, isAvailable: e.target.checked })
                        }
                      />
                      <label className="label-text">Available</label>
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="btn btn-primary">
                        {editingItem ? "Update" : "Add"}
                      </button>
                      <button type="button" className="btn btn-ghost" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {loading && <div className="text-center text-primary py-10">Loading menu...</div>}

            {!loading && menuItems.length === 0 && (
              <div className="text-center text-gray-500 py-10">No menu items found</div>
            )}

            {!loading && menuItems.length > 0 && (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Available</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-secondary">{item.category}</span>
                        </td>
                        <td className="font-bold">₱{item.price}</td>
                        <td>
                          {item.isAvailable ? (
                            <span className="badge badge-success">Available</span>
                          ) : (
                            <span className="badge badge-error">Out of Stock</span>
                          )}
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              className="btn btn-sm btn-info"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-error"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {activeTab === "reviews" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-primary">Review Moderation</h2>
            </div>
            {reviews.length === 0 ? (
              <div className="text-center text-gray-500 py-10">No reviews found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Rating</th>
                      <th>Comment</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <tr key={review._id}>
                        <td>{review.user?.username || review.user?.email || "Unknown"}</td>
                        <td>{review.rating}</td>
                        <td>{review.comment}</td>
                        <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-error"
                            onClick={() => handleReviewDelete(review._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-primary">User Management</h2>
            </div>

            {selectedUser && (
              <div className="card bg-base-100 shadow-xl mb-8">
                <div className="card-body">
                  <h3 className="card-title">Edit User</h3>
                  <form onSubmit={handleUserUpdate} className="space-y-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Username</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={userFormData.username}
                        onChange={(e) =>
                          setUserFormData({ ...userFormData, username: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        className="input input-bordered w-full"
                        value={userFormData.email}
                        onChange={(e) =>
                          setUserFormData({ ...userFormData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">Role</span>
                      </label>
                      <select
                        className="select select-bordered w-full"
                        value={userFormData.role}
                        onChange={(e) =>
                          setUserFormData({ ...userFormData, role: e.target.value })
                        }
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => setSelectedUser(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {users.length === 0 ? (
              <div className="text-center text-gray-500 py-10">No users found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className="badge badge-secondary">{user.role}</span>
                        </td>
                        <td>
                          <div className="flex gap-2 flex-wrap">
                            <button
                              className="btn btn-sm btn-info"
                              onClick={() => handleUserSelect(user)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-error"
                              onClick={() => handleUserDelete(user._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminPage;
