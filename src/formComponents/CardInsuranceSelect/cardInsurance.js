

import "./cardInsurance.css"
import React from 'react';
import DropdownMenu from "../components/DropdownMenu/dropdownMenu";
import gV from "../../gV";


const CardInsuranceSelect = ({display}) => {

    const allCompany = [ 
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

    return (

        <div className="  "  style={{display: display}}>

       <div className="">
            
            <DropdownMenu
             listİtem={allCompany}
             right={gV.mq.matches ? "110px" : "0px"}
            />

           
   
       </div>

        
{
       /*
        <DropdownMenu  
        listİtem={allCompany}
        /> 
        */

}
    </div>

    )
}
export default CardInsuranceSelect;