import React from 'react';
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import './consent.css'

const TutorialPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/webgazer_check");
  };

  return (
    <div className='tutorial'>
      <h2 className='header'>Tutorial</h2>
      <video width="800" height="450" controls>
        <source src="tutorial.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br/><br/>
      <Button onClick={handleContinue} primary>
        Continue
      </Button>
    </div>
  );
};

export default TutorialPage;
