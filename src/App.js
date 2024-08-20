import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import QuestionsForm from './QuestionsForm';
import AuxInfo from './AuxInfo';
import AddressSearch from './AddressSearch';
import { LoadScript } from '@react-google-maps/api';
import WelcomeScreen from './WelcomeScreen';
import Results from './Results';




function App() {
  const [activeBox, setActiveBox] = useState('map');
  const [data, setData] = useState([]);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [questionsData, setQuestionsData] = useState([]); // State to hold the questions data
  const [auxInfoData, setAuxInfoData] = useState([]); // State to hold the aux info data
  const handleClick = (boxName) => {
    setActiveBox(boxName);
  };

  const handleStart = () => {
    setShowWelcomeScreen(false);
  };

  const handleSaveResults = (questions) => {
    setQuestionsData(questions);
  };

  const handleAddressSelect = (address) => {
    console.log('Selected Address:', address);
    // You can use the selected address here (e.g., save it to state, send it to your server, etc.)
  };

  const handleSaveAuxInfo = (information) => {
    setAuxInfoData(information);
  };

  useEffect(() => {
    let url = '';
    switch (activeBox) {
      case 'map':
        url = '';
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
    

  axios.get(url)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error('There was an error fetching the data!', error);
    });
}, [activeBox]);

  

  return (
    <div className="App">
      {showWelcomeScreen ? (
        <WelcomeScreen onStart={handleStart} />
      ) : (
        <>
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
          {
            {
              'map': 
                <LoadScript googleMapsApiKey="YOUR-API-KEY" libraries={["places"]}>
                  <div className="App">
                    <AddressSearch onAddressSelect={handleAddressSelect} />
                  </div>
                </LoadScript>,
              'review': <QuestionsForm onSaveResults={handleSaveResults} />,
              'comments': <AuxInfo onSaveAuxInfo={handleSaveAuxInfo} />,
              'output': <Results questions={questionsData} auxInfo={auxInfoData}/>  // Display results here
            }[activeBox]
          }
        </>
      )}
    </div>
  );
}

export default App;
