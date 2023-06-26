// src/SelectAxes.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './plot.css'


function SelectAxes() {
  const [columns, setColumns] = useState([]);
  const [xColumn, setXColumn] = useState(null);
  const [yColumn, setYColumn] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/credit_removed.csv');
      const csvData = await response.text();
      const parsedData = Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
      });
      setColumns(parsedData.meta.fields);
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    if (xColumn && yColumn) {
      navigate('/scatterplot', { state: { xColumn, yColumn } });
    } else {
      alert('Please select both x and y axes.');
    }
  };

  return (
    <div className="select_axes" style={{padding: '20px'}}>
      <div className='instruction' style={{marginBottom: '-10px'}}>
        <h2 style={{marginTop: '40px'}}>Welcome to the <b>Actual Task</b>!</h2> 
        <p style={{lineHeight: '1.5'}}> You're about to proceed to the actual task for categorizing<br /><b>Credit Score</b>.</p>
        <p style={{lineHeight: '1.5'}}> Similar with the practice task, feel free to select the attributes of the x-axis and y-axis that you'd like to begin the task. </p>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '0px'}}> 
        <div style={{marginRight: '40px'}}>
          <h4>Please Select X Axis:</h4>
          <Dropdown
            placeholder="--Select column--"
            selection
            options={columns
              .filter(column => !['Customer ID', 'Name', 'Credit Score', 'creditID', 'name'].includes(column))
              .map(column => ({
                key: `x-${column}`,
                text: column,
                value: column
              }))}
            onChange={(e, { value }) => setXColumn(value)}
          />
        </div>
        <div>
          <h4>Please Select Y Axis:</h4>
          <Dropdown
            placeholder="--Select column--"
            selection
            options={columns
              .filter(column => !['Customer ID', 'Name', 'Credit Score', 'creditID', 'name'].includes(column))
              .map(column => ({
                key: `y-${column}`,
                text: column,
                value: column
              }))}
            onChange={(e, { value }) => setYColumn(value)}
          />
        </div>
      </div>
      <div style={{marginTop: '40px', textAlign: 'center'}}>
        <button onClick={handleSubmit} class="ui blue button">Go to ScatterPlot</button>
      </div>
    </div>
  );
}  

export default SelectAxes;
