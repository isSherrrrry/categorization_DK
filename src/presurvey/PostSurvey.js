import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./presurvey.css";

const ConsentForm = () => {
  const [userCode, setUserCode] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const requiredCode = "94bj2sy";
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

  console.log(localStorage.getItem('first_task'));
  
  };

  return (
    <div className="presurvey_main">
      <h1>Post Survey</h1>
      <p>Please copy and paste <b>{userId}</b> into the dedicated field of the survey</p>
      <p style={{color: 'red', fontWeight: 'bold'}}>Please be sure to scroll through to complete and submit the survey before continuing. 
        <br></br> A code will be provide to preceed with the study.</p>
        <div className="input-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="userCode">
          <label htmlFor="userCode">Enter the code provided after submitting the survey: </label>
          <Input
            type="text"
            id="userCode"
            value={userCode}
            onChange={handleUserCodeChange}
            placeholder="Enter code"
          />
        </div>
        <Button onClick={handleContinue} primary className="continue_button" style={{marginLeft: '20px'}}>
          Continue
        </Button>
      </div>
      <iframe 
        src={localStorage.getItem("first_task") == 'car' ? "https://emorycollege.co1.qualtrics.com/jfe/form/SV_5AXrOacMD3TLaw6":"https://emorycollege.co1.qualtrics.com/jfe/form/SV_8uZFXPxTknJYqlU"}
        width="1000" height="1460" frameborder="0" marginheight="100" marginwidth="0" top="30">
          Loading...
      </iframe>
    </div>
  );
};

export default ConsentForm;
