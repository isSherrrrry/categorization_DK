import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./presurvey.css";
import { useSpring, animated } from 'react-spring';
import { FaRegSmileBeam } from 'react-icons/fa';
import { RiEmotionHappyLine } from 'react-icons/ri';
import { AiOutlineCheckCircle } from 'react-icons/ai';


const ThankYouPage = () => {

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        fontFamily: '"Arial", sans-serif',
        color: '#333',
        // background: 'linear-gradient(135deg, #f0f0f0 0%, #b3b3b3 100%)',
        // background: 'linear-gradient(135deg, #C0D1FF 0%, #36558F 100%)'
    }}>
    <AiOutlineCheckCircle size={70} color="green" /> { /* Smile icon at the top of the page */ }

    <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold',
        marginBottom: '1rem'
    }}>
        Thank you for participating in the study!
    </h1>

    <h2 style={{
        fontSize: '2rem',
        fontWeight: 'normal',
        marginBottom: '1.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        background: '#e1f5fe',
        boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
    }}>
        Your completion code is 
        <span style={{
            color: '#e53935',
            fontWeight: 'bold',
            marginLeft: '0.5rem'
        }}>
            606A716A
        </span>
    </h2>

    <p style={{
        fontSize: '1.1rem',
        lineHeight: '1.5'
    }}>
        Please input the code above in the <b>Prolific</b> app to let us know your completion.<br/>
        We thank you for your time spent taking this task.
    </p>
    </div>
  );
};

export default ThankYouPage;
