import React, { useRef } from 'react';
import './Results.css'; // Import the CSS file

const Results = ({ questions, auxInfo, selectedAddresses, handleFinish }) => {
  const boxRef = useRef();

  const handleCopyToClipboard = () => {
    if (boxRef.current) {
      const textToCopy = boxRef.current.innerText;
      navigator.clipboard.writeText(textToCopy)
        .then(() => alert('Content copied to clipboard'))
        .catch((err) => alert('Failed to copy content'));
    }
  };

  if (!Array.isArray(selectedAddresses)) {
    return <div>No addresses selected</div>;
  }

  return (
    <div>
      <div className="cp-box" ref={boxRef}>
        <p>Write a 4-8 sentence review of</p>
        {selectedAddresses.map((address, index) => (
          <div key={index}>
            {address}
          </div>
        ))}

        <p>Taking into account the information to these questions:</p>
        {questions.map((question) => (
          <p key={question.id}>
            <strong>{question.question}:</strong> {question.userChoice || 'No selection'}
          </p>
        ))}

        <p>Some Additional information to consider:</p>
        {auxInfo.map((item) => (
          <p key={item.id}>
            <strong>Name:</strong> {item.name} <br />
          </p>
        ))}
      </div>
      <button onClick={handleCopyToClipboard} className="copy-button">
        Copy Prompt
      </button>
      <h3>Now take prompt and paste it into a review bot of your choice</h3>
      

      <button onClick={handleFinish} className="finish-button">
        Return To Home
      </button>
    </div>
  );
};

export default Results;
