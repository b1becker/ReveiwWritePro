import React, { useState } from 'react';
import questionsData from './appdata/questions.json'; // Import the JSON file



const QuestionsForm = () => {
    const [questions, setQuestions] = useState(questionsData.questions);

    const handleOptionChange = (questionId, selectedOption) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId
                    ? { ...question, userChoice: selectedOption }
                    : question
            )
        );
    };

    return (
        <div>
            <h2>Restaurant Review Questions</h2>
            {questions.map((question) => (
                <div key={question.id} style={{ marginBottom: '20px' }}>
                    <h3>{question.question}</h3>
                    {question.options.map((option, index) => (
                        <label key={index} style={{ display: 'block', marginBottom: '8px' }}>
                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option}
                                checked={question.userChoice === option}
                                onChange={() => handleOptionChange(question.id, option)}
                                style={{ marginRight: '10px' }}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ))}
            <div>
                <h3>User Choices Summary:</h3>
                {questions.map((question) => (
                    <p key={question.id}>
                        <strong>{question.question}:</strong> {question.userChoice || 'No selection'}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default QuestionsForm;


