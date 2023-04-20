import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import ConsentForm from './consent/Consent';
import PreSurvey from './presurvey/PreSurvey';
import Scatterplot from './scatterplot/Scatterplot';
import SelectAxes from './scatterplot/SelectAxes';
import Check from './webgazer/Check';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConsentForm/>} />
        <Route path="/presurvey" element={<PreSurvey/>} />
        <Route path="/selectaxes" element={<SelectAxes/>} />
        <Route path="/scatterplot" element={<Scatterplot/>} />
        <Route path="/check" element={<Check/>} />
      </Routes>
   </Router>
  );
}

export default App;

