import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
  const [activeButton, setActiveButton] = useState(null);
  

  const [helpVisible, setHelpVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [axisChanged, setAxisChanged] = useState(false);
  const [pointLabeled, setPointLabeled] = useState(false);
  const [pointReset, setPointReset] = useState(false);
  const [allLabeled, setAllLabeled] = useState(false);

  const [pointClickedAfterReset, setPointClickedAfterReset] = useState(false);
  const [hasZoomed, setHasZoomed] = useState(false);
  const [isPanActive, setIsPanActive] = useState(false);

  const [userId] = useState(localStorage.getItem('userId'));
  
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

  

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1 && !steps[currentStep].condition()) {
      alert("Please complete the current step before proceeding.");
      return;
    }
  
    setCurrentStep(currentStep + 1);
  };
  
  const steps = [
    { condition: () => !hovered, message: 'Hover over a point to get details regarding it.' },
    { condition: () => hovered && !axisChanged, message: 'Yay! Change the axes with the drop-down menu. Try changing one of axis to any other attribute you would like.' },
    { condition: () => axisChanged && !hasZoomed, message: 'You may zoom in the scatterplot to see overlapping points.' },
    { condition: () => hasZoomed && !isPanActive, message: 'Yes! You may zoom out or drag the scatterplot and explore different regions' },
    { condition: () => isPanActive && !pointLabeled, message: 'Excellent! Click on one of the BREED buttons (Bernedoodle, ShihTzu, and AmericanBulldog) on the top, then label one of the points in the scatterplot by clicking on it.' },
    { condition: () => pointLabeled && !pointReset, message: 'If you change your mind, select the RESET button.' },
    { condition: () => pointReset && !pointClickedAfterReset, message: 'Then click on the point that you\'d like to reset.' },
    { condition: () => pointClickedAfterReset && pointLabeled && !helpVisible, message: ['If you need help at any point, hover on the ',
                                                                                          <BiHelpCircle  style={{ color: '#fff' }} />, 
                                                                                          <span style={{ color: '#fff' }}>Help</span>,
                                                                                         ' button in the upper left corner.' ]},
    { condition: () => helpVisible && !allLabeled, message: 'You got it! Before you proceed to the first task, go ahead and label all of the points. Click \'Continue\' when you are done.' }
  ];
  const getCurrentStep = () => {
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].condition()) {
        return i;
      }
    }
    return steps.length;
  };

  const handleZoom = () => {
    setHasZoomed(true);
  };

  const handlePan = () => {
    setIsPanActive(true);
    console.log('Pan event occurred');
  };

  const toggleHelp = () => {
    // setHelpVisible(!helpVisible);
    setHelpVisible(true);

  };

  const handleLabelClick = (event) => {
    setPointLabeled(true);

  };

  const handleResetClick = (event) => {
    setPointReset(true);
    // setPointLabeled(false); // Reset the pointLabeled state when a point is reset
    setPointClickedAfterReset(false);

  };

  const handleXAxisChange = (event) => {
    setAxisChanged(true);
  };

  const handlePointHover = (event) => {
    setHovered(true);

  };

  const handleAllLabeled = (event) => {
    setAllLabeled(true);

  };


  function addJitter(value, amount) {
    return value + (Math.random() - 0.5) * amount;
}

function jitterData(data, xProp, yProp, amount) {
  return data.map(d => ({
      ...d, 
      [xProp]: addJitter(d[xProp], amount),
      [yProp]: addJitter(d[yProp], amount)
  }));
}

const handleXAxisSelection = (e, { value }) => {
  const jitteredData = jitterData(data, value, yColumn, 3);
  setData(jitteredData);
  setXColumn(value);
}

