import React from 'react'
import Navbar from '../../homeComponents/1.Navbar/navbar'
import SelectBodyParts from './components/selectBodyParts'
import SelectScan from './components/selectScan'
import "./style/form.css"

import CardHaveInsurance from '../../formComponents/CardHaveInsurance/cardHaveInsurance.js'


const Form = () => {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [question, setQuestion] = React.useState("");




  return (
    <div className='font-product tracking-wide'>

      <div className='w-screen bg-slate-100 h-full px-[2vw] py-[3vh]  border  border-red-900'>

        <section className=' flex flex-col gap-6 px-[4vw] py-[4vh] w-full lg:w-[70vw] bg-white h-auto border rounded-xl shadow-md'>

           <header className='gap-2 flex flex-col'>
             <p className='text-[25px] font-bold text-[#142b6f]'>Your peace of mind starts here</p>
             <p className='text-sm text-[#142b6f]'>Search for MRI, CT, Ultrasound and pregnancy scans near you and book online in minutes.</p>
           </header>

           <SelectBodyParts/>
           <SelectScan/>


          {/* Personal Question */}

         <div className='flex flex-col gap-4'>
          
           {/* Name */}
            <div className="flex flex-col gap-3">
             <p className="text-lg text-[#142b6f] font-bold mt-4">
               {" "}
               What is your name?
             </p>
             <textarea
               value={name}
               onChange={(e) => {
                 setName(e.target.value);
               }}
               type="text"
               className="w-[96%] lg:w-[40%] h-[6vh] lg:pt-2 pt-1  rounded-md border-2 border-dotted border-[#142b6f] px-4 outline-none"
               placeholder=""
             />
            </div>
          
            {/* Email */}
            <div className="flex flex-col gap-3">
             <p className="text-[17px] text-[#142b6f] font-bold mt-4">
               {" "}
               To see the answers in your user portal, please enter your e-mail
               address.
             </p>
             <textarea
               value={email}
               onChange={(e) => {
                 setEmail(e.target.value);
               }}
               type="text"
               className="w-[96%] lg:w-[40%] h-[6vh] lg:pt-2 pt-1  rounded-md border-2 border-dotted border-[#142b6f] px-4 outline-none"
               placeholder=""
             />
            </div>

             {/* Phone */}
             <div className="flex flex-col gap-3">
             <p className="text-lg text-[#142b6f] font-bold mt-4">
               {" "}
               What is phone number?
             </p>
             <textarea
               value={phone}
               onChange={(e) => {
                 setPhone(e.target.value);
               }}
               type="text"
               className="w-[96%] lg:w-[40%] h-[6vh] lg:pt-2 pt-1  rounded-md border-2 border-dotted border-[#142b6f] px-4 outline-none"
               placeholder=""
             />
            </div>

            {/* Question */}
           <div className="flex flex-col gap-3">
            <p className="text-[17px] text-[#142b6f] font-bold mt-4 lg:w-[65%] w-[96%]">
            Concerns/Questions/History
            </p>
            <textarea
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              type="text"
              className="w-[96%] lg:w-[65%] lg:h-[24vh] h-[16vh] pt-2  rounded-lg border-2 border-dotted border-[#142b6f] px-4 outline-none"
              placeholder="Type your question here."
            />
           </div>

         {/* Insurance */}
          <div className='mt-2 flex flex-col gap-2'>
           <p className="text-[17px] text-[#142b6f] font-bold mt-4 lg:w-[65%] w-[96%]">
            Do you have insurance?
            </p>
            <div className='lg:w-20'>
              <CardHaveInsurance/>
            </div>


          
          </div>

          <div className=' w-full h-16 text-white flex  items-center justify-center font-bold text-lg bg-[#142b6f] rounded-full'>Search</div>


          <p className="text-[17px] text-[#142b6f] font-bold mt-4 lg:w-[65%] w-[96%]">
            Pacgage?
            </p> 
            
            <p className="text-[17px] text-[#142b6f] font-bold mt-4 lg:w-[65%] w-[96%]">
            Payments?
            </p>



          



          
          
          
         </div>
           

          

           



        </section>

        
      </div>
      


    </div>
  )
}

export default Form