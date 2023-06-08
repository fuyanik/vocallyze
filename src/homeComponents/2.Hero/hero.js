import "./style/hero.css";
import React, { useEffect } from "react";
import PrimaryButton from "../microComponents/primaryButton/primaryButton";
import gV from "../../gV"
import { useState } from "react";
import BiRadsDropdown from "../BiRadsDropdown/biRadsDropdown";
import { Link, useNavigate } from "react-router-dom";
import SelectBodyParts from "../../pages/Forms/components/selectBodyParts";
import ScanType from "../../pages/Forms/components/selectScan";
import IconsMobile from "../Icons/Icons_mobile";




const Hero = () => {


  const navigate = useNavigate();



  




  const icons = [
   
    {
        id:2,
        img:"https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/142b6f/external-telephone-contact-us-kmg-design-detailed-outline-kmg-design.png",
        text:"Phone consultation"
    },
    {
        id:3,
        img:"https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/142b6f/external-file-home-office-vitaliy-gorbachev-lineal-vitaly-gorbachev.png",
        text:"Detailed recheck report"
    },
    {
        id:4,
        img:"https://img.icons8.com/ios/50/142b6f/medical-insurance--v1.png",
        text:"Insurance accepted"
    },
    {
        id:5,
        img:"https://img.icons8.com/pastel-glyph/64/142b6f/internet.png",
        text:"Fully online process"
    },
   ]



  return (
    <>
      <div>asd</div>
    </>
  );
};

export default Hero;
