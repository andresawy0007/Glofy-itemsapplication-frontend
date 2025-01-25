import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../fetch_config/ApplicationBackendAxios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      //navigate("/"); 
    }
  }, [navigate]); 



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Field validation
    if (!formData.email || !formData.password) {
        setErrorMessage("E-mail and password are required.");
        return false;
    }
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        setErrorMessage("E-mail format is invalid.")
        return false;
    }

    let email = formData.email;
    let password = formData.password;

    try {
        const response = await Axios.post('/login', { email, password });
        localStorage.setItem('token', response.data.token); // Save token in local storage
        //setIsAuthenticated(true); // Update authentication status
    } catch (err) {
        console.log(err)
        setErrorMessage('Invalid credentials');
    }

    window.location.reload();

    return true;
    console.log("Login submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="primary-btn btn login-button">
              Login
            </button>
          </form>
        ) : (
          <div className="login-success">
            <h2>Login successful!</h2>
          </div>
        )}
      </div>
    </div>
  );
}
