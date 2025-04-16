import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import EditContact from './components/EditContact';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />                {/* Home page */}
          <Route path="/contacts" element={<ContactList />} /> {/* Contacts list */}
          <Route path="/add" element={<ContactForm />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
