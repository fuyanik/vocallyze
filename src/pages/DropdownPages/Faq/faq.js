import React from 'react'
import Navbar from "../../../homeComponents/1.Navbar/navbar";

import Footer from "../../../homeComponents/11.Footer/footer";

import AccordionRecheck from './accordionRecheck';
import AccordionRedFlags from './accordionRedFlags';
import AccordionPrivacy from './accordionPrivacy';

import { useEffect } from 'react';
import gV from '../../../gV';
import MobileFooter from '../../../homeComponents/22.MobileFooter/mobileFooter';
import DropdownHeader from '../components/Header';

import { SideInformation } from '../../BiRads/biRads3';
import { Helmet } from 'react-helmet';

const Faq = ({isOutside = false}) => {
  useEffect(() => {  window.scrollTo(0, 0); }, []);



  return (
    <>


  <Helmet>
  <title>Vitamu - Faq</title>
   <meta name="description" content="Faq" />
</Helmet>

   {  !isOutside &&   <Navbar mobileMenuText={"Menu"} mobileMenuTo={"/mobileNavMenu"} />}
      
      <div className="human-error">
        <div className="human-error-main">
         
          <div className='mt-4'></div>
        
         <div className={`lg:flex lg:flex-col  ${isOutside ?  "lg:w-[64%]" : "lg:w-[44%]"} `} >
           <DropdownHeader
              display={false}
              yellow_title={"FAQ"}
              title={"Frequently Asked Questions"}
              subtitle={"'Frequently Asked Questions' section where you can find answers to commonly asked questions about our products or services. This section is designed to provide answers to the most commonly asked questions. If you can't find what you're looking for here, please don't hesitate to contact us. Our customer support is here for you and always ready to help. Thank you!"}
              writer={"Elizabeth H. Asch, MD"}
              date={"Updated on February 12, 2023"}
              checker={"Priscilla J Slanetz, MD"}
             />
  
  
            <div className={`${!gV.mq.matches && "w-[120%]"}  `} style={{display: "flex", flexDirection:"column", gap:"30px"}}>
  
              <p style={{fontFamily:"ProductSans-Light", color:"#000000", fontSize:"32px", fontWeight:"500", marginTop:"50px"}}>Recheck </p>
              <AccordionRecheck/>
  
              <p style={{fontFamily:"ProductSans-Light", color:"#000000", fontSize:"32px", fontWeight:"500"}}>Red-Flags </p>
              <AccordionRedFlags/>
             
              <p style={{fontFamily:"ProductSans-Light", color:"#000000", fontSize:"32px", fontWeight:"500"}}>Privacy </p>
              <AccordionPrivacy/>
  
  
            </div>
         </div>

         

         <SideInformation/>
        
        

                     

                          
        
        
        </div>
      </div>

      {gV.mq.matches ? <MobileFooter/> :   <div > <Footer/></div>}




    </>
  );
}


export default  Faq;