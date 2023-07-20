import React from 'react'
import { Helmet } from 'react-helmet';
import Navbar from '../../homeComponents/1.Navbar/navbar';

const HealthHub = () => {


    const [selected, setSelected] = React.useState(0);

    const cards = [
        {
            id: 1,
            img: "https://scan.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxoT0RFMU56WTVZaTFoTWpJM0xUUTJNak10T0RsbVlTMHpaRFF6TlRsaFpERmpZbUlHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--2f45c8aeaa2dd23b5b2c35065331c939f6e97b28/symptoms-of-arthritis.jpg",
            date: "04 MAY 2021",
            title: "Signs you might have arthritis: types, symptoms, & how to treat it",
            button:"Symptoms",
        },
        {
            id: 2,
            img: "https://scan.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWszTkdJNU9HUTBNUzB3TVRSbExUUmhZVEF0WVdJME9DMHdaVE01WldJNVpXSTFPRFlHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e1ef022a1ec20515a52b92a484b15372948c345b/back-pain.jpg",
            date: "11 JUN 2021",
            title: "Back pain: anatomy, causes, & scans you might need",
            button:"Scans",
        },
        {
            id: 3,
            img: "https://scan.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxrWkdGalpqTTNaUzFpWm1abExUUmlOek10WVRZMk1TMDRPREl4WWpJME5XVmpaRFVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--50edec9f23b0682802150fd5ce4a7355dc6d6fba/signs-you-need-a-heart-scan.jpg",
            date: "09 MAY 2021",
            title: "3 major heart scans and 5 signs you might need one",
            button:"Symptoms",
        },
        {
            id: 4,
            img: "",
            date: "12 MAY 2021",
            title: "Gender bias in healthcare: what it is & why it matters",
            button:"Symptoms",
        },
            
        {
            id: 5,
            img: "",
            date: " MAY 2021",
            title: "What is Lorem Ipsum?",
            button:"Symptoms",
        },
            
        {
            id: 6,
            img: "",
            date: "04 MAY 2021",
            title: "What is Lorem Ipsum?",
            button:"Symptoms",
        },
            
    ];





  return (
    <>
        <Helmet>  <title>Health Hub</title>     <meta name="description" content="Health Hub" /> </Helmet>
        <Navbar mobileMenuText={"Menu"} mobileMenuTo={"/mobileNavMenu"} />

        <div className='w-screen auto  mt-24 items-center flex flex-col font-product tracking-wide'>

           <div className='lg:w-[86%] w-[96%] h-auto pt-14 pb-6 gap-12 flex flex-col'>
            
            {/* Tittle and Photos */}
             <header className='flex flex-col gap-2'>
                 <h1 className='text-6xl lg:text-8xl font-bold text-pri ' >Health Hub</h1>
                 <div className='border w-full h-[48vh]'></div>
            
             </header>

            {/* Main  */}
             <div className='flex flex-col gap-6'>
               
                {/* Navigator */}
                <div className='flex gap-2 w-full overflow-x-auto pb-2' >

                    <p  onClick={()=>{setSelected(0)}}  className={`px-7 py-3 h-fit  ${selected == 0 ? "bg-[#f2a5b1] border border-black" : "bg-[#ecece7]" }  whitespace-nowrap text-black  rounded-full w-fit duration-300 cursor-pointer `}>All</p>
                    <p  onClick={()=>{setSelected(1)}}  className={`px-7 py-3 h-fit  ${selected == 1 ? "bg-[#f2a5b1] border border-black" : "bg-[#ecece7]" }  text-black  rounded-full w-fit duration-300 cursor-pointer `}>Scans</p>
                    <p  onClick={()=>{setSelected(2)}}  className={`px-7 py-3 h-fit ${selected == 2 ? "bg-[#f2a5b1] border border-black" : " bg-[#ecece7]" }  text-black  rounded-full w-fit duration-300 cursor-pointer `}>Symptoms</p>
                    <p  onClick={()=>{setSelected(3)}}  className={`px-7 py-3 h-fit ${selected == 3 ? "bg-[#f2a5b1] border border-black" : " bg-[#ecece7]" }  text-black  rounded-full w-fit duration-300 cursor-pointer `}>Support</p>
                </div>

                 {/* Cards */}
                <div className='flex flex-wrap lg:gap-20 gap-10 justify-center '>
        
               {cards.map((card)=>(
                
                 <div className='xl:w-[365px] relative lg:w-[440px]  md:w-[330px] w-[98%] lg:h-[50vh] h-[60vh] rounded-2xl  hover:shadow-md cursor-pointer duration-300  '>
                  
                  <img src={card.img} className='w-full rounded-xl h-[60%]  '/>
                   
                  <div className='absolute w-full h-[55%] bottom-0 bg-[#ecece7] rounded-2xl pl-4 pt-4 flex flex-col justify-between'> 

                  <p className='text-sm font-bold'>{card.date}</p>
                  <p className='text-lg font-bold'>{card.title}</p>
                  <p className='text-sm py-2 px-5 bg-white rounded-full w-fit'>{card.button}</p>
                  <p></p>
                  
                  </div>
               
                 </div>
             
             ))}
                   

                </div>


             </div>
          
           </div>
        
            


        </div>
  
  
  
    </>
  )
}

export default HealthHub;