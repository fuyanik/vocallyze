import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import "../style/userPanel.css"
import { db } from "../../../firebase";
import { doc } from "firebase/firestore";
import { getDoc} from "firebase/firestore";
import {useEffect } from "react";
import { getAuth } from "firebase/auth";

import { MdExpandMore } from "react-icons/md";
import VerticalLinearStepper from "./stepper";
import gV from "../../../gV";
import VerticalLinearStepperHero from "./stepperHero";



//#FBFBFB;

//açılan pencerenin içi ve bottom çizgiler
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "",
  
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
  position: "relative",
  paddingRight: "0px",
  display: "flex",
  
  backgroundColor: "white",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
   
    
  },
  "& .MuiAccordionSummary-content": {
   
    marginLeft: theme.spacing(2),
  
  }
}));

//iç METİN
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  paddingLeft: "1px",
  displap:"flex",
  alignItems:"center"
  
}));


export default function CustomizedAccordionsHero({userActiveStep, userCreateDay, userCreateMonth, userCreateYear, payType, totalRecheck}) {

  





 const returnAccordionMonth = () => {


  if(userCreateMonth === 0){
    return "January"
  }
  if(userCreateMonth === 1){
    return "February"
  }
  if(userCreateMonth === 2){
    return "March"
  }
  if(userCreateMonth === 3){
    return "April"
  }
  if(userCreateMonth === 4){
    return "May"
  }
  if(userCreateMonth === 5){
    return "June"
  }
  if(userCreateMonth === 6){
    return "July"
  }
  if(userCreateMonth === 7){
    return "August"
  }
  if(userCreateMonth === 8){
    return "September"
  }
  if(userCreateMonth === 9 ){
    return "October"
  }
  if(userCreateMonth === 10 ){
    return "November"
  }
  if(userCreateMonth === 11 ){
    return "December"
  }

  
 }





  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (


    <div className="accordion-reckeck-anim" >

   {/* ACCORDİON 1 */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
       
       
    
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
         
     <div className="w-full flex items-center">
            
        { /* Just Icon for moBİLE */}
        
      <div className="flex gap-4">
           { gV.mq.matches && (userActiveStep === 6 
           ?
           <img className="w-7" src="https://img.icons8.com/ios-glyphs/240/000000/ok--v1.png"/> 
           : 
           <img className="w-6" src="https://img.icons8.com/ios-filled/100/000000/loading.png"/>
             )}
  
           {/*Date */}
           <p className="w-[200px]  gap-42 text-[#000000]" >{ returnAccordionMonth()} {userCreateDay}, {userCreateYear} </p>
      </div>
       
         {/* Icon and Completed Status */}
         {!gV.mq.matches &&    
        <div className=" flex items-center  gap-2 w-fit  relative px-3 py-1  text-[#000000] rounded-xl  " > 
          {userActiveStep === 6 ?
            <img className="w-7" src="https://img.icons8.com/ios-glyphs/240/000000/ok--v1.png"/> : 
            <img className="w-6" src="https://img.icons8.com/ios-filled/100/000000/loading.png"/>
           
           } <p> { (userActiveStep === 6 ? "Completed" :  "Processing")}</p>
         </div> }
         
     </div>
        </AccordionSummary>
        <AccordionDetails>

    

         <VerticalLinearStepperHero
          totalRecheck={totalRecheck}
          activeStep1={userActiveStep}
          payType={payType}
         />
       

    


        </AccordionDetails
        
        >
     
     
      </Accordion>



       {/* ACCORDİON 2 */}
     {/*
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
       
       
       
       
       
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
        
        <p className="accordion-date" >May 12, 2021</p>

          <div className="accordion-title"> 
             <img className="accordion-waiting" src={completed}/>
             <p className="accordion-title-text"  >Recheck Completed</p>
          </div>
        
        </AccordionSummary>
       
       
       
       
        <AccordionDetails>
      
        <VerticalLinearStepper
        activeStep1={6}
        />
        
        </AccordionDetails>
      </Accordion> 
      */
      }


       {/* ACCORDİON 3 */}
     { /* <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
      
      
        <AccordionSummary  aria-controls="panel3d-content" id="panel3d-header">
       
        <p className="accordion-date" >April 12, 2020</p>

          <div className="accordion-title"> 
             <img className="accordion-waiting" src={completed}/>
             <p className="accordion-title-text"  >Recheck Completed</p>
          </div>
        
         
          
       
        </AccordionSummary>
       
       
       
        <AccordionDetails>
       
        <VerticalLinearStepper
        activeStep1={6}
        />
        
     
        </AccordionDetails>
    </Accordion>  */}
   
    </div>
  );
}

