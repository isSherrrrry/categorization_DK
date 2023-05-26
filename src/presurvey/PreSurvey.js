import React, { useState, useEffect } from "react";
import { Input, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { nanoid } from 'nanoid';


import "semantic-ui-css/semantic.min.css";
import "./presurvey.css";

const ConsentForm = () => {
  const [userCode, setUserCode] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const requiredCode = "6cjh5a";
  const navigate = useNavigate(); 

  const handleUserCodeChange = (e) => {
    setUserCode(e.target.value);
  };

  useEffect(() => {
    const generateUserId = () => {
      let id = '';
      while(id.length < 13) {
        id += Math.floor(Math.random() * 10); // generates a random number between 0-9
      }
      return id;
    }
    const id = generateUserId();
    setUserId(id);
    localStorage.setItem('userId', id);
  }, []);

  const handleContinue = () => {
    if (userCode === requiredCode) {
      // Proceed to the next step in the study.
      console.log("Continuing with the study...");
      navigate("/tutorial");
    } else {
      alert("Please enter the correct code to proceed.");
    }
  };

  return (
    <div className="presurvey_main">
      <h2>Pre-Survey</h2>
      <p>Your UserID: <b>{userId}</b></p>
      <p>Please copy and paste <b>{userId}</b> into the field of the survey</p>
      <p>Please be sure to scroll through to complete the entire survey before continuing</p>
      <iframe src="https://emorycollege.co1.qualtrics.com/jfe/form/SV_eJ02rOjxcLBWakm" width="1200" height="2000" frameborder="0" marginheight="100" marginwidth="0" top="30">Loading...</iframe>
      <div className="userCode">
        <label htmlFor="userCode">Enter the code provided: </label>
        <Input
          type="text"
          id="userCode"
          value={userCode}
          onChange={handleUserCodeChange}
          placeholder="Enter code"
        />
      </div>
      <Button onClick={handleContinue} primary className="continue_button">
        Continue
      </Button>
    </div>
  );
};

export default ConsentForm;
