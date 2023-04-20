import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import './consent.css'



const ConsentForm = () => {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate(); // Create navigate function

  const handleAcceptChange = (e) => {
    setAccepted(e.target.checked);
  };

  const handleContinue = () => {
    if (accepted) {
      // Proceed to the next step in the study.
      console.log("Continuing with the study...");
      navigate("/presurvey"); // Navigate to /presurvey route
    } else {
      alert("Please accept the terms to continue.");
    }
  };



  return (
    <div className="consent_main">
      <p>Thank you!</p>
    </div>
  );
};

export default ConsentForm;