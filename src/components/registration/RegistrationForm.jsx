import React, { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Link } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [submitted, setSubmitted] = useState(false);
  
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _formData = { ...formData };
    _formData[`${name}`] = val;

    setFormData(_formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
      
    if (formData.username && formData.email && formData.password && formData.password === formData.confirmPassword) {
      try {
        const response = await axios.post('http://localhost:3000/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        console.log('Form submitted', response.data);
      } catch (error) {
        console.error('Error submitting form', error);
      }
    }
  };

  return (
    <div className="form-demo">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor="username">Username</label>
            <InputText
              id="username"
              value={formData.username}
              onChange={(e) => onInputChange(e, 'username')}
              required
              className={classNames({ 'p-invalid': submitted && !formData.username })}
            />
            {submitted && !formData.username && <small className="p-error">Username is required.</small>}
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              value={formData.email}
              onChange={(e) => onInputChange(e, 'email')}
              required
              className={classNames({ 'p-invalid': submitted && !formData.email })}
            />
            {submitted && !formData.email && <small className="p-error">Email is required.</small>}
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <Password
              id="password"
              value={formData.password}
              onChange={(e) => onInputChange(e, 'password')}
              required
              toggleMask
              className={classNames({ 'p-invalid': submitted && !formData.password })}
            />
            {submitted && !formData.password && <small className="p-error">Password is required.</small>}
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Password
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => onInputChange(e, 'confirmPassword')}
              required
              toggleMask
              className={classNames({ 'p-invalid': submitted && formData.password !== formData.confirmPassword })}
            />
            {submitted && formData.password !== formData.confirmPassword && (
              <small className="p-error">Passwords do not match.</small>
            )}
          </div>
          <Button type="submit" label="Register" className="mt-2" />
          <div className="mt-2">
            <Link to="/login">Already have an account? Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
