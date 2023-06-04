import React, { useEffect } from 'react'
import "./insuranceAccepted.css"
import { useGlobalState } from "../../hookState";

import { useNavigate } from 'react-router-dom';
import SwiperPage from "../../pages/Swiper/swiper";
const CardInsuranceAccepted = ({display}) => {

  const navigate = useNavigate();
  const [isPayScreen] = useGlobalState("isPayScreen");

  
  useEffect(() => {

    //isPayScreen && gV.mq.matches && navigate("/swiper-page") 
    //isPayScreen && !gV.mq.matches && navigate("/pay-plans") 
    //isPayScreen && navigate("/swiper-page") 
    
  }, [isPayScreen]);


  return (
   <>
    
      {
        false ? <SwiperPage/> :
        
        <div style={{display:display}} className='card6'>
  
           <p className='insurance-accept-text'>Your insurance is accepted and we got everything we need for recheck. Please continue to complete your recheck request.</p>
         
          </div>}
   </>
  )
}

export default CardInsuranceAccepted