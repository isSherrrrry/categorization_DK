import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Consent from './consent/Consent';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Consent/>} />
      </Routes>
   </Router>
  );
}

export default App;