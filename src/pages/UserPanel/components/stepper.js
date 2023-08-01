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

export default function VerticalLinearStepper({ activeStep1, totalRecheck }) {


  const auth = getAuth();
  const user = auth.currentUser;
  const [isHover, setIsHover] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [testStep, setTestStep] = React.useState(1);
  

  const leftValue = gV.mq.matches ? "-7%" : "-28%";

  const [zipUrls, setZipUrls] = useState([]);
  const docRef = doc(db, "VitamuUsersREAL", `${user.email}`);

  const getResult = async () => {

    await getDoc(docRef).then((docSnap) => {
  
        var zipAllImages = docSnap.data().ResultUrls
        if(zipAllImages != null){
         zipAllImages.map((item) => {
           setZipUrls((prevState) => [...prevState, item]);
        })}
  
    
         
        
      });


  };


  const handleReset = () => {
    setActiveStep(0);
  };

  const downloadResult = () => {

    if (zipUrls != null) {

      zipUrls.map((url) => {
         saveAs(url, "mammogram.jpg");
       
       }).then((e) => {
         toast.success("Download All Images successfully.", {
           position: "bottom-right",
           autoClose: 700,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
         });
 
       })
 
     } else {
       toast.error("You have no images to download.", {
         position: "bottom-right",
         autoClose: 700,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
       });
     }
  

  };

  useEffect(  () => {
    getResult();
    
  }, []);

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
                    color: "rgba(20, 43, 111, 0.592)",
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
                        to={`${gV.mq.matches ? "/swiper-page" : "/pay-plans"}`}
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
                  
                    
                   <div className="w-fit pt-4"> 
                     <Card9
                       totalRecheck={totalRecheck}
                       displayText={"none"}
                       buttonText={"Upload Image"}
                       itemsScrollType={""}
                       userMailAddress={user.email}
                     />
                   
                  </div>
                )}


                {index === 6 && (
                  <div
                  onClick={downloadResult}
                  >
                     <PrimaryButton

                     text="Download Result"
                     
                     />
                  </div>
                  
                )}


  
                <Box sx={{ mb: 2 }}></Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
  
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
      <ToastContainer />
   </div>
  );
}
