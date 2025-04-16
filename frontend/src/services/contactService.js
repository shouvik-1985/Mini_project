// src/services/contactService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/contacts/';

const getAllContacts = () => {
  return axios.get(API_URL);
};

const getContactById = (id) => {
  return axios.get(`${API_URL}${id}/`);
};

const createContact = (contactData) => {
  return axios.post(API_URL, contactData);
};

const updateContact = (id, contactData) => {
  return axios.put(`${API_URL}${id}/`, contactData);
};

const deleteContact = (id) => {
  return axios.delete(`${API_URL}${id}/`);
};

export default {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
