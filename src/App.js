import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import QuestionsForm from './QuestionsForm';
import AuxInfo from './AuxInfo';
import AddressSearch from './AddressSearch';
import { LoadScript } from '@react-google-maps/api';
import WelcomeScreen from './WelcomeScreen';
import Results from './Results';
import config from './config';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const YOUR_API_KEY = config.GOOGLE_API_KEY;
  const [activeBox, setActiveBox] = useState('map');
  const [data, setData] = useState([]);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [questionsData, setQuestionsData] = useState([]); // State to hold the questions data
  const [auxInfoData, setAuxInfoData] = useState([]); // State to hold the aux info data
  const [experienceData, setExperienceData] = useState([]);
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const navigate = useNavigate();


  const handleClick = (boxName) => {
    setActiveBox(boxName);
    navigate(`/${boxName}`);
  };

  const handleStart = () => {
    setShowWelcomeScreen(false);
  };

  const handleFinish = () => {
    setShowWelcomeScreen(true);
  };

  const handleSaveResults = (questions) => {
    setQuestionsData(questions);
  };

  const handleAddressSelect = (address) => {
    console.log('Selected Address:', address);
    setSelectedAddresses((prevAddresses) => [...prevAddresses, address]);
  };

  const handleSaveAuxInfo = (information) => {
    setAuxInfoData(information);
  };

  useEffect(() => {
    let url = '';
    switch (activeBox) {
      case 'map':
        url = ''; // No URL for map
        break;
      case 'review':
        url = 'http://localhost:3500/questions';
        break;
      case 'comments':
        url = 'http://localhost:3500/customerinfo';
        break;
      case 'output':
      default:
        url = 'http://localhost:3500/review';
        break;
    }
  
    if (url) {
      axios.get(url)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching the data!', error);
        });
    }
  }, [activeBox]);

  const handleDisplayResults = (data) => {
    setExperienceData(data);
    setActiveBox('output');
    navigate('/output');
  };

  return (
      <div className="App">
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');
        </style>
        {showWelcomeScreen ? (
          <WelcomeScreen onStart={handleStart} />
        ) : (
          <>
            <div className='navbar'>
              <h1 onClick={handleFinish}>ReviewWritePro</h1>
              <div className="box-container">
                <div className={`box ${activeBox === 'map' ? 'active' : ''}`}
                    onClick={() => handleClick('map')}>
                  Find Location
                </div>
                <div className={`box ${activeBox === 'review' ? 'active' : ''}`}
                    onClick={() => handleClick('review')}>
                  Initial Thoughts
                </div>
                <div className={`box ${activeBox === 'comments' ? 'active' : ''}`}
                    onClick={() => handleClick('comments')}>
                  More Info
                </div>
                <div className={`box ${activeBox === 'output' ? 'active' : ''}`}
                    onClick={() => handleClick('output')}>
                  Receive Prompt
                </div>
              </div>
            </div>

            <Routes>
              <Route path="/map" element={
                <LoadScript googleMapsApiKey={YOUR_API_KEY} libraries={["places"]}>
                  <AddressSearch onAddressSelect={handleAddressSelect} selectedAddresses={selectedAddresses} setSelectedAddresses={setSelectedAddresses} handleClick={handleClick}/>
                </LoadScript>
              } />
              <Route path="/review" element={<QuestionsForm onSaveResults={handleSaveResults} handleClick={handleClick}/>} />
              <Route path="/comments" element={<AuxInfo onSaveAuxInfo={handleSaveAuxInfo} onDisplayResults={handleDisplayResults} handleClick={handleClick} />} />
              <Route path="/output" element={<Results questions={questionsData} auxInfo={auxInfoData} selectedAddresses={selectedAddresses} handleFinish={handleFinish}/>} />
            </Routes>
          </>
        )}
      </div>
    
  );
}

export default App;
