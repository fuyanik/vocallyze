

import * as React from "react";
import "./card2.css"
import Slider  from "@mui/material/Slider";
import { styled } from "@mui/material/styles";


import Box from "@mui/material/Box";

import gV from "../../gV.js";
import { setGlobalState, useGlobalState } from "../../hookState";





const Card2 = () => {


  
  const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const IOSSlider = styled(Slider)(({ theme }) => ({
 
//All Slider and Filled Area
  color: "#142B6F",
  height: 7,
  padding: "1 0",


// SLİDER CİRCLE
  "& .MuiSlider-thumb": {
    height: 17,
    width: 17,
    backgroundColor: "#142B6F",
    boxShadow: iOSBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow
      }
    }
  },
  
//SLİDER CHANGABLE VALUE
  "& .MuiSlider-valueLabel": {
    fontFamily: "ProductSans-Light",
    fontSize: 14,
    fontWeight: "700",
    top: 1,
    backgroundColor: "unset",
    color: theme.palette.text.secondary,
    "&:before": {
      display: "none"
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000"
    }
  },

  // Slider unfilled area
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "#FFFFFF"
  },


 

 
}));



  
const [isError] = useGlobalState("isError");
const [globalUserAge] = useGlobalState("userAge");


return (
  <div className="card2">
    <div className="card2-main ">
      <div className="card2-texts">
        <h1>
         It's really nice to meet you <span id="userName">{gV.userName}</span>,{" "}
          <span> how old are you?</span>
        </h1>
        <p>
        Use the slider to choose your age. This is important for your recheck, and I promise it will be our secret.
        </p>
      </div>

      <div className="Slider-Area">
        <span className="min-age"> 18 </span>

        <Box
          sx={{
            width: 635,
            marginBottom: 0,
            marginTop: 5,
          }}
        >
          <IOSSlider
            min={18}
            aria-label="ios slider"
            defaultValue={globalUserAge}
            valueLabelDisplay="on"
            onChange={(e) => {
              gV.age = e.target.value;
              setGlobalState("isFormValidate", true);
            }}
          />
        </Box>

        <span className="max-age"> 100 </span>
      </div>
      <p style={{marginLeft:"12px"}} className= {isError ? "is-error-text" : "display-none" }> This question is required</p>
   
    </div>

  </div>
);


}

export default Card2;