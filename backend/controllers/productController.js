const Product = require("../models/Product");


// Create Product
const createProduct = async (req, res) => {
  const { name, description, price, quantity, category, sku } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const product = new Product({
      name,
      description,
      price,
      quantity,
      category,
      sku,
      image
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    
    // Send the fetched products as JSON
    res.status(200).json(products);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
      const result = await Product.findByIdAndDelete(id);

      if (!result) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};




const updateProduct =async (req, res) =>{
  const { id } = req.params;
  const { name, description, price, quantity, category, sku } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
      const product = await Product.findByIdAndUpdate(
          id,
          {
              name,
              description,
              price,
              quantity,
              category,
              sku,
              image
          },
          { new: true } // Return the updated product
      );

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct
};
