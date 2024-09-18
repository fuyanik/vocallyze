import "./dropdownMenu.css"
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import React from 'react';
import gV from "../../../gV.js";
import {setGlobalState} from "../../../hookState";
import { MdOutlineArrowForward } from "react-icons/md";

const DropdownMenu = ({top,right}) => {
  

  const listİtem = [ 
    "I do not have an active insurance plan.",
    "My insurance is not listed.",
    "United Healthcare",
    "Oscar",
    "Aetna",
    "Molina Healthcare",
    "Humana",
    "Cigna",
    "Magellan",
    "Anthem",
    "Blue California",
    "Blue Shield",
    "Care Plus",
    "Freedom Health",
    "WellCare",
    "United American",
    "Caresource",
    ]
  
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Choose one");

  const handleClick = () => {

    
    //make scrool page end
   
    setIsActive(!isActive);
  
  
  }
    
    return (

        <div className="dropdown bg-slate-100 rounded-full -z-10" style={{
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
          className="dropdown-content duration-500"
          style={{ display: isActive ? "block" : "none" }}
        >

        {listİtem.map((company,idx) => (

             <div
             key={idx}
             className="item duration-500"
             onClick={(e) => {
             
              

               setIsSelected(e.target.textContent);
               gV.insuranceCompany = e.target.textContent;
             
               setGlobalState("insuranceCompany", e.target.textContent);
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
       
      
        
