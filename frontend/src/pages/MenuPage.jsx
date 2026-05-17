import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await api.get("/menu");
        setMenuItems(res.data);
      } catch (error) {
        toast.error("Failed to load menu items");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems = filter === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === filter);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        <h1 className="text-4xl font-bold text-primary mb-8">Our Menu</h1>
        
        <div className="flex gap-4 mb-8">
          <button 
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`btn ${filter === 'drink' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilter('drink')}
          >
            Drinks
          </button>
          <button 
            className={`btn ${filter === 'food' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilter('food')}
          >
            Food
          </button>
          <button 
            className={`btn ${filter === 'dessert' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilter('dessert')}
          >
            Desserts
          </button>
        </div>

        {loading && <div className="text-center text-primary py-10">Loading menu...</div>}

        {!loading && filteredItems.length === 0 && (
          <div className="text-center text-gray-500 py-10">No menu items found</div>
        )}

        {!loading && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item._id} className="card bg-base-100 shadow-xl">
                {item.image && (
                  <figure className="px-4 pt-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="rounded-xl h-48 w-full object-cover"
                    />
                  </figure>
                )}
                <div className="card-body">
                  <h2 className="card-title text-primary">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-primary">₱{item.price}</span>
                    {!item.isAvailable && (
                      <span className="badge badge-error">Out of Stock</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default MenuPage;
