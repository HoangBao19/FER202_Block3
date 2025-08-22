import React, { useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { ToastContext } from "../../context/ToastContext";

export default function ToastHost() {
  const { toasts, removeToast } = useContext(ToastContext);
  return (
    <ToastContainer position="bottom-end" className="p-3">
      {toasts.map((t) => (
        <Toast key={t.id} onClose={() => removeToast(t.id)} bg={t.variant}>
          <Toast.Body className="text-white">{t.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}
