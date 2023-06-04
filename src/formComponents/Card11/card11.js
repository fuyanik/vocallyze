import gV from "../../gV"
import { setGlobalState, useGlobalState } from "../../hookState"
import "./card11.css"

const Card11 = ({display}) => { 

  const [isError] = useGlobalState("isError")

  const handleChange = (e) => { 
    
    gV.medicalCenterName = e.target.value

    if (e.target.value.length > 0) {
      setGlobalState("isFormValidate", true);
    } else {
      setGlobalState("isFormValidate", false);
    }

  
  }

  return ( 
    <div className="card11" style={{display:display}}>
      <div className="card11-main">
        <div className="card11-main-texts">
           
             <p>No problem, we will acquire your medical files on your behalf. Can you please <span> type the name of the medical center </span> where you got your breast screening?</p>
             <p>Please add City and State at the end of your answer.</p>

        </div>
        <input       onChange={handleChange} className="nameİnput"/>
        <p  className= {isError ? "is-error-text" : "display-none" }> This question is required</p>

      </div>
    </div>
    )
}

export default Card11;