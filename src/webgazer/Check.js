import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Checkbox, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './check.css'

function ScatterPlot() {
    const navigate = useNavigate();
    const webgazer = window.webgazer;
    const [isChecked, setIsChecked] = useState(false);

    const handleContinueClick = () => {
        navigate('/selectaxis_dog');
    }

    useEffect(() => {
        async function initializeWebGazer() {
            if (webgazer) {
                try {
                    webgazer.begin();
                    webgazer.showVideoPreview(true).showPredictionPoints(false);
                    webgazer.setGazeListener(function (event) {
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
            <h2 style={{ textAlign: "center" }}>Webcam Eye Tracker Check</h2>
            <p>Wait for seconds until there is a video viewer shown in the upper left. Please adjust your position and maintain the border of the inner box to be <b style={{ color: "green" }}>green.</b></p>
            <Checkbox label="The border of the box is green AND I will remain this position for the rest of the study." onChange={() => setIsChecked(!isChecked)} /><br /><br />
            <Button primary onClick={handleContinueClick} disabled={!isChecked}>
                Continue
            </Button>
        </div>
    );
}

export default ScatterPlot;