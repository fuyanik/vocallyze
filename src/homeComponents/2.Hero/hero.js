import "./style/hero.css";
import React, { useEffect } from "react";
import PrimaryButton from "../microComponents/primaryButton/primaryButton";
import gV from "../../gV"
import { useState } from "react";
import BiRadsDropdown from "../BiRadsDropdown/biRadsDropdown";
import { Link } from "react-router-dom";




const Hero = () => {



  const [isHover, setIsHover] = useState(false);
  
  const hero_bg = window.innerWidth > 1080 ? "https://vitamu.imgix.net/banner.png?auto=undefined%2Ccompress": "https://vitamu.imgix.net/bg_mob.png?auto=undefined%2Ccompress";





  useEffect(() => {
 
    
  }, []);

  

//test



  return (
    <>
      <div className="hero">
        <img src={hero_bg} className="hero__img"  alt="vitamu"/>
        <div className="hero__main">
      
          <div className="hero__main__header ">
            <p className="hero__main__header__title w-fit lg:w-[60vw] " style={{ fontWeight: "lighter" }}>
              {" "}
              Get second opinion <i>online.</i>
            </p>
          
          </div>

          <div className="hero__main__footer">
            <p>
              Every year in the United States, radiologists miss more than
              40,000 breast cancer cases in women as a result of human error.
            </p>
            <p >
              We are a medical consultation leader providing online consultation service in all areas of medicine.
            
            </p>
          </div>

         <div>

         {isHover && 
        
        <BiRadsDropdown
        onMouseLeave={() => setIsHover(false)}
        top={gV.mq.matches ? "50%" : "70%"}
        left={gV.mq.matches ? "0%" : "-1%"}
        />}
            <PrimaryButton
              color={gV.mq.matches ? null : "white"}
              bg={gV.mq.matches ? null : "#142b6f"}
              width="270px"
              height={gV.mq.matches ? "50px" : "40px"}
              onMouse={ () => setIsHover(true) }
              />
         </div>
       
       
        </div>
      </div>
    </>
  );
};

export default Hero;
