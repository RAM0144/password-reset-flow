
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import PropTypes from "prop-types";
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login';

const ProtectedRoute = ({ routeElement }) => {

    const authStatus = localStorage.getItem("authStatus");

    if (authStatus === "authenticated") {
      return routeElement;
    }
    return <Navigate to="/login" />
};

ProtectedRoute.propTypes = {
  routeElement: PropTypes.element,
};

function App() {
  return (

      <BrowserRouter>
       <Routes>
        <Route path="/" element={<ProtectedRoute routeElement={<Home />} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
       </Routes>
      </BrowserRouter>
      
  )
}

export default App
