import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import './consent.css'
import logo from './EmoryLogo.png';



const ConsentForm = () => {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate(); // Create navigate function

  const handleAcceptChange = (e) => {
    setAccepted(e.target.checked);
  };

  const handleContinue = () => {
    if (accepted) {
      // Proceed to the next step in the study.
      console.log("Continuing with the study...");
      navigate("/presurvey"); // Navigate to /presurvey route
    } else {
      alert("Please accept the terms to continue.");
    }
  };



  return (
    <div className="consent_main">
      <p style={{textAlign: 'center', marginBottom: '25px'}}>
        <img src={logo} height='80' alt='Emory Logo' />
      </p>
      <h1 style={{textAlign: 'center'}}> Exploring Decision Making Behavior</h1>
      {/* <h2>CONSENT DOCUMENT FOR ENROLLING ADULT PARTICIPANTS IN A RESEARCH STUDY</h2>  */}
     
      <p>
        Thank you for your interest in our study! We are researchers interested in exploring decision making behavior with interactive visualizations. In this study, you will be asked to
        categorize data points from a scatterplot plotting interface. Detailed information regarding this study include:
        <ul>
          <li>In this study, you are expected to complete: (1) a presurvey; (2) two categorization tasks in the domain of car type and credit score; (3) an exit survey.</li>
          <li>Your interactions with the interface, including clicks, hovers, and eye tracking data, will be recorded and automatically downloaded as json type files to your machine after you complete the task. </li>
          <li>This experiment will take approximately 15-25 minutes, and you will be compensated via Prolific.</li>
          <li style={{color: 'red', fontWeight: 'bold'}}>Please use Chrome or Firefox browser on a laptop to complete this study and allow the system access to your webcam for the eye tracking data to be collected (no video is retained).</li>
          <li>You may only participate in this entire study once. You would have to be 18 or older as well as fluent in English to participate. If you have seen this survey before or one like it, please return the study.</li>
        </ul>

      </p>
      <p class="consent_content">
      <h2>Consent Form</h2>
  {/* <u><b>Introduction</b></u><br/> */}
  <p><b>Principle Investigator: Dr. Emily Wall</b></p>
  <p><b>Protocol and Consent Title: Decision Making with Interactive Visualizations</b></p>
  {/* <p><b>Funding Source: Emory Computer Science Department</b></p> */}
  You are being asked to be in a research study. This form is designed to tell you everything you need to think about before you decide to consent (agree) to be in the study or not to be in the study.  It is entirely your choice.  If you decide to take part, you can change your mind later on and withdraw from the research study.  You can skip any questions that you do not wish to answer.<br/><br/>

  Before making your decision:<br/>
  <ul>
    <li>Please carefully read this form or have it read to you</li>
    <li>Please ask questions about anything that is not clear</li>
  </ul>
  You can take a copy of this consent form, to keep. Feel free to take your time thinking about whether you would like to participate. By signing this form you will not give up any legal rights.<br/><br/>

  <u><b>Study Overview</b></u><br/>
  The purpose of this study is to observe decisions that subjects make using data presented in a visualization interface.<br/><br/>

  <u><b>Procedures</b></u><br/>
  In the study, you will categorize data points in two tasks using an interactive scatterplot visualization. To begin the study, you need to fill in a presurvey and then 
  proceed to the categorization tasks. After completing the two tasks, you are expected to complete an exit survey about your performance.<br/><br/>
  Your interactions with the system, including clicks, hovers, and eyetracking data, will be recorded. Please allow the system access to your webcam for the eyetracking data to be collected (no video is retained). 
  This experiment will last between 15-25 minutes.<br/><br/>
   {/* and automatically downloaded to your machine after you complete the task.  */}
  {/* Please allow the files to download and upload them in our exit survey by instruction.  */}


  <u><b>Risks and Discomforts</b></u><br/>
  We do not anticipate any problems that would affect risk level, participants' willingness to participate, or feasibility of doing the research. The risks involved are no greater than those involved in daily activities such as using a laptop for web browsing.<br/><br/>

  <u><b>New Information</b></u><br/>
  It is possible that the researchers will learn something new during the study about the risks of being in it.  If this happens, they will tell you about it. Then you can decide if you want to continue to be in this study or not.  You may be asked to sign a new consent form that includes the new information if you decide to stay in the study.<br/><br/>

  <u><b>Benefits</b></u><br/>
  This study is not designed to benefit you directly. This study is designed to learn more about observing decisions that subjects make using data presented in a visualization interface. The study results may be used to help others in the future.<br/><br/>

  <u><b>Compensation</b></u><br/>
  You will be compensated at a rate equivalent to $10 per hour for the completed study.  If you decide to withdraw from the study prior to completion you will not be eligible for payment. <br/><br/>

  <u><b>Confidentiality</b></u><br/>
  Certain offices and people other than the researchers may look at study records. Government agencies and Emory employees overseeing proper study conduct may look at your study records.  These offices include the funder(s), the Emory Institutional Review Board, the Emory Office of Compliance. Study funders may also look at your study records.   Emory will keep any research records we create private to the extent we are required to do so by law.  A study number rather than your name will be used on study records wherever possible. Your name and other facts that might point to you will not appear when we present this study or publish its results. <br/>
  Study records can be opened by court order. They may also be produced in response to a subpoena or a request for production of documents.<br/><br/>

  <u><b>Storing and Sharing your Information</b></u><br/>
  De-identified data from this study (data that has been stripped of all information that can identify you), may be placed into public databases where, in addition to having no direct identifiers, 
  researchers will need to sign data use agreements before accessing the data. We will remove or code any personal information that could identify you before your information is shared. 
  This will ensure that, by current scientific standards and known methods, it is extremely unlikely that anyone would be able to identify you from the information we share. 
  Despite these measures, we cannot guarantee anonymity of your personal data.<br/><br/>
  Your data from this study may be useful for other research being done by investigators at Emory or elsewhere. To help further science, we may provide your deidentified data and/or specimens to other researchers. If we do, we will not include any information that could identify you. If your data or specimens are labeled with your study ID, we will not allow the other investigators to link that ID to your identifiable information.
  No results returned to participants.<br/>
  In general, we will not give you any individual results from the study of the samples you give us.<br/><br/>

  <u><b>Withdrawal from the Study</b></u><br/>
  You have the right to leave a study at any time without penalty. 
  The researchers also have the right to stop your participation in this study without your consent for any reason, especially if they believe it is in your best interest or if you were to object to any future changes that may be made in the study plan.  <br/><br/>

  <u><b>Contact Information</b></u><br/>
  Contact Emily Wall at emily.wall@emory.edu:<br/>
  <ul>
    <li>If you have any questions about this study or your part in it,</li>  
    <li>If you have questions, or concerns about the research</li>
  </ul>

  Contact the Emory Institutional Review Board at 404-712-0720 or 877-503-9797 or irb@emory.edu:<br/>
  <ul>
    <li>If you have questions about your rights as a research participant.</li>
    <li>If you have complaints about the research or an issue you rather discuss with someone outside the research team.</li>
  </ul>

  You may also let the IRB know about your experience as a research participant through our Research Participant Survey at <a href="https://tinyurl.com/ycewgkke">https://tinyurl.com/ycewgkke</a>.
</p>

      
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <div className="ui checkbox consent_agree">
      <input type="checkbox" defaultChecked={accepted} onChange={handleAcceptChange} />
      <label style={{ fontWeight: 'bold', fontSize: '15px' }}>I accept.</label>
    </div>
    <button 
    onClick={handleContinue} 
    disabled={!accepted} 
    className="ui blue button"
    style={{ marginBottom: '20px' }}>
    Continue</button>
  </div>
      
</div>
  );
};

export default ConsentForm;