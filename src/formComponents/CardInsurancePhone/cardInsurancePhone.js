import gV from "../../gV";

import { useState } from "react";
import { setGlobalState, useGlobalState } from "../../hookState";

const CardInsurancePhone = ({display}) => { 

    const [age, setAge] = useState();
    const [isError] = useGlobalState("isError");
 
    const handleChange = (e) => {
    gV.phoneNumber = e.target.value;

    if (e.target.value.length > 0) {
      setGlobalState("isFormValidate", true);
    } else {
      setGlobalState("isFormValidate", false);
    }

   

    const value = e.target.value.replace(/\D/g, "");
    setAge(value);
     
    console.log(gV.phoneNumber);
    }

    return (
      <div style={{display:display}} className="card6">
        <div className="card6-main">
          <div className="card6-texts">
           
              
               <div className="card6-texts-child"> 
                  <p>Please enter your phone number. This information will only be used for insurance verification.</p>
             
               </div>
          
          </div>


          <input value={age} onChange={handleChange} className="nameİnput" placeholder=""/>
          <p  className= {isError ? "is-error-text" : "display-none" }> This question is required</p>
          
        </div>
      </div>
    );
}

export default CardInsurancePhone;