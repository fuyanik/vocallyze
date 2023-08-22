import React, { useEffect, useState } from 'react'
import { setGlobalState, useGlobalState } from '../../../hookState'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AvailableRadiologists = () => {


  //note
  const [activeStep] = useGlobalState("activeStep")

  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    console.log(doctors)

    setGlobalState("doctors", doctors)
  }, [doctors])



  const  radiologists = [
    {
        id:0,
        name: "Elizabeth H. Asch",
        school: "Harvard Medical School'09",
        experience: "13 Years of Experience",
        speciality: ["Breast Screening", "Diagnostic Radiology"],
        image: "https://vitamu.imgix.net/radiologyRe/Elizabeth%20H.%20Asch-Mobile.png?auto=undefined%2Ccompress"

    },
    {   
        id:1,
        name: "Pamela J. DiPiro",
        school: "Tufts University School of Medicine ",
        experience: "33 Years of Experience",
        speciality: ["Breast Screening", "Diagnostic Radiology"],
        image: "https://vitamu.imgix.net/radiologyRe/Pamela%20J.%20DiPiro-Mobile.png?auto=undefined%2Ccompress"

    },
    {
        id:2,
        name: "Roy Zimmer",
        school: "Medical College of Wisconsin",
        experience: "33 Years of Experience",
        speciality: ["Breast Screening", "Diagnostic Radiology"],
        image: "https://vitamu.imgix.net/radiologyTeam/Roy%20Zimmer-Mobile.png?auto=undefined%2Ccompress"

    },
    {
        id:3,
        name: "Priscilla J Slanetz",
        school: "Harvard Medical School",
        experience: "31 Years of Experience",
        speciality: ["Breast Screening", "Diagnostic Radiology"],
        image: "https://vitamu.imgix.net/radiologyTeam/Priscilla%20J%20Slanetz-Mobile.png?auto=undefined%2Ccompress"

    },
    {
        id:4,
        name: "Kevin P Daly",
        school: "Medical College of Georgia",
        experience: "24 Years of Experience",
        speciality: ["Breast Screening", "Diagnostic Radiology"],
        image: "https://vitamu.imgix.net/radiologyTeam/Kevin%20P%20Daly-Mobile.png?auto=undefined%2Ccompress"

    },
    {
        id:5,
        name: "Regina Maria Koch",
        school: "Ruprecht Karls University ",
        experience: "14 Years of Experience",
        speciality: ["Breast Screening", "Diagnostic Radiology"],
        image: "https://vitamu.imgix.net/radiologyRe/Regina%20Maria%20Koch.png?auto=undefined%2Ccompress"

    },
    {
        id:6,
        name: "Emily S. Nia ",
        school: "University of Texas ",
        experience: "16 Years of Experience",
        speciality: ["Breast Screening", "Diagnostic Radiology"],
        image: "https://vitamu.imgix.net/radiologyTeam/Emily%20S.%20Nia-Mobile.png?auto=undefined%2Ccompress"

    },
    {
        id:7,
        name: "James Lin",
        school: "Tufts University School of Medicine ",
        experience: "19 Years of Experience",
        speciality: ["Breast Screening", "Diagnostic Radiology"],
        image: "https://vitamu.imgix.net/radiologyTeam/James%20Lin-Mobile.png?auto=undefined%2Ccompress"

    },
    {
        id:8,
        name: "Derek Mason",
        school: "New York Medical College",
        experience: "20 Years of Experience",
        speciality: ["Breast Screening", "Diagnostic Radiology"],
        image: "https://vitamu.imgix.net/radiologyTeam/Derek%20Mason-Mobile.png?auto=undefined%2Ccompress"

    },
    {
        id:9,
        name: "Yasmin Clark",
        school: "Rutgers New Jersey Medical School",
        experience: "20 Years of Experience",
        speciality: ["Breast Screening", "Diagnostic Radiology"],
        image: "https://vitamu.imgix.net/radiologyTeam/Yasmin%20Clark-Mobile.png?auto=undefined%2Ccompress"

    },
    {
        id:10,
        name: "Abraha Taddese",
        school: "Harvard Medical School",
        experience: "18 Years of Experience",
        speciality: ["Breast Screening", "Diagnostic Radiology"],
        image: "https://vitamu.imgix.net/radiologyTeam/Abraha%20Taddese-Mobile.png?auto=undefined%2Ccompress"

    },
  

]



  return (
    <section className="w-[92vw] lg:w-[46vw] animate-fadeIn flex flex-col h-auto pt-0 px-2">
        
     <div className="flex flex-col gap-2">
     <header className="gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] ">
       <p className="text-[22px] font-bold text-pri">
         Available Radiologists
       </p>

       <p className="text-[16px] mt-1 font-bold text-pri">
         {" "}
         Step {activeStep + 1} of 5
       </p>
     </header>


     </div>

  
   {/* Doctors Cards */}
   <div className="flex flex-col gap-4 mt-3 h-[58vh] overflow-scroll    lg:w-[106%] w-[108%] pt-4 pr-7 pb-8">

 
      {radiologists.map((radiologist, index) => (
          
    <div onClick={ ()=> {

      
      console.log(doctors)
      
      setSelectedDoctor(index)
      if(doctors.includes(radiologist.id)){
        setDoctors(prevDoctors => prevDoctors.filter(doctor => doctor !== radiologist.id))
      }
      else {

        doctors.length < 2 ?  setDoctors(prevDoctors => [...prevDoctors, radiologist.id]) : toast.error(" You can only select 2 radiologists. ", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
     
      }
    
    }
      
    } className='flex items-center gap-4 cursor-pointer'>


      {/* Circle */}
     
      {doctors.includes(radiologist.id) ?  <div className='w-11 h-10 border bg-pri rounded-full duration-500  '> </div> : <div className='w-11 h-10 border rounded-full duration-500  border-priTrans '> </div>}
   

       {/* Card */}
      <div  className={`w-full h-34 rounded-xl py-2 lg:py-4 lg:px-5 px-3 justify-between flex items-center shadow-md  duration-300 cursor-pointer` }> 
       
       <div className="flex flex-col  ">
       
        <p className="font-bold text-pri">{radiologist.name}</p>
        <div className="flex flex-col  lg:flex-row lg:gap-2">
          <p className="text-pri"> {radiologist.school} / </p>
          <i className="text-[#000000db]"> {radiologist.experience}</i> 
        </div>
       
        <div className="flex items-center gap-2">
         <div className="w-1 h-1 rounded-full bg-priTrans"></div>
         <p className="text-priTrans">All Body Parts </p>
        </div>
       
        <div className="flex items-center gap-2">
         <div className="w-1 h-1 rounded-full bg-priTrans"></div>
         <p className="text-priTrans">Diagnostic Radiology</p>
        </div>
      
       </div>
      
        <img className="lg:w-28 lg:h-28 w-20 h-20  rounded-xl" src={radiologist.image}/>
      
      </div>
  
    </div>
  
  
  ))}


   
   
<ToastContainer />
   
    </div>
   </section>
  )
}

export default AvailableRadiologists;