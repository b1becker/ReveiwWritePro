import React, { useState, useRef } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import './AddressSearch.css';  // Import the CSS file

const AddressSearch = ({selectedAddresses, setSelectedAddresses, handleClick}) => {

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here, e.g., radius: 200 * 1000 meters */
    },
    debounce: 300,
  });

  const handleButtonClick = () => {
    handleClick('review');
  };

  const ref = useRef();
  useOnclickOutside(ref, () => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setSelectedAddresses((prevAddresses) => [...prevAddresses, description]);
      clearSuggestions();
      setValue(''); // Clear the input field after selecting an address
    };

  const handleManualSubmit = () => {
    if (value.trim()) {
      setSelectedAddresses((prevAddresses) => [...prevAddresses, value]);
      setValue('');  // Clear the input after submission
      clearSuggestions();  // Ensure that autocomplete suggestions are cleared
    }
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className="address-search-container">
      <h1>Enter In Location</h1>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search or enter an address"
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}

      <button onClick={handleManualSubmit} style={{ marginTop: '10px' }}>
        Submit
      </button>

      <div className="selected-addresses">
        {selectedAddresses.map((address, index) => (
          <div key={index} className="address-box">
            <h2>Your Restaurant:</h2>
            {address}
          </div>
        ))}
      </div>
      
      <button onClick={handleButtonClick} style={{ marginTop: '20px' }}>
        Next
      </button>
    </div>
  );
};

export default AddressSearch;
