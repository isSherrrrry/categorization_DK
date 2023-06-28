import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import './mac-osx.css';
import { motion } from "framer-motion";



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
          height: '100vh'
      }}>
          <h2>You are about to begin the actual tasks.</h2>
          {/* <button onClick={() => { console.log('Continue button clicked!'); }}>Continue</button> */}
          <button onClick={handleSubmit} class="ui blue button">Continue</button>
      </div>
  );
}

export default IntroFormal;


// function MyComponent() {
//   return (
//       <div>
//           <Helmet>
//               <script src="https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js" />
//               {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pace-js@latest/pace-theme-default.min.css" /> */}
//           </Helmet>
          
//       </div>
//   );
// }

// export default MyComponent;

// const loadingContainer = {
//   width: "4rem",
//   height: "4rem",
//   display: "flex",
//   justifyContent: "space-around",
// };
// const loadingCircle = {
//   display: "block",
//   width: "1rem",
//   height: "1rem",
//   backgroundColor: "#3A36DB",
//   borderRadius: "0.5rem",
// };

// const loadingContainerVariants = {
//   start: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
//   end: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// const loadingCircleVariants = {
//   start: {
//     y: "0%",
//   },
//   end: {
//     y: "60%",
//   },
// };
// const loadingCircleTransition = {
//   duration : 0.4,
//   yoyo : Infinity,
//   ease: 'easeInOut'
// }

// const Loader = () => {
//   return (
//     <div>
//       <div className="fixed  w-full min-h-screen z-50 bg-black opacity-30" />
//       <div className="flex fixed w-full justify-center items-center h-screen">
//         <motion.div
//           style={loadingContainer}
//           variants={loadingContainerVariants}
//           initial="start"
//           animate="end"
//         >
//           <motion.span
//             style={loadingCircle}
//             variants={loadingCircleVariants}
//             transition={loadingCircleTransition}
//           ></motion.span>
//           <motion.span
//             style={loadingCircle}
//             variants={loadingCircleVariants}
//             transition={loadingCircleTransition}
//           ></motion.span>
//           <motion.span
//             style={loadingCircle}
//             variants={loadingCircleVariants}
//             transition={loadingCircleTransition}
//           ></motion.span>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Loader;