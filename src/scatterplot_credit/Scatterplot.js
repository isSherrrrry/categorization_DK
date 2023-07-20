// src/ScatterPlot.js
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // added import
import Plot from './Plot';
import Papa from 'papaparse';
import { Dropdown } from 'semantic-ui-react';
import React, { useState, useEffect, useRef } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './plot.css'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { BiHelpCircle } from 'react-icons/bi';


function ScatterPlot() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xColumn, setXColumn] = useState(null);
  const [yColumn, setYColumn] = useState(null);
  const [zoomTransform, setZoomTransform] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const scatterplotRef = useRef(null);
  const webgazer = window.webgazer;
  const [activeButton, setActiveButton] = useState(null);


  const [userId] = useState(localStorage.getItem('userId'));
  const [logevent] = useState(null);
  
  const firebaseConfig = {
    apiKey: "AIzaSyAHS7JCzpZAkLRmgilLdGDp9251l4HOO94",
    authDomain: "dkeffect-3776d.firebaseapp.com",
    projectId: "dkeffect-3776d",
    storageBucket: "dkeffect-3776d.appspot.com",
    messagingSenderId: "356413199968",
    appId: "1:356413199968:web:3211cbe960df3c8d4d9505",
    measurementId: "G-WE3CHELSN1"
  };
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const eventsCollection = collection(firestore, userId);


  
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/credit_removed.csv');
      const csvData = await response.text();
      const parsedData = Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
      });
      setData(parsedData.data);
      setData(parsedData.data.map(d => ({ ...d, category: null })));
      setColumns(parsedData.meta.fields);
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (location.state) {
      setXColumn(location.state.xColumn);
      setYColumn(location.state.yColumn);
    }
    
  }, [location.state]);

  


  const handleContinueClick = () => {
    const coloredPoints = data.filter(d => d.category !== null);
    const eventsCollection = collection(firestore, userId);
    if (coloredPoints.length >= 25) {
      addDoc(eventsCollection, {
        event: 'complete logging',
        userID: userId,
        task: 'credit',
        timestamp: new Date(),
      });
      if (localStorage.getItem("first_task") == 'credit'){
        navigate('/selectaxis_car');

      } else {
        navigate('/stop_tracking');  
      }
      
    } else {
      // alert('Please color at least 25 points before continuing.');
      alert(`Please color at least ${30-coloredPoints.length} more points before continuing.`);
    }
  }

  const handleClick = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    // Log the click event to Firestore
    const eventsCollection = collection(firestore, userId);
    addDoc(eventsCollection, {
      event: 'click',
      userID: userId,
      task: 'credit',
      x: x,
      y: y,
      timestamp: new Date(),
    });
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
  
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  let hoverStartTime = null;
  
  const handleHelpHover = () => {
    hoverStartTime = new Date();
  };

  const handleHelpHoverEnd = () => {
    if (hoverStartTime) {
      const hoverEndTime = new Date();
      const hoverDuration = hoverEndTime - hoverStartTime;
      addDoc(eventsCollection, {
        event: 'interaction',
        type:'help',
        userID: userId,
        task: 'credit',
        duration: hoverDuration,
        timestamp: new Date(),
      });
      console.log("hover!!!");

      hoverStartTime = null;
    }
  };

  // useEffect(() => {
  //   if (scatterplotRef.current) {
  //     console.log(scatterplotRef.current.offsetWidth); // Logs the width of the element
  //   }
  // }, []);

  useEffect(() => {
    async function initializeWebGazer() {
      if (webgazer) {
        try {
          webgazer.begin();
          webgazer.showVideoPreview(false).showPredictionPoints(false);
          webgazer.setGazeListener(function(event){
            addDoc(eventsCollection, {
              event: 'eyetracking',
              userID: userId,
              task: 'credit',
              x: event.x,
              y: event.y,
              timestamp: new Date(),
            });
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
    <div className="scatterplot">
      
      <div class="hover-container" onMouseOver={handleHelpHover} onMouseOut={handleHelpHoverEnd}>
        <div class="hover-trigger">
          <BiHelpCircle size={20} style={{ color: '#fff' }} /> 
          <span>Help</span>
        </div>
        <div class="info-bar">
          <p>Your task is to <b>categorize all points in the scatterplot</b>.
            <ul>
                <li><b>Hover</b> over a point to see details</li>
                <li><b>Zoom in/out</b> on the scatterplot to see overlapping points</li>
                <li><b>Drag </b> the scatterplot to explore different areas of points</li>
                <li><b>Click</b> the colored label on the top corresponding the label you would like to apply</li>
                <li><b>Click</b> the point(s) in the scatterplot to label with the selected label</li>
                <li><b>Click</b> <i>Reset</i> then click the respective point in the scatterplot if you wanted to change your previous label</li>
              </ul>
          </p>
          <p>Data attributes:
            <ul>
              <li><b>Credit History Age:</b> This measures the length of a customer's credit history in days.</li>
            </ul>
          </p>
        </div>
      </div>
      <div className='x-axis'>
        <Dropdown
          placeholder={xColumn}
          selection
          options={columns
            .filter(column => !['Customer ID', 'name', 'Credit Score', 'creditID'].includes(column))
            .map(column => ({
              key: `x-${column}`,
              text: column,
              value: column
            }))}
          onChange={(e, { value }) => {
            addDoc(eventsCollection, {
              event: 'interaction',
              userID: userId,
              type: 'axis_x',
              task: 'credit',
              org_axis: xColumn,
              new_axis: value,
              timestamp: new Date(),
            });
            setXColumn(value);
          }}
        />
      </div>
      <div className='y-axis'>
        <Dropdown
          placeholder={yColumn}
          selection
          options={columns
            .filter(column => !['Customer ID', 'name', 'Credit Score', 'creditID'].includes(column))
            .map(column => ({
              key: `y-${column}`,
              text: column,
              value: column
            }))}
          onChange={(e, { value }) => {
            addDoc(eventsCollection, {
              event: 'interaction',
              userID: userId,
              type: 'axis_y',
              task: 'credit',
              org_axis: xColumn,
              new_axis: value,
              timestamp: new Date(),
            });
            setYColumn(value);
          }}
        />
      </div>

      <div className='buttons'>
        <button 
            onClick={() => {setSelectedCategory('Good'); setActiveButton('Good');}} 
            className={`ui button Good_button ${activeButton === 'Good' ? 'active' : ''}`}
            style={activeButton === 'Good' ? {borderColor: 'black'} : {}}
          >
            Good
          </button>
          <button 
            onClick={() => {setSelectedCategory('Fair'); setActiveButton('Fair');}} 
            className={`ui button Fair_button ${activeButton === 'Fair' ? 'active' : ''}`}
            style={activeButton === 'Fair' ? {borderColor: 'black'} : {}}
          >
            Fair
          </button>
          <button 
            onClick={() => {setSelectedCategory('Poor'); setActiveButton('Poor');}} 
            className={`ui button Poor_button ${activeButton === 'Poor' ? 'active' : ''}`}
            style={activeButton === 'Poor' ? {borderColor: 'black'} : {}}
          >
            Poor
          </button>
          <button 
            onClick={() => {setSelectedCategory('Null'); setActiveButton('Null');}} 
            className={`ui button reset_button ${activeButton === 'Null' ? 'active' : ''}`}
            style={activeButton === 'Null' ? {borderColor: 'black'} : {}}
          >
            Reset
          </button>
      </div>

      <div className='scatterplot_plot' ref={scatterplotRef}>
      <Plot data={data} xColumn={xColumn} yColumn={yColumn} selectedCategory={selectedCategory} setData={setData} zoomTransform={zoomTransform} setZoomTransform={setZoomTransform}  
      // xJitterRef={xJitterRef} yJitterRef={yJitterRef}
      />

      </div>

      <div className='continue_next'>
      <button onClick={handleContinueClick} className="ui primary button">
          Continue
        </button>
    </div>

    </div>

    
  );
}

export default ScatterPlot;