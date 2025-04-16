import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Pages/Navbar.jsx';
import Register from './Components/Auth/Regiter.jsx';
import Login from './Components/Auth/Login.jsx';


function Layout() {
    const location = useLocation();
    const hideHome = location.pathname === '/category' || location.pathname === '/register' || location.pathname === '/login'; 
    
    return (
        <>
            {!hideHome && <Navbar />}
            <Routes>
                <Route path="/" element={<Navbar />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                
            </Routes>
        </>
    );
}
const App = () => {
    return (
        <Router>
            <Layout />
        </Router>
    );
};

export default App;
