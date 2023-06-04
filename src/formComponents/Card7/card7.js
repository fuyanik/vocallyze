import "./card7.css";
import { useState } from "react";
import gV from "../../gV";
import { setGlobalState, useGlobalState } from "../../hookState";


const Card7 = () => {

  const [isSelect1, setIsSelect1] = useState(false);
  const [isSelect2, setIsSelect2] = useState(false);

  const [isError] = useGlobalState("isError");

    return (
      <div className="card7">
        <div className="card7-main">
           
            <div className="card7-texts">
              
               <p>Before we can carry out a recheck, we will need a copy of your {gV.showAppliesText.toString()}.</p> 
               <p>Do you have a digital copy of your {gV.showAppliesText.toString()}?</p>
               <p>Digital copies may be on a CD, USB stick, or a computer file.</p>

        
            
            </div>
           
            <div className="ccard7-main-buttons">
                <div className={`${isSelect1 ? "ccard7-main-buttons-item-selected" : "ccard7-main-buttons-item"}`}
                onClick={() => { gV.isHaveDigitalCopy = "Yes"; setGlobalState("formDestiny" , 1); setIsSelect1(true); setIsSelect2(false); setGlobalState("isFormValidate", true);   }  }
                >Yes</div>
              <div className={`${isSelect2 ? "ccard7-main-buttons-item-selected" : "ccard7-main-buttons-item"}`}
                onClick={() => {gV.isHaveDigitalCopy = "No"; gV.insuranceText = "none"; setGlobalState("formDestiny" , 2); setIsSelect2(true); setIsSelect1(false); setGlobalState("isFormValidate", true);   }  }
                >No</div>
            </div>
           <p  className= {isError ? "is-error-text" : "display-none" }> This question is required</p>

                
        </div>
      </div>
    );
}

export default Card7;