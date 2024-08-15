import React, { useEffect, useState } from 'react';
import './home.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});
    const [errors, setErrors] = useState({});
    const [imageFile, setImageFile] = useState(null); // To store selected image file
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/products/displayproduct');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const validateProduct = () => {
        const { name, price, quantity, category } = editedProduct;
        let isValid = true;
        let newErrors = {};

        if (!name || name.trim() === '') {
            newErrors.name = 'Product name is required';
            isValid = false;
        }

        if (price == null || price <= 0) {
            newErrors.price = 'Price must be a positive number';
            isValid = false;
        }

        if (quantity == null || quantity < 0 || quantity === '') {
            newErrors.quantity = 'Quantity must be zero or a positive number';
            isValid = false;
        }

        if (!category || category.trim() === '') {
            newErrors.category = 'Category is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleEdit = (id) => {
        const product = products.find(p => p._id === id);
        setEditProductId(id);
        setEditedProduct(product);
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setImageFile(files[0]); // Store the selected file
        } else {
            setEditedProduct(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    

    const handleSave = async () => {
        if (!validateProduct()) {
            return; // If validation fails, don't proceed with saving
        }
    
        try {
            const formData = new FormData();
            formData.append('name', editedProduct.name || '');
            formData.append('description', editedProduct.description || '');
            formData.append('price', editedProduct.price || '');
            formData.append('quantity', editedProduct.quantity || '');
            formData.append('category', editedProduct.category || '');
            formData.append('sku', editedProduct.sku || '');
            if (imageFile) {
                formData.append('image', imageFile); // Append the image file
            }
    
            // Debugging: Inspect formData contents
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
                if (imageFile) {
                    console.log('File name:', imageFile.name);
                    console.log('File size:', imageFile.size);
                    console.log('File type:', imageFile.type);
                }
            }
    
            const response = await fetch(`http://localhost:5000/api/v1/products/updateproduct/${editProductId}`, {
                method: 'PUT',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Error updating product');
            }
    
            const updatedProduct = await response.json();
            setProducts(products.map(product =>
                product._id === editProductId ? updatedProduct : product
            ));
            setEditProductId(null);
        } catch (error) {
            console.error('Error updating product:', error.message);
        }
    };
    
    

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/products/deleteproduct${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting product');
            }

            // Update state to remove the deleted product
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    function addProduct() {
        navigate('/addproduct');
    }

    
    return (
        <div className="product-table">
            <button onClick={addProduct}>Add Product</button>
            <h1>Product List</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>
                                {product.image ? (
                                    <img
                                        src={`http://localhost:5000/uploads/${product.image}`}
                                        alt={product.name}
                                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                                    />
                                ) : (
                                    <p>No Image Available</p>
                                )}
                                {editProductId === product._id && (
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                    />
                                )}
                            </td>
                            <td>
                                {editProductId === product._id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedProduct.name || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    product.name
                                )}
                            </td>
                            <td>
                                {editProductId === product._id ? (
                                    <input
                                        type="number"
                                        name="price"
                                        value={editedProduct.price || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    `$${product.price}`
                                )}
                            </td>
                            <td>
                                {editProductId === product._id ? (
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={editedProduct.quantity || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    product.quantity
                                )}
                            </td>
                            <td>
                                {editProductId === product._id ? (
                                    <input
                                        type="text"
                                        name="category"
                                        value={editedProduct.category || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    product.category
                                )}
                            </td>
                            <td>
                                {editProductId === product._id ? (
                                    <>
                                        <button onClick={handleSave}>Save</button>
                                        <button onClick={() => setEditProductId(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(product._id)}>Edit</button>
                                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;