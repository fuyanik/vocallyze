import React from 'react'
import Navbar from '../../homeComponents/1.Navbar/navbar'


const HowWorks = () => {
  return (
    <> 
     <Navbar
      mobileMenuText={'Menu'}
      mobileMenuTo ={"/mobileNavMenu"}
      />

    <div className='w-screen flex justify-center pt-[10.8vh]  font-product '>

      <div className='w-screen items-center justify-center flex flex-col gap-5 pb-12'> 

          {/* How works */}
          <div class="py-8 mb-8 border-b md:mb-12 bg-neutral-50 lg:py-24 flex flex-col items-center justify-center ">
          <h1 class="text-[42px] font-bold mb-2 lg:mb-4">How It Works</h1>
           <p class="opacity-75 text-base lg:text-lg text-neutral-800 w-[90vw] text-center ">Learn how you can refer yourself for a private MRI scan using our online booking system.</p>
          </div>


           {/* Stepper */}
          <div className='flex lg:w-[60vw] w-[90vw]   justify-center'>
  <div class=" flex flex-col justify-center items-center ">
   
   
    <div class="how-it-works">
      
      <div class="relative pb-10 how-it-works__item ml-14 md:ml-20">
   
      <div class="absolute top-0 left-0 text-center inline-flex bg-neutral-200 how-it-works__itemConnector w-0.5 h-full -ml-10 md:-ml-16 justify-center items-start">
  
      <span class="inline-flex items-center justify-center p-2 font-medium border-8 border-white rounded-full text-xs w-11 h-11 text-neutral-700 bg-neutral-200 how-it-works__counter">01</span>
    </div>
    
    <div class="pt-1">
      <div class="w-10 h-10 stroke-1.5 text-sec">
      <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="18" y2="6.01"></line>
    <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5"></path>
    <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15"></polyline>
    <line x1="9" y1="4" x2="9" y2="17"></line>
    <line x1="15" y1="15" x2="15" y2="20"></line>
  </svg>
  
  </div>
  
      <h2 class="mt-4 mb-2 text-[20px] font-bold">Find a location near you</h2>
      <div class="space-y-4 text-sm text-neutral-700 md:text-base">
        
        <p>Simply enter the body part you need scanning and your postcode/town and you’ll be shown all available locations nearby.</p>
        <p>The prices shown for each centre is the total price for your scan, with no hidden fees.</p>
  
      </div>
    </div>
  
  </div>
  
  
  
      <div class="relative pb-10 how-it-works__item ml-14 md:ml-20">
    <div class="absolute top-0 left-0 text-center inline-flex bg-neutral-200  how-it-works__itemConnector w-0.5 h-full -ml-10 md:-ml-16 justify-center items-start">
      <span class="inline-flex items-center justify-center p-2 font-medium border-8 border-white rounded-full text-xs w-11 h-11 text-neutral-700 bg-neutral-200 how-it-works__counter">02</span>
    </div>
    <div class="pt-1">
      <div class="w-10 h-10 stroke-1.5 text-sec">
      <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3.5 5.5l1.5 1.5l2.5 -2.5"></path>
    <path d="M3.5 11.5l1.5 1.5l2.5 -2.5"></path>
    <path d="M3.5 17.5l1.5 1.5l2.5 -2.5"></path>
    <line x1="11" y1="6" x2="20" y2="6"></line>
    <line x1="11" y1="12" x2="20" y2="12"></line>
    <line x1="11" y1="18" x2="20" y2="18"></line>
  </svg>
  
  </div>
  
      <h2 class="mt-4 mb-2 text-[20px] font-bold">Complete booking form</h2>
      <div class="space-y-4 text-sm text-neutral-700 md:text-base">
        
        <p>Take a couple of minutes to fill out your details, including a short safety questionnaire to ensure you can have an MRI scan.</p>
  
      </div>
    </div>
  </div>
  
  
  
      <div class="relative pb-10 how-it-works__item ml-14 md:ml-20">
    <div class="absolute top-0 left-0 text-center inline-flex bg-neutral-200  how-it-works__itemConnector w-0.5 h-full -ml-10 md:-ml-16 justify-center items-start">
      <span class="inline-flex items-center justify-center p-2 font-medium border-8 border-white rounded-full text-xs w-11 h-11 text-neutral-700 bg-neutral-200 how-it-works__counter">03</span>
    </div>
    <div class="pt-1">
      <div class="w-10 h-10 stroke-1.5 text-sec">
      <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g transform="rotate(27 12 12)">
    <rect x="7" y="4" width="10" height="16" rx="1"></rect>
    <line x1="11" y1="5" x2="13" y2="5"></line>
    <line x1="12" y1="17" x2="12" y2="17.01"></line>
    </g>
    <path d="M6 4l-2 1v2.5l-2 1v2.5"></path>
    <path d="M22 13v2.5l-2 1v2.5l-2 1"></path>
  </svg>
  
  </div>
  
      <h2 class="mt-4 mb-2 text-[20px] font-bold">Receive appointment details</h2>
      <div class="space-y-4 text-sm text-neutral-700 md:text-base">
        
        <p class="pb-4">Once we receive your booking, our medical team will be in contact with you to complete your referral and to ensure that the scan you have chosen is appropriate for your condition.</p>
        <div class="mb-8 border-t border-neutral-200 rounded shadow">
          <div class="p-4 space-y-4 rounded shadow-xs lg:p-6">
            <div class="">
              <p class="mb-1 text-sm font-medium lg:text-base">Current estimated appointment date</p>
              <p class="mb-4 text-xl font-semibold">11th Aug – 20th Aug</p>
              <p class="mb-3 text-sm lg:text-base text-neutral-700">For all bookings made today at any of our centres, you can expect an appointment date close to the above. </p>
              <p class="mb-5 text-sm lg:text-base text-neutral-700">Appointment details are confirmed with you shortly after your initial consultation.</p>
              <a class="button button-primary w-full" href="/#mri-search">Find a centre near you</a>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  </div>
  
  
      <div class="relative pb-10 how-it-works__item ml-14 md:ml-20">
    <div class="absolute top-0 left-0 text-center inline-flex bg-neutral-200  how-it-works__itemConnector w-0.5 h-full -ml-10 md:-ml-16 justify-center items-start">
      <span class="inline-flex items-center justify-center p-2 font-medium border-8 border-white rounded-full text-xs w-11 h-11 text-neutral-700 bg-neutral-200 how-it-works__counter">04</span>
    </div>
    <div class="pt-1">
      <div class="w-10 h-10 stroke-1.5 text-sec">
      <svg class="stroke-current stroke-4" viewBox="0 0 52 52" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8.67 15.17V13A4.33 4.33 0 0113 8.67h4.33M8.67 36.83V39A4.33 4.33 0 0013 43.33h4.33M34.67 8.67H39A4.33 4.33 0 0143.33 13v2.17M34.67 43.33H39A4.33 4.33 0 0043.33 39v-2.17M26 24.83a4.67 4.67 0 100-9.33 4.67 4.67 0 000 9.33zM19 36.5v-2.33a4.67 4.67 0 014.67-4.67h4.66A4.67 4.67 0 0133 34.17v2.33"></path>
  </svg>
  
  </div>
  
      <h2 class="mt-4 mb-2 text-[20px] font-bold">Have your scan</h2>
      <div class="space-y-4 text-sm text-neutral-700 md:text-base">
        
        <p>All scans are carried out by highly trained radiographers, who’ll then be able to examine and report on the results.</p>
        <p>You’ll find full information on how the MRI scan works and the procedure <a class="primary-text-link" href="/services/private-mri-scans">here</a>.</p>
  
      </div>
    </div>
  </div>
  
  
      <div class="relative pb-10 how-it-works__item ml-14 md:ml-20">
    <div class="absolute top-0 left-0 text-center inline-flex bg-neutral-200  how-it-works__itemConnector w-0.5 h-full -ml-10 md:-ml-16 justify-center items-start">
      <span class="inline-flex items-center justify-center p-2 font-medium border-8 border-white rounded-full text-xs w-11 h-11 text-neutral-700 bg-neutral-200 how-it-works__counter"> 05</span>
    </div>
    <div class="pt-1">
      <div class="w-10 h-10 stroke-1.5 text-sec">
      <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"></circle>
    <polyline points="12 7 12 12 15 15"></polyline>
  </svg>
  
  </div>
  
      <h2 class="mt-4 mb-2 text-[20px] font-bold">Your results</h2>
      <div class="space-y-4 text-sm text-neutral-700 md:text-base">
        
        <p>If any abnormalities are found within your scan images, our medical team will contact you to discuss the results.</p>
        <p>Your imaging report will be electronically sent to you, for use in any onward consultations you may have.</p>
        <p>Copies of your images can also be provided. Please see your results email for further information.</p>
        <p>Only in a medical emergency will we contact your GP.</p>
  
      </div>
    </div>
  </div>
    </div>
  </div>
          </div>



         {/* Why choose scan */}
         <div className='w-[93vw] lg:w-[60vw] '> 
          <div class="  flex-col items-center self-center justify-center lg:mt-12  mt-5">
    
            <div class="space-y-4 md:text-center max-w-2xl mx-auto mb-12">
      <h2 class="text-[38px] font-bold">Why choose Mitrua?</h2>
      <p class="text-base lg:text-lg text-neutral-600">We're taking the stress out of scanning. With no waiting lists, we'll provide clinical guidance, simple referrals, and speedy results all in one place, at one affordable price.</p>
            </div>

           <div class="rounded-2xl border border-grey-300 shadow-sm justify-center flex ">
     
      <table class="  w-fit border-collapse">
        <thead>
          <tr>
            <td class="border-b bg-neutral-50 pl-4 pr-5 md:px-6 md:py-6 py-4 font-semibold leading-snug text-sm lg:text-base">What's included <span class="hidden sm:inline">in the cost?</span></td>
            <td class="border-b bg-neutral-50 px-2 md:px-6 md:py-6 py-4 font-semibold whitespace-nowrap text-center text-sm md:text-base lg:text-lg">
              <span class="md:hidden">Mitrua.com</span>
              <img alt="Mitrua.com Logo" class="shrink-0 w-28 mx-auto hidden md:block"  src="https://vitamu.imgix.net/Group%201%20(3).png?auto=undefined%2Ccompress"/>
            </td>
            <td class="border-b bg-neutral-50 px-2 md:px-6 md:py-6 py-4 font-semibold whitespace-nowrap text-center text-sm md:text-base lg:text-lg">NHS</td>
            <td class="border-b bg-neutral-50 pl-2 pr-4 md:px-6 md:py-6 py-4 font-semibold whitespace-nowrap text-center text-sm md:text-base lg:text-lg">Private <span class="hidden sm:inline">Hospital</span></td>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">Your scan</td>
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
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">Self refer without a GP letter</td>
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
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">Pre-scan clinician call</td>
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
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">Post-scan clinician call</td>
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
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">Patient-friendly report powered by Scanslated</td>
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
              <td class="border-y pl-4 pr-5 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">Online booking with appointment availability</td>
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




      
      
      
       </div>
        
     
    
     </div>
     </>
  )
}

export default HowWorks