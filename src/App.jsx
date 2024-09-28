import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import "./styles.css";
import PincodeDetailsPage from "./PincodeDetailsPage";

const App = () => {
  const [pincode, setPincode] = useState("");
  const [postalData, setPostalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchPincodeData = async () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setErrorMessage("Please enter a valid 6-digit Pincode.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data[0];

      if (data.Status === "Error") {
        setErrorMessage("No data found for this pincode.");
        setPostalData([]);
      } else {
        navigate(`/pincode/${pincode}`);
      }
    } catch (error) {
      setErrorMessage("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = postalData.filter((office) =>
      office.Name.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <h1>Enter Pincode</h1>
      <div className="input-group">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Pincode"
        />
        <button onClick={fetchPincodeData}>Lookup</button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {loading ? (
        <Loader />
      ) : (
        <div className="results">
          {filteredData.length > 0 && (
            <input
              type="text"
              onChange={handleFilter}
              placeholder="Filter by Post Office Name"
              className="filter"
            />
          )}
          {filteredData.map((office, index) => (
            <div key={index} className="result-item">
              <PincodeDetailsPage office={office} />
            </div>
          ))}
          {filteredData.length === 0 && <p></p>}
        </div>
      )}
    </div>
  );
};

export default App;
