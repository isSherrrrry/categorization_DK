import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import './consent.css'



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
      <h2>CONSENT DOCUMENT FOR ENROLLING ADULT PARTICIPANTS IN A RESEARCH STUDY</h2>
      <h3>Project Title: Exploring Decision Making Behavior</h3>
      <p><b>Principle Investigator: Dr. Emily Wall</b></p>
      <p><b>Funding Source: Emory Computer Science Department</b></p>
      <p>
        <b>Protocol and Consent Title: Decision Making with Interactive
        Visualizations</b>
      </p>
      <p class="consent_content">
  <u><b>Introduction</b></u><br/>
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
  Before you begin the main part of the study: You will need to have the following screening tests / procedures to find out if you can be in the main part of the study. Complete a brief survey to verify you are eligible to participate (over 18 years old, and self-report relevant domain expertise and prior experience with visualization.
  This screening questionnaire will collect your email address. If you are eligible to participate, this information will be used to contact you to schedule a time for your participation in the study. If you are ineligible to participate, your data will be deleted.<br/>
  During the main part of the study: You will complete the following procedure. <br/>
  <ul>
    <li>You will first be asked to complete a decision making task by using a data visualization tool.</li>
    <li>Some of the participants will be invited for a second follow-up survey.</li>
  </ul>
  Each study session will last between 5-30 minutes (Prolific) to 1 hour (in-lab). We will invite some of the participants for a second follow-up survey that will last approximately the same amount of time.<br/><br/>

  <u><b>Risks and Discomforts</b></u><br/>
  We do not anticipate any problems that would affect risk level, participants’ willingness to participate, or feasibility of doing the research. The risks involved are no greater than those involved in daily activities such as using a laptop for web browsing.<br/><br/>

  <u><b>New Information</b></u><br/>
  It is possible that the researchers will learn something new during the study about the risks of being in it.  If this happens, they will tell you about it. Then you can decide if you want to continue to be in this study or not.  You may be asked to sign a new consent form that includes the new information if you decide to stay in the study.<br/><br/>

  <u><b>Benefits</b></u><br/>
  This study is not designed to benefit you directly. This study is designed to learn more about observing decisions that subjects make using data presented in a visualization interface. The study results may be used to help others in the future.<br/><br/>

  <u><b>Compensation</b></u><br/>
  You will be compensated at a rate of $10 per hour for each completed study session.  If you do not finish the study, you will be paid for the sessions you have completed. <br/><br/>

  <u><b>Confidentiality</b></u><br/>
  Certain offices and people other than the researchers may look at study records. Government agencies and Emory employees overseeing proper study conduct may look at your study records.  These offices include the funder(s), the Emory Institutional Review Board, the Emory Office of Compliance. Study funders may also look at your study records.   Emory will keep any research records we create private to the extent we are required to do so by law.  A study number rather than your name will be used on study records wherever possible. Your name and other facts that might point to you will not appear when we present this study or publish its results. <br/>
  Study records can be opened by court order. They may also be produced in response to a subpoena or a request for production of documents.<br/><br/>

  <u><b>Storing and Sharing your Information</b></u><br/>
  De-identified data from this study (data that has been stripped of all information that can identify you), may be placed into public databases where, in addition to having no direct identifiers, researchers will need to sign data use agreements before accessing the data. We will remove or code any personal information that could identify you before your information is shared. This will ensure that, by current scientific standards and known methods, it is extremely unlikely that anyone would be able to identify you from the information we share. Despite these measures, we cannot guarantee anonymity of your personal data.<br/>
  Your data from this study may be useful for other research being done by investigators at Emory or elsewhere. To help further science, we may provide your deidentified data and/or specimens to other researchers. If we do, we will not include any information that could identify you. If your data or specimens are labeled with your study ID, we will not allow the other investigators to link that ID to your identifiable information.<br/>
  No results returned to participants<br/>
  In general, we will not give you any individual results from the study of the samples you give us.<br/><br/>

  <u><b>Withdrawal from the Study</b></u><br/>
  You have the right to leave a study at any time without penalty.  <br/>
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

      
      <div className="ui checkbox consent_agree"><input type="checkbox" defaultChecked={accepted} onChange={handleAcceptChange}/><label>I accept</label></div><br/>
      <button onClick={handleContinue} disabled={!accepted} class="ui blue button">Continue</button>
      
    </div>
  );
};

export default ConsentForm;