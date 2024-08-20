import React from 'react';

const Results = ({ questions, auxInfo }) => {
  return (
    <div>
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
