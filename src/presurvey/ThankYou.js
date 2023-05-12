import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./presurvey.css";

const ConsentForm = () => {
  const [userCode, setUserCode] = useState("");
  const requiredCode = "6cjh5a";
  const navigate = useNavigate(); 

  const handleUserCodeChange = (e) => {
    setUserCode(e.target.value);
  };

  const handleContinue = () => {
    if (userCode === requiredCode) {
      // Proceed to the next step in the study.
      console.log("Continuing with the study...");
      navigate("/thankyou");
    } else {
      alert("Please enter the correct code to proceed.");
    }
  };

  return (
    <div className="presurvey_main">
      <h2>Thank you for participating in the study!</h2>
    </div>
  );
};

export default ConsentForm;
