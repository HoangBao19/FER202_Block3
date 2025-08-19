import React from "react";
import { Modal, Card } from "react-bootstrap";

function ProfileSummaryModal({ show, handleClose, formState }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          {formState.about.avatar && (
            <Card.Img variant="top" src={URL.createObjectURL(formState.about.avatar)} alt="avatar" />
          )}
          <Card.Body>
            <h5>About</h5>
            <p>Name: {formState.about.firstName} {formState.about.lastName}</p>
            <p>Email: {formState.about.email}</p>
            <hr />
            <h5>Account</h5>
            <p>Username: {formState.account.username}</p>
            <p>Question: {formState.account.question}</p>
            <p>Answer: {formState.account.answer}</p>
            <hr />
            <h5>Address</h5>
<p>
  {formState.address.streetNumber} {formState.address.street}, 
  {formState.address.city}, {formState.address.country}
</p>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileSummaryModal;
