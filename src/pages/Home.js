import React, { useEffect } from 'react';
import Navbar from "../homeComponents/1.Navbar/navbar"
import Hero from "../homeComponents/2.Hero/hero"
import Logos from "../homeComponents/3.Logos/logos"

import Radiologists from '../homeComponents/7.Radiologists/radiologists';
import LearningCenter from '../homeComponents/10.LearningCenter/learningCenter';
import Footer from '../homeComponents/11.Footer/footer';

import MobileFooter from '../homeComponents/22.MobileFooter/mobileFooter';
import gV from '../gV';
import {setGlobalState } from '../hookState';

import { useState } from 'react';
import axios from 'axios';
import Testom from '../homeComponents/WomenSpeak/testom';
import AllOneService from '../homeComponents/5.AllOneService/allOneService';
import SliderStepperMobile from '../homeComponents/SliderStepper/sliderStepperMobile';
import SliderStepper from '../homeComponents/SliderStepper/sliderStepper';
import Icons from '../homeComponents/Icons/Icons';
import IconsMobile from '../homeComponents/Icons/Icons_mobile';

import { Helmet } from 'react-helmet';
import PayScreen from './PayScreen/payScreen';
import HealthHub from './HealthHub/HealthHub';
import Informational from '../homeComponents/Informational/Informational';
import HowWorks from './HowWorks/HowWorks';
import NavbarGen from '../homeComponents/NavbarGen/NavbarGen';
import PanelHero from '../homeComponents/PanelHero/PanelHero';
import SampleReports from './DropdownPages/SampleReports/SampleReports';
import WhySecondOpinion from './WhySecondOpinion/WhySecondOpinion';
import FooterGen from '../homeComponents/FooterGen/FooterGen';




const Home = () => { 
  
  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");



 
  useEffect(() => {
    gV.isShowBiradsPage = true;
  }, []);

  const getGeoInfo =    () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        setCountryName(response.data.country_name);
        setCityName(response.data.region);

        gV.geoData = response.data;
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  getGeoInfo();


  //window.scrollTo(0, 0);

  // This is your test secret API key.

 
  setGlobalState("isPayScreen",false);
  gV.p = 0;
  gV.i = 0;
  gV.biRads = "";
  gV.isShowBiRads123 = true;
  gV.navigation = "home";
  setGlobalState("isFormValidate", false);
  setGlobalState("activeStep", 0);
  gV.a = 0;
  gV.b = 0;

  var mq = window.matchMedia( "(max-width: 1080px)" );



  
  window.scrollTo(0, 0);
 

  return (

    
  <div className='flex flex-col overflow-hidden ' >  

 <Helmet>
    <title>Medifyre - Expert Medical Second Opinions Online | Trusted Healthcare Services</title>
    <meta name="description" content="Medifyre provides expert medical second opinions online, connecting you with top radiologists to answer all your healthcare questions." />
    <meta name="keywords" content="Medifyre, medical second opinions, online healthcare, expert radiologists, medical reports, second opinion services" />
    <meta property="og:title" content="Medifyre - Expert Medical Second Opinions Online" />
    <meta property="og:description" content="Get trusted medical second opinions from top radiologists. Medifyre helps you make informed healthcare decisions with ease." />
    <meta property="og:image" content="https://yourwebsite.com/path/to/homepage-image.png" />
    <meta property="og:url" content="https://medifyre.com" />
    <meta property="og:type" content="website" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
    
       <NavbarGen/>
       <Hero/>
       <PanelHero/>
       <WhySecondOpinion isOutside={true} />
       <SampleReports isOutside={true}/>
       <HowWorks isOutside={true} />
       
    
      {/* <Radiologists isOutside={true}/>  */} 

    
      
      {/* <HealthHub   isOutside={true} />  */} 
      

       { /* <Informational/> */ }
        
      

        

       {  mq.matches ? <MobileFooter/> : <Footer/>  }

       
    
      

      
      { /* mq.matches ?  <MobileAllinOne/> : <AllinOneService/> */ }  
    
  </div>
    )
  
  }
  
  export default Home;


 
