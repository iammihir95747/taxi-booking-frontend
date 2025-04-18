import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const API_BASE = "http://localhost:5001";

const Bookings = () => {
  const [formData, setFormData] = useState({
    user: "", // ObjectId
    driver: "", // optional
    vehicle: "", // optional
    pickupLocation: "",
    dropoffLocation: "",
    pickupDateTime: "",
    bookingType: "one-way",
    tourPackage: "", // optional
    estimatedDistance: "",
    estimatedFare: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare payload for nested pickup/dropoff structure
    const payload = {
      user: formData.user,
      driver: formData.driver || null,
      vehicle: formData.vehicle || null,
      pickupLocation: { description: formData.pickupLocation },
      dropoffLocation: { description: formData.dropoffLocation },
      pickupDateTime: new Date(formData.pickupDateTime),
      bookingType: formData.bookingType,
      tourPackage: formData.tourPackage || null,
      estimatedDistance: parseFloat(formData.estimatedDistance),
      estimatedFare: parseFloat(formData.estimatedFare),
      notes: formData.notes
    };

    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed ❌");

      toast.success("✅ Booking Successful!");
      setFormData({
        user: "",
        driver: "",
        vehicle: "",
        pickupLocation: "",
        dropoffLocation: "",
        pickupDateTime: "",
        bookingType: "one-way",
        tourPackage: "",
        estimatedDistance: "",
        estimatedFare: "",
        notes: ""
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register">
        <form className="form-block" onSubmit={handleSubmit}>
          <center>
            <h5 className="titilereg">
              Book a Ride <br />
              <span className="actext">SteadyDuskApp Booking</span>
            </h5>
          </center>

          <input
            className="form-item"
            name="user"
            value={formData.user}
            onChange={handleChange}
            placeholder="User ID"
            required
          />

          <input
            className="form-item"
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            placeholder="Driver ID (optional)"
          />

          <input
            className="form-item"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            placeholder="Vehicle ID (optional)"
          />

          <input
            className="form-item"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            placeholder="Pickup Location"
            required
          />

          <input
            className="form-item"
            name="dropoffLocation"
            value={formData.dropoffLocation}
            onChange={handleChange}
            placeholder="Dropoff Location"
            required
          />

          <input
            className="form-item"
            type="datetime-local"
            name="pickupDateTime"
            value={formData.pickupDateTime}
            onChange={handleChange}
            required
          />

          <select
            className="form-item"
            name="bookingType"
            value={formData.bookingType}
            onChange={handleChange}
          >
            <option value="one-way">One-Way</option>
            <option value="round-trip">Round Trip</option>
            <option value="tour">Tour</option>
          </select>

          {formData.bookingType === "tour" && (
            <input
              className="form-item"
              name="tourPackage"
              value={formData.tourPackage}
              onChange={handleChange}
              placeholder="Tour Package ID"
            />
          )}

          <input
            className="form-item"
            type="number"
            name="estimatedDistance"
            value={formData.estimatedDistance}
            onChange={handleChange}
            placeholder="Estimated Distance (km)"
          />

          <input
            className="form-item"
            type="number"
            name="estimatedFare"
            value={formData.estimatedFare}
            onChange={handleChange}
            placeholder="Estimated Fare"
          />

          <textarea
            className="form-item"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional Notes"
            rows="3"
          />

          <button className="sub" type="submit" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </button>

          <Toaster position="top-right" />
        </form>
      </div>
    </div>
  );
};

export default Bookings;
