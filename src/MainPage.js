
// import { useHistory } from 'react-router-dom';
// import React, { useState,useEffect } from 'react';
// import { BrowserRouter as Router} from 'react-router-dom';
// import './App.css'; 
// import Header from "./Header";
// import App1 from './App1';
// import RatingSystem from './RatingSystem';


// function MainPage() {
//   const [file, setPdfFile] = useState(null);
//   const [selectedJobTitle, setSelectedJobTitle] = useState('');
//   const [job_Description, setJobDescription] = useState('');
//   const [fitmentScore, setFitmentScore] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errorMessages, setErrorMessages] = useState({});

//   const handlePdfChange = (event) => {
//     const file = event.target.files[0];
//     setPdfFile(file);
//   };

//   const handleJobDescriptionChange = (event) => {
//     const text = event.target.value;
//     setJobDescription(text);
//   };
  
//   const handleJobTitleChange = (event) => {
//     const selectedTitle = event.target.value;
//     setSelectedJobTitle(selectedTitle);
//   };

//   const validateFields = () => {
//     const errors = {};

//     if (!file) {
//       errors.file = 'Please upload a file';
//     }
//     if (!job_Description.trim()) {
//       errors.jobDescription = 'Please provide job description';
//     }

//     setErrorMessages(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // const history = useHistory();
//   // const calculateFitmentScore = async () => {
//   //   setLoading(true); // Set loading state to true
//   //   const formData = new FormData();
//   //   formData.append('file', file);
//   //   formData.append('job_Description', job_Description);
//   //   formData.append('job_Title', selectedJobTitle);
//   //   try {
//   //     const response = await fetch('http://localhost:8080/bot/chat', {
//   //       method: 'POST',
//   //       body: formData,
//   //     });
//   const calculateFitmentScore = async () => {
//     const isValid = validateFields();
//     if (!isValid) {
//       return;
//     }
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('job_Description', job_Description);
//     formData.append('job_Title', selectedJobTitle);
//     try {
//       const response = await fetch('http://localhost:8080/bot/chat', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const result = await response.text();
//         setFitmentScore(result); // Set the result directly as a string

//         history.push('/fitment-score', { fitmentScore: result });
//       } else {
//         console.error('Failed to calculate fitment score');
//         setFitmentScore('Error calculating fitment score'); // Handle the error case
//       }
//     } catch (error) {
//       console.error('Error during fetch:', error);
//       setFitmentScore('Error during fetch'); // Handle the fetch error
//     }
//     finally {
//       setLoading(false); // Reset loading state regardless of success or failure
//     }
//   };
  
//   return (
//     <div>
//        <Header/> 
//        <div>
  
//     </div>
//     <div className="center-container">
    
//     <div className="center-box">
   
      
//       <div>
//         <label htmlFor="pdfInput">Upload PDF:</label>
//         <input type="file" id="pdfInput" onChange={handlePdfChange} />
//         {errorMessages.file && <p className="error-message">{errorMessages.file}</p>}
//       </div>
//       <div>
//           <label htmlFor="jobTitleInput">Select Job Title:</label>
//           <textarea id="jobTitleInput" onChange={handleJobTitleChange} value={selectedJobTitle}/>     
//         </div>
//       <div>
//         <label htmlFor="jobDescriptionInput">Skills Required:</label>
//         <textarea
//           id="jobDescriptionInput"
//           value={job_Description}
//           onChange={handleJobDescriptionChange}
//         />
//         {errorMessages.jobDescription && (
//               <p className="error-message">{errorMessages.jobDescription}</p>
//             )}
//       </div>
//        <div>
//           <button onClick={calculateFitmentScore} disabled={loading}>
//             {loading ? 'Loading...' : 'Calculate Fitment Score'}
//           </button>
          
//         </div>

    
//     </div>
//     <RatingSystem/>  
//   </div>

//   </div>
//   );
// }

// export default MainPage;

import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Header from "./Header";
import RatingSystem from './RatingSystem';

function MainPage() {
  const [file, setPdfFile] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [job_Description, setJobDescription] = useState('');
  const [fitmentScore, setFitmentScore] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const handleJobDescriptionChange = (event) => {
    const text = event.target.value;
    setJobDescription(text);
  };
  
  const handleJobTitleChange = (event) => {
    const selectedTitle = event.target.value;
    setSelectedJobTitle(selectedTitle);
  };

  const validateFields = () => {
    const warnings = {};

    if (!file) {
      warnings.file = 'Please upload a file';
    }
    if (!job_Description.trim()) {
      warnings.jobDescription = 'Please provide job description';
    }

    setErrorMessages(warnings);
    return Object.keys(warnings).length === 0;
  };

  const history = useHistory();
  
  const calculateFitmentScore = async () => {
    const isValid = validateFields();
    if (!isValid) {
      // Display warnings and stop further execution
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_Description', job_Description);
    formData.append('job_Title', selectedJobTitle);
    try {
      const response = await fetch('http://localhost:8080/bot/chat', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        setFitmentScore(result);
        history.push('/fitment-score', { fitmentScore: result });
      } else {
        console.error('Failed to calculate fitment score');
        setFitmentScore('Error calculating fitment score');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setFitmentScore('Error during fetch');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header/>
      <div className="center-container">
        <div className="center-box">
          <div>
            <label htmlFor="pdfInput" className="required-label">Upload PDF*:</label>
            <input type="file" id="pdfInput" onChange={handlePdfChange} />
            {errorMessages.file && <p className="warning-message">{errorMessages.file}</p>}
          </div>
          <div>
            <label htmlFor="jobTitleInput" className="required-label">Select Job Title:</label>
            <textarea id="jobTitleInput" onChange={handleJobTitleChange} value={selectedJobTitle} />
            
          </div>
          <div>
            <label htmlFor="jobDescriptionInput" className="required-label">Job Description*:</label>
            <textarea
              id="jobDescriptionInput"
              value={job_Description}
              onChange={handleJobDescriptionChange}
            />
            {errorMessages.jobDescription && (
              <p className="warning-message">{errorMessages.jobDescription}</p>
            )}
          </div>
          <div>
            <button onClick={calculateFitmentScore} disabled={loading}>
              {loading ? 'Loading...' : 'Calculate Fitment Score'}
            </button>
          </div>
        </div>
        <RatingSystem/>
      </div>
    </div>
  );
}

export default MainPage;

