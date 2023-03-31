import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import './consent.css'



const ConsentForm = () => {
  const [accepted, setAccepted] = useState(false);

  const handleAcceptChange = (e) => {
    setAccepted(e.target.checked);
  };

  const handleContinue = () => {
    if (accepted) {
      // Proceed to the next step in the study.
      console.log("Continuing with the study...");
    } else {
      alert("Please accept the terms to continue.");
    }
  };


  return (
    <div className="consent_main">
      <h2>CONSENT DOCUMENT FOR ENROLLING ADULT PARTICIPANTS IN A RESEARCH STUDY</h2>
      <h3>Project Title: Exploring Decision Making Behavior</h3>
      <p><b>Investigators: Emily Wall, Mengyu Chen, and Yijun Liu</b></p>
      <p>
        <b>Protocol and Consent Title: Decision Making with Interactive
        Visualizations v1.0</b>
      </p>
      <p className="consent_content">
        You are being asked to be a volunteer in a research study. <br/><br/>
        <u><b>Purpose:</b></u> The purpose of this study is to explore the relationship between expertise and decision-making behavior.<br/><br/>
        <u><b>Exclusion/Inclusion Criteria:</b></u> Participants in this study must be at least 18 years of age and have general familiarity with using web-based systems.<br/><br/>
        <u><b>Procedures:</b></u> If you decide to be in this study, your part will involve approximately 1 hour, during which you will complete a simple knowledge background questionnaire, watch a demonstration of the interface, and perform a set of tasks with an interactive visualization. With your permission we will record your interactions using logging software that will capture things like clicks and hovers.<br/><br/>
        <u><b>Risks or Discomforts:</b></u> The risks involved are no greater than those involved in daily activities such as using a laptop for web-browsing.<br/><br/>
        <u><b>Benefits:</b></u> You are not likely to benefit in any way from joining this study. We hope that what we learn will help to enhance our understanding of user interaction patterns related to decision making.<br/><br/>
        <u><b>Compensation to You:</b></u> Compensation includes a $10 Amazon gift card for each completed session of the study.<br/><br/>
        <u><b>Confidentiality:</b></u> Your privacy will be protected to the extent allowed by the law. To protect your privacy, your records will be kept under a code number rather than by name. Interaction logs will be stored on an external storage device. Your records, including interaction logs, questionnaire responses, and consent form will be kept in locked files and only study staff will be allowed to look at them. Your name and any other fact that might point to you will not appear when results of this study are presented or published. Federal regulations require that all study data be stored for a minimum of 3 years. After analysis and publication, all records of your participation in the study will be destroyed. To make sure that this research is being carried out properly, the Emory IRB may review study records. Your privacy will be protected to the extent allowed by the law.<br/><br/>
        <u><b>Costs to You:</b></u> If you participate in this study, you will be responsible for any data costs incurred while participating in the online study.<br/><br/>
        <u><b>Participant Rights:</b></u> Your participation in this study is voluntary. You do not have to be in this study if you don't want to be. You have the right to change your mind and leave the study at any time without giving any reason and without penalty. If you decide not to finish the study, you have the right to withdraw any data collected about you. Should you decide to withdraw from the study, your questionnaires will be shredded. Any new information that may make you change your mind about being in this study will be given to you. You will be given a copy of this consent form to keep. You do not waive any of your legal rights by signing this consent form.<br/><br/>
        <u><b>Questions about the Study:</b></u> If you have any questions about the study, you may contact Prof. Emily Wall at emily.wall@emory.edu.
      </p>
      
      <div className="ui checkbox consent_agree"><input type="checkbox" defaultChecked={accepted} onChange={handleAcceptChange}/><label>I accept</label></div><br/>
      <button onClick={handleContinue} disabled={!accepted} class="ui blue button">Continue</button>
      
    </div>
  );
};

export default ConsentForm;