import React from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function RequestForm() {
  return (
    <div className="container page-section">
      <h2>Recipe Request Form</h2>
      <form className="request-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-row">
          <label>
            Your Name
            <input type="text" placeholder="Enter your name" />
            <div className="form-feedback">Please enter your name</div>
          </label>
          <label>
            Email Address
            <input type="email" placeholder="Enter your email" />
            <div className="form-feedback">Please provide a valid email</div>
          </label>
        </div>

        <div className="form-row">
          <label>
            Desired Ingredient
            <input type="text" placeholder="Ví dụ: salmon, quinoa, spinach…" />
            <div className="form-feedback">Please enter desired ingredient</div>
          </label>
          <label>
            Max Prep Time
            <select defaultValue={10}>
              <option value={5}>5 phút</option>
              <option value={10}>10 phút</option>
              <option value={15}>15 phút</option>
              <option value={30}>30 phút</option>
            </select>
            <div className="form-feedback">Please select a max prep time</div>
          </label>
        </div>

        <label>
          Notes
          <textarea rows={4} placeholder="Thêm ghi chú (3–5 dòng)…" />
          <div className="form-feedback">Please add some notes (optional)</div>
        </label>

        <button className="btn btn-primary submit-btn" type="submit">
          <FaPaperPlane className="icon" /> Submit Request
        </button>
      </form>
    </div>
  );
}