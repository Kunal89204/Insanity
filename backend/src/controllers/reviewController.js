const Review = require("../models/review.model");

const createReview = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productId, content } = req.body;

    // Check if the user already has a review for this product
    const existingReview = await Review.findOne({
      user: userId,
      product: productId,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "Review already exists for this product" });
    }

    // Create new review
    const newReview = new Review({
      user: userId,
      product: productId,
      content,
    });

    await newReview.save();

    res.status(201).json({
      message: "Review created successfully",
      review: newReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the review",
      error: error.message,
    });
  }
};

const getReview = async (req, res) => {
  try {
    userId = req.params.userId;
    const { productId } = req.body;

    const review = await Review.findOne({ user: userId, product: productId });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      review: review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving the review",
      error: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { userId } = req.params;
    const { content, productId } = req.body;

    const updatedReview = await Review.findOneAndUpdate(
      { user: userId, product: productId },
      { $set: { content, isEdited: true } }, // Set isEdited to true when updating content
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the review",
      error: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { userId } = req.params;
    const productId = req.body;

    const deletedReview = await Review.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Review deleted successfully",
      review: deletedReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while deleting the review",
      error: error.message,
    });
  }
};
module.exports = { createReview, getReview, updateReview, deleteReview };
