import "./card4.css";
import { useState  } from "react";
import gV from "../../gV";
import { setGlobalState, useGlobalState } from "../../hookState";



const Card4 = ({display}) => { 

   const [isSelect1, SetİsSelect1] = useState(false);
   const [isSelect2, SetİsSelect2] = useState(false);
   const [isSelect3, SetİsSelect3] = useState(false);
   const [isSelect4a, SetİsSelect4a] = useState(false);
   const [isSelect4b, SetİsSelect4b] = useState(false);
   const [isSelect4c, SetİsSelect4c] = useState(false);
  
   const [isError] = useGlobalState("isError");


    return (
      <div className="card4" style={{display: display}}>
        <div className="card4-main">
         
          <div className="card4-main-texts">
            <p>Which one is your Bi-rads score? </p>
            <p>Please choose the most recent score.</p>
          </div>

          <div className="card4-main-buttons">
        
          {    gV.isShowBiRads123 && <div className={` ${isSelect1 ? "answer-buttons-clicked" : "answer-buttons"}`}
              onClick={() => {
                gV.biRads = "1";  SetİsSelect1(true); SetİsSelect2(false); SetİsSelect3(false); SetİsSelect4a(false); SetİsSelect4b(false); SetİsSelect4c(false); }}>
              1
             </div>  }  
              
           

             { gV.isShowBiRads123 && <div className={` ${isSelect2 ? "answer-buttons-clicked" : "answer-buttons"}`}
             onClick={() => {
               gV.biRads = "2"; SetİsSelect2(true); SetİsSelect1(false); SetİsSelect3(false); SetİsSelect4a(false); SetİsSelect4b(false); SetİsSelect4c(false); }}>
             
              2
             </div>  }
             
             { gV.isShowBiRads123 &&  <div className={` ${isSelect3 ? "answer-buttons-clicked" : "answer-buttons"}`} 
             onClick={() => {  gV.biRads = "3"; SetİsSelect3(true); SetİsSelect1(false); SetİsSelect2(false); SetİsSelect4a(false); SetİsSelect4b(false); SetİsSelect4c(false); }}>
             
              3
             </div>  }
             
             <div className={` ${isSelect4a ? "answer-buttons-clicked" : "answer-buttons"}`} 
             onClick={() => { gV.biRads = "4a"; SetİsSelect4a(true); SetİsSelect1(false); SetİsSelect2(false); SetİsSelect3(false); SetİsSelect4b(false); SetİsSelect4c(false); }}>
             
              4a
             </div>
           
             <div className={` ${isSelect4b ? "answer-buttons-clicked" : "answer-buttons"}`}
             onClick={() => { gV.biRads = "4b"; SetİsSelect4b(true); SetİsSelect1(false); SetİsSelect2(false); SetİsSelect3(false); SetİsSelect4a(false); SetİsSelect4c(false); }}>
             
              4b
             </div>

             <div className={` ${isSelect4c ? "answer-buttons-clicked" : "answer-buttons"}`}
             onClick={() => { gV.biRads = "4c"; SetİsSelect4c(true); SetİsSelect1(false); SetİsSelect2(false); SetİsSelect3(false); SetİsSelect4a(false); SetİsSelect4b(false); }}>
             
              4c
             </div>
             <p style={{marginLeft:"12px"}} className= {isError ? "is-error-text" : "display-none" }> This question is required</p>

          
          
          
          
          </div>

           
         


        </div>
      </div>
    );

}

export default Card4;