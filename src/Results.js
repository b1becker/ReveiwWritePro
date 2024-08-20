import React from 'react';

const Results = ({ questions, auxInfo, selectedAddresses}) => {
  
  if (!Array.isArray(selectedAddresses)) {
    return <div>No addresses selected</div>;
  }

  return (
    <div>
      {selectedAddresses.map((address, index) => (
        <div key={index} >
          <p>Write a 4-8 paragraph review of</p> {address}
        </div>
      ))}

      <h3>User Choices Summary:</h3>
      {questions.map((question) => (
        <p key={question.id}>
          <strong>{question.question}:</strong> {question.userChoice || 'No selection'}
        </p>
      ))}

      <h3>Auxiliary Information:</h3>
      {auxInfo.map((item) => (
        <p key={item.id}>
          <strong>Name:</strong> {item.name} <br />
          <strong>Email:</strong> {item.email || 'No email provided'}
        </p>
      ))}
    </div>
  );
};

export default Results;
