import React, { useState, useRef } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import './AddressSearch.css';  // Import the CSS file

const AddressSearch = () => {
  const [selectedAddresses, setSelectedAddresses] = useState([]); // State to store selected addresses
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
      // Add the selected address to the list of selected addresses
      setSelectedAddresses((prevAddresses) => [...prevAddresses, description]);
      clearSuggestions();  // Clear the suggestions after selection
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
        placeholder="Search an address"
      />
      
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
      <div className="selected-addresses">
      
        {selectedAddresses.map((address, index) => (
          <div key={index} className="address-box">
            <h2>Your Restaruant: </h2>
            {address}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressSearch;
