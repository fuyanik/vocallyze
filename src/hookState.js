
import { createGlobalState } from 'react-hooks-global-state';
import { MdOutlineArrowForward } from "react-icons/md";
import  "./formComponents/components/ForwardButton/forwardButton.css"
import React from 'react';

const { setGlobalState, useGlobalState } = createGlobalState({

  /* Mitrua */
   
  /* Select Dropdown */ 
  isDropdownSet: false,
  /* Form Step */
  activeStep: 0,
  
  scanType: [],
  bodyParts: [],

  doctors: [],

  paymentPlan: "none",





 isError: false,

 isPayScreen: false,
 isFormValidate: false,
 userPanelNavIndex: 0,
 isLoginPopup: false,
 insuranceCompany: "none",

 mainPayAmount: 299,



 


  
});


export {useGlobalState, setGlobalState};