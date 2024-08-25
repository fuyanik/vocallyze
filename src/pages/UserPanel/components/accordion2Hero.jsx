import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";


import "../style/userPanel.css"
import { getAuth } from "firebase/auth";
import { MdExpandMore } from "react-icons/md";

import { db } from "../../../firebase";
import { saveAs } from 'file-saver'
import { doc } from "firebase/firestore";

import { useState,useEffect } from "react";

import { getDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import {deleteField } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card9 from "../../../formComponents/Card9/card9";
import gV from "../../../gV";
import { deleteObject } from "firebase/storage";
import { storage } from "../../../firebase";
import { setDoc } from "firebase/firestore";
//açılan pencerenin içi ve bottom çizgiler
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  
 
  
  "&:not(:last-child)": {
    borderBottom: " 1px solid rgba(128, 128, 128, 0.31)"
  },

  "&:before": {
    display: "inline"
  }
}));

// yandaki iconlar
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      
     <MdExpandMore className="panel-accordion-icon"
    
     
     />
    }

    {...props}
  />

  //İÇ GENEL
))(({ theme }) => ({
  
  paddingRight: "0px",
  backgroundColor: "",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)"
  },
  "& .MuiAccordionSummary-content": {
   
    marginLeft: theme.spacing(3),
  
  }
}));

//iç METİN
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  paddingLeft: "1px",

  
}));


export default function CustomizedAccordionsHero({totalRecheck}) {

  const auth = getAuth();
  const user = auth.currentUser;

  const [expanded, setExpanded] = React.useState("panel1");
  const [showAppliesText, setShowAppliesText] = useState("");


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };



 

  return (
    <div className="accordion-reckeck-anim">
      {/* ACCORDİON 1 */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
        
        aria-controls="panel1d-content" id="panel1d-header">

          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              left: `${gV.mq.matches ? "-6%" :"-0.5%" }`,
              width: "20%",
              
             
            }}
          >
           <div className="flex lg:gap-4 gap-2 lg:text-normal lg:text-[14px] text-[12px]">
         
            <p className="text-white bg-sec  whitespace-nowrap   font-normal font-product px-3 py-1 rounded-full relative lg:bottom-1"> MRI</p>
            <p className="text-white bg-sec  whitespace-nowrap   font-normal font-product px-3 py-1 rounded-full relative lg:bottom-1"> Ultrasound</p>
            
             <div className=" flex gap-2 relative lg:bottom-1">
            
            
               
                 <p className="text-white bg-black font-normal  whitespace-nowrap  font-product px-3 py-1 rounded-full"> Lumbar Spine</p>
                  
            
              </div>



            
           </div>

             
             

          </div>
        </AccordionSummary>

        <AccordionDetails>
         <div className="flex flex-col lg:gap-6 gap-8">
           <div className="accordion-upload-image">
           <div className="w-fit pt-4 cursor-not-allowed pb-10"> 
                <div htmlFor="file" className="  flex self-center absolute items-center gap-3  bg-white text-black w-fit pl-3 pr-4 py-2 rounded-3xl shadow-xl">
                   <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" width="28" height="28" className='upload-icon-color'><path d="M16 16L12 12L8 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12V21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5799 15.9986C23.0239 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6902 21.9435 10.7355 21.0667 10.0535C20.1899 9.3714 19.1109 9.00075 18 9.00001H16.74C16.4373 7.82926 15.8732 6.74235 15.09 5.82101C14.3067 4.89967 13.3249 4.16786 12.2181 3.68062C11.1114 3.19338 9.90856 2.96337 8.70012 3.0079C7.49169 3.05242 6.30907 3.37031 5.24118 3.93768C4.17329 4.50505 3.24792 5.30712 2.53463 6.2836C1.82134 7.26008 1.3387 8.38555 1.12299 9.57541C0.907276 10.7653 0.964111 11.9885 1.28922 13.1533C1.61433 14.318 2.19925 15.3939 3.00001 16.3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 16L12 12L8 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                   <p> Upload Image </p> 
                 </div> 
            </div>
        
           </div>
          
           <div className="flex flex-col gap-2 ml-4 text-sm">
             <div className="bg-[#000000] w-fit text-white py-2 px-4 rounded-full" >Download All</div>
             <div className=" border border-[#000000] w-fit text-black py-2 px-4 rounded-full" >Delete</div>
           </div>
         
         </div>
        </AccordionDetails>
      </Accordion>

      <ToastContainer />
    </div>
  );
}

