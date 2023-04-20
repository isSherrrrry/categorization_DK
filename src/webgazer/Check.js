// src/ScatterPlot.js
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // added import
import React, { useState, useEffect, useRef } from 'react';
import 'semantic-ui-css/semantic.min.css';

function ScatterPlot() {
    const navigate = useNavigate();
    const webgazer = window.webgazer;

  const handleContinueClick = () => {
    navigate('/selectaxis_car');
  }

  useEffect(() => {
    async function initializeWebGazer() {
      if (webgazer) {
        try {
          webgazer.begin();
          webgazer.showVideoPreview(true).showPredictionPoints(false);
          webgazer.setGazeListener(function(event){
            var currentdate = new Date(); 
            var datetime = currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds() + ":"
                  + currentdate.getMilliseconds();
            console.log(event);            
          }).begin();
          
          } catch (error) {
          console.error('Error initializing WebGazer:', error);
        }
      }
    }
    initializeWebGazer();
    return () => {
      initializeWebGazer();
    };
  }, []);
  

  return (
    <div className="check_webgazer">
        hello
    </div>
  );
}

export default ScatterPlot;
