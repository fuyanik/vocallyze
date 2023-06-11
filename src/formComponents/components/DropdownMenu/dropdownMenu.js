import "./dropdownMenu.css"
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import React from 'react';
import gV from "../../../gV.js";
import {setGlobalState} from "../../../hookState";
import { MdOutlineArrowForward } from "react-icons/md";

const DropdownMenu = ({listİtem,top,right}) => {
  
  
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Choose one");

  const handleClick = () => {

    
    //make scrool page end
    window.scrollTo(0,document.body.scrollHeight);
    setGlobalState("isFormValidate", true);

   
   
   
    setIsActive(!isActive);
    gV.mq.matches && setGlobalState("isPayScreen", true);
  
  }
    
    return (

        <div className="dropdown" style={{
           top: top,
           marginRight: right,
        }}>
          
        
        <div
          onClick={handleClick}
          className="dropdown-btn">
       
          {selected}
         <MdArrowDropDown className="down-button"/>
        </div>
        
        <div
          className="dropdown-content"
          style={{ display: isActive ? "block" : "none" }}
        >

        {listİtem.map((company,idx) => (

             <div
             key={idx}
             className="item"
             onClick={(e) => {
             
              setGlobalState("isPayScreen", false); 


               setIsSelected(e.target.textContent);
               setIsActive(!isActive); }}
               
               >
             {company}
             </div>
             
                    ))}
  
        </div>
      </div>
        )
    }
    
    export default DropdownMenu;
       
      
        
