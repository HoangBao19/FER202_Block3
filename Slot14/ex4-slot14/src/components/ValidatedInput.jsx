import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

// Hàm xác thực đầu vào (ví dụ: kiểm tra độ dài tối thiểu)
const validateInput = (value) => {
  return value.length >= 5; // Giá trị phải có ít nhất 5 ký tự
};

function ValidatedInput() {
  const [value, setValue] = useState(""); // State lưu giá trị đầu vào
  const [isValid, setIsValid] = useState(true); // Trạng thái hợp lệ
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi

  // useEffect chạy lại mỗi khi value thay đổi để xác thực
  useEffect(() => {
    const isValidInput = validateInput(value);
    setIsValid(isValidInput);
    if (!isValidInput) {
      setErrorMessage("Giá trị phải có ít nhất 5 ký tự!");
    } else {
      setErrorMessage("");
    }
  }, [value]);

  return (
    <Form>
      <Form.Group controlId="validatedInput">
        <Form.Label>Nhập một giá trị</Form.Label>
        <Form.Control
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isValid={isValid}
          isInvalid={!isValid}
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isValid}>
        Gửi
      </Button>
    </Form>
  );
}

export default ValidatedInput;
