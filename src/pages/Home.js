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

    
  <div className='VitamuHome' > 

      <Helmet>
        <title>MEDIFYRE - Home</title>
        <meta name="description" content="Mitrua" />
      </Helmet>
    

 
  
  
       <NavbarGen/>
      
       <Hero/>

       <PanelHero/>
    
      <Radiologists isOutside={true}/> 

       <div>
        <HowWorks isOutside={true} />
       </div>
       
       <div className='hidden' >
        <HealthHub isOutside={true} />
       </div>

    

         <Informational/>
        

       { mq.matches ? <MobileFooter/> : <Footer/> }

       
    
      

      
      { /* mq.matches ?  <MobileAllinOne/> : <AllinOneService/> */ }  
    
  </div>
    )
  
  }
  
  export default Home;


 
