
import { createGlobalState } from 'react-hooks-global-state';
import { MdOutlineArrowForward } from "react-icons/md";
import  "./formComponents/components/ForwardButton/forwardButton.css"
import React from 'react';

const { setGlobalState, useGlobalState } = createGlobalState({

 /* Form Step */
 activeStep: 0,

 isError: false,

 formInformation: {
   firstName: "",
   mail: "",
   phone: 0,
   question: "",
   imagesSendType: "",
   medicalCenter: "",
   insurance: "",
 },


 /* Select Dropdown */ 
 isDropdownSet: false,



 isPayScreen: false,
 isFormValidate: false,
 userPanelNavIndex: 0,
 isFormPopUp: false,

  
});


export {useGlobalState, setGlobalState};