import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import ConsentForm from './consent/Consent';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConsentForm/>} />
      </Routes>
   </Router>
  );
}

export default App;