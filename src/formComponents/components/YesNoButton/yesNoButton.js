import { useEffect, useLayoutEffect, useState } from "react";
import "./yesNoButton.css"
import gV from "../../../gV"
import { setGlobalState, useGlobalState } from "../../../hookState";
import { MdOutlineArrowForward } from "react-icons/md";

import React from 'react';

const YesNoButton = ({chooseYes, chooseNo,myPaymentNo}) => {
 
  const [isSelectYes, SetİsSelectYes] = useState(false);
  const [isSelectNo, SetİsSelectNo] = useState(false);

 



    
   



function yesButtonClick () {
  
   
  setGlobalState("myButtonType", <MdOutlineArrowForward className='forward-icon'/>);
  
  setGlobalState("myButtonWidth", '100px');
  setGlobalState("myButtonleft", '48%');
  setGlobalState("myBackButtonleft", '44.7%');

   
    SetİsSelectYes(true)
    SetİsSelectNo(false)
    gV.formDestiny = chooseYes;
  
   

   
    
   

    
}
function noButtonClick() {
  
  setGlobalState("myButtonType", <MdOutlineArrowForward className='forward-icon'/>);
  setGlobalState("myButtonWidth", '100px');
  setGlobalState("myButtonleft", '48%');
  setGlobalState("myBackButtonleft", '44.7%'); 
  
   gV.paymentFee = myPaymentNo;

  

    SetİsSelectNo(true)
    SetİsSelectYes(false)
    gV.formDestiny = chooseNo;
    
}



return (

  <div className="yes-no-button">
   
   
  
    <a className="yes-button" href="#" 
    
    style=
    {{
    backgroundColor: isSelectYes && " #142b6f",
    color: isSelectYes && "white"
    }}  
   
    onClick= {yesButtonClick}
    
    >   Yes      </a>



    
    <a className="no-button" href="#"   
     
     style=
     {{
     backgroundColor: isSelectNo && " #142b6f",
     color: isSelectNo &&  "white"
     }} 
     
     onClick={noButtonClick}
    
    
    
    >    No    </a>
 

  </div>


)

}

export default YesNoButton;