import React, { useState } from "react";

export default function Form({ onAdd }) {
  const [formData, setFormData] = useState({ name: "", age: "", city: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.city) return;
    onAdd({ ...formData, id: Date.now() });
    setFormData({ name: "", age: "", city: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col-md">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="col-md">
          <input
            type="number"
            className="form-control"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>
        <div className="col-md">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
        <div className="col-md-auto">
          <button type="submit" className="btn btn-success">Add</button>
        </div>
      </div>
    </form>
  );
}
