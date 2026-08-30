import MobileFooterCustomizedAccordions from './footerAccordion';
import './mobileFooter.css'
import vitamuLogo from './images/vitamuLogo.png'
import mobileFooterIcons from './images/mobileFooterIcons.png'
import mobileFooterPay from './images/mobileFooterPay.jpg'
import logo from '../../assets/images/logos.png'
import {Link} from 'react-router-dom';
import PrimaryButton from '../microComponents/primaryButton/primaryButton';
import gV from '../../gV';
import React from 'react';
import BiRadsDropdown from '../BiRadsDropdown/biRadsDropdown';


const MobileFooter = () => {

     const [isHover, setIsHover] = React.useState(false);

return (



<div className="mobile-footer"> 
   <div className='mobile-footer-main'> 
        {/* <div className='dividero-footer'></div> */}
         <img alt='vocallyze logo' className="w-48 " src={logo} />
         <MobileFooterCustomizedAccordions/>
         <p className='mobile-footer-text'>Terms of Service · Privacy Policy</p>
         <img alt='medifyre icons'  className='mobile-footer-icons' src= {mobileFooterIcons}/>
  
           <br></br>

         

         <p className='mobile-footer-text2'>These statements have not been evaluated by the FDA, NHS, or Health Canada. This service is not intended to treat or cure any disease.</p>
         <img  className='mobile-footer-pay' src= {mobileFooterPay}/>
       
         <p className='mobile-footer-text2'>  Medifyre 2024 All Rights Reserved.</p>
         
              

                           
                         
                       


   </div>
</div>



)

}

export default MobileFooter;