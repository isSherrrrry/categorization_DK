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
    <div className="select_axes">
      <div>
        <h4>Please Select X Axis</h4>
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
        <h4>Please Select Y Axis</h4>
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
      <button onClick={handleSubmit} class="ui blue button">Go to ScatterPlot</button>
    </div>
  );
}  

export default SelectAxes;
