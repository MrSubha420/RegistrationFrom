import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('App Component', () => {
  it('renders LoginForm component', () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders RegistrationForm component', () => {
    render(
      <Router>
        <RegistrationForm />
      </Router>
    );

    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('submits login form with valid credentials', async () => {
    const users = [{ username: 'testuser', password: 'password' }];
    axios.get.mockResolvedValue({ data: users });

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Login'));

    expect(await screen.findByText('Login Successful')).toBeInTheDocument();
  });

  it('shows error message on login form with invalid credentials', async () => {
    const users = [{ username: 'testuser', password: 'password' }];
    axios.get.mockResolvedValue({ data: users });

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Login'));

    expect(await screen.findByText('Invalid username or password')).toBeInTheDocument();
  });

  it('submits registration form with valid data', async () => {
    axios.post.mockResolvedValue({ data: { message: 'User registered successfully' } });

    render(
      <Router>
        <RegistrationForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Register'));

    expect(await screen.findByText('Form submitted')).toBeInTheDocument();
  });

  it('shows error message on registration form with unmatched passwords', async () => {
    render(
      <Router>
        <RegistrationForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'differentpassword' } });
    fireEvent.click(screen.getByText('Register'));

    expect(await screen.findByText('Passwords do not match.')).toBeInTheDocument();
  });
});
