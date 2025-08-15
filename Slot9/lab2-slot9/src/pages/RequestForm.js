import { useState } from 'react';
import { Form, Button, Alert, Toast, ToastContainer } from 'react-bootstrap';

export default function RequestForm() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!genre.trim()) newErrors.genre = 'Genre is required';
    if (!year || isNaN(year) || Number(year) <= 1900)
      newErrors.year = 'Year must be > 1900';
    if (!duration || isNaN(duration) || Number(duration) <= 0)
      newErrors.duration = 'Duration must be > 0';
    if (!description.trim() || description.trim().length < 30)
      newErrors.description = 'Description must be at least 30 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      setShowToast(true);
      // reset form
      setTitle('');
      setGenre('');
      setYear('');
      setDuration('');
      setDescription('');
    }
  };

  return (
    <div className="container mt-3" style={{ maxWidth: 600 }}>
      <h3>Movie Request Form</h3>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            isInvalid={!!errors.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            value={genre}
            isInvalid={!!errors.genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.genre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            value={year}
            isInvalid={!!errors.year}
            onChange={(e) => setYear(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.year}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="duration">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            value={duration}
            isInvalid={!!errors.duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.duration}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            isInvalid={!!errors.description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Request
        </Button>
      </Form>

      {/* Toast thông báo */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Body className="text-white">
            Request submitted. Thank you!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
