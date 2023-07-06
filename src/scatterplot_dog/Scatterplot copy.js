import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Plot from './Plot';
import Papa from 'papaparse';
import { Dropdown } from 'semantic-ui-react';
import React, { useState, useEffect, useRef } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './plot.css'
import { hover } from '@testing-library/user-event/dist/hover';

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

  const [helpVisible, setHelpVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [axisChanged, setAxisChanged] = useState(false);
  const [pointLabeled, setPointLabeled] = useState(false);
  const [pointReset, setPointReset] = useState(false);
  const [allLabeled, setAllLabeled] = useState(false);

  const [pointClickedAfterReset, setPointClickedAfterReset] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { condition: () => !hovered, message: 'Hover on a point to get details regarding it.' },
    { condition: () => hovered && !axisChanged, message: 'Yay! Change the axes with the drop-down menu. Try changing another axis now to any other attribute you would like.' },
    { condition: () => axisChanged && !pointLabeled, message: 'Excellent! Click on one of the BREED buttons (Bernedoodle, ShihTzu, and AmericanBulldog) on the top, then label one of the points in the scatterplot by clicking on it.' },
    { condition: () => pointLabeled && !pointReset, message: 'If you change your mind, select the RESET button.' },
    { condition: () => pointReset && !pointClickedAfterReset, message: 'Then click on the point that you\'d like to reset.' },
    { condition: () => pointClickedAfterReset && pointLabeled && !helpVisible, message: 'If you need help at any point, hover on the HELP button.' },
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

  const handleAxisChange = (event) => {
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
  }, []);

  useEffect(() => {
    if (location.state) {
      setXColumn(location.state.xColumn);
      setYColumn(location.state.yColumn);
    }
  }, [location.state]);

  // let x = Math.floor((Math.random() * 10) + 1);
  // console.log(x);

  const handleContinueClick = () => {
    const coloredPoints = data.filter(d => d.category !== null);
    if (!steps[6].condition()) {
      alert('Please make sure you compelete the step-by-step tutorial.');
    } else if (coloredPoints.length < 12) {
      alert('Please color at least 12 points before continuing.');
    } else {
      navigate('/intro_formal');
    }
  }

  // console.log("pointClickedAfterReset: ", pointClickedAfterReset);
  // console.log("helpVisible: ", helpVisible);
  // console.log("pointLabeled: ", pointLabeled);
  // console.log("pointReset: ", pointReset);

  const step = getCurrentStep();

  return (
    
    <div className="scatterplot" ref={scatterplotRef}>
      <div className='tutorial_part'>
        <div>
          <p>
            <b>Step {step + 1}/{steps.length}:</b> {steps[step].message}
          </p>
        </div>
      
      </div>
      <div className="hover-container">
        <div className="hover-trigger" onMouseEnter={toggleHelp}>
          Help
        </div>
        <div className="info-bar">
          <p>Here's the help text</p>
        </div>
      </div>
      <div className='x-axis'>
      <Dropdown
          className="dropdown"
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
            setXColumn(value);
            handleAxisChange();
          }}
        />
      </div>
      <div className='y-axis'>
        <Dropdown
          className="dropdown"
          placeholder={yColumn}
          selection
          options={columns
            .filter(column => !['Customer ID', 'name', 'Credit Score', 'creditID'].includes(column))
            .map(column => ({
              key: `y-${column}`,
              text: column,
              value: column
            }))}
          onChange={(e, { value }) => setYColumn(value)}
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
          className={`ui button ${activeButton === 'Null' ? 'active' : ''}`}
          style={activeButton === 'Null' ? {borderColor: 'black'} : {}}
        >
          Reset
        </button>
      </div>

      <div className='scatterplot_plot'>
        <Plot data={data} xColumn={xColumn} yColumn={yColumn} selectedCategory={selectedCategory} 
        setPointLabeled={setPointLabeled}
        setPointClickedAfterReset={setPointClickedAfterReset}
        setData={setData} zoomTransform={zoomTransform} setZoomTransform={setZoomTransform} hovered={hovered} setHovered={setHovered} />
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