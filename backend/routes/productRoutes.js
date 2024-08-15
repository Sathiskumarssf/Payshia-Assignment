
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createProduct } = require('../controllers/productController');
const { getProducts } = require('../controllers/productController');
const { deleteProduct } = require('../controllers/productController');

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Specify the directory for storing images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the original file extension
  }
});

const upload = multer({ storage: storage });

// Route for creating a product
router.post('/addproduct', upload.single('image'), createProduct);
router.get('/displayproduct',getProducts);
router.delete('/deleteproduct:id',deleteProduct);

module.exports = router; 
