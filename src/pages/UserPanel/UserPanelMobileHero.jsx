import Navbar from "../../homeComponents/1.Navbar/navbar";

import "./style/userPanelMobile.css";
import { useState,useEffect } from "react";
import CustomizedAccordions from "./components/accordion";
import CustomizedAccordions2 from "./components/accordion2Hero";
import SelectLabels from "./components/select";
import SelectLabels2 from "./components/select2";

import SelectLabels3 from "./components/select3";
import SelectLabels4 from "./components/select4";
import SelectLabels5 from "./components/select5";
import { ToastContainer, toast } from 'react-toastify';
//FİRE BASE İMPORTS
import {arrayUnion, doc, setDoc  } from "firebase/firestore"; 
import {db} from "../../firebase";
import { getAuth,updateEmail,reauthenticateWithCredential, EmailAuthProvider, updatePassword} from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import gV from "../../gV";
import { getDoc } from "firebase/firestore";
import TabsMenu from "../TabsMenu/tabsMenu";
import { setGlobalState, useGlobalState } from "../../hookState";
import { Link } from "react-router-dom";
import Card9 from "../../formComponents/Card9/card9";
import { MdError } from "react-icons/md";
import ChatScreen from "./components/chatScreen";
import Faq from "../DropdownPages/Faq/faq";
import SwiperPage from "../Swiper/swiper";
import BiRadsDropdown from "../../homeComponents/BiRadsDropdown/biRadsDropdown";
import PrimaryButton from "../../homeComponents/microComponents/primaryButton/primaryButton";
import TabsMenuHero from "../TabsMenu/tabsMenuHero";
import CustomizedAccordionsHero from "./components/accordionHero";


const UserPanelMobileHero = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  gV.navigation = "userPanel";


  // it helps in reset input field after update email
  const [val, setVal] = useState();

  //


  const [userPanelNavIndex] = useGlobalState("userPanelNavIndex");

  return (
    <>

      <div className="  w-[100%] pt-0 ">
        <div className=" flex flex-col gap-3 ">
          
           <div className=" w-[100%]  relative flex justify-center  h-20 -mb-3 ">
            <img className="h-full absolute " src="https://vitamu.imgix.net/Adsız%20newtasarım-15.png"/>
          
            <div className="flex items-center justify-center gap-1 bg-second text-sm z-20 h-fit self-center py-2  rounded-lg px-3 text-white shadow-lg "> 
             <p className="w-[6px] h-[6px] bg-white rounded-full "></p>
             <p className="  text-center self-center  font-bold font-product iphone7:text-[13px]">Track the process from your dashboard </p>
             <p className="w-[6px] h-[6px] bg-white rounded-full"></p>
            </div>
           </div>
          
          <p className="userPanel-mobile__header__title flex gap-2  text-black -mb-2 "> <p>Hi,</p> Guest!</p>  
          <p className="text-sm  font-bold font-product pl-4 hidden" >Track the entire process from your personal dashboard and ask quesiton raidologist. (This is just a demo!)</p>
          <TabsMenuHero />
          
          
         
          <div className="userPanel-mobile__header__line"></div>
          </div>

        <div className="userPanel-mobile-hero">


          {userPanelNavIndex === 1 && (
         
       
         <div className="flex flex-col">

                     <div>
                        <CustomizedAccordionsHero
                        totalRecheck={1}
                        userActiveStep={6}
                        userCreateDay={23}
                        userCreateMonth={3}
                        userCreateYear={2024}
                        payType={"secondRecheck"}
                      />
                     </div>
                
            
            </div>
        
   
        )}

          {
          userPanelNavIndex === 2 &&
          <div> 
            <CustomizedAccordions2  totalRecheck={1} />
            
          </div>
           }

          {userPanelNavIndex === 3 && (
           <div>   <ChatScreen/>  </div>
          ) }

          {(userPanelNavIndex === 4 || userPanelNavIndex === 5  ) && (
            <div className="self-exam">
              <div className="self-exam-header">
                <p>
                  According to the John Hopkins University, 40% of breast cancer
                  is diagnosed by women who feel a lump. This explains why
                  breast-self exams are so important. The National Breast Cancer
                  Foundation recommends conducting a breast self-exam once a
                  month.{" "}
                </p>
                <p>
                  However, a recent survey has indicated only 12% of women
                  conduct a self-breast exam regularly, which is extremely low
                  considering the cost of a late diagnosis and treatment in
                  advance.{" "}
                </p>
                <p>
                  Here is a new reminder for you. Once you enroll, we will
                  remind your self-exam every month via phone, e-mail, or both.
                </p>
              </div>

              <div className="self-exam-body">
                <div className="self-exam-body-child">
                  <p> Remin me day </p> <SelectLabels />{" "}
                  <p> of every month. </p>
                </div>

                <div className="self-exam-body-child">
                  <p> I want to be reminded by </p> <SelectLabels2 />
                </div>

                <div
                  className="self-exam-body-button"
                >
                  Enroll today
                </div>
              </div>

              <div className="self-exam-footer">
                <p>
                  We also have a visual guide that will help you learn how to
                  conduct breast-self exam.
                </p>

                <div className="self-exam-footer-child">
                  <div className="self-exam-footer-child-button">
                    Download PDF
                  </div>{" "}
                  <p>or</p>{" "}
                  <div className="self-exam-footer-child-button">
                    Watch on Youtube
                  </div>
                </div>
              </div>
            </div>
          )}

        {userPanelNavIndex === 6 && (
          <div> <SwiperPage isOutside={true}/> </div>
          ) }

        {userPanelNavIndex === 7 && (
            <div className="relative  bottom-[0vh] w-[92vw] self-center left-4">  
            <Faq isOutside = {true}/> 
          
           </div>
          ) }

          {userPanelNavIndex === 8 && (
            <div className="userPanel-main-body-info">
              <div className="userPanel-main-body-info-left">
                <div className="userPanel-main-body-info-left-card">
                  <span>Your Info Card</span>

                  <div>
                    <p>Name</p>
                    <p>Guest</p>
                  </div>

                 

                  <div>
                    <p>E-mail address</p>
                    <p>Guest E-mail</p>
                  </div>

                  <div>
                    <p>Phone Number</p>
                    <p>Guest Phone</p>
                  </div>

                  

                  <div className="userPanel-main-body-info-left-card-button">
                    Delete My Account
                  </div>
                </div>
              </div>
              <div className="userPanel-main-body-info-right">
                <div className="userPanel-main-body-info-right-child">
                  <p> Change your e-mail address</p>
                  <input
                    value={val}
                   
                    className="nameİnput"
                  />
                  <div  > Update E-mail</div>
                </div>

                <div className="userPanel-main-body-info-right-child">
                  <p> Change your phone number</p>
                  <input  className="nameİnput" />
                  <div  > Update Phone Number</div>
                </div>

                <div className="userPanel-main-body-info-right-child">
                  <p> Change your password</p>
                  <input
                  
                    type="password"
                    className="nameİnput"
                  />
                  <div  > Update Password</div>
                </div>

                <Link to="/">
                  <div
                    onClick={() => {
                      auth.signOut();
                    }}
                    className="log-out"
                  >
                    {" "}
                    <span>Log out</span> <span>|</span> <span>➔</span>{" "}
                  </div>
                </Link>

                <ToastContainer />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserPanelMobileHero;