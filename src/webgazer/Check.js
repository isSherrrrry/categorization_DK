import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import { Checkbox, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './check.css'
import YouTube from 'react-youtube';

function ScatterPlot() {

    const navigate = useNavigate();
    const webgazer = window.webgazer;
    const [isChecked, setIsChecked] = useState(false);
    const [videoPlayed, setVideoPlayed] = useState(false); 

    const handleContinueClick = () => {
        if(!videoPlayed) {
            alert("Please watch the tutorial video before continuing.");
            return;
          }
        navigate('/selectaxis_dog', 100);
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
                        // console.log(event);
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

    
    const videoOptions = {
      // height: '360',
      // width: '640',
      playerVars: {
          autoplay: 0, // Autoplay the video or not, 1 for yes, 0 for no
      },
    };

  const onPlayerStateChange = (event) => {
      if (event.data === window.YT.PlayerState.PLAYING) {
          setVideoPlayed(true);
      }
    };
    

        

    return (
        <div className="check_webgazer">
          <div className='notice'>
              <p style={{  fontWeight: 'bold', fontSize: '15px'}}>If you don't see the green video box above 🔼, please refresh the page.</p>                    
          </div>
          <div className="video-container">
            <YouTube
                videoId="hQnXiPtMh3I" // YouTube video ID
                opts={videoOptions}
                onStateChange={onPlayerStateChange}
            />
            <p style={{ color: 'red', fontWeight: 'bold', fontSize: '16px', marginBottom: '5px'}}>The video window will be hidden for the remainder of the study. Please try to maintain this position for the rest of the study.</p>
          
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>

                <div style={{ display: 'flex', alignItems: 'center' }}>                       
                    <Checkbox onChange={() => setIsChecked(!isChecked)} />
                    <label style={{ fontWeight: 'bold', marginLeft: '10px', marginRight: '10px'}}>I understand.</label> 
                </div>
                
                <Button primary onClick={handleContinueClick} disabled={!isChecked }>
                    Continue
                </Button>
            </div>
          </div>
          
        </div>
    );
}

export default ScatterPlot;