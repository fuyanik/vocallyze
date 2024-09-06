import React from 'react'
import Navbar from "../../../homeComponents/1.Navbar/navbar";

import { useEffect } from 'react';
import Footer from "../../../homeComponents/11.Footer/footer";
import MobileFooter from '../../../homeComponents/22.MobileFooter/mobileFooter';
import gV from '../../../gV';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import "../humanError.css"
import NavbarGen from '../../../homeComponents/NavbarGen/NavbarGen';

const Contact = () => {
  useEffect(() => {  window.scrollTo(0, 0); }, []);

  

  return (
      <> 


  <Helmet>
    <title>Vitamu - Contact</title>
     <meta name="description" content="Contact" />
  </Helmet>


   <NavbarGen/>
      <div className=" w-screen h-full py-[12.8vh] lg:py-[15.8vh] flex flex-col items-center justify-center font-product">
          <div className=" w-[92vw] lg:w-[66vw]">
              

                           
                           
                            <h4 className='font-product text-black text-[32px] leading-[36px] w-full border-b pb-2'>Have questions? We have answers.</h4>

                            <div className='flex flex-col gap-2 mt-10'  >

                              <t className="text-[24px] font-bold">Visit our <Link className='style-none' to="/faq"><span style={{cursor:"pointer"}} >F.A.Q</span></Link> </t>
                              <t style={{color:"rgb(148, 148, 148)", fontSize:"16px"}}>Drop us an email. We will get back to you in 10 minutes. </t>
                             
                              <t className="text-[24px] font-bold"> <a className="style-none"  href="mailto:hello@medifyre.com"> <span>hello@medifyre.com</span> </a>  </t>
                              <t style={{color:"rgb(148, 148, 148)", fontSize:"16px"}}> In a rush? Give us a call</t>
                             
                              <t className="text-[24px] font-bold"><span>+1 646 820 1932</span></t>
                              <t style={{color:"rgb(148, 148, 148)", fontSize:"16px"}}> How about a visit? </t>

                              <t className="text-[24px] font-bold"><span>33 Irving Pl, New York, NY 10003</span></t>
                             




                          
                             </div>
               
                 
            
             
          
              
          </div> 
       </div>
      
       {gV.mq.matches ? <MobileFooter/> : <div><Footer/></div>} 
     
       </>
  )
}

export default Contact;