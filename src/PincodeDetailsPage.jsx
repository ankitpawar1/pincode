import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./styles.css";

const PincodeDetailsPage = () => {
  const { pincode } = useParams();
  const [postalData, setPostalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPincodeData = async () => {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const data = response.data[0];

        if (data.Status === "Error") {
          setErrorMessage("No data found for this pincode.");
        } else {
          setPostalData(data.PostOffice);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPincodeData();
  }, [pincode]);

  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = postalData.filter((office) =>
      office.Name.toLowerCase().includes(query)
    );
    setPostalData(filtered);
  };

  return (
    <div>
      <h1>Pincode: {pincode}</h1>
      <div className="pin-container">
        <h1>Message:</h1>
        <p
          style={{
            fontFamily: "Inter",
            fontSize: "34px",
            fontWeigh: "700",
            lineHeight: "41.15px",
            textAlign: "left",
            margin: "0 0 71px 0",
          }}
        >
          &nbsp; Number of pincode(s) found: {postalData.length}
        </p>
      </div>
      <div className="input-group">
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Filter"
          className="filter"
          style={{
            fontFamily: "Roboto",
            fontSize: "32px",
            fontWeight: "400",
            lineHeight: "37.5px",
            border: "3px solid #000000",
            padding: "20px",
          }}
        />
      </div>
      <div className="results">
        {loading && <p>Loading...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="card-container">
          {postalData.map((office, index) => (
            <div key={index} className="result-item">
              <p>Name: {office.Name}</p>
              <p>Branch Type: {office.BranchType}</p>
              <p>Delivery Status: {office.DeliveryStatus}</p>
              <p>District: {office.District}</p>
              <p>Division: {office.Division}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PincodeDetailsPage;
