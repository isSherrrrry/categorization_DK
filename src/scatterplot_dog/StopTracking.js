import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import './mac-osx.css';
import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    // background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    padding: '30px'
  },
  header: {
    marginBottom: '30px',
    fontWeight: 'bold',
    fontSize: '2em',
    color: '#000'
  },
  bodyText: {
    fontSize: '1.2em',
    marginBottom: '20px',
    color: '#000',
    lineHeight: '1.5'
  },
  instruction: {
    fontSize: '1.3em',
    marginBottom: '30px',
    color: '#000',
    fontWeight: 'bold'
  },
  button: {
    background: '#2185d0',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 'bold',
  },
  paragraphContainer: {
    background: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
    marginBottom: '15px',
  },
  lastParagraph: {
    marginBottom: '0',  
  },
};

function StopTracking() {

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/postsurvey');
  };

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Exit Survey</title>
      </Helmet>
      <h2 style={styles.header}>You are about to begin the exit survey.</h2>
      <div style={styles.paragraphContainer}>
        <p style={styles.bodyText}>
          Our system has successfully concluded the eye tracking data collection process. <br></br>
          At this point, it is no longer necessary for your webcam to remain active. <br></br>
          If you prefer, you may now safely turn off your webcam.
        </p>
        <p style={{ ...styles.instruction, ...styles.lastParagraph }}>Click continue to start the exit survey. </p>
      </div>
      <button onClick={handleSubmit} style={{
                background: '#2185d0',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                Continue <FaArrowRight style={{marginLeft: '10px'}} />
            </button>
    </div>
  );
}

export default StopTracking;

