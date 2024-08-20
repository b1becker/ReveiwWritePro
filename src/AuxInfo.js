import React, { useState, useEffect } from 'react';
import './AuxInfo.css';
import moreInfoData from './appdata/moreinfo.json'; // Import the JSON file

const AuxInfo = ({onSaveAuxInfo}) => {
  const [information, setInformation] = useState([]);
  const [newInfo, setNewInfo] = useState(moreInfoData.information);

  // Load initial data from JSON (replace this with actual fetch if you use a server)
  useEffect(() => {
    const initialData = [
      { id: 1, name: 'Sample information to be entered'},
    ];
    setInformation(initialData);
  }, []);

  

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

  const handleDeleteInfo = (id) => {
    const updatedInformation = information.filter((item) => item.id !== id);
    setInformation(updatedInformation);

    // Pass the updated information to the parent component
    onSaveAuxInfo(updatedInformation);
  };

  const handleEditInfo = (id, updatedInfo) => {
    const updatedInformation = information.map((item) =>
      item.id === id ? { ...item, ...updatedInfo } : item
    );
    setInformation(updatedInformation);

    // Pass the updated information to the parent component
    onSaveAuxInfo(updatedInformation);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  return (
    <div className="aux-info-container">
      <div className="add-info-form">
        <h3>Add New Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newInfo.name}
          onChange={handleInputChange}
        />
        <button onClick={handleAddInfo}>Add Information</button>
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
  );
};

export default AuxInfo;
