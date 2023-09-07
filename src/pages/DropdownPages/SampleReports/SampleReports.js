import React, { useEffect, useState } from 'react'
import gV from '../../../gV'
import Navbar from '../../../homeComponents/1.Navbar/navbar'


const SampleReports = () => {



    const [showNum, setShowNum] = useState(0)
    const [count, setCount] = useState(0);

    const [tabsNum, setTabsNum] = useState(0)
    
    const [left, setLeft] = useState("left-[1%]")
    const [width, setWidth] = useState("")

    useEffect(() => {
      
      const interval = setInterval(() => {
       
        setCount(count + 1);
        if(count == 5){
          setCount(0)
        }
      }, 2000);
     
  
      return () => clearInterval(interval);
    }, [count]);
    
 

    const Ping = ({title,left,top,num}) => {
      return (
      <>

       <div className={`absolute ${left}  ${top}   flex items-center w-[300px] h-[120px]`}>
        
          {/* Explanation Area */} 
           <div className={` text-[#fff] px-4 py-2 font-extralight flex flex-col   absolute lg:w-[245px]  lg:h-[120px] w-[235px] h-[120px] lg:ml-[6vw]  ml-[16vw] rounded-2xl bg-[#000] opacity-0  ${showNum == num ?  "animate-fadeIn" : "hidden" }` }>
            <div className='flex justify-between items-center pb-2 w-full border-b border-slate-50'>
              <p className=''>{title}</p>
              <p  className='hover:bg-white hover:border-[#000000] hover:text-[#000000] flex h-6 px-4 pb-1 items-center justify-center border border-[#fff] rounded-md'>x</p>
            </div>
            
            <p className='text-[13px] mt-2'>lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut </p>
          
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
          
           <div className=" bg-[#ffffff]    font-product items-center justify-center  tracking-wide  lg:w-auto w-[96vw] px-6 py-3  rounded-3xl relative cursor-pointer">
          
               <div  className={`absolute ${left} ${width} w-[26%] top-[6px] z-10  lg:h-[70%] h-[80%] bottom-10 bg-[#000000] rounded-2xl duration-300 ease-in-out`}   >  </div> 
          
               <div className=" w-full  relative flex items-center justify-center lg:gap-9 gap-5">
          
                  <p  className={`h-[96%] w-fit ${tabsNum == 0 ? "text-[#ffffff]" : "text-[#000000]" } text-[0.9rem]  flex items-center justify-center rounded-2xl z-30 duration-300 ease-in-out`} onClick={()=>{setTabsNum(0);  setWidth("w-[26%]"); setLeft("left-[1%]")  }  } >  Missed Diagnosis </p>
                  <p  className={`h-[96%] w-fit ${tabsNum == 1 ? "text-[#ffffff]" : "text-[#000000]" }  text-[0.9rem]  flex items-center justify-center rounded-2xl z-30 duration-300 ease-in-out`} onClick={()=>{setTabsNum(1);  setWidth("w-[17%]"); setLeft("left-[27%]") } } >  Happy Eye </p>
                  <p  className={`h-[96%] w-fit ${tabsNum == 2 ? "text-[#ffffff]" : "text-[#000000]" }  text-[0.9rem]  flex items-center justify-center rounded-2xl z-30 duration-300 ease-in-out`} onClick={()=>{setTabsNum(2);  setWidth("w-[26%]"); setLeft("left-[46%]") }} >  Incomplete Imaging </p>
                  <p  className={`h-[96%] w-fit  ${tabsNum == 3 ? "text-[#ffffff]" : "text-[#000000]" } text-[0.9rem]  flex items-center justify-center rounded-2xl z-30 duration-300 ease-in-out`} onClick={()=>{setTabsNum(3);  setWidth("w-[26%]"); setLeft("left-[73%]")  } } >  Over - Diagnosis   </p>
          
               </div>
          
           </div>
       
      
        </>
      )
    }

    const TabsMenuMob = () => {

      var tag = ">"

      return (
        <>
         <div class="relative w-[95vw]  overflow-auto">
          <div class="max-w-md mx-auto bg-slate-200 shadow-xl min-w-0 dark:bg-slate-800 dark:highlight-white/5">
           <div class="overflow-x-auto  pb-8 flex ">
            

           <div class="flex-none py-2 first:pl-0 last:pr-0">
             <div class="flex flex-col items-center justify-center">
          
             <div onClick={()=>{setTabsNum(0)}} className={`w-[45vw]  h-[11vw] ${tabsNum == 0 ? "text-[#ffffff] bg-[#000000] " : "text-[#000000]  border border-[#000000]" } items-center justify-center flex rounded-xl duration-300` } > 
                Missed Diagnosis
              </div>
        
             </div>
           </div>

          
           <div class="flex-none py-2 px-1 first:pl-6 last:pr-6">
             <div class="flex flex-col items-center justify-center">
          

             <div onClick={()=>{setTabsNum(1)}} className={`w-[31vw]  h-[11vw] ${tabsNum == 1 ? "text-[#ffffff] bg-[#000000] " : "text-[#000000]  border border-[#000000]" } items-center justify-center flex rounded-xl duration-300` } > 
             Happy Eye
              </div>
        
             </div>
           </div>

          
           <div class="flex-none py-2 px-1 first:pl-6 last:pr-6">
             <div class="flex flex-col items-center justify-center">
          
             <div onClick={()=>{setTabsNum(2)}} className={`w-[50vw]  h-[11vw] ${tabsNum == 2 ? "text-[#ffffff] bg-[#000000] " : "text-[#000000]  border border-[#000000]" } items-center justify-center flex rounded-xl duration-300` } > 
                Incomplete Imaging
              </div>
        
             </div>
           </div>

         
           <div class="flex-none py-2 px-1 first:pl-6 last:pr-6">
             <div class="flex flex-col items-center justify-center">
            
             <div onClick={()=>{setTabsNum(3)}} className={`w-[44vw]  h-[11vw] ${tabsNum == 3 ? "text-[#ffffff] bg-[#000000] " : "text-[#000000]  border border-[#000000]" } items-center justify-center flex rounded-xl duration-300` } > 
                Over - Diagnosis
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
    
     <Navbar
      mobileMenuText={"Menu"}
      mobileMenuTo={"/mobileNavMenu"}
      />

     <section className="w-screen font-product  h-auto py-[15vh] overflow-hidden  bg-slate-200 relative flex flex-col items-center gap-6 lg:gap-10 justify-center">
    
    {/*  Header */}
     <div className='flex flex-col gap-4 relative  lg:w-[70vw] items-center justify-center w-[95vw] '>
          
        
            <h1 className='text-[32px] self-center tracking-wide'> Second Opinion Report Samples </h1>
          
          
            <p className="lg:w-[100%]  text-pri">
              You got your screening for peace of mind but ended up with some vague
              term of Birads 3. I am Elizabeth H. Asch, a US board-certified
              radiologist, and I will try to answer all the questions on your mind.
              It will take only two minutes to read this piece; please make it to
              the end.
            </p>
     </div>

     {gV.mq.matches ? TabsMenuMob() : TabsMenuWeb() }

     {/*  Vertical Reports*/}
     <div className='flex overflow-hidden relative bottom-8  flex-col px-2 gap-10'>


      {  tabsNum == 0 && <div className='relative'>
       
         <Ping
          num={1}
          top="top-[14vh]"
          left="left-[1vw]"
          title={"Yellow Sofa"}
          />

        <Ping
          num={2}
          top="top-[39vh]"
          left="left-[25vw]"
          title={"Yellow Sofa"}
          />

         <Ping
          num={3}
          top="top-[82vh]"
          left="left-[23vw]"
          title={"Yellow Sofa"}
          />


           <img className='border-b  lg:w-[70vw] h-auto rounded-lg bg-cover object-cover   ' src='https://vitamu.imgix.net/1-1.png'/>
           <img className='border-b  lg:w-[70vw] h-auto rounded-lg bg-cover object-cover mt-6   ' src='https://vitamu.imgix.net/1-2.png'/>
           <img className='border-b  lg:w-[70vw] h-auto rounded-lg bg-cover object-cover mt-6   ' src='https://vitamu.imgix.net/1-3.png'/>
           <img className='border-b  lg:w-[70vw] h-auto rounded-lg bg-cover object-cover mt-6   ' src='https://vitamu.imgix.net/1-4.png'/>
       </div> }







       {tabsNum == 1 &&  <div className='relative'>

<Ping
  num={4}
   top="top-[19vh]"
   left="left-[7vw]"
    title={"Yellow Sofa"}
   />

<Ping
  num={5}
   top="top-[52.8vh]"
   left="left-[11.5vw]"
    title={"Yellow Sofa"}
   />
 
    <img className='border-b  lg:w-[37vw] lg:h-[96vh] h-[80vh]  rounded-lg bg-cover  ' src='https://vitamu.imgix.net/Recheck%20Report%20-%20Sample%20(1)_page-0002.jpg?auto=undefined%2Ccompress'/>
       </div> }
      
       {tabsNum == 2 &&  <div className='relative'>
         <Ping
           title={"Yellow Sofa"}
          />
           <img className='border-b  lg:w-[37vw] h-[96vh] rounded-lg bg-cover  ' src='https://vitamu.imgix.net/Recheck%20Report%20-%20Sample%20(1)_page-0003.jpg?auto=undefined%2Ccompress'/>
       </div> }
      
       {tabsNum == 3 &&  <div className='relative'>
         <Ping
           title={"Yellow Sofa"}
          />
           <img className='border-b  lg:w-[37vw] h-[96vh] rounded-lg bg-cover  ' src='https://vitamu.imgix.net/Recheck%20Report%20-%20Sample%20(1)_page-0004.jpg?auto=undefined%2Ccompress'/>
       </div> }
       
       
    

     </div>

    
     </section>
    
   </>
  );
}

export default SampleReports;