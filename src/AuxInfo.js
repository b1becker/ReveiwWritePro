import React, { useState, useEffect } from 'react';
import './AuxInfo.css';
import moreInfoData from './appdata/moreinfo.json'; // Import the JSON file
import customerInfoData from './appdata/customerexperience.json'; // Import the JSON file

const AuxInfo = ({ onSaveAuxInfo, onDisplayResults, handleClick }) => {
  // For the information about the food
  const [information, setInformation] = useState([]);
  const [newInfo, setNewInfo] = useState({ name: '' });

  // For the information about the experience
  const [customerExperience, setCustomerExperience] = useState([]);
  const [newExperience, setNewCustomerExperience] = useState({ name: '' });

  const handleButtonClick = () => {
    handleClick('output');
  }

  // Load initial data from JSON (replace this with actual fetch if you use a server)
  useEffect(() => {
    const initialData = moreInfoData.information.length > 0 ? moreInfoData.information : [
      { id: 1, name: 'Sample information to be entered' },
    ];
    setInformation(initialData);

    const initialCustomerExperience = customerInfoData.information.length > 0 ? customerInfoData.information : [
      { id: 1, name: 'Sample information to be entered' },
    ];
    setCustomerExperience(initialCustomerExperience);
  }, []);

  // Add new food info
  const handleAddInfo = () => {
    if (newInfo.name.trim()) {
      const updatedInformation = [
        ...information,
        { id: information.length + 1, ...newInfo },
      ];
      setInformation(updatedInformation);
      setNewInfo({ name: '' });

      // Pass the updated information to the parent component
      onSaveAuxInfo(updatedInformation);
    }
  };

  // Delete food info
  const handleDeleteInfo = (id) => {
    const updatedInformation = information.filter((item) => item.id !== id);
    setInformation(updatedInformation);

    // Pass the updated information to the parent component
    onSaveAuxInfo(updatedInformation);
  };

  // Edit food info
  const handleEditInfo = (id, updatedInfo) => {
    const updatedInformation = information.map((item) =>
      item.id === id ? { ...item, ...updatedInfo } : item
    );
    setInformation(updatedInformation);

    // Pass the updated information to the parent component
    onSaveAuxInfo(updatedInformation);
  };

  // Add new customer experience
  const handleAddCustomerExperience = () => {
    if (newExperience.name.trim()) {
      const updatedCustomerExperience = [
        ...customerExperience,
        { id: customerExperience.length + 1, ...newExperience },
      ];
      setCustomerExperience(updatedCustomerExperience);
      setNewCustomerExperience({ name: '' });

      // Do not call onDisplayResults here to prevent immediate navigation
      onSaveAuxInfo(updatedCustomerExperience); // This line should be based on your requirements
    }
  };

  // Delete customer experience
  const handleDeleteCustomerExperience = (id) => {
    const updatedCustomerExperience = customerExperience.filter((item) => item.id !== id);
    setCustomerExperience(updatedCustomerExperience);

    // Do not trigger navigation to the Results page
  };

  // Edit customer experience
  const handleEditCustomerExperience = (id, updatedInfo) => {
    const updatedCustomerExperience = customerExperience.map((item) =>
      item.id === id ? { ...item, ...updatedInfo } : item
    );
    setCustomerExperience(updatedCustomerExperience);

    // This function could call onDisplayResults if you want to display changes immediately
    onDisplayResults(updatedCustomerExperience); // Optional, depending on your requirements
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  return (
    <div className='aux-info-display'>
      <div className="aux-info-container">
        <div className="add-info-form">
          <h2>Add Dishes You Wish to Discuss</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newInfo.name}
            onChange={handleInputChange}
          />
          <button onClick={handleAddInfo}>Add Dish</button>
        </div>
        <h2>Manage Information</h2>
        <ul className="info-list">
          {information.map((item) => (
            <li key={item.id}>
              <div>
                <strong>Name:</strong>{' '}
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    handleEditInfo(item.id, { name: e.target.value })
                  }
                />
              </div>
              <button onClick={() => handleDeleteInfo(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className='aux-info-container'>
        <div className='add-info-form'>
          <h2>Provide details about Overall Experience</h2>
          <input
            type='text'
            name='name'
            placeholder='Experience'
            value={newExperience.name}
            onChange={(e) => setNewCustomerExperience({ name: e.target.value })}
          />
          <button onClick={handleAddCustomerExperience}>Add Experience</button>
        </div>
        <h2>Manage Customer Experience</h2>
        <ul className='info-list'>
          {customerExperience.map((item) => (
            <li key={item.id}>
              <div>
                <strong>Experience:</strong>{' '}
                <input
                  type='text'
                  value={item.name}
                  onChange={(e) =>
                    handleEditCustomerExperience(item.id, { name: e.target.value })
                  }
                />
              </div>
              <button onClick={() => handleDeleteCustomerExperience(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleButtonClick} style={{ marginTop: '20px' }}>
        Next
      </button>
    </div>
  );
};

export default AuxInfo;
