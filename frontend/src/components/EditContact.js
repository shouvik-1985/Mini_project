// src/components/EditContact.js
import React, { useState, useEffect } from 'react';
import contactService from '../services/contactService';
import { useNavigate, useParams } from 'react-router-dom';

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await contactService.getContactById(id);
        setFormData(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to fetch contact details.' });
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.first_name.trim()) {
      tempErrors.first_name = "First name is required";
      isValid = false;
    }

    if (!formData.last_name.trim()) {
      tempErrors.last_name = "Last name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.phone_number.trim()) {
      tempErrors.phone_number = "Phone number is required";
      isValid = false;
    } else if (!/^[0-9\-\+\(\) ]+$/.test(formData.phone_number)) {
      tempErrors.phone_number = "Phone number format is invalid";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitting(true);
      try {
        await contactService.updateContact(id, formData);
        navigate('/');
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        } else {
          setErrors({ general: 'Something went wrong. Please try again.' });
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">First Name</label>
          <input
            type="text"
            className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">Last Name</label>
          <input
            type="text"
            className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">Phone Number</label>
          <input
            type="text"
            className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
          {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
          />
        </div>
        
        {errors.general && (
          <div className="alert alert-danger" role="alert">
            {errors.general}
          </div>
        )}
        
        <div className="d-flex gap-2">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : 'Update Contact'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
