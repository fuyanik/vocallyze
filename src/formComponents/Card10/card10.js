import "./card10.css"


import { useGlobalState } from "../../hookState";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import gV from "../../gV";
import SwiperPage from "../../pages/Swiper/swiper";


const Card10 = ({text1,text2,display}) => { 
    //Scroll to top
    //...
    window.scrollTo(0, 0);


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
   <div className="card10" style={{display:display}}>
       
     { <div className="card10-main">
       
           <div className="card10-main-texts" >

             <p>{text1}</p>
             <p>{text2} </p>
             <p>If you cannot afford a recheck, please send us an e-mail at hello@mitrua.com. We can help.</p>
           </div>

          { /* <input placeholder="$120.00" className="nameİnput"/>  */}
            


       </div>}
     
     </div>  } 
   
     </>
     );

}


export default Card10;