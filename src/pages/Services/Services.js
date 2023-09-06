import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import gV from '../../gV';
import Navbar from '../../homeComponents/1.Navbar/navbar';
import Radiologists from '../../homeComponents/7.Radiologists/radiologists';
import SelectBodyParts from '../Forms/components/selectBodyParts';
import SelectScan from '../Forms/components/selectScan';
import imageSvg2 from "../../assets/svg/image-2.svg";


const Services = ({title,imageUrl,heroText,}) => {

  const icons = [
   
    {
        id:2,
       
        text:"60+ radiologists"
    },
    {
        id:3,
        text:"Starting at $20"
    },
    {
        id:4,
        text:"Insurance accepted"
    },
    {
        id:5,
        text:"Fully online process"
    },
   ]

  
  const searchIcon =  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current w-6 h-6 stroke-2" fill="none" viewBox="0 0 24 24">
  <circle cx="10" cy="10" r="7"></circle>
<line x1="21" y1="21" x2="15" y2="15"></line>

</svg>  

 const costIcon = <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current w-6 h-6 stroke-2" fill="none" viewBox="0 0 24 24">
<path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"></path>
<path d="M12 3v3m0 12v3"></path>

</svg>

const customerIcon = <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current w-6 h-6 stroke-2" fill="none" viewBox="0 0 24 24">
<path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>

</svg>

const starIcon = <img className="w-6 h-6" src="https://scan.com/assets/review-star-b69e09e438f36badb1d27701ae8f32e6aa6499e50a2c579926d96bc1326bb973.png"/>




const navigate = useNavigate();



const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="w-full bg-white border-b border-neutral-300">
      <button
        className="flex items-start justify-between space-x-4 font-medium cursor-pointer select-none text-lg w-full py-5 focus-visible:outline-primary-300 text-start"
        type="button"
        aria-expanded={isOpen ? 'true' : 'false'}
        onClick={toggleOpen}
      >
        {question}
        <div className="shrink-0 w-6 text-neutral-950 stroke-2 ml-auto">
          <svg
            className="stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="pb-4 pr-8 space-y-4 text-base text-neutral-600">
          <p>{answer}</p>
        </div>
      )}
    </li>
  );
};





  return (
    <> 

      <Helmet>
        <title>Mitrua - Services</title>
        <meta name="description" content="Mitrua - Services" />
      </Helmet>
  
      <Navbar
      mobileMenuText={'Menu'}
      mobileMenuTo ={"/mobileNavMenu"}
      />  

       
      {/* Screen 1  - HERO */}
      <div className='w-screen lg:h-screen h-auto   relative  flex flex-col  items-center justify-center lg:pt-[10.8vh] pt-[10.9vh]  px-[3vw] lg:px-[7vw]  font-product'>

        <div className='w-full lg:mb-10  h-fit flex flex-col '>

          <div className='flex  w-fit gap-7 h-fit'> <p className='text-priTrans'> Services</p>  <img className='rotate-90' width="12" height="14" src="https://img.icons8.com/ios-filled/50/666666/collapse-arrow.png" alt="collapse-arrow"/>  <p>{title} Second Opinion</p></div>

          <h1 className='text-[3.75rem] font-bold'>{title} Second Opinion </h1>
          <p className='text-priTrans lg:w-[50%]'>Get your {title} second opinion today. A super clear second opinion report by two U.S. board certified radiologist, results in 24 hours.</p>


    <ul class="lg:grid sm:grid-cols-2 hidden gap-x-2 gap-y-6 max-w-xl mt-3">

        <li class="flex space-x-4  items-center text-base">
  <div class="w-10 h-10 p-2 rounded-md  bg-[#FFF0F4] shrink-0 stroke-2 text-primary-700">
    <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 13l4 4L19 7"></path>
</svg>
  </div>
  <span class="text-sm font-medium text-neutral-700">
   Detailed case analysis

</span>
</li>
        <li class="flex space-x-4  items-center text-base">
  <div class="w-10 h-10 p-2 rounded-md  bg-[#FFF0F4] shrink-0 stroke-2 text-primary-700">
    <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 13l4 4L19 7"></path>
</svg>
  </div>
  <span class="text-sm font-medium text-neutral-700">
  Radiologist notes
</span>
</li>
        <li class="flex space-x-4  items-center text-base">
  <div class="w-10 h-10 p-2 rounded-md  bg-[#FFF0F4] shrink-0 stroke-2 text-primary-700">
    <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 13l4 4L19 7"></path>
</svg>
  </div>
  <span class="text-sm font-medium text-neutral-700">
  Marked images
</span>
</li>
        <li class="flex space-x-4  items-center text-base">
  <div class="w-10 h-10 p-2 rounded-md  bg-[#FFF0F4] shrink-0 stroke-2 text-primary-700">
    <svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 13l4 4L19 7"></path>
</svg>
  </div>
  <span class="text-sm font-medium text-neutral-700">
  Ask a radiologist
</span>
</li>
     </ul>


  {  


/* Hero Dropdowns Buttons */

/*  Mobile */
gV.mq.matches 

? 

  <div className="flex flex-col items-center mt-10  gap-3 rounded-full ">
    <SelectBodyParts/>
    <SelectScan/>
   <div onClick={()=>{navigate("/form-new")}} className=" flex items-center justify-center  bg-[#ff4949]  hover:bg-[#ff595990] duration-300 cursor-pointer text-white  w-[290px] h-[48px]  rounded-3xl">Get Started</div>
  </div>


:
/* Desktop */
  <div className=" flex w-[65vw] cursor-pointer  h-[54px] mt-5 ">
    
    
    <SelectBodyParts/>
    <SelectScan/>
    
  
  
    <div onClick={()=>{ navigate("/form-new") }} className=" flex items-center justify-center gap-3 w-[22%] h-full   bg-[#ff4949] text-white rounded-[44px] relative right-6 z-10  "> 
      <p>Get Started</p>
      <p>➔</p>
     </div>
    
   </div>

} 



{

/* Hero Bottom Icons */
gV.mq.matches 


?


 <div className="flex flex-col gap-2 mt-10 pb-10 items-center text-center">
{icons.map((company,idx) => (
  <div key={idx} className="flex w-[full]  gap-2  items-center">

{idx === 0 &&  searchIcon}
{idx === 1 &&  costIcon}
{idx === 2 &&  customerIcon}
{idx === 3 &&  starIcon}

  <p className="text-center text-[16px]">{company.text}</p>
</div>
))}

</div>  

: 



<div className=" flex mt-10 gap-12 self-start ">
    
{icons.map((company,idx) => (
<div key={idx} className="flex  w-auto  gap-3  items-center">

{idx === 0 &&  searchIcon}
{idx === 1 &&  costIcon}
{idx === 2 &&  customerIcon}
{idx === 3 &&  starIcon}

<p className="text-center">{company.text}</p>
</div>
))}
</div>
}



          



        </div>

        <img className='absolute right-12 lg:flex hidden w-[500px] h-[590px] rounded-2xl mb-8 object-cover' src={imageUrl}/>

      </div>


      {/* Screen 2 - SCANS LOOK FOR */}
      <div className='w-screen lg:pt-[24vh] pb-12 pt-3 lg:mt-40 relative bg-[#FFF0F4] flex  font-product flex-col lg:h-auto h-auto   px-[3vw] lg:px-[7vw] '>

        <div class="lg:flex items-center absolute hidden   right-6 -top-36 gap-4 p-4 xl:justify-center"><div class="flex w-fit min-w-[400px] max-w-md items-start gap-x-4 rounded-xl bg-white p-6 shadow-lg"><blockquote class="w-full space-y-4"><p>“Can’t recommend them highly enough. Half the cost of the big private names and scan booked, completed and results back in very quickly. Clinician giving the results gave sound practical follow on advice.”</p><div class="flex items-center justify-between"><div class="flex items-center gap-4"><img alt="Headshot of Rhianne" class="h-14 w-14 shrink-0 rounded-full object-cover" src="https://vitamu.imgix.net/WhatsApp%20Image%202023-09-07%20at%2001.40.21.jpeg"/><div><span class="block font-medium">Anne</span><span class="block text-sm text-neutral-600">Birmingham</span></div></div><div><div class="text-primary-300 flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg></div></div></div></blockquote></div><div class="flex w-fit min-w-[400px] max-w-md items-start gap-x-4 rounded-xl bg-white p-6 shadow-lg"><blockquote class="w-full space-y-4"><p>“I booked a private scan over concern about headaches. The head &amp; spine scan turned out to be fine but threw up an unexpected issue. Treatment from booking to contact with the consultant was efficient, courteous &amp; friendly in all departments.”</p><div class="flex items-center justify-between"><div class="flex items-center gap-4"><img alt="Headshot of Maureen" class="h-14 w-14 shrink-0 rounded-full object-cover" src="https://vitamu.imgix.net/WhatsApp%20Image%202023-09-07%20at%2001.40.54.jpeg"/><div><span class="block font-medium">Mark</span><span class="block text-sm text-neutral-600">Chelmsford</span></div></div><div><div class="text-primary-300 flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg></div></div></div></blockquote></div><div class="flex w-fit min-w-[400px] max-w-md items-start gap-x-4 rounded-xl bg-white p-6 shadow-lg"><blockquote class="w-full space-y-4"><p>“Quite EXCELLENT The whole process from booking to having the MRI images and the radiologists report in the right hands could not have been faster. The price was hugely competitive too!”</p><div class="flex items-center justify-between"><div class="flex items-center gap-4"><img alt="Headshot of Torill" class="h-14 w-14 shrink-0 rounded-full object-cover" src="https://vitamu.imgix.net/WhatsApp%20Image%202023-09-07%20at%2001.42.17.jpeg"/><div><span class="block font-medium">Jessica</span><span class="block text-sm text-neutral-600">Colchester</span></div></div><div><div class="text-primary-300 flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" fill="currentColor" stroke-width="0"></path></svg></div></div></div></blockquote></div></div>
 
     
      <div class="flex flex-col items-center mb-8 space-y-4 lg:mb-12 lg:space-y-0 lg:space-x-24 lg:flex-row">
      <h2 class="w-full text-[42px] leading-[48px] h-fit font-bold font-product">
      Body parts we provide second opinions for:
      </h2>
      <p class="flex-none text-[20px] w-full space-y-4 statement-sm text-neutral-700 lg:max-w-md xl:max-w-2xl">
      Each body part has unique characteristics, abnormalities, and pathologies. In the field of complex radiology, to avoid under, over, or missed diagnosis, a second opinion can give you the right direction.
      </p>
      </div>

      
      
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    
            <a class="rounded-md shadow hover:shadow-lg bg-white transition-all duration-200 ease-out overflow-hidden group" href="/body-parts/head-and-brain">
              <div class="p-8 bg-white rounded-md">
                <div class="flex justify-between">
                  <div class="w-12 h-12 mb-3">
                    
<svg viewBox="0 0 40 36" fill="none" class="fill-current" xmlns="http://www.w3.org/2000/svg">
<path d="M40 17.9097C40.0009 17.3457 39.8668 16.7897 39.609 16.2881C39.3512 15.7866 38.9771 15.3539 38.5181 15.0264C38.8934 14.4526 39.0924 13.7814 39.0903 13.0958C39.0882 12.2528 38.7871 11.4379 38.2404 10.7962C37.6937 10.1545 36.937 9.72773 36.105 9.5918C36.1383 9.39642 36.155 9.19856 36.1548 9.00037C36.1534 8.49171 36.043 7.98926 35.8311 7.52685C35.6191 7.06445 35.3106 6.65282 34.9262 6.31969C34.5418 5.98657 34.0905 5.73968 33.6026 5.59565C33.1148 5.45163 32.6018 5.41381 32.0981 5.48474C32.0024 4.92876 31.7761 4.40341 31.4379 3.95191C31.0996 3.50041 30.659 3.13564 30.1523 2.88759C29.6456 2.63954 29.0873 2.5153 28.5232 2.52508C27.9591 2.53486 27.4054 2.67838 26.9076 2.94385C26.6819 2.41495 26.3315 1.94851 25.8865 1.5843C25.4414 1.22009 24.9149 0.96892 24.3518 0.852216C23.7887 0.735512 23.2057 0.756734 22.6526 0.914072C22.0995 1.07141 21.5926 1.3602 21.1752 1.7558C20.8394 1.25856 20.3835 0.854206 19.8496 0.580288C19.3158 0.30637 18.7214 0.171764 18.1217 0.188964C17.5219 0.206164 16.9362 0.374614 16.419 0.678676C15.9017 0.982737 15.4697 1.41255 15.163 1.92823C14.6937 1.57154 14.1432 1.33697 13.5609 1.24557C12.9786 1.15417 12.3827 1.20881 11.8268 1.40458C11.2708 1.60035 10.7722 1.93112 10.3756 2.3672C9.97905 2.80328 9.69699 3.33101 9.55475 3.90302C9.03429 3.72107 8.4787 3.6624 7.93171 3.73163C7.38472 3.80085 6.86127 3.99609 6.40254 4.30196C5.94382 4.60784 5.56235 5.016 5.28815 5.49434C5.01395 5.97267 4.85452 6.50812 4.82239 7.05853C3.91457 7.1077 3.05998 7.50237 2.4339 8.16159C1.80782 8.82081 1.45771 9.69461 1.45539 10.6038C1.45305 11.3812 1.70859 12.1374 2.18201 12.754C1.53884 13.0258 0.989404 13.4801 0.601611 14.0608C0.213819 14.6415 0.0046661 15.323 1.41605e-06 16.0212C-0.000780032 16.8945 0.321896 17.737 0.905764 18.3864C0.694958 18.8467 0.585973 19.347 0.586251 19.8533C0.588436 20.3928 0.713032 20.9247 0.950651 21.4091C1.18827 21.8934 1.53272 22.3175 1.95803 22.6494C2.38335 22.9812 2.87844 23.2123 3.406 23.325C3.93357 23.4378 4.47984 23.4293 5.00366 23.3003C5.27524 23.7011 5.6256 24.0423 6.03338 24.3032C6.44116 24.5641 6.89781 24.7392 7.37549 24.8179C7.85317 24.8965 8.34186 24.877 8.81176 24.7606C9.28166 24.6442 9.72293 24.4333 10.1086 24.1407C10.8233 25.2407 11.8961 26.0598 13.1454 26.4595C13.8794 26.7124 14.6569 26.8143 15.4312 26.7591C16.2055 26.7039 16.9607 26.4928 17.6514 26.1384C18.053 27.6112 19.3567 30.2876 23.5645 30.89C25.3303 31.652 26.8143 32.9461 27.8095 34.5918C28.0198 34.961 28.3237 35.2682 28.6906 35.4825C29.0575 35.6968 29.4744 35.8107 29.8993 35.8125C30.2753 35.8136 30.6463 35.7259 30.9819 35.5564C31.3176 35.3869 31.6084 35.1404 31.8307 34.8372C32.0625 34.5258 32.2167 34.1637 32.2808 33.7809C32.3449 33.3981 32.317 33.0055 32.1994 32.6356L30.6988 28.3876C30.6687 28.2901 30.6621 28.1869 30.6794 28.0863C30.6968 27.9858 30.7376 27.8907 30.7986 27.809C30.8557 27.7307 30.9305 27.6669 31.0169 27.623C31.1033 27.5791 31.1989 27.5562 31.2958 27.5563H33.0856C33.8197 27.5671 34.5446 27.392 35.1928 27.0473C35.841 26.7025 36.3914 26.1994 36.7927 25.5846C37.1941 24.9699 37.4334 24.2636 37.4882 23.5314C37.5431 22.7993 37.4118 22.0652 37.1066 21.3975C37.919 21.2429 38.6522 20.8101 39.1802 20.1736C39.7082 19.5371 39.9981 18.7367 40 17.9097V17.9097ZM36.7455 20.1875H31.875C31.7092 20.1875 31.5503 20.2533 31.4331 20.3706C31.3158 20.4878 31.25 20.6467 31.25 20.8125C31.25 20.9783 31.3158 21.1372 31.4331 21.2544C31.5503 21.3717 31.7092 21.4375 31.875 21.4375H35.697C36.081 21.9931 36.2742 22.6584 36.2476 23.3333C36.2005 24.1391 35.8465 24.8963 35.2584 25.4492C34.6704 26.0022 33.8928 26.3089 33.0856 26.3063L25.625 26.3334C25.4592 26.3334 25.3003 26.3993 25.1831 26.5165C25.0658 26.6337 25 26.7927 25 26.9584C25 27.1242 25.0658 27.2832 25.1831 27.4004C25.3003 27.5176 25.4592 27.5834 25.625 27.5834H29.5245C29.3942 27.9698 29.3896 28.3875 29.5114 28.7767L31.012 33.0247C31.0674 33.2046 31.0796 33.395 31.0474 33.5805C31.0153 33.766 30.9398 33.9412 30.827 34.0919C30.7204 34.2379 30.5808 34.3567 30.4196 34.4385C30.2584 34.5203 30.0801 34.5628 29.8993 34.5625C29.6946 34.561 29.494 34.5055 29.3176 34.4017C29.1413 34.298 28.9954 34.1495 28.8947 33.9714C27.7458 32.0514 26.0095 30.5522 23.9426 29.6956C23.8995 29.6796 23.8547 29.6684 23.8092 29.6623C19.6848 29.1005 18.9039 26.3246 18.7579 25.4064C18.7597 25.3856 18.7604 25.3648 18.7601 25.3441C18.6731 24.0214 19.079 22.3771 21.5054 22.0561C21.5868 22.0454 21.6653 22.0187 21.7364 21.9776C21.8075 21.9366 21.8698 21.8819 21.9198 21.8167C21.9697 21.7516 22.0064 21.6772 22.0276 21.5979C22.0488 21.5186 22.0541 21.4358 22.0433 21.3544C22.0325 21.273 22.0058 21.1946 21.9647 21.1235C21.9236 21.0524 21.8688 20.9902 21.8036 20.9403C21.7384 20.8904 21.6641 20.8538 21.5847 20.8327C21.5054 20.8115 21.4226 20.8062 21.3413 20.8171C19.0016 21.1264 17.6096 22.5902 17.5095 24.7781C16.9285 25.1554 16.2694 25.3961 15.5819 25.4819C14.8944 25.5678 14.1963 25.4965 13.5403 25.2736C12.2864 24.8561 11.2353 23.9213 10.9244 22.9472C10.9051 22.8893 10.8774 22.8347 10.8421 22.7849C10.7137 22.2686 10.7901 21.7227 11.0553 21.2614C11.1332 21.1151 11.1499 20.9438 11.1015 20.7852C11.0531 20.6266 10.9438 20.4937 10.7974 20.4158C10.6511 20.3378 10.4798 20.3212 10.3212 20.3696C10.1626 20.4179 10.0297 20.5273 9.95178 20.6736C9.56648 21.359 9.43961 22.1597 9.59419 22.9306C9.36369 23.164 9.08598 23.3454 8.77965 23.4628C8.47331 23.5802 8.14544 23.6307 7.81798 23.6111C7.49052 23.5915 7.17104 23.5021 6.88094 23.3489C6.59083 23.1958 6.33679 22.9824 6.13584 22.7231C6.13087 22.7148 6.12785 22.7058 6.12243 22.6976C6.11664 22.689 5.56275 21.8358 5.78949 20.9947C5.83263 20.8347 5.81043 20.6641 5.72779 20.5204C5.64515 20.3768 5.50882 20.2718 5.34881 20.2287C5.18879 20.1856 5.01819 20.2077 4.87454 20.2904C4.73089 20.373 4.62595 20.5094 4.58281 20.6694C4.46085 21.1427 4.45399 21.6383 4.56281 22.1148C4.42556 22.1402 4.28631 22.1532 4.14673 22.1537C3.5355 22.1544 2.94898 21.9125 2.51583 21.4813C2.08268 21.05 1.83829 20.4646 1.83625 19.8533C1.83686 19.5343 1.9046 19.2189 2.03505 18.9278C2.29147 19.0017 2.55665 19.0409 2.82349 19.0443C2.8772 19.0443 2.91382 19.0425 2.93 19.0413C3.09369 19.0296 3.24613 18.9537 3.3541 18.8301C3.46208 18.7065 3.51684 18.5452 3.50647 18.3815C3.49464 18.2175 3.41951 18.0645 3.29696 17.9549C3.17441 17.8452 3.01403 17.7876 2.84973 17.794C2.4432 17.7899 2.04943 17.6515 1.72973 17.4003C1.72056 17.3932 1.7103 17.3888 1.70087 17.3823C1.40843 16.9887 1.25035 16.5116 1.25 16.0212C1.25493 15.4559 1.46639 14.9118 1.84455 14.4915C2.22272 14.0712 2.7415 13.8036 3.30322 13.7392C3.6381 13.902 4.00133 13.9985 4.37286 14.0233C4.37927 14.0236 4.38568 14.0236 4.39209 14.0236C4.55283 14.0233 4.70721 13.9608 4.82287 13.8491C4.93853 13.7375 5.00649 13.5855 5.01251 13.4248C5.01857 13.26 4.9596 13.0994 4.84833 12.9777C4.73706 12.856 4.5824 12.7829 4.41772 12.7742C4.23819 12.7569 4.06266 12.7105 3.89804 12.6368C3.87265 12.6107 3.84496 12.5869 3.81529 12.5658C3.47641 12.3626 3.19601 12.0751 3.00147 11.7312C2.80693 11.3873 2.70492 10.9988 2.70539 10.6038C2.70758 9.99797 2.94792 9.41735 3.37452 8.98724C3.80111 8.55713 4.37974 8.31204 4.98549 8.30488C5.18263 8.90372 5.54734 9.43347 6.03638 9.83135C6.14257 9.90959 6.27099 9.95183 6.40289 9.95189C6.53383 9.9517 6.66142 9.91045 6.7677 9.83396C6.87398 9.75748 6.9536 9.6496 6.99537 9.5255C7.03714 9.4014 7.03896 9.26732 7.00056 9.14214C6.96216 9.01696 6.88548 8.90696 6.78131 8.82762C6.42143 8.51917 6.18052 8.09475 6.1002 7.62762C6.0998 7.62488 6.10029 7.62217 6.09985 7.61942C6.09621 7.59674 6.09474 7.57714 6.09171 7.55536C6.07645 7.45627 6.06829 7.35622 6.0673 7.25596L6.0672 7.25381C6.06695 6.844 6.17625 6.44158 6.38377 6.08821C6.59129 5.73483 6.8895 5.44335 7.24751 5.24393C7.60552 5.04451 8.01033 4.94442 8.42002 4.954C8.82971 4.96358 9.2294 5.0825 9.57769 5.29843C9.65039 5.60221 9.78567 5.88748 9.97488 6.13601C10.1641 6.38453 10.4031 6.59085 10.6766 6.74176C10.8279 6.81136 11.0006 6.81859 11.1572 6.76188C11.3139 6.70517 11.4419 6.58908 11.5137 6.43872C11.5487 6.36504 11.5687 6.28514 11.5726 6.20367C11.5765 6.12219 11.5642 6.04074 11.5364 5.96405C11.5086 5.88736 11.4659 5.81694 11.4107 5.75687C11.3555 5.69681 11.289 5.64829 11.2149 5.61413C11.1951 5.60324 10.7661 5.35092 10.7134 4.5212C10.7623 4.05716 10.9506 3.61879 11.2534 3.26378C11.5562 2.90876 11.9594 2.65373 12.4099 2.53224C12.8604 2.41074 13.3372 2.42848 13.7774 2.58311C14.2177 2.73774 14.6008 3.02202 14.8764 3.39856C14.8817 3.40573 14.8892 3.41034 14.8947 3.41725C14.9036 3.82849 14.9845 4.235 15.1337 4.61834C15.1819 4.72977 15.2617 4.82463 15.3632 4.89123C15.4647 4.95782 15.5835 4.99324 15.7049 4.9931C15.8081 4.99304 15.9097 4.96749 16.0006 4.91873C16.0915 4.86996 16.169 4.7995 16.2261 4.71359C16.2832 4.62768 16.3183 4.52899 16.3281 4.42629C16.3379 4.32358 16.3222 4.22004 16.2823 4.12488C16.158 3.81108 16.1152 3.47091 16.1579 3.1361C16.2006 2.8013 16.3274 2.48275 16.5265 2.21019C16.545 2.18575 16.5617 2.15998 16.5764 2.13307C16.8479 1.85424 17.1856 1.64885 17.5581 1.53611C17.9305 1.42338 18.3255 1.40699 18.706 1.48847C19.0865 1.56996 19.4402 1.74667 19.7338 2.00205C20.0274 2.25743 20.2514 2.58313 20.3849 2.94867C20.1705 3.63091 20.172 4.36268 20.3891 5.04405C20.4452 5.1999 20.5608 5.32713 20.7106 5.39778C20.8604 5.46843 21.0322 5.47672 21.1881 5.42084C21.344 5.36495 21.4714 5.24946 21.5422 5.09973C21.613 4.95001 21.6215 4.77829 21.5658 4.62229C21.4146 4.13016 21.4489 3.59964 21.6624 3.13113C21.9017 2.7402 22.2519 2.42936 22.6685 2.23823C23.0851 2.0471 23.5492 1.98433 24.0016 2.05792C24.454 2.13151 24.8742 2.33813 25.2088 2.65144C25.5433 2.96476 25.777 3.37058 25.88 3.81719C25.5983 4.23555 25.4157 4.71263 25.3461 5.21216C25.2765 5.71168 25.3217 6.22051 25.4782 6.69995C25.5343 6.85581 25.6499 6.98304 25.7997 7.05368C25.9496 7.12433 26.1213 7.13263 26.2772 7.07674C26.4331 7.02086 26.5605 6.90537 26.6313 6.75564C26.7022 6.60591 26.7107 6.43419 26.655 6.2782C26.5517 5.95757 26.5314 5.616 26.5959 5.28539C26.6605 4.95479 26.8077 4.64592 27.0239 4.38764C27.0258 4.38562 27.0269 4.38321 27.0287 4.38117C27.3538 4.08313 27.7574 3.88449 28.1919 3.80878C28.6263 3.73308 29.0734 3.78348 29.48 3.95402C29.8867 4.12456 30.236 4.40809 30.4865 4.77103C30.737 5.13396 30.8783 5.5611 30.8935 6.00183C30.5664 6.30998 30.3043 6.6805 30.1226 7.09155C29.941 7.50261 29.8435 7.94587 29.8358 8.39521C29.8382 8.55932 29.9051 8.71589 30.022 8.83112C30.1389 8.94635 30.2964 9.01098 30.4605 9.01105H30.47C30.6357 9.00856 30.7937 8.94037 30.9092 8.82145C31.0246 8.70254 31.0882 8.54264 31.0858 8.37689C31.0924 8.07499 31.1665 7.77838 31.3025 7.50881C31.4386 7.23924 31.6333 7.00354 31.8723 6.81897C32.2183 6.70316 32.5869 6.67125 32.9476 6.72588C33.3084 6.78051 33.651 6.92011 33.9471 7.13317C34.2433 7.34623 34.4846 7.62665 34.6511 7.95129C34.8176 8.27594 34.9046 8.63552 34.9048 9.00037C34.9046 9.23189 34.8688 9.46202 34.7987 9.68268C34.0562 9.93161 33.4234 10.4311 33.0087 11.0954C32.9671 11.1663 32.94 11.2448 32.9287 11.3263C32.9175 11.4078 32.9225 11.4907 32.9434 11.5702C32.9643 11.6497 33.0007 11.7244 33.0505 11.7898C33.1004 11.8553 33.1626 11.9102 33.2337 11.9516C33.3048 11.9929 33.3834 12.0198 33.4649 12.0307C33.5464 12.0416 33.6293 12.0363 33.7087 12.0151C33.7882 11.9939 33.8627 11.9573 33.928 11.9072C33.9932 11.8572 34.048 11.7947 34.089 11.7235C34.2661 11.4433 34.511 11.2124 34.801 11.0521C35.0911 10.8918 35.4169 10.8073 35.7483 10.8064C36.3191 10.8599 36.8496 11.1239 37.2364 11.5472C37.6231 11.9704 37.8384 12.5225 37.8403 13.0958C37.8416 13.5617 37.6993 14.0167 37.4328 14.3988C37.4182 14.4124 37.4024 14.424 37.3889 14.4392C37.1608 14.681 36.8742 14.86 36.5568 14.9587C36.2394 15.0575 35.9018 15.0728 35.5768 15.0032C35.4166 14.9624 35.2468 14.9868 35.1045 15.071C34.9622 15.1551 34.8591 15.2922 34.8176 15.4522C34.7761 15.6122 34.7997 15.7821 34.8832 15.9248C34.9667 16.0674 35.1032 16.1712 35.2631 16.2135C35.5061 16.277 35.7562 16.3094 36.0074 16.3099C36.5431 16.3051 37.0682 16.1596 37.5301 15.8882C37.9607 16.116 38.3074 16.4751 38.5201 16.9133C38.7327 17.3515 38.8003 17.8461 38.7128 18.3253C38.6254 18.8044 38.3875 19.2433 38.0338 19.5782C37.68 19.913 37.2288 20.1265 36.7455 20.1875V20.1875Z"></path>
<path d="M18.125 15.1879C17.0732 15.1531 16.0455 15.5079 15.2392 16.1843C14.4328 16.8606 13.9046 17.8109 13.7558 18.8527C13.7446 18.9341 13.7496 19.0168 13.7704 19.0962C13.7911 19.1756 13.8274 19.2501 13.877 19.3156C13.9265 19.381 13.9885 19.436 14.0594 19.4774C14.1303 19.5188 14.2086 19.5459 14.2899 19.5571C14.3184 19.561 14.3472 19.5629 14.376 19.5629C14.5268 19.5627 14.6725 19.5079 14.7862 19.4087C14.8998 19.3095 14.9737 19.1725 14.9943 19.023C15.104 18.2812 15.4847 17.6064 16.0629 17.1289C16.6412 16.6514 17.3759 16.4052 18.125 16.4379C18.2908 16.4379 18.4498 16.372 18.567 16.2548C18.6842 16.1376 18.75 15.9786 18.75 15.8129C18.75 15.6471 18.6842 15.4881 18.567 15.3709C18.4498 15.2537 18.2908 15.1879 18.125 15.1879Z"></path>
<path d="M29.2439 19.9015C29.0852 19.8538 28.9142 19.8709 28.7681 19.9491C28.622 20.0272 28.5128 20.16 28.4644 20.3184C28.4355 20.4139 27.7177 22.6609 24.7544 22.3438C24.6728 22.335 24.5902 22.3423 24.5114 22.3653C24.4326 22.3884 24.3591 22.4268 24.2951 22.4783C24.2311 22.5298 24.1779 22.5934 24.1385 22.6654C24.0992 22.7375 24.0744 22.8166 24.0656 22.8983C24.0568 22.9799 24.0642 23.0625 24.0874 23.1413C24.1105 23.2201 24.149 23.2935 24.2005 23.3575C24.2521 23.4214 24.3157 23.4745 24.3878 23.5138C24.46 23.5531 24.5391 23.5778 24.6208 23.5865C24.847 23.6113 25.0743 23.6238 25.3019 23.624C28.0235 23.624 29.3366 21.75 29.6607 20.6809C29.7088 20.5223 29.6919 20.3511 29.6137 20.2049C29.5355 20.0587 29.4025 19.9496 29.2439 19.9015V19.9015Z"></path>
<path d="M25.1563 11.125C25.1562 10.9592 25.0904 10.8003 24.9732 10.6831C24.856 10.5659 24.697 10.5 24.5313 10.5C22.1448 10.5 21.2451 12.0662 21.1029 12.8941C21.0881 12.9835 21.0929 13.0751 21.117 13.1625C21.1411 13.2498 21.184 13.3309 21.2426 13.4C21.3012 13.4692 21.3741 13.5247 21.4563 13.5628C21.5386 13.601 21.6281 13.6207 21.7188 13.6207C21.8639 13.6199 22.0044 13.569 22.1164 13.4766C22.2284 13.3842 22.305 13.2559 22.3334 13.1135C22.3611 12.9741 22.6587 11.75 24.5313 11.75C24.697 11.75 24.856 11.6841 24.9732 11.5669C25.0904 11.4497 25.1562 11.2908 25.1563 11.125V11.125Z"></path>
<path d="M20.5786 8.05949C20.5043 8.02454 20.4239 8.00456 20.3419 8.00069C20.2599 7.99683 20.178 8.00914 20.1008 8.03694C20.0236 8.06474 19.9526 8.10748 19.8919 8.16272C19.8312 8.21795 19.7819 8.2846 19.747 8.35886C19.5183 8.86743 19.1346 9.29063 18.6508 9.56793C18.167 9.84524 17.6079 9.96243 17.0535 9.90275C16.5724 9.67043 16.0479 9.54179 15.5139 9.52518C14.9799 9.50857 14.4484 9.60435 13.9538 9.80631C12.7624 10.3257 12.0724 11.4298 11.7578 12.068C10.3464 11.9187 9.22422 12.2077 8.41764 12.9347C7.07731 14.1429 7.18656 16.0835 7.19175 16.1653C7.20198 16.3236 7.27206 16.4722 7.38779 16.5808C7.50352 16.6893 7.65622 16.7498 7.81492 16.75C7.82836 16.75 7.84208 16.7497 7.85581 16.7488C8.02124 16.738 8.17563 16.6621 8.28505 16.5375C8.39447 16.413 8.44996 16.2501 8.43931 16.0847C8.43839 16.0707 8.37309 14.658 9.25474 13.863C9.8538 13.3232 10.7904 13.1574 12.037 13.3683C12.1827 13.3929 12.3323 13.3652 12.4595 13.29C12.5866 13.2149 12.6831 13.0973 12.7319 12.9579C12.7371 12.9429 13.2696 11.4637 14.4595 10.9495C15.0882 10.6782 15.8191 10.7228 16.633 11.0829C16.6808 11.104 16.731 11.119 16.7825 11.1277C17.6152 11.2474 18.4642 11.0941 19.2024 10.6909C19.9407 10.2878 20.5286 9.6563 20.878 8.89109C20.9485 8.74111 20.9566 8.56925 20.9005 8.41329C20.8443 8.25734 20.7286 8.13008 20.5786 8.05949Z"></path>
<path d="M29.3619 12.7054C29.3369 12.4218 29.28 12.1418 29.1923 11.8708C29.1673 11.7925 29.1271 11.7198 29.074 11.6569C29.0209 11.5941 28.9558 11.5424 28.8827 11.5048C28.8095 11.4671 28.7296 11.4443 28.6476 11.4376C28.5656 11.4309 28.4831 11.4405 28.4048 11.4658C28.3265 11.491 28.254 11.5315 28.1914 11.5849C28.1287 11.6382 28.0773 11.7035 28.0399 11.7768C28.0026 11.8501 27.9801 11.93 27.9737 12.012C27.9673 12.0941 27.9772 12.1766 28.0027 12.2548C28.1718 12.7781 28.2099 13.5087 27.8111 13.9903C27.4653 14.4078 26.8525 14.6046 26.3056 14.7566C25.5192 14.9745 24.6964 15.2507 24.0342 16.0066C23.0638 17.1141 22.8608 18.6723 23.4623 20.3938C23.5171 20.55 23.6317 20.6781 23.7809 20.7499C23.93 20.8217 24.1016 20.8314 24.2579 20.7768C24.4142 20.7222 24.5424 20.6079 24.6145 20.4588C24.6865 20.3097 24.6965 20.1382 24.6421 19.9818C24.3836 19.2415 24.083 17.8477 24.9745 16.8303C25.373 16.3752 25.8479 16.1805 26.6398 15.9608C27.4235 15.7435 28.2243 15.4509 28.7736 14.7877C28.9688 14.5471 29.1184 14.2728 29.2149 13.9783C29.7039 13.8783 30.2125 13.9529 30.6523 14.1892C31.092 14.4254 31.435 14.8084 31.6215 15.2714C31.6918 15.4215 31.8188 15.5376 31.9746 15.5941C32.1305 15.6506 32.3024 15.6429 32.4525 15.5726C32.6026 15.5023 32.7187 15.3753 32.7752 15.2195C32.8317 15.0637 32.8239 14.8918 32.7537 14.7416C32.4771 14.0866 31.9995 13.5364 31.3899 13.1704C30.7802 12.8044 30.0701 12.6416 29.3619 12.7054V12.7054Z"></path>
</svg>

                  </div>
                  <div>
                    <div class="transform rotate-180 stroke-1.25 transition-colors duration-200 ease text-neutral-400 group-hover:text-sec w-10 h-10"><svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <line x1="5" y1="12" x2="11" y2="18"></line>
  <line x1="5" y1="12" x2="11" y2="6"></line>
</svg>
</div>
                  </div>
                </div>
                <h3 class="mb-2 display-xl">Head/Brain</h3>
                <p class="text-sm leading-relaxed">Examines the brain, skull and surrounding tissues to identify anomalies, including possible causes of headaches, dizziness and memory loss.</p>
              </div>
</a> 






           <a class="rounded-md shadow hover:shadow-lg bg-white transition-all duration-200 ease-out overflow-hidden group" href="/body-parts/knee">
              <div class="p-8 bg-white rounded-md">
                <div class="flex justify-between">
                <div class="w-12 h-12 mb-3">
                <img  src={imageSvg2} alt="SVG Resmi" />  
                  </div>
                  <div>
                    <div class="transform rotate-180 stroke-1.25 transition-colors duration-200 ease text-neutral-400 group-hover:text-sec w-10 h-10"><svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <line x1="5" y1="12" x2="11" y2="18"></line>
  <line x1="5" y1="12" x2="11" y2="6"></line>
</svg>
</div>
                  </div>
                </div>
                <h3 class="mb-2 display-xl">Knee</h3>
                <p class="text-sm leading-relaxed">Shows the bones, muscles, ligaments, tendons, and nerves that make up the knee joint. It can help identify causes of pain.</p>
              </div>
</a>            <a class="rounded-md shadow hover:shadow-lg bg-white transition-all duration-200 ease-out overflow-hidden group" href="/body-parts/thoracic-spine">
              <div class="p-8 bg-white rounded-md">
                <div class="flex justify-between">
                  <div class="w-12 h-12 mb-3">
                    <svg class="fill-current" viewBox="0 0 52 52"><g id="_x38_"><path d="M47.8,30.4c0.1-4-0.5-6.9-0.9-8.6c-0.2-0.9-0.4-1.8-0.4-2.8c0-10.1-9.3-11.1-10.3-11.2c-4.8-0.9-5.7-3.6-5.8-3.7   c-0.2-0.5-0.7-0.8-1.2-0.7c-0.5,0.2-0.8,0.7-0.7,1.2c0,0.2,1.2,4,7.4,5.1c0,0,0.1,0,0.1,0c0.3,0,8.5,0.5,8.5,9.2   c0,1.2,0.1,2.3,0.4,3.3c0.4,1.6,0.9,4.3,0.9,8c0,1.2,0.1,2.4,0.5,3.5c0.7,2.4,2.3,8.5,1.5,13.7c-0.1,0.6,0.4,1.2,1,1.2   c0.5,0,0.9-0.3,1-0.8c0.9-5.3-0.6-11.4-1.5-14.6C47.9,32.3,47.8,31.4,47.8,30.4z"></path><path d="M39.8,27.4c0,0,0.3-2,1.2-4.2c0.2-0.5-0.1-1.1-0.6-1.3c-0.5-0.2-1.1,0.1-1.3,0.6c-0.8,2.1-1.1,3.9-1.2,4.5   c-0.5,1-3.5,8.8,0.4,21c0.2,0.5,0.7,0.8,1.3,0.6c0.5-0.2,0.8-0.7,0.6-1.3c-2.1-6.6-2.1-11.9-1.6-15.3c0.7,2.1,1.6,3.8,1.6,3.9   c0.3,0.5,0.9,0.7,1.3,0.4c0.5-0.3,0.7-0.9,0.4-1.3C41.3,33.7,39.6,29.8,39.8,27.4z"></path><path d="M12.9,22.4c-0.2-0.5-0.8-0.8-1.3-0.6c-0.5,0.2-0.8,0.8-0.6,1.3c0.8,2.3,1.2,4.2,1.2,4.2c0.3,2.9-2.2,7.7-2.2,7.8   c-0.3,0.5-0.1,1.1,0.4,1.3c0.5,0.3,1.1,0.1,1.3-0.4c0.1-0.1,0.9-1.8,1.6-4c0.5,3.4,0.6,8.6-1.6,15.3c-0.2,0.5,0.1,1.1,0.6,1.3   c0.5,0.2,1.1-0.1,1.3-0.6c3.9-12.2,0.9-19.9,0.4-21C14,26.4,13.7,24.6,12.9,22.4z"></path><path d="M23.4,4.7c0.2-0.5-0.1-1.1-0.7-1.2c-0.5-0.2-1.1,0.1-1.2,0.7c0,0.1-1,2.8-5.8,3.7C14.8,7.9,5.4,8.9,5.4,19   c0,1-0.1,1.9-0.4,2.8c-0.5,1.7-1,4.6-0.9,8.6c0,1-0.1,2-0.4,2.9c-0.9,3.1-2.4,9.2-1.5,14.6c0.1,0.5,0.5,0.8,1,0.8   c0.6,0,1.1-0.6,1-1.2C3.4,42.4,5,36.2,5.7,33.8c0.3-1.1,0.5-2.3,0.5-3.5c-0.1-3.7,0.4-6.4,0.9-8c0.3-1.1,0.4-2.2,0.4-3.3   c0-8.7,8.2-9.2,8.5-9.2c0,0,0.1,0,0.1,0C22.2,8.6,23.4,4.8,23.4,4.7z"></path><path d="M30.8,18.5H32c1.1,0,2.1-0.8,2.2-1.9c0.2-1.4-0.8-2.7-2.2-2.7h-1.3v-1.1c0-0.4-0.2-0.7-0.5-0.9c-0.3-0.2-0.7-0.2-1,0   c-2.7,1.4-4,1.4-6.7,0c-0.3-0.2-0.7-0.2-1,0c-0.3,0.2-0.5,0.5-0.5,0.9v1.1h-1.3c-1.3,0-2.4,1.3-2.2,2.7c0.2,1.1,1.1,1.9,2.2,1.9   h1.2c0,0.1,0,2.2,0,2.1h-1.3c-0.6,0-1.2,0.3-1.6,0.8c-0.5,0.5-0.6,1.2-0.5,1.9c0.2,1.1,1.1,1.9,2.2,1.9h1.2c0,0.1,0,2.2,0,2.1h-1.3   c-0.6,0-1.2,0.3-1.6,0.8c-0.5,0.5-0.6,1.2-0.5,1.9c0.2,1.1,1.1,1.9,2.2,1.9h1.2c0,0.1,0,2.2,0,2.1h-1.3c-1.3,0-2.4,1.3-2.2,2.7   c0.2,1.1,1.1,1.9,2.2,1.9h1.2c0,0.1,0,2.2,0,2.1h-1.3c-0.6,0-1.2,0.3-1.6,0.8c-0.5,0.5-0.6,1.2-0.5,1.9c0.2,1.1,1.1,1.9,2.2,1.9   h1.2v1.1c0,0.4,0.2,0.7,0.5,0.9c3.3,1.8,5.4,1.8,8.6,0c0.3-0.2,0.5-0.5,0.5-0.9v-1.1H32c1.1,0,2.1-0.8,2.2-1.9   c0.2-1.4-0.8-2.7-2.2-2.7h-1.3c0-0.1,0-2.2,0-2.1H32c1.1,0,2.1-0.8,2.2-1.9c0.1-0.7-0.1-1.4-0.5-1.9c-0.4-0.5-1-0.8-1.6-0.8h-1.3   c0-0.1,0-2.2,0-2.1H32c1.1,0,2.1-0.8,2.2-1.9c0.1-0.7-0.1-1.4-0.5-1.9c-0.4-0.5-1-0.8-1.6-0.8h-1.3c0-0.1,0-2.2,0-2.1H32   c1.1,0,2.1-0.8,2.2-1.9c0.2-1.4-0.8-2.7-2.2-2.7h-1.3v-1V18.5z M20,16.5c-0.1,0-0.2-0.1-0.2-0.2c0-0.2,0.1-0.4,0.2-0.4h1.6   c0.8,0,1.5-0.6,1.6-1.5c2,0.8,3.7,0.8,5.7,0c0.1,0.8,0.8,1.5,1.6,1.5h1.6c0.1,0,0.2,0.2,0.2,0.4c0,0.2-0.2,0.2-0.2,0.2h-1.5   c-0.9,0-1.6,0.8-1.6,1.7v0.7c-2.1,1.1-3.4,1.1-5.7,0v-0.7c0-0.9-0.7-1.7-1.6-1.7H20z M32.1,42.8C32.1,42.8,32.2,42.8,32.1,42.8   c0.2,0.1,0.2,0.3,0.2,0.4c0,0,0,0,0,0c0,0.2-0.2,0.2-0.2,0.2h-1.5c-0.9,0-1.6,0.8-1.6,1.7v0.7c-2.2,1.1-3.5,1.1-5.7,0v-0.7   c0-0.9-0.7-1.7-1.6-1.7H20c-0.1,0-0.2-0.1-0.2-0.2c0-0.2,0.1-0.4,0.2-0.4h1.6c0.8,0,1.5-0.6,1.6-1.5c2,0.8,3.7,0.8,5.7,0   c0.1,0.8,0.8,1.5,1.6,1.5H32.1z M32.1,36C32.1,36,32.2,36.1,32.1,36c0.2,0.1,0.2,0.3,0.2,0.4c0,0.2-0.2,0.2-0.2,0.2h-1.5   c-0.9,0-1.6,0.8-1.6,1.7v0.7c-2.2,1.1-3.5,1-5.7,0v-0.7c0-0.9-0.7-1.7-1.6-1.7H20c-0.1,0-0.2-0.1-0.2-0.2c0-0.2,0.1-0.4,0.2-0.4   h1.6c0.8,0,1.5-0.6,1.6-1.5c2,0.8,3.6,0.9,5.7,0c0.1,0.8,0.8,1.5,1.6,1.5H32.1z M32.1,29.3C32.1,29.3,32.2,29.4,32.1,29.3   c0.2,0.1,0.2,0.3,0.2,0.4c0,0.2-0.2,0.2-0.2,0.2h-1.5c-0.9,0-1.6,0.8-1.6,1.7v0.7c-2.2,1.1-3.5,1-5.7,0v-0.7c0-0.9-0.7-1.7-1.6-1.7   H20c-0.1,0-0.2-0.1-0.2-0.2c0-0.2,0.1-0.4,0.2-0.4h1.6c0.8,0,1.5-0.6,1.6-1.5c2.1,0.9,3.8,0.8,5.7,0c0.1,0.8,0.8,1.5,1.6,1.5H32.1z    M32.1,22.6C32.1,22.6,32.2,22.7,32.1,22.6c0.2,0.1,0.2,0.3,0.2,0.4c0,0,0,0,0,0c0,0.2-0.2,0.2-0.2,0.2h-1.5   c-0.9,0-1.6,0.8-1.6,1.7v0.7c-2.1,1.1-3.4,1.1-5.7,0v-0.7c0-0.9-0.7-1.7-1.6-1.7H20c-0.1,0-0.2-0.1-0.2-0.2c0-0.2,0.1-0.4,0.2-0.4   h1.6c0.8,0,1.5-0.6,1.6-1.5c2,0.8,3.7,0.8,5.7,0c0.1,0.8,0.8,1.5,1.6,1.5H32.1z"></path></g></svg>

                  </div>
                  <div>
                    <div class="transform rotate-180 stroke-1.25 transition-colors duration-200 ease text-neutral-400 group-hover:text-sec w-10 h-10"><svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <line x1="5" y1="12" x2="11" y2="18"></line>
  <line x1="5" y1="12" x2="11" y2="6"></line>
</svg>
</div>
                  </div>
                </div>
                <h3 class="mb-2 display-xl">Thoracic Spine</h3>
                <p class="text-sm leading-relaxed">Looks at the vertebrae, discs, nerves and spinal cord in the middle section of the spine, to identify causes of numbness, tingling, or pain.</p>
              </div>
</a>            <a class="rounded-md shadow hover:shadow-lg bg-white transition-all duration-200 ease-out overflow-hidden group" href="/body-parts/mrcp">
              <div class="p-8 bg-white rounded-md">
                <div class="flex justify-between">
                  <div class="w-12 h-12 mb-3">
                    <svg class="fill-current" viewBox="0 0 64 64"><g><path d="M9.06,36.897C9.021,37.275,9,37.66,9,38.05c0,0.402,0.049,0.804,0.145,1.191l1.941-0.482C11.029,38.528,11,38.29,11,38.05   c0-0.319,0.017-0.636,0.049-0.947L9.06,36.897z"></path><path d="M13.606,31.702l-1.425-1.404c-1.217,1.236-2.137,2.757-2.661,4.398l1.905,0.607C11.854,33.96,12.609,32.715,13.606,31.702z   "></path><path d="M59,33.776v-3.948c0-1.557,0.606-3.021,1.707-4.121l-1.414-1.414C57.814,25.771,57,27.736,57,29.828v3.318   c-1.126-1.706-2.675-3.102-4.553-4.04l-0.895,1.789c2.34,1.17,4.085,3.182,4.913,5.664l0.227,0.68   c-0.624,2.689-2.177,5.124-4.417,6.805c-1.294,0.97-2.398,2.157-3.274,3.499v-4.595c0-1.399-0.225-2.783-0.667-4.111l-0.791-2.372   C47.182,35.386,47,34.263,47,33.038c0-2.982,1.159-5.784,3.264-7.889l5.822-5.821C56.667,18.747,57,17.943,57,17.121   c0-0.03-0.008-0.057-0.009-0.086c0.895-0.617,1.781-1.257,2.632-1.921C61.77,13.446,63,10.931,63,8.212C63,6.44,61.559,5,59.788,5   H40.329c-4.091,0-8.134-0.656-12.016-1.949l-3.347-1.116C23.106,1.314,21.169,1,19.208,1C9.168,1,1,9.168,1,19.208   c0,5.978,1.254,11.768,3.728,17.21l0.319,0.702C5.028,37.429,5,37.736,5,38.05C5,42.985,9.015,47,13.95,47h0.24   c5.27,0,10.401-1.858,14.45-5.231l3.768-3.14C33.668,37.578,35.266,37,36.906,37c2.616,0,4.929,1.667,5.775,4.205   C42.893,41.84,43,42.498,43,43.162v7.724c-2.656-3.82-6.884-6.306-11.66-6.697l-2.258-0.186l-0.164,1.994l2.259,0.186   c0.83,0.068,1.637,0.216,2.422,0.423c-0.897,0.503-1.673,1.203-2.245,2.062c-0.626,0.939-1.574,1.607-2.67,1.882l-1.926,0.481   l0.485,1.939l1.926-0.481c1.58-0.395,2.947-1.358,3.849-2.712c0.437-0.655,1.039-1.187,1.743-1.538l1.376-0.688   c2.873,1.406,5.201,3.791,6.535,6.828C41.624,58.189,38.138,61,34,61h-5v2h5c6.065,0,11-4.935,11-11v-8.838   c0-0.879-0.142-1.75-0.44-2.646C43.46,37.217,40.384,35,36.906,35c-2.107,0-4.16,0.743-5.778,2.092l-3.768,3.14   C23.669,43.307,18.993,45,14.19,45h-0.24C10.118,45,7,41.882,7,38.05C7,30.854,12.854,25,20.05,25c2.947,0,5.783,1.078,7.985,3.036   l2.311,2.054C32.457,31.967,35.175,33,38,33c1.654,0,3-1.346,3-3V19c0-0.552,0.449-1,1-1s1,0.448,1,1v1.586   C43,21.917,44.083,23,45.414,23c0.635,0,1.257-0.258,1.707-0.707l5.965-5.965C53.298,16.116,53.579,16,53.879,16   C54.497,16,55,16.503,55,17.121c0,0.295-0.12,0.584-0.328,0.793l-5.822,5.821c-2.482,2.482-3.85,5.786-3.85,9.39   c0,1.353,0.217,2.688,0.645,3.972l0.791,2.372C46.81,40.593,47,41.763,47,42.947V61h-2v2h6v-2h-2v-8.807l0.594-1.486   c0.806-2.012,2.147-3.763,3.881-5.063c2.925-2.194,4.837-5.489,5.363-9.068l0.698-0.696C60.094,35.32,60.867,35,61.657,35H63v-2   h-1.343C60.7,33,59.79,33.277,59,33.776z M59.788,7C60.457,7,61,7.544,61,8.212c0,0.567-0.403,1.066-0.958,1.186l-4.083,0.875   c-6.765,1.449-13.296,3.917-19.333,7.276C36.873,16.653,37,15.725,37,14.797c0-1.32-0.249-2.611-0.739-3.837l-1.213-3.033   C35.016,7.848,35,7.764,35,7.677C35,7.304,35.304,7,35.677,7H59.788z M39,19v2.882l-1.578-0.175   c-0.954-0.106-1.883-0.335-2.771-0.664c1.435-0.896,2.9-1.745,4.398-2.532C39.023,18.671,39,18.833,39,19z M5.689,33.548   C3.905,28.97,3,24.157,3,19.208C3,10.271,10.271,3,19.208,3c1.746,0,3.47,0.279,5.125,0.831l3.348,1.116   c1.858,0.62,3.753,1.093,5.67,1.433C33.134,6.766,33,7.204,33,7.677c0,0.343,0.064,0.678,0.191,0.994l1.212,3.031   C34.799,12.691,35,13.732,35,14.797c0,1.287-0.304,2.575-0.88,3.727l-0.353,0.705c-0.411,0.255-0.814,0.523-1.219,0.786   c-1.601-0.984-2.975-2.335-3.958-3.975c-1.073-1.787-2.512-3.265-4.198-4.386c0.432-1.487,1.218-2.849,2.315-3.947l-1.414-1.414   c-1.223,1.223-2.12,2.719-2.671,4.349c-0.805-0.377-1.651-0.68-2.532-0.9L13.243,8.03L12.757,9.97l6.847,1.712   c1.446,0.362,2.779,0.987,3.961,1.823c-4.719,0.941-9.227,2.881-13.147,5.682l1.162,1.627c4.114-2.938,8.917-4.864,13.915-5.607   c0.514,0.569,0.976,1.191,1.379,1.863c0.993,1.656,2.335,3.051,3.885,4.146c-1.503,1.043-2.965,2.143-4.382,3.302   C24.431,23.531,22.269,23,20.05,23C13.319,23,7.608,27.442,5.689,33.548z M29.364,26.542c-0.373-0.332-0.767-0.636-1.169-0.924   c1.434-1.149,2.915-2.238,4.437-3.265c1.422,0.702,2.968,1.164,4.57,1.342l1.798,0.2v0.111c-2.393,1.436-4.493,3.246-6.271,5.391   c-0.366-0.244-0.722-0.506-1.055-0.801L29.364,26.542z M38,31c-1.194,0-2.364-0.226-3.457-0.652   c1.309-1.521,2.796-2.855,4.457-3.975V30C39,30.552,38.551,31,38,31z M53.879,14c-0.834,0-1.618,0.324-2.207,0.914l-5.964,5.964   C45.467,21.12,45,20.923,45,20.586V19c0-1.12-0.624-2.086-1.535-2.602c4.15-1.813,8.478-3.221,12.913-4.171l3.81-0.816   c-0.438,0.811-1.037,1.539-1.791,2.126c-0.698,0.543-1.419,1.067-2.147,1.577C55.676,14.439,54.832,14,53.879,14z"></path></g></svg>

                  </div>
                  <div>
                    <div class="transform rotate-180 stroke-1.25 transition-colors duration-200 ease text-neutral-400 group-hover:text-sec w-10 h-10"><svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <line x1="5" y1="12" x2="11" y2="18"></line>
  <line x1="5" y1="12" x2="11" y2="6"></line>
</svg>
</div>
                  </div>
                </div>
                <h3 class="mb-2 display-xl">MRCP</h3>
                <p class="text-sm leading-relaxed">Magnetic resonance cholangio pancreatography (MRCP) scans evaluate the pancreas, bile ducts and gallbladder.</p>
              </div>
</a>            <a class="rounded-md shadow hover:shadow-lg bg-white transition-all duration-200 ease-out overflow-hidden group" href="/body-parts/hip">
              <div class="p-8 bg-white rounded-md">
                <div class="flex justify-between">
                  <div class="w-12 h-12 mb-3">
                    <svg viewBox="0 0 64 64" class="fill-current"><g><path d="M26,41h-4c-1.654,0-3,1.346-3,3c0,3.859,3.14,7,7,7c1.654,0,3-1.346,3-3v-4C29,42.346,27.654,41,26,41z M27,48   c0,0.552-0.449,1-1,1c-2.757,0-5-2.243-5-5c0-0.552,0.449-1,1-1h4c0.551,0,1,0.448,1,1V48z"></path><path d="M42,41h-4c-1.654,0-3,1.346-3,3v4c0,1.654,1.346,3,3,3c3.86,0,7-3.141,7-7C45,42.346,43.654,41,42,41z M38,49   c-0.551,0-1-0.448-1-1v-4c0-0.552,0.449-1,1-1h4c0.551,0,1,0.448,1,1C43,46.757,40.757,49,38,49z"></path><path d="M56.586,42l-0.652,0.652c-0.485,0.482-1.38,0.419-1.79-0.127l-1.571-2.094c0.513-0.411,1.056-0.788,1.644-1.104   l1.499-0.807C60.208,36.1,63,31.426,63,26.323c0-3.7-1.441-7.179-4.057-9.795L58.214,15.8c-1.805-1.806-4.206-2.8-6.759-2.8   c-1.792,0-3.543,0.501-5.062,1.45l-3.667,2.292c-0.931-1.081-2.288-1.722-3.726-1.739V15c0-0.366-0.106-0.705-0.278-1   c0.033-0.057,0.067-0.113,0.094-0.174l2.456-0.614C42.29,12.958,43,12.048,43,11s-0.71-1.958-1.728-2.212l-2.456-0.614   C38.789,8.113,38.755,8.057,38.722,8c0.033-0.057,0.067-0.113,0.094-0.174l2.456-0.614C42.29,6.958,43,6.048,43,5   s-0.71-1.958-1.728-2.212l-2.456-0.614C38.501,1.483,37.808,1,37,1H27c-0.808,0-1.501,0.483-1.816,1.174l-2.456,0.614   C21.71,3.042,21,3.952,21,5s0.71,1.958,1.728,2.212l2.456,0.614c0.028,0.06,0.061,0.117,0.094,0.174   c-0.033,0.057-0.067,0.113-0.094,0.174l-2.456,0.614C21.71,9.042,21,9.952,21,11s0.71,1.958,1.728,2.212l2.456,0.614   c0.028,0.06,0.061,0.117,0.094,0.174C25.106,14.295,25,14.634,25,15v0.004c-1.438,0.017-2.795,0.658-3.726,1.739l-3.667-2.293   C16.088,13.501,14.338,13,12.545,13c-2.554,0-4.955,0.994-6.759,2.8l-0.729,0.729C2.441,19.145,1,22.623,1,26.323   c0,5.103,2.792,9.776,7.285,12.197l1.499,0.807c0.587,0.316,1.131,0.693,1.644,1.104l-1.571,2.094   c-0.411,0.546-1.306,0.61-1.79,0.127L7.415,42c-1.289-1.289-3.541-1.289-4.829,0C1.563,43.022,1,44.382,1,45.828   c0,1.594,0.418,3.168,1.209,4.554l0.814,1.425C4.316,54.069,5,56.644,5,59.249V63h10v-1c0-1.154,0.273-2.31,0.789-3.342   l0.717-1.435C16.829,56.577,17,55.854,17,55.133c0-1.451-0.68-2.812-1.809-3.69c0.235-0.807,0.591-1.569,1.053-2.268   C18.114,52.707,21.798,55,26,55c2.549,0,4.777-1.374,6.001-3.415C33.229,53.626,35.467,55,38.045,55   c4.166,0,7.842-2.293,9.711-5.824c0.462,0.698,0.818,1.46,1.053,2.267C47.68,52.321,47,53.682,47,55.133   c0,0.722,0.171,1.444,0.494,2.091l0.717,1.435C48.727,59.69,49,60.846,49,62v1h10v-3.751c0-2.605,0.684-5.18,1.976-7.442   l0.814-1.425C62.582,48.996,63,47.422,63,45.828c0-1.446-0.563-2.806-1.585-3.828C60.125,40.711,57.874,40.711,56.586,42z    M37.001,19H27v-4h10L37.001,19z M37,13H27V9h10V13z M41,11c0,0.129-0.087,0.241-0.213,0.272L39,11.719v-1.439l1.787,0.447   C40.913,10.759,41,10.871,41,11z M41,5c0,0.129-0.087,0.241-0.213,0.272L39,5.719V4.281l1.787,0.447C40.913,4.759,41,4.871,41,5z    M27,3h10v4H27V3z M23,5c0-0.129,0.087-0.241,0.213-0.272L25,4.281v1.439l-1.787-0.447C23.087,5.241,23,5.129,23,5z M23,11   c0-0.129,0.087-0.241,0.213-0.272L25,10.281v1.439l-1.787-0.447C23.087,11.241,23,11.129,23,11z M25,17.007V19c0,1.103,0.897,2,2,2   h10c1.103,0,2-0.897,2-2v-1.993c0.945,0.019,1.832,0.479,2.383,1.249l3.099,4.338C44.821,23.069,45,23.629,45,24.214   C45,25.75,43.75,27,42.213,27h-1.06c-0.576-0.631-1.261-1.172-2.058-1.571C38.532,25.148,37.902,25,37.274,25   c-1.111,0-2.172,0.53-2.838,1.42l-1.635,2.18c-0.377,0.502-1.225,0.501-1.601,0.001l-1.635-2.181C28.898,25.53,27.837,25,26.726,25   c-0.628,0-1.258,0.148-1.823,0.43c-0.796,0.399-1.481,0.94-2.057,1.57h-1.06C20.25,27,19,25.75,19,24.214   c0-0.585,0.179-1.145,0.519-1.62l3.099-4.338C23.168,17.486,24.055,17.026,25,17.007z M30.121,35.282l0.39,0.167   c0.297,0.128,0.49,0.42,0.49,0.743C31,36.638,30.638,37,30.192,37H19c-1.103,0-2-0.897-2-2s0.897-2,2-2   C22.846,33,26.587,33.768,30.121,35.282z M32,38.322c0.115,0.098,0.235,0.187,0.365,0.266c-0.131,0.14-0.251,0.289-0.365,0.443   c-0.115-0.154-0.234-0.303-0.365-0.443C31.765,38.51,31.885,38.42,32,38.322z M33.808,37C33.362,37,33,36.638,33,36.192   c0-0.323,0.192-0.615,0.49-0.743l0.39-0.167C37.413,33.768,41.154,33,45,33c1.103,0,2,0.897,2,2s-0.897,2-2,2H33.808z    M33.091,33.444l-0.39,0.167h0c-0.258,0.111-0.493,0.257-0.701,0.432c-0.208-0.175-0.443-0.321-0.701-0.432l-0.39-0.167   c-2.536-1.087-5.174-1.806-7.876-2.168c0.159-1.736,1.182-3.265,2.764-4.057c0.723-0.361,1.684-0.245,2.168,0.399l1.636,2.182   C30.165,30.552,31.062,31,32,31s1.835-0.448,2.4-1.2l1.636-2.181c0.482-0.645,1.446-0.759,2.166-0.4   c1.583,0.792,2.606,2.321,2.765,4.058C38.265,31.638,35.627,32.357,33.091,33.444z M13.436,50.383l-3.94-2.252l-0.992,1.736   l5.148,2.942C14.483,53.286,15,54.176,15,55.133c0,0.413-0.098,0.826-0.283,1.196L14,57.764c-0.505,1.01-0.826,2.113-0.946,3.236H7   v-1.751c0-2.953-0.774-5.87-2.24-8.435L3.946,49.39C3.327,48.306,3,47.074,3,45.828c0-0.912,0.355-1.77,1-2.414   c0.533-0.535,1.465-0.535,2,0l0.652,0.652C7.254,44.669,8.055,45,8.906,45c0.998,0,1.951-0.477,2.55-1.275l1.418-1.891   c1.135,1.323,1.962,2.904,2.363,4.64c0.042,0.183,0.098,0.36,0.149,0.539C14.527,48.005,13.866,49.146,13.436,50.383z M25.955,53   c-4.215,0-7.822-2.868-8.769-6.976c-0.834-3.616-3.187-6.699-6.455-8.459l-1.499-0.807C5.388,34.688,3,30.689,3,26.323   c0-3.166,1.233-6.143,3.471-8.381L7.2,17.214C8.627,15.786,10.526,15,12.545,15c1.417,0,2.802,0.396,4.001,1.146l3.54,2.213   l-2.195,3.074C17.308,22.247,17,23.21,17,24.214c0,2.563,2.031,4.646,4.566,4.764c-0.28,0.659-0.451,1.366-0.519,2.099   C20.367,31.031,19.686,31,19,31c-1.37,0-2.58,0.694-3.302,1.747l-3.895-0.709C9.02,31.533,7,29.112,7,26.283   c0-1.258,0.416-2.504,1.17-3.51L9.8,20.6L8.2,19.4L6.57,21.573C5.558,22.923,5,24.596,5,26.283c0,3.797,2.711,7.045,6.445,7.723   l3.589,0.653C15.025,34.773,15,34.883,15,35c0,2.206,1.794,4,4,4h9c1.654,0,3,1.346,3,3v6C31,50.757,28.757,53,25.955,53z M38,53   c-2.757,0-5-2.243-5-5v-6c0-1.654,1.346-3,3-3h9c2.206,0,4-1.794,4-4c0-0.117-0.025-0.227-0.034-0.341l3.589-0.653   C56.289,33.328,59,30.08,59,26.283c0-1.688-0.558-3.36-1.57-4.709L55.8,19.4L54.2,20.6l1.63,2.175   c0.754,1.005,1.17,2.251,1.17,3.509c0,2.829-2.02,5.25-4.804,5.756l-3.895,0.709C47.581,31.694,46.37,31,45,31   c-0.686,0-1.367,0.031-2.046,0.077c-0.069-0.733-0.24-1.44-0.52-2.099C44.969,28.859,47,26.777,47,24.214   c0-1.004-0.308-1.967-0.892-2.782l-2.195-3.073l3.539-2.212c1.2-0.75,2.584-1.146,4.002-1.146c2.02,0,3.918,0.786,5.345,2.214   l0.729,0.729C59.767,20.181,61,23.157,61,26.323c0,4.366-2.388,8.365-6.233,10.436l-1.499,0.807   c-3.268,1.76-5.62,4.843-6.455,8.459C45.867,50.132,42.26,53,38,53z M60.054,49.39l-0.814,1.425C57.774,53.379,57,56.296,57,59.249   V61h-6.054c-0.12-1.123-0.441-2.227-0.946-3.236l-0.717-1.435C49.098,55.959,49,55.546,49,55.133c0-0.957,0.517-1.847,1.348-2.322   l5.148-2.942l-0.992-1.736l-3.94,2.252c-0.43-1.238-1.091-2.379-1.95-3.37c0.051-0.179,0.107-0.356,0.149-0.539   c0.401-1.736,1.227-3.317,2.363-4.64l1.418,1.891C53.143,44.523,54.096,45,55.094,45c0.852,0,1.652-0.331,2.254-0.934L58,43.414   c0.533-0.535,1.465-0.535,2,0c0.645,0.645,1,1.502,1,2.414C61,47.074,60.673,48.306,60.054,49.39z"></path></g></svg>

                  </div>
                  <div>
                    <div class="transform rotate-180 stroke-1.25 transition-colors duration-200 ease text-neutral-400 group-hover:text-sec w-10 h-10"><svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <line x1="5" y1="12" x2="11" y2="18"></line>
  <line x1="5" y1="12" x2="11" y2="6"></line>
</svg>
</div>
                  </div>
                </div>
                <h3 class="mb-2 display-xl">Hip</h3>
                <p class="text-sm leading-relaxed">An assessment of the hip joint and surrounding tissues, to identify inflammation, arthritis, tumours and other abnormalities.</p>
              </div>
</a>            <a class="rounded-md shadow hover:shadow-lg bg-white transition-all duration-200 ease-out overflow-hidden group" href="/body-parts/liver">
              <div class="p-8 bg-white rounded-md">
                <div class="flex justify-between">
                  <div class="w-12 h-12 mb-3">
                    <svg class="stroke-current stroke-3" fill="none" stroke-linejoin="round" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g><path d="M39,23   c-4.375,6.375-4,14-7,17s-6.237,0.974-11,3c-5.875,2.5-7.438,8-12,8c-3.416,0-4-1.5-4-3s2-3.75,2-7c0-2.813-2-5.875-2-10   c0-6.688,4.502-18,16-18c7.5,0,15.833,4,20,4c2.167,0,6,0,9,0s9,0.667,9,3s-4.25,5.167-7.5,8.75s-6.49,7.988-10.313,8.625   c-4.5,0.75-4.2,0.385-7.552-0.121"></path></g></svg>
                  </div>
                  <div>
                    <div class="transform rotate-180 stroke-1.25 transition-colors duration-200 ease text-neutral-400 group-hover:text-sec w-10 h-10"><svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <line x1="5" y1="12" x2="11" y2="18"></line>
  <line x1="5" y1="12" x2="11" y2="6"></line>
</svg>
</div>
                  </div>
                </div>
                <h3 class="mb-2 display-xl">Liver</h3>
                <p class="text-sm leading-relaxed">A method of viewing the lobes of the liver, as well as surrounding blood vessels. Can identify damage, liver diseases, and tumours.</p>
              </div>
</a>            <a class="rounded-md shadow hover:shadow-lg bg-white transition-all duration-200 ease-out overflow-hidden group" href="/body-parts/lumbar-spine">
              <div class="p-8 bg-white rounded-md">
                <div class="flex justify-between">
                  <div class="w-12 h-12 mb-3">
                    <svg viewBox="0 0 24 24"><title></title><desc></desc><g fill="none" fill-rule="evenodd" id="vertebra" stroke="none" stroke-width="1"><path d="M6.01145256,3.39359794 C6.1806958,2.61651383 6.74482303,2.03572648 7.47599104,2.00057676 C11.0009685,1.8311192 13.008043,1.8311192 16.5240704,2.00057972 C17.447755,2.04509816 18.0456752,2.64768138 18.0139786,3.4371477 C17.9848265,4.16323612 17.4244975,4.80325398 16.6104593,4.98764612 C15.741927,5.18438201 15.4282431,5.25346677 15.125313,5.3156721 L15.1096643,5.31888221 C14.786295,5.3842921 14.536492,5.43557168 14.1212678,5.52311734 C13.1980062,5.75393274 13,5.88759788 13,6.22810035 C13,7.28630438 12.6365511,7.85458817 11.565307,7.99571665 C10.0155451,8.19988631 8.97126202,8.19988631 7.43414206,7.99564376 C6.72901304,7.90195077 6.17746693,7.35477288 6.01186694,6.60828718 C5.77832073,5.55551596 5.77832073,4.46402795 6.01145256,3.39359794 Z M6.98854744,3.60640206 C6.78609389,4.53597205 6.78609389,5.48096791 6.98813306,6.39171282 C7.06597034,6.74258491 7.2933307,6.96814459 7.56585794,7.00435624 C9.01573437,7.19700644 9.97181691,7.19700644 11.434693,7.00428335 C11.9338379,6.9385247 12,6.83507457 12,6.22810035 C12,5.25544193 12.5476559,4.88574391 13.8964662,4.54888277 C14.3329124,4.4565068 14.5861503,4.40452208 14.9089044,4.33924173 L14.9241646,4.33611132 C15.2187493,4.27561968 15.5271688,4.20769435 16.3895407,4.01235388 C16.7722037,3.92567484 17.004198,3.66068682 17.0147836,3.39703057 C17.0236975,3.17501407 16.8682234,3.0183275 16.4759296,2.99942028 C12.991957,2.8315047 11.0169725,2.8315047 7.52400896,2.99942324 C7.28959328,3.01069239 7.06877596,3.238031 6.98854744,3.60640206 Z" fill="currentColor" fill-rule="nonzero" id="Path-141"></path><path d="M6.01145256,10.3935979 C6.1806958,9.61651383 6.74482303,9.03572648 7.47599104,9.00057676 C11.0009685,8.8311192 13.008043,8.8311192 16.5240704,9.00057972 C17.447755,9.04509816 18.0456752,9.64768138 18.0139786,10.4371477 C17.9848265,11.1632361 17.4244975,11.803254 16.6104593,11.9876461 C15.741927,12.184382 15.4282431,12.2534668 15.125313,12.3156721 L15.1096643,12.3188822 C14.786295,12.3842921 14.536492,12.4355717 14.1212678,12.5231173 C13.1980062,12.7539327 13,12.8875979 13,13.2281004 C13,14.2863044 12.6365511,14.8545882 11.565307,14.9957166 C10.0155451,15.1998863 8.97126202,15.1998863 7.43414206,14.9956438 C6.72901304,14.9019508 6.17746693,14.3547729 6.01186694,13.6082872 C5.77832073,12.555516 5.77832073,11.464028 6.01145256,10.3935979 Z M6.98854744,10.6064021 C6.78609389,11.535972 6.78609389,12.4809679 6.98813306,13.3917128 C7.06597034,13.7425849 7.2933307,13.9681446 7.56585794,14.0043562 C9.01573437,14.1970064 9.97181691,14.1970064 11.434693,14.0042834 C11.9338379,13.9385247 12,13.8350746 12,13.2281004 C12,12.2554419 12.5476559,11.8857439 13.8964662,11.5488828 C14.3329124,11.4565068 14.5861503,11.4045221 14.9089044,11.3392417 L14.9241646,11.3361113 C15.2187493,11.2756197 15.5271688,11.2076943 16.3895407,11.0123539 C16.7722037,10.9256748 17.004198,10.6606868 17.0147836,10.3970306 C17.0236975,10.1750141 16.8682234,10.0183275 16.4759296,9.99942028 C12.991957,9.8315047 11.0169725,9.8315047 7.52400896,9.99942324 C7.28959328,10.0106924 7.06877596,10.238031 6.98854744,10.6064021 Z" fill="currentColor" fill-rule="nonzero" id="Path-141"></path><path d="M6.01145256,17.3935979 C6.1806958,16.6165138 6.74482303,16.0357265 7.47599104,16.0005768 C11.0009685,15.8311192 13.008043,15.8311192 16.5240704,16.0005797 C17.447755,16.0450982 18.0456752,16.6476814 18.0139786,17.4371477 C17.9848265,18.1632361 17.4244975,18.803254 16.6104593,18.9876461 C15.741927,19.184382 15.4282431,19.2534668 15.125313,19.3156721 L15.1096643,19.3188822 C14.786295,19.3842921 14.536492,19.4355717 14.1212678,19.5231173 C13.1980062,19.7539327 13,19.8875979 13,20.2281004 C13,21.2863044 12.6365511,21.8545882 11.565307,21.9957166 C10.0155451,22.1998863 8.97126202,22.1998863 7.43414206,21.9956438 C6.72901304,21.9019508 6.17746693,21.3547729 6.01186694,20.6082872 C5.77832073,19.555516 5.77832073,18.464028 6.01145256,17.3935979 Z M6.98854744,17.6064021 C6.78609389,18.535972 6.78609389,19.4809679 6.98813306,20.3917128 C7.06597034,20.7425849 7.2933307,20.9681446 7.56585794,21.0043562 C9.01573437,21.1970064 9.97181691,21.1970064 11.434693,21.0042834 C11.9338379,20.9385247 12,20.8350746 12,20.2281004 C12,19.2554419 12.5476559,18.8857439 13.8964662,18.5488828 C14.3329124,18.4565068 14.5861503,18.4045221 14.9089044,18.3392417 L14.9241646,18.3361113 C15.2187493,18.2756197 15.5271688,18.2076943 16.3895407,18.0123539 C16.7722037,17.9256748 17.004198,17.6606868 17.0147836,17.3970306 C17.0236975,17.1750141 16.8682234,17.0183275 16.4759296,16.9994203 C12.991957,16.8315047 11.0169725,16.8315047 7.52400896,16.9994232 C7.28959328,17.0106924 7.06877596,17.238031 6.98854744,17.6064021 Z" fill="currentColor" fill-rule="nonzero" id="Path-141"></path><path d="M11,7.5 L11,9 C11,9.27614237 11.2238576,9.5 11.5,9.5 C11.7761424,9.5 12,9.27614237 12,9 L12,7.5 C12,7.22385763 11.7761424,7 11.5,7 C11.2238576,7 11,7.22385763 11,7.5 Z" fill="currentColor" fill-rule="nonzero" id="Path-142"></path><path d="M7,7.5 L7,9.5 C7,9.77614237 7.22385763,10 7.5,10 C7.77614237,10 8,9.77614237 8,9.5 L8,7.5 C8,7.22385763 7.77614237,7 7.5,7 C7.22385763,7 7,7.22385763 7,7.5 Z" fill="currentColor" fill-rule="nonzero" id="Path-142"></path><path d="M11,14.5 L11,16 C11,16.2761424 11.2238576,16.5 11.5,16.5 C11.7761424,16.5 12,16.2761424 12,16 L12,14.5 C12,14.2238576 11.7761424,14 11.5,14 C11.2238576,14 11,14.2238576 11,14.5 Z" fill="currentColor" fill-rule="nonzero" id="Path-142"></path><path d="M7,14.5 L7,16.5 C7,16.7761424 7.22385763,17 7.5,17 C7.77614237,17 8,16.7761424 8,16.5 L8,14.5 C8,14.2238576 7.77614237,14 7.5,14 C7.22385763,14 7,14.2238576 7,14.5 Z" fill="currentColor" fill-rule="nonzero" id="Path-142"></path><path d="M11,1.5 L11,2.37348396 C11,2.64962634 11.2238576,2.87348396 11.5,2.87348396 C11.7761424,2.87348396 12,2.64962634 12,2.37348396 L12,1.5 C12,1.22385763 11.7761424,1 11.5,1 C11.2238576,1 11,1.22385763 11,1.5 Z" fill="currentColor" fill-rule="nonzero" id="Path-142"></path><path d="M7,1.5 L7,2.5 C7,2.77614237 7.22385763,3 7.5,3 C7.77614237,3 8,2.77614237 8,2.5 L8,1.5 C8,1.22385763 7.77614237,1 7.5,1 C7.22385763,1 7,1.22385763 7,1.5 Z" fill="currentColor" fill-rule="nonzero" id="Path-142"></path><path d="M11,21.5 L11,22.5 C11,22.7761424 11.2238576,23 11.5,23 C11.7761424,23 12,22.7761424 12,22.5 L12,21.5 C12,21.2238576 11.7761424,21 11.5,21 C11.2238576,21 11,21.2238576 11,21.5 Z" fill="currentColor" fill-rule="nonzero" id="Path-142"></path><path d="M7,21.5 L7,22.5 C7,22.7761424 7.22385763,23 7.5,23 C7.77614237,23 8,22.7761424 8,22.5 L8,21.5 C8,21.2238576 7.77614237,21 7.5,21 C7.22385763,21 7,21.2238576 7,21.5 Z" fill="currentColor" fill-rule="nonzero" id="Path-142"></path></g></svg>

                  </div>
                  <div>
                    <div class="transform rotate-180 stroke-1.25 transition-colors duration-200 ease text-neutral-400 group-hover:text-sec w-10 h-10"><svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <line x1="5" y1="12" x2="11" y2="18"></line>
  <line x1="5" y1="12" x2="11" y2="6"></line>
</svg>
</div>
                  </div>
                </div>
                <h3 class="mb-2 display-xl">Lumbar Spine</h3>
                <p class="text-sm leading-relaxed">A scan of the last 5 vertebrae between the ribs and pelvis, to identify bone, soft tissue, nerve or disc issues that could cause pain or numbness in the back or legs.</p>
              </div>
</a>            <a class="rounded-md shadow hover:shadow-lg bg-white transition-all duration-200 ease-out overflow-hidden group" href="/body-parts">
              <div class="p-8 bg-white rounded-md">
                <div class="flex justify-between">
                  <div class="w-12 h-12 mb-3">
                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs></defs>
  <path d="M98.4 69.3L92 36.9a14 14 0 00-13.6-11.5h-7a13 13 0 10-15 0H50c-5.9 0-12.7 4.3-14 11.5l-6.3 32.3c-1.4 7 .6 10 5.7 11 5.5 1 8.8-1.7 9.7-5.4l.6-3.6-.8 48v.1c.3 7 6.2 7 8.4 7 3.3 0 9.4 0 9.8-7L64 80l1.4 39.6c.5 6.7 6.3 6.7 9.8 6.7 2.4 0 8.1 0 8.4-7l-.9-46.7.5 2.5c.7 3.4 4 6.1 8.8 5.3 5.1-.9 7.6-4.1 6.3-11zM55.9 14.8a8 8 0 1116.2 0 8 8 0 01-16.2 0zM88.1 74L83 44.5c-.2-1.2-1.2-2-2.4-2h-.7a2.4 2.4 0 00-2.4 2.5l1.3 74.1c0 1.7 0 2.2-3.5 2.2-4.8 0-4.8-.6-5-2l-1.5-44.8c0-1.3-1.2-2.4-2.5-2.4h-4.6c-1.3 0-2.4 1-2.4 2.4l-1.1 44.6c0 1.5-.1 2.2-4.9 2.2-3.4 0-3.4-.5-3.5-2.1L51.1 45a2.5 2.5 0 00-2.4-2.5h-.8c-1.2 0-2.2.8-2.4 2l-5.2 29.3c-.4 1.5-7.3 2.3-6.2-2.3l6.2-32.3c.9-4.7 6-8.9 9.7-8.9h28.5c3.6 0 7.8 2.6 8.8 7.5l6.5 33.7c1 4.6-5.4 4-5.7 2.5z"></path>
</svg>

                  </div>
                  <div>
                    <div class="transform rotate-180 stroke-1.25 transition-colors duration-200 ease text-neutral-400 group-hover:text-sec w-10 h-10"><svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <line x1="5" y1="12" x2="11" y2="18"></line>
  <line x1="5" y1="12" x2="11" y2="6"></line>
</svg>
</div>
                  </div>
                </div>
                <h3 class="mb-2 display-xl">View more</h3>
                <p class="text-sm leading-relaxed">Visit our body parts directory to find out more about the scans you can book with us.</p>
              </div>
</a>      
     </div>


      
        
     </div>

      <div className='w-screen lg:pt-6  relative flex  font-product flex-col  h-fit   px-[3vw]  '>
        <Radiologists
        />
      </div>


     {/* Screen 3 - SCANNİNG SERVİCES */}
     <div className='w-screen pt-10  bg-slate-50 lg:h-screen  flex  font-product flex-col  h-auto   px-[3vw] lg:px-[7vw] '>

     <div class="container">
      <div class="max-w-xl">
        <h2 class="mb-6 text-[42px] font-bold">Other scanning services</h2>
        <p class="text-neutral-500 text-lg leading-4.5 mt-4">We provide second opinions for all major radiology images.
        </p>
      </div>
      <div class="grid grid-flow-col auto-cols-[minmax(260px,auto)] overflow-scroll gap-8 mt-12 pb-4">
          <a class="rounded-md p-8 shadow hover:shadow-lg bg-white transition-all duration-200 ease-out overflow-hidden group" href="/services/private-ultrasound-scans">
            <div class="relative mb-6 -m-8 overflow-hidden h-60 rounded-t-md">
              <img src="https://vitamu.imgix.net/img1.jpg" alt="Private Ultrasound Scans" class="object-cover w-full h-full"/>
            </div>
            <div class="flex justify-between mb-2 space-x-4">
              <h3 class="text-2xl">Ultrasound Scan</h3>
              <div>
                <div class="transform rotate-180 stroke-1.25 transition-colors duration-200 ease text-neutral-300 group-hover:text-primary-700 w-10 h-10"><svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <line x1="5" y1="12" x2="11" y2="18"></line>
  <line x1="5" y1="12" x2="11" y2="6"></line>
</svg>
</div>
              </div>
            </div>
            <div class="xl:pr-8">
              <p class="mb-4 text-sm leading-relaxed text-neutral-500">Ultrasound is a safe medical imaging method, which uses high frequency sound waves to create pictures (sonograms) of the joints, soft tissues, organs and blood vessels.</p>
            </div>
</a>          <a class="rounded-md p-8 shadow hover:shadow-lg bg-white transition-all duration-200 ease-out overflow-hidden group" href="/services/private-ct-scans">
            <div class="relative mb-6 -m-8 overflow-hidden h-60 rounded-t-md">
              <img src="https://vitamu.imgix.net/dropdown2.jpg" alt="Private CT Scans" class="object-cover w-full h-full"/>
            </div>
            <div class="flex justify-between mb-2 space-x-4">
              <h3 class="text-2xl">CT Scan</h3>
              <div>
                <div class="transform rotate-180 stroke-1.25 transition-colors duration-200 ease text-neutral-300 group-hover:text-primary-700 w-10 h-10"><svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <line x1="5" y1="12" x2="11" y2="18"></line>
  <line x1="5" y1="12" x2="11" y2="6"></line>
</svg>
</div>
              </div>
            </div>
            <div class="xl:pr-8">
              <p class="mb-4 text-sm leading-relaxed text-neutral-500">CT scans can be used to detect, locate and monitor diseases and abnormalities in the brain, neck, chest, abdomen, pelvis and blood vessels, and to assess bones, joints and fractures.</p>
            </div>
</a>          <a class="rounded-md p-8 shadow hover:shadow-lg bg-white transition-all duration-200 ease-out overflow-hidden group" href="https://fullbodyscan.com/">
            <div class="relative mb-6 -m-8 overflow-hidden h-60 rounded-t-md">
              <img src="https://vitamu.imgix.net/i1.jpg" alt="Private Full Body MRI Scans" class="object-cover w-full h-full"/>
            </div>
            <div class="flex justify-between mb-2 space-x-4">
              <h3 class="text-2xl">Full Body MRI Scan</h3>
              <div>
                <div class="transform rotate-180 stroke-1.25 transition-colors duration-200 ease text-neutral-300 group-hover:text-primary-700 w-10 h-10"><svg class="stroke-current" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <line x1="5" y1="12" x2="11" y2="18"></line>
  <line x1="5" y1="12" x2="11" y2="6"></line>
</svg>
</div>
              </div>
            </div>
            <div class="xl:pr-8">
              <p class="mb-4 text-sm leading-relaxed text-neutral-500">Our full body scan service offers a preventative screening of the brain, chest, abdomen, pelvis, and key blood vessels, to look for abnormalities as early as possible.</p>
            </div>
</a>      </div>
    </div>
       

     </div>

     {/* Screen 4 - FAQ */}
     <div className='w-screen py-10 mt-10  lg:h-auto  flex  font-product flex-col  h-auto   px-[3vw] lg:px-[7vw] '>

    <div className='grid gap-12 lg:grid-cols-12'> 
      
      
      <div class="lg:col-span-6 xl:col-span-5">
      <h2 class="mb-4 text-[42px] leading-[48px]">Frequently Asked Questions</h2>
      <div class="mb-8 space-y-4 text-base leading-relaxed text-neutral-500 lg:text-lg">
        <p>If you have any questions about booking an MRI  scan with us, <a class="primary-text-link" href="/faqs">visit our FAQ guide</a>.</p>
        <p>Can’t see an answer to your question? Our friendly patient care team are happy to help.</p>
      </div>
      <a class="button button-primary" href="/faqs">More FAQs</a>
      </div>
   
      <ul className="lg:col-span-6 xl:col-start-7">

     <FAQItem
        question="Do I need a GP referral or self-referral?"
        answer="A key benefit of booking with Scan.com is that you do not need a GP referral to access our services. There is also no self-referral process. Instead, our in-house medical team will contact you once you have booked and made payment for your scan. Our clinicians will ask you for all of the relevant information they need to compile a referral on your behalf, which is then passed on to your chosen scanning site."
      />
      <FAQItem
        question="How will I receive my results?"
        answer="Once you have had your scan, your radiologist’s report will be emailed to you in PDF format, usually within 7 working days. Digital copies of your images are also available as required for onward care. The method for accessing the images differs depending on your chosen scanning site. Some sites use IEP (Image Exchange Portal), while others require an image request form to be completed. Please refer to your results email for further information."
      />

      <FAQItem
        question="What's included in the price of my booking?"
        answer={
          <>
            <p>A pre-scan consultation from one of our medical team over the phone or via email.</p>
            <p>A written referral by our medical team, using the information from your consultation.</p>
            <p>An MRI scan at your chosen scanning centre.</p>
            <p>A written report on your scan by a consultant radiologist.</p>
            <p>Access to copies of your scan images, which are downloadable, as required.</p>
            <p>A post-scan consultation with one of our medical team if there are any adverse findings in your scan.</p>
          </>
        }
      />
      <FAQItem
        question="How long does an MRI Scan take?"
        answer="An MRI scan on a single body part typically takes between 10–30 minutes. Full-body MRI scans, additional body parts, or more complex scans can last up to 90 minutes. This time frame can vary, and your radiographer will let you know the estimated duration of your scan before the procedure starts. Visit our news page for more information on how MRI scans work."
      />
      <FAQItem
        question="Can I cancel and get a refund?"
        answer="Yes, we do offer cancellations and refunds, though depending on the status of your booking this may incur a £50 cancellation fee. For more information, visit our terms and conditions."
      />
     
      </ul>

      </div>

       
  

      
     
      </div>
    
    
    </>
  )
}

export default Services;