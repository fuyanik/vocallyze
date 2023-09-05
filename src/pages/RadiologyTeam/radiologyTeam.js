import React from "react";

import "./radiologyTeam.css";

import DropdownHeader from "./Header";



import { Helmet } from "react-helmet";
import gV from "../../gV";
import Navbar from "../../homeComponents/1.Navbar/navbar";
import Radiologists from "../../homeComponents/7.Radiologists/radiologists";
import MobileFooter from "../../homeComponents/22.MobileFooter/mobileFooter";
import Footer from "../../homeComponents/11.Footer/footer";

const RadiologyTeam = () => {



  return (
   <div> 

<Navbar
      mobileMenuText={"Menu"}
      mobileMenuTo={"/mobileNavMenu"}
      />
    <div  className={`${gV.mq.matches ?  "radiology-teamo"  : "radiology-team"}`}>

<Helmet>
  <title>Vitamu - Radiology Team</title>
   <meta name="description" content="Radiology Team" />
</Helmet>

 


  

      <div style={ gV.mq.matches ? {width:"95%", } : {width:"80%", marginTop:"5vh" }}>
      
      </div>




     
      <Radiologists isTeamPage={true} />

      {gV.mq.matches ?  <MobileFooter/>  : <Footer/>}
   
    </div>

    </div>
  
  );
};

export default RadiologyTeam;
