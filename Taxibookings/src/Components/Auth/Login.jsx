import React, { useState  , useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";


const API_BASE = "https://server-node-eef9.onrender.com";

function Login() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
 
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("❌ Email and Password are required");
      setLoading(false); 
      return;
    }

    try {
      console.log("Sending Login Request:", { email, password });

      const response = await fetch(`${API_BASE}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (!response.ok || !data.token) {
        throw new Error(data.error || "Login Failed ❌");
      }

      toast.success("✅ Login Successful");
      localStorage.setItem("token", data.token);
      localStorage.setItem("role",data.role);

    
       if(data.role === "Student"){
         navigate('/StudentRoute');
       }
       else if(data.role === "Teacher"){
         navigate('/TeacherRoute');
       }
       else{
         navigate('/homepage');
       }

      window.dispatchEvent(new Event("storage"));

    } catch (error) {
      toast.error(error.message || "Login failed");
      console.error("Login Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='register-container'>
      <div className="register">
        <div className="form-login">
          <form className='form-block' autoComplete='off' onSubmit={handleLogin}>
          <h5 className="titilereg">Signin <br /><span className="actext">Login to your SteadyDusk account</span></h5>

            <input 
              className='form-item' 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              autoComplete='off' 
            />

            <input 
              className='form-item' 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              autoComplete='new-password' 
            />

            <button type="submit" className="sub" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div><Toaster position="top-right"
           reverseOrder={false}
           color='#fff'
          /></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login; 
