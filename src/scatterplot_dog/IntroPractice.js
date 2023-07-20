import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';



function IntroPractice() {
    const navigate = useNavigate();
  
    const handleSubmit = () => {
        navigate('/selectaxis_dog');
    };
  
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            color: '#333',
            fontFamily: 'Arial, sans-serif',
            padding: '0 20px'
        }}>
            <h2 style={{marginBottom: '40px'}}>You are about to begin a practice task to get familiar with our interface.</h2>
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
  
  export default IntroPractice;
