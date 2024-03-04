import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import './FitmentScorePage.css';
import jsPDF from 'jspdf';


export default function FitmentScorePage({ location }) {
  const fitmentScore = location.state.fitmentScore || 'No fitment score available';
  const [isDeleted, setIsDeleted] = useState(false);
  


  const history = useHistory();
  const handleDownloadPDF = () => {
    const content = document.getElementById('fitment-score-content');

    if (content) {
      const pdf = new jsPDF();
       //  the width for word-wrap 
       const maxWidth = 180;

       // Spliting text into lines based on word-wrap
       const lines = pdf.splitTextToSize(fitmentScore, maxWidth);
 
      pdf.text(lines, 20,20);

      // Save the PDF
      pdf.save('fitment_score.pdf');
    } else {
      console.error('Content not found for PDF download');
    }
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([fitmentScore], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "fitment_score.txt";
    document.body.appendChild(element);
    element.click();
    
  };

  const handleDeleteRecord = async () => {
    const userConfirmed = window.confirm('Are you sure you want to delete this record?');

    if (userConfirmed) {
      try {
        const response = await fetch('http://localhost:8080/bot/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recordId: location.state.recordId,
          }),
        });

        if (response.ok) {
          setIsDeleted(true);
          console.log('Record deleted successfully');
          history.push('/');
        } else {
          console.error('Failed to delete record');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    }
  };


  return (
    <div className="container">
      <h1>Fitment Score Page</h1>
      <h2>Fitment Analysis:</h2>
      <div id="fitment-score-content">
        <p>{fitmentScore}</p>
      </div>
      <button className="button" onClick={downloadTxtFile}>Download txt</button>
      <button className="button" onClick={handleDownloadPDF}>Download PDF</button>
      {!isDeleted && (
        <button className="button" onClick={handleDeleteRecord}>
          Delete Record
        </button> 
      )}
      {isDeleted && <p>Record deleted successfully!</p>}
    </div>
  );
 
  
}
