import { useState } from 'react';
import {Link, useNavigate, Navigate } from 'react-router-dom';
import { forgotPassword, loginUser } from "./APIs.js"; // Assuming api.js contains the async functions

const Login = () => {
  const navigate = useNavigate();
  const authStatus = localStorage.getItem("authStatus")
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [email, setEmail] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

     const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = await loginUser(formData);
  //     console.log('Login successful', data);
  //     // Handle successful login here (e.g., save token, redirect, etc.)
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // }; const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { userToken } = await loginUser(formData);
            localStorage.setItem("authStatus", "authenticated");
            localStorage.setItem("authToken", userToken);
            navigate("/");
        } catch (error) {
            console.log("Error", error);
            alert(error.message)
        }
    };

    if (authStatus === "authenticated") {
        console.log("Already Authenticated");
        return <Navigate to={"/"} />;
    }


  const handleForgotPassword = async () => {
    try {
      await forgotPassword(email);
      setForgotPasswordSuccess(true);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-1">
      <h2>Login</h2>
      <div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="identifier" className="form-label">Email or Mobile</label>
              <input
                type="text"
                className="form-control"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <div className="mt-3">
            <a href="#forgot-password" className="text-decoration-none" data-bs-toggle="modal" data-bs-target="#forgotPasswordModal" style={{float: "left"}}>Forgot Password?</a>
          </div>
          <Link to="/register" style={{float:"right"}} className="">Go to Register</Link>
        </div>
      </div>


      <div className="modal fade" id="forgotPasswordModal" tabIndex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="forgotPasswordModalLabel">Forgot Password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {forgotPasswordSuccess ? (
                <div className="alert alert-success">Password reset link sent to your email</div>
              ) : (
                <>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleForgotPassword}>Send Reset Link</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
