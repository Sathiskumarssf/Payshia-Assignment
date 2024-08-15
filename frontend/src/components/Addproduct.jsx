import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Addproduct = () => {

  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    sku: '',
    image: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({
      ...product,
      [name]: name === 'image' ? files[0] : value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!product.name) formErrors.name = "Product Name is required";
    if (!product.description) formErrors.description = "Description is required";
    if (!product.price || isNaN(product.price)) formErrors.price = "Valid Price is required";
    if (!product.quantity || isNaN(product.quantity)) formErrors.quantity = "Valid Quantity is required";
    if (!product.category) formErrors.category = "Category is required";
    if (!product.sku) formErrors.sku = "SKU is required";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }

    try {
     await axios.post('http://localhost:5000/api/v1/products/addproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },

      });

      navigate('/home');
      // Handle successful creation, e.g., redirect or show a success message
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-300 justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
        <form className="flex flex-col w-full max-w-sm" onSubmit={handleSubmit}>
          <input
            className="mb-4 p-2 border rounded border-slate-400"
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="text-red-500 text-xs mb-4">{errors.name}</p>}
          
          <textarea
            className="mb-4 p-2 border rounded border-slate-400"
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mb-4">{errors.description}</p>}
          
          <input
            className="mb-4 p-2 border rounded border-slate-400"
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />
          {errors.price && <p className="text-red-500 text-xs mb-4">{errors.price}</p>}
          
          <input
            className="mb-4 p-2 border rounded border-slate-400"
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
          {errors.quantity && <p className="text-red-500 text-xs mb-4">{errors.quantity}</p>}
          
          <input
            className="mb-4 p-2 border rounded border-slate-400"
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            required
          />
          {errors.category && <p className="text-red-500 text-xs mb-4">{errors.category}</p>}
          
          <input
            className="mb-4 p-2 border rounded border-slate-400"
            type="text"
            name="sku"
            placeholder="SKU"
            value={product.sku}
            onChange={handleChange}
            required
          />
          {errors.sku && <p className="text-red-500 text-xs mb-4">{errors.sku}</p>}
          
          <input
            className="mb-4 p-2 border rounded border-slate-400"
            type="file"
            name="image"
            onChange={handleChange}
          />
          
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
