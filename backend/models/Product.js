const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null, // Optional field
  },
});

// Add any pre-save hooks or methods here
productSchema.pre("save", async function (next) {
  // Example: You can add logic here if needed, such as validation or transformation
  next();
});

// Compile the schema into a model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
