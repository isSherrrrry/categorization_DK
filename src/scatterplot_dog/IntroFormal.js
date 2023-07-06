// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
// // import './mac-osx.css';
// import { motion } from "framer-motion";



// function IntroFormal() {

//   let x = Math.floor((Math.random() * 10) + 1);

//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     if (x % 2 === 0) {
//         localStorage.setItem('first_task', 'credit');
//         navigate('/selectaxis_credit');
//       }else{
//         localStorage.setItem('first_task', 'car');
//         navigate('/selectaxis_car');
//       }
//   };

//   return (
//       <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh'
//       }}>
//           <h2>You are about to begin the <span className='bold'>main experiment</span>.</h2>
//           {/* <button onClick={() => { console.log('Continue button clicked!'); }}>Continue</button> */}
//           <button onClick={handleSubmit} class="ui blue button">Continue</button>
//       </div>
//   );
// }

// export default IntroFormal;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import './mac-osx.css';
import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';



function IntroFormal() {

    let x = Math.floor((Math.random() * 10) + 1);

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (x % 2 === 0) {
            localStorage.setItem('first_task', 'credit');
            navigate('/selectaxis_credit');
        }else{
            localStorage.setItem('first_task', 'car');
            navigate('/selectaxis_car');
        }
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
            <h2 style={{marginBottom: '40px'}}>You are about to begin the <span className='bold'>main experiment.</span></h2>
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
  
  export default IntroFormal;
