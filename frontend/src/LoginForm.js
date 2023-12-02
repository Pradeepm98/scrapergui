import React, { useState } from 'react';

const LoginForm = () => {
  // State to manage form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform authentication here (e.g., make an API request)
    try {
      // Assuming you have an authentication API endpoint
      const response = await fetch('https://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check if authentication was successful
      if (response.ok) {
        console.log('Login successful!');
        // You can redirect the user or update the state accordingly
      } else {
        console.error('Login failed:', data.message);
        // Handle authentication failure (show an error message, etc.)
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
