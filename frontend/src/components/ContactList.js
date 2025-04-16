// src/components/ContactList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import contactService from '../services/contactService';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactService.getAllContacts();
      setContacts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contacts. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.deleteContact(id);
        // Remove deleted contact from state
        setContacts(contacts.filter(contact => contact.id !== id));
      } catch (err) {
        setError('Failed to delete contact. Please try again.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5" role="alert">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Contacts</h2>
        <Link to="/add" className="btn btn-success">Add New Contact</Link>
      </div>
      
      {contacts.length === 0 ? (
        <div className="alert alert-info">No contacts found. Add a new contact to get started.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.first_name} {contact.last_name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone_number}</td>
                  <td>{contact.address}</td>
                  <td>
                    <Link to={`/edit/${contact.id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                    <button onClick={() => handleDelete(contact.id)} className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactList;
