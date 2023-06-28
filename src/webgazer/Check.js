import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
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
            <div className="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/hQnXiPtMh3I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <div>
                <Checkbox onChange={() => setIsChecked(!isChecked)} />
                <label style={{ color: 'red', fontWeight: 'bold', marginLeft: '10px'}}>I understand the video window will be hidden in subsequent study and I will try to maintain this position for the rest of the study.</label>
            </div>
            <br /><br />
            <Button primary onClick={handleContinueClick} disabled={!isChecked}>
                Continue
            </Button>
            </div>
        </div>
    );
}

export default ScatterPlot;