import React from 'react';

const Results = ({ questions, auxInfo, selectedAddresses, handleFinish}) => {
  
  if (!Array.isArray(selectedAddresses)) {
    return <div>No addresses selected</div>;
  }

  return (
    <div>
      <p>Write a 4-8 paragraph review of</p>
      {selectedAddresses.map((address, index) => (
        <div key={index} >
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
      <button onClick={handleFinish} style={{ marginTop: '20px' }}>
        Return To Home
      </button>

    </div>
  );
};

export default Results;
