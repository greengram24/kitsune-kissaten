import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";

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
      const formDataToSend = new FormData();
      formDataToSend.append("rating", formData.rating);
      formDataToSend.append("comment", formData.comment);
      
      if (formData.images.length > 0) {
        formData.images.forEach((image) => {
          formDataToSend.append("images", image);
        });
      }

      const token = localStorage.getItem("token");
      const res = await api.post("/reviews", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setReviews([...reviews, res.data]);
      setFormData({ rating: 5, comment: "", images: [] });
      setShowForm(false);
      toast.success("Review submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit review. Please login first.");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 mt-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Customer Reviews</h1>
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
              <h2 className="card-title text-primary text-2xl">Share Your Experience</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Rating</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ - Excellent</option>
                    <option value={4}>⭐⭐⭐⭐ - Very Good</option>
                    <option value={3}>⭐⭐⭐ - Good</option>
                    <option value={2}>⭐⭐ - Fair</option>
                    <option value={1}>⭐ - Poor</option>
                  </select>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Your Review</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Upload Images (optional, max 5)</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}

        {loading && <div className="text-center text-primary py-10">Loading reviews...</div>}

        {!loading && reviews.length === 0 && (
          <div className="text-center text-gray-500 py-10">No reviews yet. Be the first to review!</div>
        )}

        {!loading && reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review._id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{review.user?.username || "Anonymous"}</h3>
                      <div className="text-yellow-500 text-xl">{renderStars(review.rating)}</div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-4">{review.comment}</p>
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {review.images.map((image, index) => {
                        const imageUrl = `http://localhost:5001/uploads/${image}`;
                        return (
                          <img
                            key={index}
                            src={imageUrl}
                            alt="Review image"
                            className="w-24 h-24 object-cover rounded-lg cursor-pointer transition hover:opacity-80"
                            onClick={() => setSelectedImage(imageUrl)}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full overflow-hidden rounded-3xl bg-base-100 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Selected review"
              className="w-full max-h-[80vh] object-contain bg-black"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ReviewsPage;
