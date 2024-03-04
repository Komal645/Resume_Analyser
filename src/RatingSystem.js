

// RatingSystem.js
import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import './RatingSystem.css';

const RatingSystem = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async () => {
   
    setSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('rating', rating);
    try {
      const response = await fetch('http://localhost:8080/bot/feedback', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setEmail('');
        setName('');
        setRating('');
        setSuccessMessage('Response submitted successfully!');

      } else {
        console.error('Failed to submit form data');
        setSubmissionError('Failed to submit form data. Please try again.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      setSubmissionError('Error during form submission. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setSuccessMessage(''); // Clear success message when toggling the form
  };

  return (
    <div className="rating-container">
      <button className="toggle-form-button" onClick={handleToggleForm}>
        {showForm ? 'Collapse Feedback' : 'Expand Feedback'}
      </button>

      {showForm && (
        <>
          {/* Form fields */}
          <label className="input-label">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </label>
          <label className="input-label">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((index) => (
              <span
                key={index}
                onClick={() => handleStarClick(index)}
                className={`star ${index <= rating ? 'filled' : ''}`}
              >
                {index <= rating ? <StarIcon /> : <StarOutlineIcon />}
              </span>
            ))}
          </div>
          <p className="rating-text">Your rating: {rating}</p>
          <button className="submit-button" onClick={handleSubmit}>
            Submit Response
          </button>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </>
      )}
    </div>
  );
};

export default RatingSystem;

