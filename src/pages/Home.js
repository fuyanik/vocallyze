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



  
 

  return (

    
  <div className='VitamuHome' > 

      <Helmet>
        <title>Mitrua - Home</title>
        <meta name="description" content="Mitrua" />
      </Helmet>
    

 
  
  
      <Navbar
      mobileMenuText={'Menu'}
      mobileMenuTo ={"/mobileNavMenu"}
      />
      
      
       <Hero/>

       
    
    
       <Radiologists isOutside={true}/>
       <div >
        <HealthHub/>
       </div>

          {/* Why choose scan */}
          <div className='w-[93vw]  lg:w-fit self-center flex font-product relative '> 
          <div class="  flex-col items-center self-center justify-center   mt-5">
    
            <div class="space-y-1 md:text-center max-w-2xl mx-auto lg:mb-12 mb-8">
      <h2 class="text-[38px] font-bold">Why choose Mitrua?</h2>
      <p class="text-base lg:text-lg text-neutral-600">We are taking the human error and misdiagnosis risk out of scanning. Second opinion from two U.S. board-certified radiologists, results in 24 hours, at one affordable price.</p>
            </div>

    <div class="rounded-2xl border border-grey-300  shadow-sm justify-center flex ">
     
      <table class="  w-fit border-collapse">
        <thead>
          <tr>
            <td class="border-b bg-neutral-50 pl-4 pr-5 md:px-6 md:py-6 py-4 font-semibold leading-snug text-sm lg:text-base">What's included <span class="hidden sm:inline">in the cost?</span></td>
            <td class="border-b bg-neutral-50 px-2 md:px-6 md:py-6 py-4 font-semibold whitespace-nowrap text-center text-sm md:text-base lg:text-lg">
               <p className='lg:hidden'>Mitrua.com</p>
              <img alt="Mitrua.com Logo" class="shrink-0 w-28 mx-auto hidden md:block"  src="https://vitamu.imgix.net/Group%201%20(3).png?auto=undefined%2Ccompress"/>
            </td>
            <td class="border-b bg-neutral-50 px-2 md:px-6 md:py-6 py-4 font-semibold whitespace-nowrap text-center text-sm md:text-base lg:text-lg">Hospital</td>
            <td class="border-b bg-neutral-50 pl-2 pr-4 md:px-6 md:py-6 py-4 font-semibold  text-center text-sm md:text-base lg:text-lg w-2">Private Clinic </td>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">Second opinion</td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-sec">
                  <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
</svg>
                </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2">
                    <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 13l4 4L19 7"></path>
</svg>
                  </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2">
                    <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 13l4 4L19 7"></path>
</svg>
                  </div>
              </td>
            </tr>
            <tr>
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">A report of your results</td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-sec">
                  <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
</svg>
                </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2">
                    <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 13l4 4L19 7"></path>
</svg>
                  </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2">
                    <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 13l4 4L19 7"></path>
</svg>
                  </div>
              </td>
            </tr>

            <tr>
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">Online access to your images</td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-sec">
                  <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
</svg>
                </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2">
                    <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 13l4 4L19 7"></path>
</svg>
                  </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2">
                    <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 13l4 4L19 7"></path>
</svg>
                  </div>
              </td>
            </tr>

            

            <tr>
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">Second opinion from two radiologists</td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-sec">
                  <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
</svg>
                </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                    <svg class="stroke-current" viewBox="0 0 30 30" fill="none">
<path d="M22.5 7.5L7.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M7.5 7.5L22.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

                  </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                    <svg class="stroke-current" viewBox="0 0 30 30" fill="none">
<path d="M22.5 7.5L7.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M7.5 7.5L22.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

                  </div>
              </td>
            </tr>
            <tr>
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">Ask a radiologist</td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-sec">
                  <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
</svg>
                </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                    <svg class="stroke-current" viewBox="0 0 30 30" fill="none">
<path d="M22.5 7.5L7.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M7.5 7.5L22.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

                  </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                    <svg class="stroke-current" viewBox="0 0 30 30" fill="none">
<path d="M22.5 7.5L7.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M7.5 7.5L22.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

                  </div>
              </td>
            </tr>
            <tr>
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">Result in 24 hours</td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-sec">
                  <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
</svg>
                </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                    <svg class="stroke-current" viewBox="0 0 30 30" fill="none">
<path d="M22.5 7.5L7.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M7.5 7.5L22.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

                  </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                    <svg class="stroke-current" viewBox="0 0 30 30" fill="none">
<path d="M22.5 7.5L7.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M7.5 7.5L22.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

                  </div>
              </td>
            </tr>
            <tr>
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">Patient-friendly report </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-sec">
                  <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
</svg>
                </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                    <svg class="stroke-current" viewBox="0 0 30 30" fill="none">
<path d="M22.5 7.5L7.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M7.5 7.5L22.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

                  </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                    <svg class="stroke-current" viewBox="0 0 30 30" fill="none">
<path d="M22.5 7.5L7.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M7.5 7.5L22.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

                  </div>
              </td>
            </tr>
            <tr>
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">Fully online process</td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-sec">
                  <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
</svg>
                </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                    <svg class="stroke-current" viewBox="0 0 30 30" fill="none">
<path d="M22.5 7.5L7.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M7.5 7.5L22.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

                  </div>
              </td>
              <td class="border-y px-2 md:px-6 py-4 md:py-6">
                  <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                    <svg class="stroke-current" viewBox="0 0 30 30" fill="none">
<path d="M22.5 7.5L7.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M7.5 7.5L22.5 22.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

                  </div>
              </td>
            </tr>
        </tbody>
      </table>
        
           </div>
         </div>

         </div>

         <Informational/>
        

       
       
    
       
      
       


       
      
     
       { mq.matches ? <MobileFooter/> : <Footer/> }

       
    
      

      
      { /* mq.matches ?  <MobileAllinOne/> : <AllinOneService/> */ }  
    
  </div>
    )
  
  }
  
  export default Home;


 
