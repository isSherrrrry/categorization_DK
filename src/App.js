import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import ConsentForm from './consent/Consent';
import PreSurvey from './presurvey/PreSurvey';
import Scatterplot from './scatterplot_credit/Scatterplot';
import SelectAxes from './scatterplot_credit/SelectAxes';
import Check from './webgazer/Check';
import PostSurvey from './presurvey/PostSurvey'
import Scatterplot_dog from './scatterplot_dog/Scatterplot';
import SelectAxes_dog from './scatterplot_dog/SelectAxes';
import IntroPractice from './scatterplot_dog/IntroPractice';
import IntroFormal from './scatterplot_dog/IntroFormal';
import Scatterplot_car from './scatterplot_car/Scatterplot';
import SelectAxes_car from './scatterplot_car/SelectAxes';
import ThankYou from './presurvey/ThankYou'
import TutorialPage from './consent/Tutorial';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConsentForm/>} />
        <Route path="/presurvey" element={<PreSurvey/>} />
        <Route path="/selectaxis_credit" element={<SelectAxes/>} />
        <Route path="/scatterplot" element={<Scatterplot/>} />
        <Route path="/postsurvey" element={<PostSurvey/>} />
        <Route path="/webgazer_check" element={<Check/>} />
        <Route path="/selectaxis_dog" element={<SelectAxes_dog/>} />
        <Route path="/scatterplot_dog" element={<Scatterplot_dog/>} />
        <Route path="/selectaxis_car" element={<SelectAxes_car/>} />
        <Route path="/scatterplot_car" element={<Scatterplot_car/>} />
        <Route path="/thankyou" element={<ThankYou/>} />
        <Route path="/intro_pactice" element={<IntroPractice/>} />
        <Route path="/intro_formal" element={<IntroFormal/>} />

      </Routes>
   </Router>
  );
}

export default App;

