import React, { useEffect, useState } from 'react'
import gV from '../../../gV'
import Navbar from '../../../homeComponents/1.Navbar/navbar'
import PrimaryButton from '../../../homeComponents/microComponents/primaryButton/primaryButton'
import NavbarGen from '../../../homeComponents/NavbarGen/NavbarGen'


const SampleReports = ({isOutside = false}) => {



    const [showNum, setShowNum] = useState(1)


    const [tabsNum, setTabsNum] = useState(1)
    
    const [left, setLeft] = useState("left-[1%]")
    const [width, setWidth] = useState("")


    useEffect(() => {

        if(tabsNum == 0){
          setWidth("w-[26.1%]")
          setLeft("left-[1%]")
        }

        if(tabsNum == 1){
            setWidth("w-[21.2%]")
            setLeft("left-[27%]")
        }

        if(tabsNum == 2){

            setWidth("w-[26%]")
            setLeft("left-[50.5%]")
        }

        if(tabsNum == 3){
            setWidth("w-[20.9%]")
            setLeft("left-[77.5%]")
        }

        
    }, [tabsNum])

  { !isOutside &&  window.scrollTo(0, 0);}
    
 

    const Ping = ({title,left,top,num,text}) => {
      return (
      <>

       <div className={`absolute ${left}  ${top} hidden    items-center w-[300px] h-[120px]`}>
        
          {/* Explanation Area */} 
           <div className={` text-[#fff] px-4 py-2 font-extralight flex flex-col   absolute lg:w-[245px]  lg:h-[120px] w-[235px] h-[120px] lg:ml-[6vw]  ml-[16vw] rounded-2xl bg-[#000] opacity-0  ${showNum == num ?  "animate-fadeIn" : "hidden" }` }>
            <div className='flex justify-between items-center pb-2 w-full border-b border-slate-50'>
              <p className=''>{title}</p>
              <p  className='hover:bg-white hover:border-[#000000] hover:text-[#000000] flex h-6 px-4 pb-1 items-center justify-center border border-[#fff] rounded-md'>x</p>
            </div>
            
            <p className='text-[13px] mt-2'>{text} </p>
          
           </div>
        
           {/* Ping */}
           <div onClick={()=>{setShowNum(num)}}>
            <span  class="relative flex h-11 w-11">
              <span  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#000000] "></span>
              <span class=" h-11 w-11 relative inline-flex items-center justify-center rounded-full  bg-[#000000e2]  pb-1 pl-[1px] cursor-pointer hover:rotate-90  duration-700 "  onMouseLeave={()=>{setShowNum(0)}} onMouseMove={()=>{setShowNum(num)} }  >
                <p className="text-[#fff] text-[28px] "> + </p>
              </span>
            </span>
          </div>
       </div>
      </>
      )
    }
   

    const TabsMenuWeb = () => {
      
      return (
        <>
          
           <div className=" bg-[#ffffffca] shadow-md   font-product items-center justify-center  tracking-wide  lg:w-auto w-[96vw] px-6 py-3  rounded-3xl relative cursor-pointer">
          
               <div  className={`absolute ${left} ${width}  top-[6px] z-10  lg:h-[70%] h-[80%] bottom-10 bg-second rounded-2xl duration-300 ease-in-out`}   >  </div> 
          
               <div className=" w-full  relative flex items-center justify-center lg:gap-9 gap-5">
          
                  <p  className={`h-[96%]  ${tabsNum == 0 ? "text-[#ffffff]" : "text-second" } text-[0.9rem]  flex items-center justify-center rounded-2xl z-30 duration-300 ease-in-out`} onClick={()=>{ setTabsNum(0);  }  } >  Missed Diagnosis </p>
                  <p  className={`h-[96%]  ${tabsNum == 1 ? "text-[#ffffff]" : "text-second" }  text-[0.9rem]  flex items-center justify-center rounded-2xl z-30 duration-300 ease-in-out`} onClick={()=>{ setTabsNum(1);  } } >  Underdiagnosis </p>
                  <p  className={`h-[96%]  ${tabsNum == 2 ? "text-[#ffffff]" : "text-second" }  text-[0.9rem]  flex items-center justify-center rounded-2xl z-30 duration-300 ease-in-out`} onClick={()=>{setTabsNum(2);   }} >   Incomplete Imaging</p>
                  <p  className={`h-[96%]   ${tabsNum == 3 ? "text-[#ffffff]" : "text-second" } text-[0.9rem]  flex items-center justify-center rounded-2xl z-30 duration-300 ease-in-out`} onClick={()=>{setTabsNum(3);   } } >  Urgent Action  </p>
          
               </div>
          
           </div>
       
      
        </>
      )
    }

    const TabsMenuMob = () => {

      

      return (
        <>
        
         <div class="relative w-[95vw]  overflow-auto">
         
          <div class="max-w-md mx-auto bg-gray-100 shadow-xl min-w-0  ">
           <div class="overflow-x-auto  pb-8 flex ">
            

           <div class="flex-none py-2 first:pl-0 last:pr-0">
             <div class="flex flex-col items-center justify-center">
          
             <div onClick={()=>{setTabsNum(0)}} className={`w-[45vw]  h-[11vw] ${tabsNum == 0 ? "text-[#ffffff] bg-[#000000] " : "text-[#000000]  border border-[#000000]" } items-center justify-center flex rounded-full duration-300` } > 
                Missed Diagnosis
              </div>
        
             </div>
           </div>

          
           <div class="flex-none py-2 px-1 first:pl-6 last:pr-6">
             <div class="flex flex-col items-center justify-center">
          

             <div onClick={()=>{setTabsNum(1)}} className={`w-[40vw]  h-[11vw] ${tabsNum == 1 ? "text-[#ffffff] bg-[#000000] " : "text-[#000000]  border border-[#000000]" } items-center justify-center flex rounded-full duration-300` } > 
             Underdiagnosis 
              </div>
        
             </div>
           </div>

          
           <div class="flex-none py-2 px-1 first:pl-6 last:pr-6">
             <div class="flex flex-col items-center justify-center">
          
             <div onClick={()=>{setTabsNum(2)}} className={`w-[48vw]  h-[11vw] ${tabsNum == 2 ? "text-[#ffffff] bg-[#000000] " : "text-[#000000]  border border-[#000000]" } items-center justify-center flex rounded-full duration-300` } > 
             Incomplete Imaging
              </div>
        
             </div>
           </div>

         
           <div class="flex-none py-2 px-1 first:pl-6 last:pr-6">
             <div class="flex flex-col items-center justify-center">
            
             <div onClick={()=>{setTabsNum(3)}} className={`w-[44vw]  h-[11vw] ${tabsNum == 3 ? "text-[#ffffff] bg-[#000000] " : "text-[#000000]  border border-[#000000]" } items-center justify-center flex rounded-full duration-300` } > 
             Urgent Action
              </div>
        
             </div>
           </div>



           </div>
          </div>
         </div>
        </>
      )

      


    }







  return (
   <>


     <section className={`font-product text-black ${!isOutside ? "py-28" : "py-[4vh]"}   h-auto   w-[98vw] self-center bg-slate-50 rounded-md overflow-hidden   relative flex flex-col items-center gap-3 lg:gap-10 justify-center`}>
    { !isOutside && <NavbarGen/>}
    {/*  Header */}
     { true && <div className='flex flex-col gap-4 relative  lg:w-[60vw] items-center justify-center w-[92vw] z-10 '>
          
        
            <h1 className='text-[32px] self-center tracking-wide leading-[38px] text-center text-second'> Our Second Opinion Report Samples </h1>
          
          
            <p className="lg:w-[100%]  lg:text-center text-center text-second">
            Medifyre users love our second opinion reports. If your report does not answer all your questions, you will get answers from your dedicated radiologist until the last question.
            </p>
     </div>}

     {gV.mq.matches ? TabsMenuMob() : TabsMenuWeb() }

     {false && <p className='relative -mt-9 lg:-mt-6 bg-white text-center rounded-full px-4 w-fit z-50  '>Scroll down to see whole report</p>}

     {/*  Vertical Reports*/}
     <div className='flex h-[80vh]  overflow-scroll relative bottom-0 lg:bottom-12  flex-col px-2 gap-10 lg:mt-10'>


      {  tabsNum == 0 && 
      <div data-aos="fade-up"   data-aos-duration="800"  className='relative'>
          <img   className='border-b   lg:w-[60vw] h-auto rounded-lg bg-cover object-cover   ' src='https://vitamu.imgix.net/Second%20Opinion%20Report.png'/>
          
       </div> }


       {tabsNum == 1 &&  
       <div data-aos="fade-up"  data-aos-duration="800" className='relative'>
          <img className='border-b  lg:w-[60vw] h-auto rounded-lg bg-cover object-cover   ' src='https://vitamu.imgix.net/Second%20Opinion%20Report.png'/>
       </div> }
      
       {tabsNum == 2 &&  
       <div data-aos="fade-up"  data-aos-duration="800" className='relative'>
           <img className='border-b  lg:w-[60vw] h-auto rounded-lg bg-cover object-cover   ' src='https://vitamu.imgix.net/Second%20Opinion%20Report.png'/>
        </div> }
      
       {tabsNum == 3 &&  
        <div data-aos="fade-up"  data-aos-duration="800" className='relative'>
           <img className='border-b lg:w-[60vw] h-auto rounded-lg bg-cover object-cover   ' src='https://vitamu.imgix.net/Second%20Opinion%20Report.png'/>
         </div> }
       
       
    

     </div>

    { !isOutside && <div className='flex flex-col items-center justify-center gap-2'>
         <PrimaryButton  to={"/"} />
        <div onClick={()=>{ window.scrollTo(0, 0); }} className='absoule right-5 bottom-5 px-6 py-2 rounded-3xl border border-black cursor-pointer'> Scroll to Top</div>
     </div>}
    
     </section>
     
   </>
  );
}

export default SampleReports;