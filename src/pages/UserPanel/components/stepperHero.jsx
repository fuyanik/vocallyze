import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./stepper.css";
import { getAuth } from "firebase/auth";
import { saveAs } from 'file-saver'
import Card9 from "../../../formComponents/Card9/card9";
import { Link } from "react-router-dom";
import gV from "../../../gV";
import PrimaryButton from "../../../homeComponents/microComponents/primaryButton/primaryButton";
import BiRadsDropdown from "../../../homeComponents/BiRadsDropdown/biRadsDropdown";
import { useState,useEffect } from "react";
import { getDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc } from "firebase/firestore";
import { db } from "../../../firebase";



const steps = [
  {
    label: "Recheck form completed",
    description: ``,
  },

  {
    label: "Payment authorized",
    description: ``,
  },

  {
    label: "Medical images obtained",
    description: `It usually takes up to 10 days to acquire your medical images. If you have the images, you may choose to upload yourself.`,
  },

  {
    label: "Artificial intelligence evaluation is completed",
    description: ``,
  },
  {
    label: "Radiologist 1 evaluation is completed",
    description: ``,
  },
  {
    label: "Radiologist 2 evaluation is completed",
    description: ``,
  },
  {
    label: "Recheck completed",
    description: ``,
  },
];

export default function VerticalLinearStepperHero({ activeStep1, totalRecheck }) {

  



  const [isHover, setIsHover] = React.useState(false);

  const downloadResultFake = () => {
    toast.error('This is a demo. For your full results, please fill out the form.', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      });
 

  }
 
  

  

  //
  return (
   <div >

      <Box className="stepper-box">
        {/*Whichever number your Active Step is, that index is active. acitvestep == 2 ise 2.sıradaki yanar  */}
        <Stepper
          sx={{ display: "flex", backgroundColor: "white", color: "black" }}
         activeStep={activeStep1}
         // activeStep={testStep}
          orientation="vertical"
        >
          {steps.map((step, index) => (
            <Step sx={{ marginTop: "-10px" }} icon="" key={step.label}>
              <StepLabel
                optional={
                  index === 5 ? <Typography variant="caption"></Typography> : null
                }
              >
                <Typography
                  className="step-label-margin"
                  sx={{
                    marginTop: "2px",
                    fontFamily: "ProductSans-Light",
                    fontSize: "14px",
                   
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                  }}
                >
                  {step.label}
                </Typography>
              </StepLabel>
  
              <StepContent
                TransitionProps={{ unmountOnExit: false }}
                sx={{ width: "150%" }}
              >

                {index == 2 && (
              
                <div className="hidden flex-col gap-1 pb-4 text-[#000000]">
                   <p className="font-product text-[13px]" >Vitamu, Inc.</p>
                   <p className="font-product text-[13px]" >169 Madison Ave #2305 New York, NY 10016</p>
                   <p className="font-product text-[13px]" >+1 646 820 1932</p>
                 </div>
               
               )}
                <Typography
                  sx={{
                    fontFamily: "ProductSans-Light",
                    fontSize: "13px",
                    width: "80%",
                    color: "black",
                  }}
                >
                  {step.description}
                </Typography>
  

                {/* Form Copleted Step */}
                {index === 0 && (
                  <>
                    {isHover && (
                      <BiRadsDropdown
                        onMouseLeave={() => setIsHover(false)}
                        top={gV.mq.matches ? "0%" : "5%"}
                        left={gV.mq.matches ? "10%" : "0%"}
                      />
                    )}

                      <PrimaryButton
                        border={"1px solid #000000"}
                        bg={"#000000"}
                        color={"white"}
                        height={gV.mq.matches ? "43.8" : "36.8px"}
                        onMouse={() => setIsHover(true)}
                        width={gV.mq.matches ? "44%" : "22%"}
                        text={"Start Over"}
                      />
  
                   
                  </>
                )}

                {/* Payment Auth Step */}
                {index === 1 && (
                  <>
                    {isHover && (
                      <BiRadsDropdown
                        onMouseLeave={() => setIsHover(false)}
                        top={gV.mq.matches ? "10%" : "12%"}
                        left={gV.mq.matches ? "10%" : "0%"}
                      />
                    )}
  
                    <div className="flex flex-col gap-2 ">
                      <Link
                        className="style-none"
                        to="/form-new-payments"
                      >
                        <div
                          onClick={() => {
                            gV.payType = "userPanel";
                          }}
                          className="stepper-upload-image"
                        >
                          <span
                            style={{ letterSpacing: "1px" }}
                            className="buttonText"
                          >
                            {" "}
                            Pay Now{" "}
                          </span>
                          <span
                            style={{ letterSpacing: "1px" }}
                            className="primary-button__line"
                          >
                            {" "}
                            |{" "}
                          </span>
                          <span className="primary-button__arrow">➔</span>
                        </div>
                      </Link>
  
                      <PrimaryButton
                        border={"1px solid #000000"}
                        color={"#000000"}
                        bg={"white"}
                        height={gV.mq.matches ? "43.8" : "36.8px"}
                        onMouse={() => setIsHover(true)}
                        width={gV.mq.matches ? "44%" : "22%"}
                        text={"Start Over"}
                      />
                    </div>
                  </>
                )}
                
                {/* Medical Images Step*/}
                {index === 2 && (
                  
                    
                   <div className="w-fit pt-4 cursor-not-allowed pb-10"> 
                      
                      <div htmlFor="file" className="  flex self-center absolute items-center gap-3  bg-white w-fit pl-3 pr-4 py-2 rounded-3xl shadow-2xl">
                   
                   <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" width="28" height="28" className='upload-icon-color'><path d="M16 16L12 12L8 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12V21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5799 15.9986C23.0239 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6902 21.9435 10.7355 21.0667 10.0535C20.1899 9.3714 19.1109 9.00075 18 9.00001H16.74C16.4373 7.82926 15.8732 6.74235 15.09 5.82101C14.3067 4.89967 13.3249 4.16786 12.2181 3.68062C11.1114 3.19338 9.90856 2.96337 8.70012 3.0079C7.49169 3.05242 6.30907 3.37031 5.24118 3.93768C4.17329 4.50505 3.24792 5.30712 2.53463 6.2836C1.82134 7.26008 1.3387 8.38555 1.12299 9.57541C0.907276 10.7653 0.964111 11.9885 1.28922 13.1533C1.61433 14.318 2.19925 15.3939 3.00001 16.3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 16L12 12L8 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                   <p> Upload Image </p> 
                   
                 </div> 
                  </div>
                )}


                {index === 6 && (
                  <div className="flex flex-col text-sm gap-3 w-[90%]" >  
               
                 
                    <p className="ml-1">Your recheck has been completed thoroughly. Please download your comprehensive results from the link below.</p>
                     <div onClick={downloadResultFake }>  <PrimaryButton  bg={"#5D9695"} text="Download Result"/> </div>
                     
                 
                    
                  
                   
                  </div>
                  
                )}


  
                <Box sx={{ mb: 2 }}></Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
  
       
      </Box>
      <ToastContainer />
   </div>
  );
}
