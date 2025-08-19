import React, { useState, useReducer, useMemo, useCallback } from "react";
import { Modal, Button, ProgressBar, Nav, ToastContainer, Toast } from "react-bootstrap";
import AboutForm from "./steps/AboutForm";
import AccountForm from "./steps/AccountForm";
import AddressForm from "./steps/AddressForm";
import ProfileSummaryModal from "./ProfileSummaryModal";

// reducer cho state form
function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.step]: { ...state[action.step], [action.field]: action.value } };
    case "RESET":
      return initialFormState;
    default:
      return state;
  }
}

const initialFormState = {
  about: { firstName: "", lastName: "", email: "", avatar: null },
  account: { username: "", password: "", confirmPassword: "", question: "", answer: "" },
  address: { country: "", city: "", street: "" }
};


function BuildProfileModal({ show, handleClose }) {
  const [step, setStep] = useState(0);
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [showSummary, setShowSummary] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const steps = ["About", "Account", "Address"];

  const isStepValid = useMemo(() => {
    const current = steps[step];
    const values = formState[current.toLowerCase()];
    switch (current) {
      case "About":
  return (
    values.firstName &&
    values.lastName &&
    values.email.includes("@")
  );

      case "Account":
        const pwValid =
          values.password.length >= 8 &&
          /[A-Z]/.test(values.password) &&
          /[0-9]/.test(values.password) &&
          /[^A-Za-z0-9]/.test(values.password);
        return (
          values.username.length >= 6 &&
          pwValid &&
          values.password === values.confirmPassword &&
          values.question &&
          values.answer
        );
      case "Address":
        return values.country && values.city && values.street;
      default:
        return false;
    }
  }, [step, formState]);

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  const nextStep = useCallback(() => {
    if (isStepValid && step < steps.length - 1) setStep((s) => s + 1);
  }, [isStepValid, step]);

  const prevStep = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const onFieldChange = useCallback((stepKey, field, value) => {
    dispatch({ type: "UPDATE_FIELD", step: stepKey, field, value });
  }, []);

  const handleFinish = () => {
    if (isStepValid) {
      setShowSummary(true);
      setShowToast(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Build Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nav variant="tabs" activeKey={steps[step]}>
            {steps.map((s, idx) => (
              <Nav.Item key={s}>
                <Nav.Link active={idx === step}>{s}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <div className="mt-3">
            {step === 0 && (
              <AboutForm values={formState.about} onChange={(f, v) => onFieldChange("about", f, v)} />
            )}
            {step === 1 && (
              <AccountForm values={formState.account} onChange={(f, v) => onFieldChange("account", f, v)} />
            )}
            {step === 2 && (
              <AddressForm values={formState.address} onChange={(f, v) => onFieldChange("address", f, v)} />
            )}
          </div>

          <ProgressBar now={progress} className="mt-3" />

        </Modal.Body>
        <Modal.Footer>
          {step > 0 && <Button variant="secondary" onClick={prevStep}>Previous</Button>}
          {step < steps.length - 1 && (
            <Button variant="primary" onClick={nextStep} disabled={!isStepValid}>Next</Button>
          )}
          {step === steps.length - 1 && (
            <Button variant="success" onClick={handleFinish} disabled={!isStepValid}>Finish</Button>
          )}
        </Modal.Footer>
      </Modal>

      <ProfileSummaryModal
        show={showSummary}
        handleClose={() => setShowSummary(false)}
        formState={formState}
      />

      <ToastContainer position="top-end" className="p-3">
        <Toast bg="success" show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default BuildProfileModal;
