import React, { useState } from "react";
import styles from "../styles/FormComponent.module.css";
import axios from "axios";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccessMsg("");
  };

  // Frontend validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters and spaces";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length > 200) {
      newErrors.message = "Message cannot exceed 200 characters";
    }

    return newErrors;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/form/submit",
        formData
      );

      if (res.data.success) {
        setSuccessMsg("Form submitted successfully!");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      }
    } catch (err) {
      if (err.response && err.response.data.errors) {
        const backendErrors = {};
        err.response.data.errors.forEach((error) => {
          backendErrors[error.path] = error.msg;
        });
        setErrors(backendErrors);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Input Validation & Sanitization Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.formField}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.formField}>
          <label>Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && (
            <span className={styles.error}>{errors.message}</span>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
      {successMsg && <div className={styles.success}>{successMsg}</div>}
    </div>
  );
};

export default FormComponent;
