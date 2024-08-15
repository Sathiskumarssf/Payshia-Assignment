import React, { useEffect, useState } from 'react';
import './home.css';

const Home = () => {
    const [products, setProducts] = useState([]);

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

    const handleEdit = (id) => {
        // Handle edit action (e.g., navigate to edit form)
        console.log('Edit product', id);
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


    return (
        <div className="product-table  ">
            <h1>Product List</h1>
            <table className='table '>
                <thead>
                    <tr> 
                        <th>image</th>
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
                                    style={{ maxWidth: '100px', maxHeight: '100px' }} // Optional styling
                                />
                            ) : (
                                <p>No Image Available</p>
                            )}
                            </td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.category}</td>
                            <td>
                                <button onClick={() => handleEdit(product._id)}>Edit</button>
                                <button onClick={() => handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
