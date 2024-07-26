import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Box, Typography, Button } from '@mui/material';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import './RegisterForm.css';

const RegisterForm = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      new Noty({
        type: 'error',
        layout: 'topRight',
        text: 'Passwords do not match',
        timeout: 3000,
      }).show();
      return;
    }

    try {
      const { username, email, password } = formData;
      const response = await axios.post('http://localhost:8080/users', {
        username,
        email,
        password,
      });
      new Noty({
        type: 'success',
        layout: 'topRight',
        text: 'Registration successful',
        timeout: 3000,
      }).show();
      navigate('/login');
    } catch (error) {
      new Noty({
        type: 'error',
        layout: 'topRight',
        text: error.response ? error.response.data : error.message,
        timeout: 3000,
      }).show();
    }
  };

  return (
    <div className='register-page'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className='input-box'>
            <input
              type="text"
              name="username"
              placeholder='Username'
              value={formData.username}
              onChange={handleInputChange}
              required
              aria-label="Username"
            />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input
              type="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleInputChange}
              required
              aria-label="Email"
            />
            <FaEnvelope className='icon' />
          </div>
          <div className='input-box'>
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleInputChange}
              required
              aria-label="Password"
            />
            <FaLock className='icon' />
          </div>
          <div className='input-box'>
            <input
              type="password"
              name="confirmPassword"
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              aria-label="Confirm Password"
            />
            <FaLock className='icon' />
          </div>
          <div className='terms-box'>
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={handleTermsChange}
              required
            />
            <label htmlFor="terms">
              I agree to the <span className="terms-link" onClick={() => setOpenModal(true)}>Terms and Conditions</span>
            </label>
          </div>
          <button type='submit' disabled={!termsAccepted}>Register</button>
          <div className='login-link'>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box 
          className='modal-box'
          sx={{ width: 300, p: 3, borderRadius: 2, boxShadow: 24 }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Terms and Conditions
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            <h3>By clicking "Accept", you agree to the following terms and conditions:</h3>
            <p>1. You acknowledge that you have read and understood all the terms and conditions.</p>
            <p>2. You agree to comply with all the rules and guidelines set forth by the platform.</p>
            <p>3. You consent to the processing of your personal data in accordance with our privacy policy.</p>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => {
                setTermsAccepted(true);
                setOpenModal(false);
              }}
              sx={{ mt: 2 }}
            >
              Accept
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default RegisterForm;
