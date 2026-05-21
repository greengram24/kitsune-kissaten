import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
    images: [],
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/reviews");
        setReviews(res.data);
      } catch (error) {
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("rating", formData.rating);
      data.append("comment", formData.comment);

      formData.images.forEach((img) => {
        data.append("images", img);
      });

      const token = localStorage.getItem("token");

      const res = await api.post("/reviews", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setReviews([...reviews, res.data]);
      setFormData({ rating: 5, comment: "", images: [] });
      setShowForm(false);

      toast.success("Review submitted!");
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: Array.from(e.target.files),
    });
  };

  // ✅ FIX: normalize image path
  const getImageUrl = (image) => {
    if (!image) return "";

    // already full URL
    if (image.startsWith("http")) return image;

    // already includes uploads
    if (image.startsWith("uploads/")) {
      return `${BASE_URL}/${image}`;
    }

    // default case (filename only)
    return `${BASE_URL}/uploads/${image}`;
  };

  const renderStars = (rating) => "⭐".repeat(rating);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 mt-6">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Customer Reviews
          </h1>

          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {showForm && (
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title">Share Your Experience</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <select
                  className="select select-bordered w-full"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rating: parseInt(e.target.value),
                    })
                  }
                >
                  <option value={5}>⭐⭐⭐⭐⭐</option>
                  <option value={4}>⭐⭐⭐⭐</option>
                  <option value={3}>⭐⭐⭐</option>
                  <option value={2}>⭐⭐</option>
                  <option value={1}>⭐</option>
                </select>

                <textarea
                  className="textarea textarea-bordered w-full"
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  required
                />

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={handleImageChange}
                />

                <button className="btn btn-primary" type="submit">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}

        {loading && <p>Loading...</p>}

        {!loading && reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between">
                  <h3 className="font-bold">
                    {review.user?.username || "Anonymous"}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-yellow-500">
                  {renderStars(review.rating)}
                </div>

                <p className="mt-2">{review.comment}</p>

                {/* ✅ FIXED IMAGE RENDERING */}
                {review.images?.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {review.images.map((img, i) => (
                      <img
                        key={i}
                        src={getImageUrl(img)}
                        alt="review"
                        className="w-24 h-24 object-cover rounded cursor-pointer"
                        onClick={() => setSelectedImage(getImageUrl(img))}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* IMAGE MODAL */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              className="max-w-3xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;