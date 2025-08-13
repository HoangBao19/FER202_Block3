import React from "react";

export default function Toast({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="toast" role="status" onClick={onClose}>
      {children}
    </div>
  );
}
