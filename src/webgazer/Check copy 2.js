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
    const [player, setPlayer] = useState(null);
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

    

  // initialize the player once on component mount
    useEffect(() => {
    // Load the YouTube Player API
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.body.appendChild(script);
    
    // On API script load, create the YouTube player object
    script.onload = () => {
      setPlayer(new window.YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'hQnXiPtMh3I',
        events: {
          'onStateChange': onPlayerStateChange
        }
      }));
    }
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }
  }, []);

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setVideoPlayed(true);
    }
  };
        

    return (
        <div className="check_webgazer">
            <div className="video-container">
                <div id="player"></div>
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/hQnXiPtMh3I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <div style={{ display: 'flex', flexDirection: 'column'}}> */}
                    <p style={{ color: 'red', fontWeight: 'bold', fontSize: '17px', marginBottom: '5px'}}>The video window will be hidden in subsequent study and please try to maintain this position for the rest of the study</p>
                
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>

                        <div style={{ display: 'flex', alignItems: 'center' }}>                       
                            <Checkbox onChange={() => setIsChecked(!isChecked)} />
                            <label style={{ fontWeight: 'bold', marginLeft: '10px', marginRight: '10px'}}>I understand.</label> 
                        </div>
                        
                        <Button primary onClick={handleContinueClick} disabled={!isChecked }>
                            Continue
                        </Button>
                    </div>
                {/* </div> */}
            </div>
        </div>
    );
}

export default ScatterPlot;