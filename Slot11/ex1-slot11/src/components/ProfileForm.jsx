import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";

function ProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [showToast, setShowToast] = useState(false);

  const validateName = (name) => name.trim() !== "";
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateAge = (age) => Number(age) >= 1;

  const isFormValid =
    validateName(name) && validateEmail(email) && validateAge(age);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowToast(true);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Profile Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {!validateName(name) && <p className="error">Name is required</p>}
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!validateEmail(email) && email.length > 0 && (
            <p className="error">Email is invalid</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {!validateAge(age) && age.length > 0 && (
            <p className="error">Age must be at least 1</p>
          )}
        </div>

        <div className="form-button">
          <button type="submit" disabled={!isFormValid}>
            Submit
          </button>
        </div>
      </form>

      {showToast && (
        <div className="toast">
          ✅ Submitted successfully!  
          <br />
          Name: {name}  
          <br />
          Email: {email}  
          <br />
          Age: {age}  
        </div>
      )}
    </div>
  );
}

ProfileForm.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ProfileForm;
