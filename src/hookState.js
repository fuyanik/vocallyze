
import { createGlobalState } from 'react-hooks-global-state';
import { MdOutlineArrowForward } from "react-icons/md";
import  "./formComponents/components/ForwardButton/forwardButton.css"
import React from 'react';

const { setGlobalState, useGlobalState } = createGlobalState({

  user_email_live: null,

  isFormPopUp: false,
  isSummaryPopUp: false,


  myButtonType:  <MdOutlineArrowForward className="forward-icon" />,
  myButtonWidth: "100px",
  myButtonleft: "48%",
  myBackButtonleft: "44.4%",
     
  
  //It helps the user to extract different pages in the form based on their responses.
  formDestiny: 0,



  //Help payment screen open
  isPayScreen: false,

  //is validate the form
  isValidate: false,
  isError: false,


  //Real form validation
  isFormValidate: false,
  

  //detect user came userPanel or form
  isCameUserPanel:false,

  //isShowForwardsBackButtons
  isShowFormButtons: true,


  //Mobile User Panel
  userPanelNavIndex: 1,

  //userAge
  userAge: 31,

  userName: "",

  isDropdownSet: false,
});


export {useGlobalState, setGlobalState};