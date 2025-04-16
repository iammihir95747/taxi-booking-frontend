import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";

const API_BASE = "http://localhost:5001";

const Register = () => {
  const [searchparams] = useSearchParams();
  // Check if 'role' is passed through the URL query params, otherwise default to 'user'
  const roleFromURL = searchparams.get('role') || 'user'; 

  const [formData, setFormData] = useState({
    name: "",        // Changed 'username' to 'name' based on backend schema
    role: roleFromURL,  // Set the role to either 'user' or whatever is passed in the URL
    email: "",
    password: "",
    phoneNumber: "", // Changed from 'phone' to 'phoneNumber' based on backend schema
    agreeTerms: false
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed ❌");

      toast.success("✅ Registration Successful!");
      setFormData({
        name: "",        // Clear the fields after successful registration
        role: roleFromURL,  // Ensure the role persists after successful registration
        email: "",
        password: "",
        phoneNumber: ""  // Clear phone number after registration
      });

      console.log(data, formData);

    } catch (error) {
      toast.error(error.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register">
        <form className="form-block" autoComplete="off" onSubmit={handleSubmit}>
          <center>
            <h5 className="titilereg">
              SignUp <br />
              <span className="actext">Welcome to SteadyDuskApp</span>
            </h5>
          </center>
          <div>
            <input
              className="form-item"
              type="text"
              name="name"  // Changed 'username' to 'name'
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <input
              className="form-item"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <input
              className="form-item"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div>
            <input
              className="form-item"
              type="text"
              name="phoneNumber"  // Changed from 'phone' to 'phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter PhoneNumber"
              required
            />
          </div>

          <button className="sub" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <div>
            <Toaster position="top-right" reverseOrder={false} />
          </div>
          <div className="policy">
            By clicking Sign up you agree to our
            <a href=""> Terms of Use</a> and <a href="">Privacy policy.</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
