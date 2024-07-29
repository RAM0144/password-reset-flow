import { useState } from "react"
import { registerUser } from "./APIs.js";
import {Link, Navigate, useNavigate } from "react-router-dom";

const initialState = {
    name: "",
    mobile: "",
    email: "",
    password: "",
    dob: "",
}

const Register = () => {
    const navigate = useNavigate();
    const authStatus = localStorage.getItem("authStatus");
    const [formData, setFormData] = useState(initialState);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await registerUser(formData);
        // reset the formdata
        setFormData(initialState);

        navigate("/login");
    };
     
    if (authStatus === "authenticated") {
       console.log("Already Authenticated");
       return <Navigate to={"/"} />
    }

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                   type="text"
                   className="form-control"
                   name="name"
                   value={formData.name}
                   onChange={handleChange}
                   required
                  />
                </div>
                <div className="form-group">
                  <label>Mobile</label>
                  <input 
                    type="tel"
                    className="form-control"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <label>Date Of Birth</label>
                    <input 
                     type="date"
                     className="form-control"
                     name="dob"
                     value={formData.dob}
                     onChange={handleChange}
                     required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-4"
                style={{float: "left"}}>Register</button>
                <Link to="/login" style={{float: "right"}} className="mt-4">Go to Login</Link>
            </form>
        </div>
    )

};

export default Register;