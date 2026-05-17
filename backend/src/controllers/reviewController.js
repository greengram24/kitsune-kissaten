import Review from "../models/Review.js";

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate("user", "username email");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const uploadedImages = req.files ? req.files.map((file) => file.filename) : [];

    const review = await Review.create({
      user: req.user._id,
      rating,
      comment,
      images: uploadedImages,
    });

    const createdReview = await Review.findById(review._id).populate(
      "user",
      "username email"
    );

    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (review) {
      // Check if user owns the review
      if (review.user.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this review" });
      }

      review.rating = req.body.rating || review.rating;
      review.comment = req.body.comment || review.comment;
      if (req.files && req.files.length > 0) {
        review.images = req.files.map((file) => file.filename);
      } else {
        review.images = req.body.images || review.images;
      }

      const updatedReview = await review.save();
      const populatedReview = await Review.findById(updatedReview._id).populate(
        "user",
        "username email"
      );
      res.json(populatedReview);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (review) {
      // Check if user owns the review or is admin
      if (
        review.user.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this review" });
      }

      await review.deleteOne();
      res.json({ message: "Review removed" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
