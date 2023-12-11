import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Import the CSS file

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const token = response.data.token;

      // Save the token to localStorage or cookies for future requests
      localStorage.setItem('token', token);

      // Update the state or trigger a callback to update the authenticated status
      onLogin();
    } catch (error) {
      setErrorMessage('Invalid email or password');
      console.error('Login failed', error);
    }
  };

  return (
    <div className="LoginForm-container">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="label" htmlFor="email">Email:</label>
          <input className="input" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="password">Password:</label>
          <input className="input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="button" type="submit">Login</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default LoginForm;