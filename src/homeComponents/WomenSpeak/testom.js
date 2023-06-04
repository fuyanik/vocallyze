import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SwipeableViews from "react-swipeable-views";
import w1 from "./images/w1.png";
import w2 from "./images/w2.png";
import w3 from "./images/w3.png";
import w4 from "./images/w4.png";
import w5 from "./images/w5.png";
import w6 from "./images/w6.png";

import { Link, useNavigate } from 'react-router-dom';
import "./testom.css";
import { useState} from "react";
import gV from "../../gV"





const AutoPlaySwipeableViews = SwipeableViews;

const images = [
  {
    id: 1,
    imgPath:
      w1

  },
  {
    id: 2,
    imgPath:
      w2
  },
  {
    id: 3,
    imgPath:
      w3
  },
  {
    id: 4,
    imgPath:
      w4
  },
  {
    id: 5,
    imgPath:
      w5
  },
  {
    id: 6,
    imgPath:
     w6
  },

  {
    id: 10,
    imgPath:
      w1
  },
  {
    id: 11,
    imgPath:
      w2
  },
];

function Testom() {

  const navigate = useNavigate();



  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeStep2, setActiveStep2] = React.useState(1);
  const [activeStep3, setActiveStep3] = React.useState(2);
  const maxSteps = images.length;


  const handleNext = () => {
    if(activeStep === 5){
      setActiveStep(0);
      setActiveStep2(1);
      setActiveStep3(2);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setActiveStep2((prevActiveStep) => prevActiveStep + 1);
    setActiveStep3((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setActiveStep2((prevActiveStep) => prevActiveStep - 1);
    setActiveStep3((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
    setActiveStep2(step + 1);
    setActiveStep3(step + 2);
  };

  const [isFadeIn, setIsFadeIn] = useState(false);
  const [scrollNumber, setScrollNumber] = useState(0);


  window.addEventListener("scroll", function () {
    setScrollNumber(window.pageYOffset);

    scrollNumber > 675 && setIsFadeIn(true);
  });

  return (
    <>
     {
     gV.mq.matches ?

     
     <div  className="women-slider">
  
     <div  className={
           isFadeIn
             ? "women-slider-circle"
             : ""
         }></div>
    
     <div className="women-slider__top-texts">
       <h1 data-aos="fade-up" data-aos-duration="700" className="women-slider__top-text">Women speak here.</h1>
       <h1 data-aos="fade-up" data-aos-duration="700"  className="women-slider__top-text2">
       In 2022, we identified over 1,400 breast cancer which had been missed by radiologists. Our rechecks made all the difference to these women.
       </h1>
     </div>


     <div className="slick-mainq">
       <div className="slick-mainq__card__one">
         <AutoPlaySwipeableViews
           duration={"300"}
           axis={theme.direction === "rtl" ? "x-reverse" : "x"}
           index={activeStep}
           onChangeIndex={handleStepChange}
           enableMouseEvents={true}
         >
           {images.map((step, index) => (
             <div key={step.id}>
               {Math.abs(activeStep - index) <= 2 ? (
                 <Box
                   component="img"
                   sx={{
                     height: "100%",
                     display: "block",
                     maxWidth: "100%",
                     overflow: "hidden",
                     width: "100%",
                   }}
                   src={step.imgPath}
                   alt={step.label}
                 />
               ) : null}
             </div>
           ))}
         </AutoPlaySwipeableViews>
       </div>

       <div className="slick-mainq__card">
         <AutoPlaySwipeableViews
           axis={theme.direction === "rtl" ? "x-reverse" : "x"}
           index={activeStep2}
           onChangeIndex={handleStepChange}
           enableMouseEvents
         >
           {images.map((step, index) => (
             <div key={step.label}>
               {Math.abs(activeStep2 - index) <= 2 ? (
                 <Box
                   component="img"
                   sx={{
                     height: "100%",
                     display: "block",
                     maxWidth: "100%",
                     overflow: "hidden",
                     width: "100%",
                   }}
                   src={step.imgPath}
                   alt={step.label}
                 />
               ) : null}
             </div>
           ))}
         </AutoPlaySwipeableViews>
       </div>

       <div className="slick-mainq__card mobile-none">
         <AutoPlaySwipeableViews
           axis={theme.direction === "rtl" ? "x-reverse" : "x"}
           index={activeStep3}
           onChangeIndex={handleStepChange}
           enableMouseEvents
         >
           {images.map((step, index) => (
             <div key={step.label}>
               {Math.abs(activeStep3 - index) <= 2 ? (
                 <Box
                   component="img"
                   sx={{
                     height: "100%",
                     display: "block",
                     maxWidth: "100%",
                     overflow: "hidden",
                     width: "100%",
                   }}
                   src={step.imgPath}
                   alt={step.label}
                 />
               ) : null}
             </div>
           ))}
         </AutoPlaySwipeableViews>
       </div>
     </div>

     <div className="slick-footer">
       <MobileStepper
         sx={{  backgroundColor: "white", borderRadius: "20px" }}
         steps={maxSteps - 2}
         position="static"
         activeStep={activeStep}
         nextButton={
           <Button
             sx={{ color: "#142b6f", fontFamily: "ProductSans-Light" }}
             size="small"
             onClick={handleNext}
             disabled={activeStep === 8}
           >
             {theme.direction === "rtl" ? "next" : "➔"}
           </Button>
         }
         backButton={
           <Button
             sx={{  transform:"rotate(180deg)" ,color: "#142b6f", fontFamily: "ProductSans-Light" }}
             size="small"
             onClick={handleBack}
             disabled={activeStep === 0}
           >
             {theme.direction === "rtl" ? "back" : "➔"}
           </Button>
         }
       />
     </div>


     {activeStep === 0 && (
       <div className="slick-texts">
         <p>
         “A biopsy followed the ultrasound, and turns out, I had stage 1 breast cancer!”
         </p>
         <p>Alexandra, 31</p>
         <p onClick={()=>{navigate("/stories/alexandra")}} className="border mt-2 border-[#142b6f] px-3 py-1 rounded-2xl w-fit cursor-pointer"> Read Story </p>

       </div>
     )}

     {activeStep === 1 && (
       <div className="slick-texts">
         <p>“We were lucky enough to catch it at Stage 1, “an early detection”, as the doctor said.“
 </p>
       
         <p>Nora, 49</p>
         <p onClick={()=>{navigate("/stories/nora")}} className="border mt-2 border-[#142b6f] px-3 py-1 rounded-2xl w-fit cursor-pointer"> Read Story </p>

       </div>
     )}

     {activeStep === 2 && (
       <div className="slick-texts">
         <p>“We had a big family vacation, but instead, I got to have a biopsy and find out I had breast cancer. “</p>
         <p>Johnsons, 34</p>
         <p onClick={()=>{navigate("/stories/johnson")}} className="border mt-2 border-[#142b6f] px-3 py-1 rounded-2xl w-fit cursor-pointer"> Read Story </p>

       </div>
     )}

     {activeStep === 3 && (
       <div className="slick-texts">
         <p> “After 6 very long months, I survived. I survived for myself, my little Luna, and my family. “</p>
         <p>Jena, 33</p>
         <p onClick={()=>{navigate("/stories/pena")}} className="border mt-2 border-[#142b6f] px-3 py-1 rounded-2xl w-fit cursor-pointer"> Read Story </p>

       </div>
     )}

     {activeStep === 4 && (
       <div className="slick-texts">
         <p>“Since it’s often difficult to detect cancer at this level, I was extremely grateful.”</p>
         <p>Laura, 54</p>
         <p onClick={()=>{navigate("/stories/laura")}} className="border mt-2 border-[#142b6f] px-3 py-1 rounded-2xl w-fit cursor-pointer"> Read Story </p>

       </div>
     )}

     {activeStep === 5 && (
       <div className="slick-texts">
         <p>“ In exchange for the $60 I paid Vitamu, I had bought something priceless; a critical year in my recovery. “
</p>
         <p>Rachel, 61</p>
         <p onClick={()=>{navigate("/stories/rachel")}} className="border mt-2 border-[#142b6f] px-3 py-1 rounded-2xl w-fit cursor-pointer"> Read Story </p>

       </div>
     )}

   
   
   
   
   </div>   :   <div className="women-slider">
  
        <div  className={
              isFadeIn
                ? "women-slider-circle"
                : ""
            }></div>
        <div className="women-slider__top-texts">
          <h1 data-aos="fade-up" data-aos-duration="900" className="women-slider__top-text">Women speak here.</h1>
          <h1 data-aos="fade-up" data-aos-duration="900" className="women-slider__top-text2">
          In 2022, we identified over 1,400 breast cancer which had been missed by radiologists. Our rechecks made all the difference to these women.
          </h1>
        </div>
  
        {activeStep === 0 && (
       <div className="slick-texts">
         <p>
         “A biopsy followed the ultrasound, and turns out, I had stage 1 breast cancer!”
         </p>
           <p>Alexandra, 31</p>
           <p onClick={()=>{navigate("/stories/alexandra")}} className="border border-[#142b6f] px-3 py-1 rounded-2xl w-fit cursor-pointer"> Read Story </p>
       </div>
     )}

     {activeStep === 1 && (
       <div className="slick-texts">
         <p>“We were lucky enough to catch it at Stage 1, “an early detection”, as the doctor said.“
 </p>
       
         <p>Nora, 49</p>
         <p onClick={()=>{navigate("/stories/nora")}} className="border border-[#142b6f] px-3 py-1 rounded-2xl w-fit cursor-pointer"> Read Story </p>

       </div>
     )}

     {activeStep === 2 && (
       <div className="slick-texts">
         <p>“We had a big family vacation, but instead, I got to have a biopsy and find out I had breast cancer. “</p>
         <p>Johnsons, 34</p>
         <p onClick={()=>{navigate("/stories/johnson")}} className="border border-[#142b6f] px-3 py-1 rounded-2xl w-fit cursor-pointer"> Read Story </p>

       </div>
     )}

     {activeStep === 3 && (
       <div className="slick-texts">
         <p> “After 6 very long months, I survived. I survived for myself, my little Luna, and my family. “</p>
         <p>Jena, 33</p>
         <p onClick={()=>{navigate("/stories/jena")}} className="border border-[#142b6f] px-3 py-1 rounded-2xl w-fit cursor-pointer"> Read Story </p>

       </div>
     )}

     {activeStep === 4 && (
       <div className="slick-texts">
         <p>“Since it’s often difficult to detect cancer at this level, I was extremely grateful.”</p>
         <p>Laura, 54</p>
         <p onClick={()=>{navigate("/stories/laura")}} className="border border-[#142b6f] px-3 py-1 rounded-2xl w-fit cursor-pointer"> Read Story </p>

       </div>
     )}

     {activeStep === 5 && (
       <div className="slick-texts">
         <p>“ In exchange for the $60 I paid Vitamu, I had bought something priceless; a critical year in my recovery. “
</p>
         <p>Rachel, 61</p>
         <p onClick={()=>{navigate("/stories/rachel")}} className="border border-[#142b6f] px-3 py-1 rounded-2xl w-fit cursor-pointer"> Read Story </p>

       </div>
     )}

   
  
        <div className="slick-mainq">
          <div className="slick-mainq__card__one">
            <AutoPlaySwipeableViews
              duration={"300"}
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents={true}
            >
              {images.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: "100%",
                        display: "block",
                        maxWidth: "100%",
                        overflow: "hidden",
                        width: "100%",
                      }}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
          </div>
  
          <div className="slick-mainq__card">
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep2}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep2 - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: "100%",
                        display: "block",
                        maxWidth: "100%",
                        overflow: "hidden",
                        width: "100%",
                      }}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
          </div>
  
          <div className="slick-mainq__card mobile-none">
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep3}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep3 - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: "100%",
                        display: "block",
                        maxWidth: "100%",
                        overflow: "hidden",
                        width: "100%",
                      }}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
          </div>
        </div>
  
        <div className="slick-footer">
          <MobileStepper
            sx={{  backgroundColor: "white", borderRadius: "20px" }}
            steps={maxSteps - 2}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                sx={{ color: "#142b6f", fontFamily: "ProductSans-Light" }}
                size="small"
                onClick={handleNext}
                disabled={activeStep === 8}
              >
                {theme.direction === "rtl" ? "next" : "➔"}
              </Button>
            }
            backButton={
              <Button
                sx={{  transform:"rotate(180deg)" ,color: "#142b6f", fontFamily: "ProductSans-Light" }}
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? "back" : "➔"}
              </Button>
            }
          />
        </div>
      </div>}
    </>
  );
}

export default Testom;
