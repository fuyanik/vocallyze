import React from 'react'
import "./style/payPlans.css"

import gV from "../../gV";
import BackButton from '../../formComponents/components/BackButton/backButton';
import ForwardButton from '../../formComponents/components/ForwardButton/forwardButton';
import Popup from '../Popup/popup';

import { useState,useEffect } from 'react';
import PayScreen from '../PayScreen/payScreen';
import { setGlobalState, useGlobalState } from '../../hookState';



const PayPlans = ({ isOutside = false, }) => {
  

  const svgTik = (
    <svg
      width="13"
      height="13"
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00001 10.17L2.53001 6.7C2.14002 6.31 1.51001 6.31 1.12001 6.7C0.730015 7.09 0.730015 7.72 1.12001 8.11L5.30001 12.29C5.69001 12.68 6.32001 12.68 6.71001 12.29L17.29 1.71C17.68 1.32 17.68 0.69 17.29 0.3C16.9 -0.0900003 16.27 -0.0900003 15.88 0.3L6.00001 10.17Z"
        fill="#000000"
      />
    </svg>
  );

  const svgTikWhite = (
    <svg
                  width="13"
                  height="13"
                  viewBox="0 0 18 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.00001 10.17L2.53001 6.7C2.14002 6.31 1.51001 6.31 1.12001 6.7C0.730015 7.09 0.730015 7.72 1.12001 8.11L5.30001 12.29C5.69001 12.68 6.32001 12.68 6.71001 12.29L17.29 1.71C17.68 1.32 17.68 0.69 17.29 0.3C16.9 -0.0900003 16.27 -0.0900003 15.88 0.3L6.00001 10.17Z"
                    fill="#000"
                  />
                </svg>
  )



  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const insuranceCompany = useGlobalState("insuranceCompany");
  
  const [selectedCard, setSelectedCard] = useState(0);

  
  //Plans default values
  //...
  const planOneValue = 299;
  const planTwoValue = 499;
  const planThreeValue = 1599; 

  useEffect(() => {

    selectedCard === 1 &&  setGlobalState("mainPayAmount", planOneValue);
    selectedCard === 2 &&  setGlobalState("mainPayAmount", planTwoValue);
    selectedCard === 3 &&  setGlobalState("mainPayAmount", planThreeValue);

    selectedCard === 1 &&  setGlobalState("paymentPlan", "One Time Payment / Web Pay")
    selectedCard === 2 &&  setGlobalState("paymentPlan", "1 Year / Web Pay")
    selectedCard === 3 &&  setGlobalState("paymentPlan", "5 Year / Web Pay")
  }, [selectedCard]);



   
   //All amount variables and *Swipper Page* variables are set here
   //...
   const VariableCalculator = (mainPay) => {

    var discount;

    if(gV.insuranceCompany === "United Healthcare" ) {

      gV.discountPercent = 30

      //Insurance discount
      //...
       discount = (mainPay * (gV.discountPercent / 100))

      
      //Total amount user see pay plans page
      //...
      return mainPay - discount
      
      
      
     }

   if(gV.insuranceCompany === "Oscar") {
     gV.discountPercent = 45;

     //Insurance discount
     //...
      discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
   }

   if(gV.insuranceCompany === "Aetna" ) {

     gV.discountPercent = 35

     //Insurance discount
     //...
      discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
   }

   if(gV.insuranceCompany ===  "Molina Healthcare" ) {
       
       gV.discountPercent = 40

       //Insurance discount
       //...
        discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
   }

   if(gV.insuranceCompany === "Humana" ) {
       
     gV.discountPercent = 45;

     //Insurance discount
     //...
      discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
    
   }

   if(gV.insuranceCompany === "Cigna" ) {
    
     gV.discountPercent = 35;

     //Insurance discount
     //...
      discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;;
   }
   
   if(gV.insuranceCompany ===  "Magellan" ) {
    
     gV.discountPercent = 30;

     //Insurance discount
     //...
      discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
   }
   
   if(gV.insuranceCompany ===  "Anthem") {
    
     gV.discountPercent = 35;

     //Insurance discount
     //...
      discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
   }

   if(gV.insuranceCompany === "Blue California" ) {
      gV.discountPercent = 45;

         //Insurance discount
         //...
          discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
   }

   if(gV.insuranceCompany === "Blue Shield" ) {
    
     gV.discountPercent = 40;

     //Insurance discount
     //...
      discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
   }

   if(gV.insuranceCompany === "Care Plus" ) {
    
     gV.discountPercent = 35;

     //Insurance discount
     //...
      discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
   }

   if(gV.insuranceCompany === "Freedom Health" ) {
    
     gV.discountPercent = 30;

     //Insurance discount
     //...
      discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
   }

   if(gV.insuranceCompany === "WellCare" ) {
     gV.discountPercent = 25;

     //Insurance discount
     //...
      discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
   }

   if(gV.insuranceCompany === "United American" ) {
     gV.discountPercent = 35;

     //Insurance discount
     //...
      discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
   }

   if(gV.insuranceCompany === "Caresource" ) {
     gV.discountPercent = 35;

     //Insurance discount
     //...
      discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
   }

   if(gV.insuranceCompany === "I do not have an active insurance plan." || gV.insuranceCompany === "My insurance is not listed." || gV.insuranceCompany === "none"  ){
   
     gV.discountPercent = 0;

     //Insurance discount
     //...
      discount = mainPay * (gV.discountPercent / 100);

     //Total amount user see pay plans page
     //...
     return mainPay - discount;
   }


   }


  

   //Close popup page
   //...
   function onDismiss() {
    setIsPopupOpen(false);
   
     }
 

    

  return (
 <>

      <Popup open={isPopupOpen}  onDismiss={onDismiss} contents={<PayScreen/>} close={false} />
   
   
    
     <div  className='flex flex-col gap-5' >
       
         
         {/*  Basic */}
        { !isOutside && 
        
         <div onClick={()=>{setSelectedCard(1)}} className='flex items-center gap-4 cursor-pointer text-pri' >
           
           {/*  Select Circle */}
           <div className={`w-11 h-10 rounded-full border ${selectedCard == 1 && "bg-pri"} duration-300 `} > </div>
          

           <div className="w-full flex items-center rounded-3xl py-2 px-4 h-[15vh] animate-fadeIn justify-between   shadow-3xl">
           
            {/*  Card Left */}
            <div className='flex flex-col gap-3 w-fit'>
               
              {/*  Svg and Plan Name */ }
              <div class=" flex gap-3 items-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.75 30H6.25C4.59301 29.998 3.00445 29.3389 1.83277 28.1672C0.661102 26.9956 0.00198482 25.407 0 23.75L0 6.25C0.00198482 4.59301 0.661102 3.00445 1.83277 1.83277C3.00445 0.661102 4.59301 0.00198482 6.25 0L23.75 0C25.407 0.00198482 26.9956 0.661102 28.1672 1.83277C29.3389 3.00445 29.998 4.59301 30 6.25V23.75C29.998 25.407 29.3389 26.9956 28.1672 28.1672C26.9956 29.3389 25.407 29.998 23.75 30V30ZM6.25 2.5C5.25544 2.5 4.30161 2.89509 3.59835 3.59835C2.89509 4.30161 2.5 5.25544 2.5 6.25V23.75C2.5 24.7446 2.89509 25.6984 3.59835 26.4017C4.30161 27.1049 5.25544 27.5 6.25 27.5H23.75C24.7446 27.5 25.6984 27.1049 26.4017 26.4017C27.1049 25.6984 27.5 24.7446 27.5 23.75V6.25C27.5 5.25544 27.1049 4.30161 26.4017 3.59835C25.6984 2.89509 24.7446 2.5 23.75 2.5H6.25ZM13.75 15C13.75 15.2472 13.8233 15.4889 13.9607 15.6945C14.098 15.9 14.2932 16.0602 14.5216 16.1548C14.7501 16.2495 15.0014 16.2742 15.2439 16.226C15.4863 16.1778 15.7091 16.0587 15.8839 15.8839C16.0587 15.7091 16.1778 15.4863 16.226 15.2439C16.2742 15.0014 16.2495 14.7501 16.1548 14.5216C16.0602 14.2932 15.9 14.098 15.6945 13.9607C15.4889 13.8233 15.2472 13.75 15 13.75C14.6685 13.75 14.3505 13.8817 14.1161 14.1161C13.8817 14.3505 13.75 14.6685 13.75 15ZM7.5 8.75C7.5 8.99723 7.57331 9.2389 7.71066 9.44446C7.84801 9.65002 8.04324 9.81024 8.27165 9.90485C8.50005 9.99946 8.75139 10.0242 8.99386 9.97598C9.23634 9.92775 9.45907 9.8087 9.63388 9.63388C9.8087 9.45907 9.92775 9.23634 9.97598 8.99386C10.0242 8.75139 9.99946 8.50005 9.90485 8.27165C9.81024 8.04324 9.65002 7.84801 9.44446 7.71066C9.2389 7.57331 8.99723 7.5 8.75 7.5C8.41848 7.5 8.10054 7.6317 7.86612 7.86612C7.6317 8.10054 7.5 8.41848 7.5 8.75ZM20 8.75C20 8.99723 20.0733 9.2389 20.2107 9.44446C20.348 9.65002 20.5432 9.81024 20.7716 9.90485C21.0001 9.99946 21.2514 10.0242 21.4939 9.97598C21.7363 9.92775 21.9591 9.8087 22.1339 9.63388C22.3087 9.45907 22.4278 9.23634 22.476 8.99386C22.5242 8.75139 22.4995 8.50005 22.4048 8.27165C22.3102 8.04324 22.15 7.84801 21.9445 7.71066C21.7389 7.57331 21.4972 7.5 21.25 7.5C20.9185 7.5 20.6005 7.6317 20.3661 7.86612C20.1317 8.10054 20 8.41848 20 8.75ZM7.5 21.25C7.5 21.4972 7.57331 21.7389 7.71066 21.9445C7.84801 22.15 8.04324 22.3102 8.27165 22.4048C8.50005 22.4995 8.75139 22.5242 8.99386 22.476C9.23634 22.4278 9.45907 22.3087 9.63388 22.1339C9.8087 21.9591 9.92775 21.7363 9.97598 21.4939C10.0242 21.2514 9.99946 21.0001 9.90485 20.7716C9.81024 20.5432 9.65002 20.348 9.44446 20.2107C9.2389 20.0733 8.99723 20 8.75 20C8.41848 20 8.10054 20.1317 7.86612 20.3661C7.6317 20.6005 7.5 20.9185 7.5 21.25ZM20 21.25C20 21.4972 20.0733 21.7389 20.2107 21.9445C20.348 22.15 20.5432 22.3102 20.7716 22.4048C21.0001 22.4995 21.2514 22.5242 21.4939 22.476C21.7363 22.4278 21.9591 22.3087 22.1339 22.1339C22.3087 21.9591 22.4278 21.7363 22.476 21.4939C22.5242 21.2514 22.4995 21.0001 22.4048 20.7716C22.3102 20.5432 22.15 20.348 21.9445 20.2107C21.7389 20.0733 21.4972 20 21.25 20C20.9185 20 20.6005 20.1317 20.3661 20.3661C20.1317 20.6005 20 20.9185 20 21.25Z"
                    fill="#1769FF"
                  />
                </svg>
                <p class="text-[24px] ">One-Time</p>
             
              </div>
              
              {/*  All prices and İnsurance Company Name */ }
              <div class="flex items-center gap-1 ">
                
                <p class="text-xl ">  ${VariableCalculator(planOneValue) | 0} {" "} / </p>
                {( gV.insuranceCompany !== "I do not have an active insurance plan." && gV.insuranceCompany !== "My insurance is not listed."  && gV.insuranceCompany !== "none"   ) && <p class="pay-card__value-area__period">   <s>${planOneValue} </s> </p>}
                <p className='text-[#676767] text-sm'> {( gV.insuranceCompany !== "I do not have an active insurance plan." && gV.insuranceCompany !== "My insurance is not listed."  && gV.insuranceCompany !== "none"   ) && gV.insuranceCompany}</p>
             
              </div>
           
            </div>
          
          
          
              {/*  Card Right Features */}
             <div class="flex flex-col gap-1 w-[50%] text-sm">
             
               <div class="flex items-center gap-2">
                 {svgTik}
                 <p class="">Detailed second opinion report</p>
               </div>
               <div class="flex items-center gap-2">
                 {svgTik}
                 <p class="">Marked images with personalized radiologist notes</p>
               </div>
             
          
              
          
             </div>
          
           
           </div> 
        
         </div>
          
          }



          {/* Smart */}
         <div onClick={()=>{setSelectedCard(2)}}  className='flex items-center gap-4 cursor-pointer'>
        
            {/*  Select Circle */}
            <div className={`w-11 h-10 rounded-full border ${selectedCard == 2 && "bg-pri"} duration-300 `} > </div>

            {/*  Card */}
             <div className="w-full flex items-center rounded-3xl py-2 px-4 h-[17vh] animate-fadeIn justify-between text-pri bg-white shadow-3xl ">
           
           {/*  Card Left */}
           <div className='flex flex-col gap-3 w-fit '>
              
             {/*  Svg and Plan Name */ }
             <div class=" flex gap-3 items-center">
             <svg
                 width="36"
                 height="36"
                 viewBox="0 0 30 30"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   fill-rule="evenodd"
                   clip-rule="evenodd"
                   d="M2.5 0H5.625C6.28804 0 6.92393 0.263392 7.39277 0.732233C7.86161 1.20107 8.125 1.83696 8.125 2.5V5.625C8.125 6.28804 7.86161 6.92393 7.39277 7.39277C6.92393 7.86161 6.28804 8.125 5.625 8.125H2.5C1.83696 8.125 1.20107 7.86161 0.732233 7.39277C0.263392 6.92393 0 6.28804 0 5.625V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0ZM2.5 5.625H5.625V2.5H2.5V5.625Z"
                   fill="#1769FF"
                 />
                 <path
                   fill-rule="evenodd"
                   clip-rule="evenodd"
                   d="M2.5 10.9371H5.625C6.28804 10.9371 6.92393 11.2005 7.39277 11.6694C7.86161 12.1382 8.125 12.7741 8.125 13.4371V16.5621C8.125 17.2251 7.86161 17.861 7.39277 18.3299C6.92393 18.7987 6.28804 19.0621 5.625 19.0621H2.5C1.83696 19.0621 1.20107 18.7987 0.732233 18.3299C0.263392 17.861 0 17.2251 0 16.5621V13.4371C0 12.7741 0.263392 12.1382 0.732233 11.6694C1.20107 11.2005 1.83696 10.9371 2.5 10.9371ZM2.5 16.5621H5.625V13.4371H2.5V16.5621Z"
                   fill="#1769FF"
                 />
                 <path
                   fill-rule="evenodd"
                   clip-rule="evenodd"
                   d="M5.625 21.8754H2.5C1.83696 21.8754 1.20107 22.1388 0.732233 22.6076C0.263392 23.0765 0 23.7123 0 24.3754V27.5004C0 28.1634 0.263392 28.7993 0.732233 29.2681C1.20107 29.737 1.83696 30.0004 2.5 30.0004H5.625C6.28804 30.0004 6.92393 29.737 7.39277 29.2681C7.86161 28.7993 8.125 28.1634 8.125 27.5004V24.3754C8.125 23.7123 7.86161 23.0765 7.39277 22.6076C6.92393 22.1388 6.28804 21.8754 5.625 21.8754ZM5.625 27.5004H2.5V24.3754H5.625V27.5004Z"
                   fill="#1769FF"
                 />
                 <path
                   fill-rule="evenodd"
                   clip-rule="evenodd"
                   d="M27.5001 21.8754H24.3751C23.7121 21.8754 23.0762 22.1388 22.6073 22.6076C22.1385 23.0765 21.8751 23.7123 21.8751 24.3754V27.5004C21.8751 28.1634 22.1385 28.7993 22.6073 29.2681C23.0762 29.737 23.7121 30.0004 24.3751 30.0004H27.5001C28.1631 30.0004 28.799 29.737 29.2679 29.2681C29.7367 28.7993 30.0001 28.1634 30.0001 27.5004V24.3754C30.0001 23.7123 29.7367 23.0765 29.2679 22.6076C28.799 22.1388 28.1631 21.8754 27.5001 21.8754ZM27.5001 27.5004H24.3751V24.3754H27.5001V27.5004Z"
                   fill="#1769FF"
                 />
                 <path
                   fill-rule="evenodd"
                   clip-rule="evenodd"
                   d="M27.5001 10.9371H24.3751C23.7121 10.9371 23.0762 11.2005 22.6073 11.6694C22.1385 12.1382 21.8751 12.7741 21.8751 13.4371V16.5621C21.8751 17.2251 22.1385 17.861 22.6073 18.3299C23.0762 18.7987 23.7121 19.0621 24.3751 19.0621H27.5001C28.1631 19.0621 28.799 18.7987 29.2679 18.3299C29.7367 17.861 30.0001 17.2251 30.0001 16.5621V13.4371C30.0001 12.7741 29.7367 12.1382 29.2679 11.6694C28.799 11.2005 28.1631 10.9371 27.5001 10.9371ZM27.5001 16.5621H24.3751V13.4371H27.5001V16.5621Z"
                   fill="#1769FF"
                 />
                 <path
                   fill-rule="evenodd"
                   clip-rule="evenodd"
                   d="M16.5624 21.8754H13.4374C12.7744 21.8754 12.1385 22.1388 11.6697 22.6076C11.2008 23.0765 10.9374 23.7123 10.9374 24.3754V27.5004C10.9374 28.1634 11.2008 28.7993 11.6697 29.2681C12.1385 29.737 12.7744 30.0004 13.4374 30.0004H16.5624C17.2255 30.0004 17.8613 29.737 18.3302 29.2681C18.799 28.7993 19.0624 28.1634 19.0624 27.5004V24.3754C19.0624 23.7123 18.799 23.0765 18.3302 22.6076C17.8613 22.1388 17.2255 21.8754 16.5624 21.8754ZM16.5624 27.5004H13.4374V24.3754H16.5624V27.5004Z"
                   fill="#1769FF"
                 />
                 <path
                   fill-rule="evenodd"
                   clip-rule="evenodd"
                   d="M13.4374 10.9371H16.5624C17.2255 10.9371 17.8613 11.2005 18.3302 11.6694C18.799 12.1382 19.0624 12.7741 19.0624 13.4371V16.5621C19.0624 17.2251 18.799 17.861 18.3302 18.3299C17.8613 18.7987 17.2255 19.0621 16.5624 19.0621H13.4374C12.7744 19.0621 12.1385 18.7987 11.6697 18.3299C11.2008 17.861 10.9374 17.2251 10.9374 16.5621V13.4371C10.9374 12.7741 11.2008 12.1382 11.6697 11.6694C12.1385 11.2005 12.7744 10.9371 13.4374 10.9371ZM13.4374 16.5621H16.5624V13.4371H13.4374V16.5621Z"
                   fill="#1769FF"
                 />
                 <path
                   fill-rule="evenodd"
                   clip-rule="evenodd"
                   d="M16.5624 0H13.4374C12.7744 0 12.1385 0.263392 11.6697 0.732233C11.2008 1.20107 10.9374 1.83696 10.9374 2.5V5.625C10.9374 6.28804 11.2008 6.92393 11.6697 7.39277C12.1385 7.86161 12.7744 8.125 13.4374 8.125H16.5624C17.2255 8.125 17.8613 7.86161 18.3302 7.39277C18.799 6.92393 19.0624 6.28804 19.0624 5.625V2.5C19.0624 1.83696 18.799 1.20107 18.3302 0.732233C17.8613 0.263392 17.2255 0 16.5624 0ZM16.5624 5.625H13.4374V2.5H16.5624V5.625Z"
                   fill="#1769FF"
                 />
                 <path
                   fill-rule="evenodd"
                   clip-rule="evenodd"
                   d="M24.3751 0H27.5001C28.1631 0 28.799 0.263392 29.2679 0.732233C29.7367 1.20107 30.0001 1.83696 30.0001 2.5V5.625C30.0001 6.28804 29.7367 6.92393 29.2679 7.39277C28.799 7.86161 28.1631 8.125 27.5001 8.125H24.3751C23.7121 8.125 23.0762 7.86161 22.6073 7.39277C22.1385 6.92393 21.8751 6.28804 21.8751 5.625V2.5C21.8751 1.83696 22.1385 1.20107 22.6073 0.732233C23.0762 0.263392 23.7121 0 24.3751 0ZM24.3751 5.625H27.5001V2.5H24.3751V5.625Z"
                   fill="#1769FF"
                 />
              </svg>
              
              <p class="text-[24px] ">1 - Year Membership</p>
            
             </div>
             
             {/*  All prices and İnsurance Company Name */ }
             <div class="flex items-center gap-1 ">
               
               <p class="text-xl ">  ${VariableCalculator(planTwoValue) | 0} {" "} / </p>
               { ( gV.insuranceCompany !== "I do not have an active insurance plan." && gV.insuranceCompany !== "My insurance is not listed."  && gV.insuranceCompany !== "none"   ) && <p class="pay-card__value-area__period">   <s>${planTwoValue} </s> </p>}
               <p className='text-[#676767] text-sm'> {( gV.insuranceCompany !== "I do not have an active insurance plan." && gV.insuranceCompany !== "My insurance is not listed."  && gV.insuranceCompany !== "none"   ) && gV.insuranceCompany}</p>
            
             </div>
          
           </div>
          
          
          
             {/*  Card Right Features */}
            <div class="flex flex-col gap-1 w-[50%] text-sm">
            
              <div class="flex items-center gap-2">
                {svgTik}
                <p class="">5-second opinions (all body parts)</p>
              </div>
              <div class="flex items-center gap-2">
                {svgTik}
                <p class="">Detailed report for each second opinion</p>
              </div>
              <div class="flex items-center gap-2">
                {svgTik}
                <p class="">Marked images with personalized radiologist notes</p>
              </div>
              <div class="flex items-center gap-2">
                {svgTik}
                <p class="">Ask a radiologist (Unlimited questions)</p>
              </div>
          
             
          
            </div>
          
          
             </div> 
        
         </div>




        {/* Lifelong  */}
       <div onClick={()=>{setSelectedCard(3)}}  className='flex items-center gap-4 cursor-pointer'>

          {/*  Select Circle */}
          <div className={`w-11 h-10 rounded-full border ${selectedCard == 3 && "bg-pri"} duration-300 `} > </div>
   

          {/*  Card */}
          <div className="w-full flex items-center rounded-3xl py-2 px-4 h-[17vh] animate-fadeIn justify-between  text-pri bg-white shadow-md ">
           
           {/*  Card Left */}
            <div className='flex flex-col gap-3 w-fit '>
              
             {/*  Svg and Plan Name */ }
             <div class=" flex gap-3 items-center">
             <svg
                 width="36"
                 height="36"
                 viewBox="0 0 30 30"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   d="M23.75 0H6.25C4.59301 0.00198482 3.00445 0.661102 1.83277 1.83277C0.661102 3.00445 0.00198482 4.59301 0 6.25L0 23.75C0.00198482 25.407 0.661102 26.9956 1.83277 28.1672C3.00445 29.3389 4.59301 29.998 6.25 30H23.75C25.407 29.998 26.9956 29.3389 28.1672 28.1672C29.3389 26.9956 29.998 25.407 30 23.75V6.25C29.998 4.59301 29.3389 3.00445 28.1672 1.83277C26.9956 0.661102 25.407 0.00198482 23.75 0V0ZM20 13.75H16.25V10H20V13.75ZM22.5 10H27.5V13.75H22.5V10ZM16.25 7.5V2.5H20V7.5H16.25ZM13.75 7.5H10V2.5H13.75V7.5ZM13.75 10V13.75H10V10H13.75ZM7.5 13.75H2.5V10H7.5V13.75ZM2.5 16.25H7.5V20H2.5V16.25ZM10 16.25H13.75V20H10V16.25ZM13.75 22.5V27.5H10V22.5H13.75ZM16.25 22.5H20V27.5H16.25V22.5ZM16.25 20V16.25H20V20H16.25ZM22.5 16.25H27.5V20H22.5V16.25ZM27.5 6.25V7.5H22.5V2.5H23.75C24.7446 2.5 25.6984 2.89509 26.4017 3.59835C27.1049 4.30161 27.5 5.25544 27.5 6.25ZM6.25 2.5H7.5V7.5H2.5V6.25C2.5 5.25544 2.89509 4.30161 3.59835 3.59835C4.30161 2.89509 5.25544 2.5 6.25 2.5ZM2.5 23.75V22.5H7.5V27.5H6.25C5.25544 27.5 4.30161 27.1049 3.59835 26.4017C2.89509 25.6984 2.5 24.7446 2.5 23.75ZM23.75 27.5H22.5V22.5H27.5V23.75C27.5 24.7446 27.1049 25.6984 26.4017 26.4017C25.6984 27.1049 24.7446 27.5 23.75 27.5Z"
                   fill="#1769FF"
                 />
               </svg>
               <p class="text-[22px] ">5 - Year Membership</p>
            
             </div>
             
             {/*  All prices and İnsurance Company Name */ }
             <div class="flex items-center gap-1 ">
               
               <p class="text-xl ">  ${VariableCalculator(planThreeValue) | 0} {" "} / </p>
               {( gV.insuranceCompany !== "I do not have an active insurance plan." && gV.insuranceCompany !== "My insurance is not listed."  && gV.insuranceCompany !== "none"   ) && <p class="pay-card__value-area__period">   <s>${planThreeValue} </s> </p>}
               <p className='text-[#676767] text-sm'> {( gV.insuranceCompany !== "I do not have an active insurance plan." && gV.insuranceCompany !== "My insurance is not listed."  && gV.insuranceCompany !== "none"   ) && gV.insuranceCompany}</p>
            
             </div>
          
            </div>
        
        
             {/*  Card Right Features */}
            <div class="flex flex-col gap-1 w-[50%] text-sm">
            
              <div class="flex items-center gap-2">
                {svgTikWhite}
                <p class="">5 radiology second opinions per year</p>
              </div>
              <div class="flex items-center gap-2">
                {svgTikWhite}
                <p class="">Detailed report for each second opinion</p>
              </div>
              <div class="flex items-center gap-2">
                {svgTikWhite}
                <p class="">Marked images with personalized radiologist notes</p>
              </div>
              <div class="flex items-center gap-2">
                {svgTikWhite}
                <p class="">Ask a radiologist (Unlimited questions)</p>
              </div>
        
             
        
            </div>
        
          
          </div> 
    
       </div>


          
















       </div>
       
  


 
 
 </>
  )
}

export default PayPlans;
