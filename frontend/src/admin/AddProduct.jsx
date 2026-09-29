import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: ''
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      alert('Please login first');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('stockQuantity', formData.stockQuantity);

      if (image) {
        data.append('image', image);
      }

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        body: data
      });

      const contentType = res.headers.get('content-type');

      let result;

      if (contentType && contentType.includes('application/json')) {
        result = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || 'Server returned an invalid response');
      }

      if (!res.ok) {
        throw new Error(result.message || 'Failed to create product');
      }

      alert('Product added successfully!');

      navigate('/admin/products');

    } catch (error) {
      console.error('Add product error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Add Product</h2>

      <form onSubmit={handleSubmit} style={formStyle}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="stockQuantity"
          placeholder="Stock Quantity"
          value={formData.stockQuantity}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <div style={imageBoxStyle}>
          <label style={labelStyle}>
            Upload Product Image (Cloudinary)
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={fileInputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn"
          style={buttonStyle}
        >
          {loading ? 'Uploading & Creating...' : 'Publish Product'}
        </button>

      </form>
    </div>
  );
};

const containerStyle = {
  maxWidth: '600px',
  margin: '40px auto',
  background: '#0A123F',
  padding: '40px',
  borderRadius: '16px',
  border: '1px solid rgba(242, 193, 67, 0.15)',
  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)'
};

const headingStyle = {
  color: '#FCE475',
  marginBottom: '25px',
  textAlign: 'center'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const inputStyle = {
  padding: '14px',
  background: '#06102F',
  border: '1px solid #1A2550',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '15px',
  outline: 'none'
};

const imageBoxStyle = {
  padding: '15px',
  border: '1px dashed #F2C143',
  borderRadius: '8px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '10px',
  color: '#C7CBD9'
};

const fileInputStyle = {
  color: '#fff'
};

const buttonStyle = {
  marginTop: '10px'
};

export default AddProduct;