const handleYAxisSelection = (e, { value }) => {
  const jitteredData = jitterData(data, xColumn, value, 3);
  setData(jitteredData);
  setYColumn(value);
}



  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/dog_removed.csv');
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
    // console.log('Viewport width:', window.innerWidth);
    // console.log('Viewport height:', window.innerHeight);
  }, []);

  useEffect(() => {
    if (location.state) {
      setXColumn(location.state.xColumn);
      setYColumn(location.state.yColumn);
    }
  }, [location.state]);

  const handleContinueClick = () => {
    const eventsCollection = collection(firestore, userId);
    const coloredPoints = data.filter(d => d.category !== null);
    if (!steps[8].condition()) {
      alert('Please make sure you compelete the step-by-step tutorial.');
    } else if (coloredPoints.length < 12) {
      // alert('Please color at least 12 points before continuing.');
      alert(`Please color at least ${15-coloredPoints.length} more points before continuing.`);
      // alert(`You've labeled ${coloredPoints.length} points so far. Please color ${15-coloredPoints.length} more points before continuing.`);
    } else {
      addDoc(eventsCollection, {
        event: 'complete logging',
        userID: userId,
        task: 'dog',
        timestamp: new Date(),
      });
      navigate('/intro_formal');
    }
  }

  let hoverStartTime = null;
  
  const handleHelpHover = () => {
    hoverStartTime = new Date();
  };

  const handleHelpHoverEnd = () => {
    if (hoverStartTime) {
      const eventsCollection = collection(firestore, userId);
      const hoverEndTime = new Date();
      const hoverDuration = hoverEndTime - hoverStartTime;
      addDoc(eventsCollection, {
        event: 'interaction',
        type: 'help',
        userID: userId,
        task: 'dog',
        duration: hoverDuration,
        timestamp: new Date(),
      });

      hoverStartTime = null;
    }
  };


  const step = getCurrentStep();

  return (
    
    <div className="scatterplot" ref={scatterplotRef}>
      <div className='tutorial_part'>
        <div>
          <h3>Tutorial</h3>
          <p>
            <b>Step {step + 1}/{steps.length}:</b> {steps[step].message}
          </p>
        </div>

      </div>
      <div className="hover-container" onMouseOver={handleHelpHover} onMouseOut={handleHelpHoverEnd}>
        <div className="hover-trigger" onMouseEnter={toggleHelp}>
          <BiHelpCircle size={20} style={{ color: '#fff' }} /> 
          <span>Help</span>
        </div>
        <div className="info-bar">
          <p>Here's the help text</p>
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
            const eventsCollection = collection(firestore, userId);
            addDoc(eventsCollection, {
              event: 'interaction',
              userID: userId,
              type: 'axis_x',
              task: 'dog',
              org_axis: xColumn,
              new_axis: value,
              timestamp: new Date(),
            });
            setXColumn(value);
            handleXAxisChange();
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
            const eventsCollection = collection(firestore, userId);
            addDoc(eventsCollection, {
              event: 'interaction',
              userID: userId,
              type: 'axis_y',
              task: 'dog',
              org_axis: yColumn,
              new_axis: value,
              timestamp: new Date(),
            });
            setYColumn(value);
            handleXAxisChange();
          }}
        />
      </div>

      <div className='buttons'>

      <button 
          onClick={(e) => {
            setSelectedCategory('Bernedoodle');
            setActiveButton('Bernedoodle');
            // handleLabelClick(e);
          }} 
          className={`ui button Bernedoodle_button ${activeButton === 'Bernedoodle' ? 'active' : ''}`}
          style={activeButton === 'Bernedoodle' ? {borderColor: 'black'} : {}}
        >
          Bernedoodle
        </button>

        <button 
          onClick={(e) => {
            setSelectedCategory('ShihTzu');
            setActiveButton('ShihTzu');
            // handleLabelClick(e);
          }} 
          className={`ui button ShihTzu_button ${activeButton === 'ShihTzu' ? 'active' : ''}`}
          style={activeButton === 'ShihTzu' ? {borderColor: 'black'} : {}}
        >
          ShihTzu
        </button>

        <button 
          onClick={(e) => {
            setSelectedCategory('AmericanBulldog');
            setActiveButton('AmericanBulldog');
            // handleLabelClick(e);
          }} 
          className={`ui button AmericanBulldog_button ${activeButton === 'AmericanBulldog' ? 'active' : ''}`}
          style={activeButton === 'AmericanBulldog' ? {borderColor: 'black'} : {}}
        >
          AmericanBulldog
        </button>
        <button 
          onClick={() => {setSelectedCategory('Null'); setActiveButton('Null'); handleResetClick();}} 
          className={`ui button reset_button ${activeButton === 'Null' ? 'active' : ''}`}
          style={activeButton === 'Null' ? {borderColor: 'black'} : {}}
        >
          Reset
        </button>
      </div>

      <div className='scatterplot_plot'>
        <Plot data={data} xColumn={xColumn} yColumn={yColumn} selectedCategory={selectedCategory} 
        setPointLabeled={setPointLabeled}
        setPointClickedAfterReset={setPointClickedAfterReset}
        setData={setData} zoomTransform={zoomTransform} setZoomTransform={setZoomTransform} hovered={hovered} setHovered={setHovered}
        onZoom={handleZoom}
        onPan={handlePan}

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