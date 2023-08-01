import React, { useEffect, useState } from 'react'
import './style/sliderStepper.css'

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

import Typography from '@mui/material/Typography';

import gV from '../../gV';

const steps = [
    {
      label: "Provide personal story",
      description: "Your personal history, age, and experience with your breast health matter for the recheck.",
    },
   
 
    {
      label: "Share your medical images",
      description: "We will need your medical images for recheck. If you have them with you, you may upload or ship. If not, we can acquire them with your permission.",
    },
    {
      label: "Check your insurance coverage",
      description: "We accept all major insurance plans. Choose yours and verify your plan. 83% of our users pay less than $30 for a recheck.",

    },

    {
      label: "Follow the process",
      description: "You will be tracking your recheck on your user portal. See your dedicated radiologists, ask them questions, and enrol breast self-exam reminder.",

    },
    {
      label: "Get your results in 24 hours",
      description: "Two of our radiologists will complete your recheck in 24 hours, and you will get a detailed report.",

    },



   
 
   
  
   
  ];

const SliderStepper = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  

  // set time for the every 2 secons to change the step 




  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  
  const handleReset = () => {
      setActiveStep(0);
    };

 

    // per 2 seconds change the step
    useEffect(() => {
    
      if (activeStep === steps.length) {
        setActiveStep(0);
      }
      //per 2 seconds change the step
      const interval = setInterval(() => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }, 2000);
      return () => clearInterval(interval);


    }, [activeStep]);

    

  return (
   <div className='slider-step self-center'>
      <div className="women-slider__top-texts">
       <h1 className="women-slider__top-text">How it works.</h1>
       <h1  className="women-slider__top-text2">
        It will take only a couple of minutes to submit your recheck request, and your recheck report will be ready in 24 hours.
       </h1>
     </div>
       
      <div className='slider-stepper'>
          
          
          <div className='slider-stepper__main'> 
          <div style={{position:"sticky", top:"1vh"}} >
              <Box >
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                  onClick={()=>{
                   
                    setActiveStep(index)
                  }}
                  sx={{
                    color: "#000000",
                    "& .MuiStepLabel-label": {
                      cursor:"pointer",
                      
                      fontFamily: "ProductSans-Light",
                      fontSize: "17px",
                      letterSpacing: "0.4px",
                      color: "#000000",
                    },
                  }}
                  
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>

                    <Typography sx={{fontFamily: "ProductSans-Thin",color:"gray", letterSpacing:"0.4px", lineHeight:"20px", width:`${gV.mq.matches ? "80vw" :  "22vw" }`}}>{step.description}</Typography>
                    <div style={{width:"100%", height:"0vh", }}></div>
                    <Box sx={{ mb: 2 }}></Box>
                 
                  </StepContent>
                </Step>
              ))}
            </Stepper>
        
              </Box>
        
          </div>
          </div>
  
         <div className='slider-stepper__right'>
             <div className='slider-stepper__right__exp'>
                 { activeStep == 0 && 
                 <video className='slider-stepper__right__exp__video'  loop muted>
                    <source src="https://vitamu.imgix.net/stepperVideo.mov?auto=undefined%2Ccompress"type="video/mp4"></source>
                 </video>   }
                
                 { activeStep == 1 && <img src="https://vitamu.imgix.net/one.png?auto=undefined%2Ccompress"/>}
                 { activeStep == 2 && <img src="https://vitamu.imgix.net/two.png?auto=undefined%2Ccompress"/>}
                 { activeStep == 3 && <img src="https://vitamu.imgix.net/thre.png?auto=undefined%2Ccompress"/>}
                 { activeStep == 4 && <img src="https://vitamu.imgix.net/detail.png?auto=undefined%2Ccompress"/>}
             </div>
  
         
         </div>
  
  
      </div>
   </div>
  )
}

export default SliderStepper;