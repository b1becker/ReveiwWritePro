import React, { useState } from 'react';
import questionsData from './appdata/questions.json'; // Import the JSON file
import { useNavigate } from 'react-router-dom';



const QuestionsForm = ({ onSaveResults }) => {
    const [questions, setQuestions] = useState(questionsData.questions);
    // const navigate = useNavigate();

    const handleButtonClick = () => {
        // navigate('/comments');
      }

    const handleChoiceChange = (id, choice) => {
        const updatedQuestions = questions.map((q) =>
          q.id === id ? { ...q, userChoice: choice } : q
        );
        setQuestions(updatedQuestions);
        onSaveResults(updatedQuestions); // Pass updated questions to App.js
      };

    return (
        <div>
        {questions.map((question) => (
          <div key={question.id} className="question-block">
            <h4>{question.question}</h4>
            <div className="options">
              {question.options.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={question.userChoice === option}
                    onChange={(e) => handleChoiceChange(question.id, e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleButtonClick} style={{ marginTop: '20px' }}>
        Next
      </button>
      </div>
  );
};

export default QuestionsForm;


