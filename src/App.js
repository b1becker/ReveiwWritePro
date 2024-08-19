import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import QuestionsForm from './QuestionsForm';
import AuxInfo from './AuxInfo';
import AddressSearch from './AddressSearch';
import { LoadScript } from '@react-google-maps/api';
import WelcomeScreen from './WelcomeScreen';




function App() {
  const [activeBox, setActiveBox] = useState('map');
  const [data, setData] = useState([]);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const handleClick = (boxName) => {
    setActiveBox(boxName);
  };

  const handleStart = () => {
    setShowWelcomeScreen(false);
  };

  const handleAddressSelect = (address) => {
    console.log('Selected Address:', address);
    // You can use the selected address here (e.g., save it to state, send it to your server, etc.)
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
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_API_KEY" libraries={["places"]}>
                  <div className="App">
                    <AddressSearch onAddressSelect={handleAddressSelect} />
                  </div>
                </LoadScript>,
              'review': <QuestionsForm />,
              'comments': <AuxInfo />,
              'output': <h2>hello</h2>
            }[activeBox]
          }
        </>
      )}
    </div>
  );
}

export default App;
