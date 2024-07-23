import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Ensure you have your own CSS for styling

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const onInputChange = (e, name) => {
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (formData.username && formData.password) {
      try {
        // Replace 'http://localhost:3000/users' with your JSON server endpoint for user data
        const response = await axios.get('http://localhost:3000/register');

        // Check if response contains data and iterate through users to find a match
        if (response.data && response.data.length > 0) {
          const user = response.data.find(
            (user) => user.username === formData.username && user.password === formData.password
          );

          if (user) {
            setLoginSuccess(true);
            setLoginError('');
          } else {
            setLoginError('Invalid username or password');
          }
        } else {
          setLoginError('No users found. Please register first.');
        }
      } catch (error) {
        console.error('Error logging in', error);
        setLoginError('Error logging in. Please try again.');
      }
    }
  };

  return (
    <div className="form-demo1">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor="username">Username</label>
            <InputText
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => onInputChange(e, 'username')}
              required
              className={classNames({ 'p-invalid': submitted && !formData.username })}
            />
            {submitted && !formData.username && <small className="p-error">Username is required.</small>}
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <Password
              id="password"
              value={formData.password}
              onChange={(e) => onInputChange(e, 'password')}
              required
              className={classNames({ 'p-invalid': submitted && !formData.password })}
            />
            {submitted && !formData.password && <small className="p-error">Password is required.</small>}
          </div>
          {loginError && <div className="error-message">{loginError}</div>}
          <Button type="submit" label="Login" className="mt-2" />
          <div className="mt-2">
            <Link to="/register">Don't have an account? Register here</Link>
          </div>
        </form>
      </div>

      {/* Popup for successful login */}
      {loginSuccess && (
        <div className="popup">
          <div className="popup-content">
            <h3>Login Successful</h3>
            <Button label="Close" className="p-button-secondary mt-2" onClick={() => setLoginSuccess(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
