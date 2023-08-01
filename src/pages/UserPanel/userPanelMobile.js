import Navbar from "../../homeComponents/1.Navbar/navbar";

import "./style/userPanelMobile.css";
import { useState,useEffect } from "react";
import CustomizedAccordions from "./components/accordion";
import CustomizedAccordions2 from "./components/accordion2";
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


const UserPanelMobile = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  gV.navigation = "userPanel";

  const [changedEmail, setChangedEmail] = useState("");
  const [changedPassword, setChangedPassword] = useState(null);
  const [changedPhone, setChangedPhone] = useState("313131");

  // it helps in reset input field after update email
  const [val, setVal] = useState();

  //
  const [isLoading, setIsLoading] = useState(true);


  //Total Recheck
  //..
  const [userTotalRecheck, setUserTotalRecheck] = useState(1);

  //User panel info
  //..
  const [userBiRads, setUserBiRads] = useState("");
  const [userBiRads2, setUserBiRads2] = useState("");
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(1);
  const [userPassword, setUserPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");

  //Acordions info
  //..
  const [userActiveStep, setUserActiveStep] = useState(0);
  const [userCreateDay, setUserCreateDay] = useState("");
  const [userCreateMonth, setUserCreateMonth] = useState();
  const [userCreateYear, setUserCreateYear] = useState();


     //LifeLong Area Info
     //...
     const [isLifeLong, setIsLifeLong] = useState(false)
     const [imagingName, setImagingName] = useState("Breast")
     const [imagingNum, setImagingNum] = useState(0)
     const [symptomsNotes, setSymptomsNotes] = useState("")

    //Recheck data
    //..
    const [recheckData, setRecheksData] = useState(null);

  




  const [count, setCount] = useState(0);
  const [isHover, setIsHover] = useState(false);
 
  useEffect(() => {
 
 const interval = setInterval(() => {
  
   setCount(count + 1);
   if(count == 5){
     setCount(0)
   }
 }, 2000);


 return () => clearInterval(interval);
   }, [count]);



  const getInfo = async  () => {
    const docRef = doc(db, "Mitrua", `${user.email}`);

    //Paying users
    await  getDoc(docRef).then((doc) => {
     
      if (doc.exists()) {
        console.log("Current data: ", doc.data());
            //Get is LifeLong
         

          false && setGlobalState("userPanelNavIndex", 3);

        

        //Get insurance company
        //..
        // gV.insuranceCompany = doc.data().FirstRecheck.insuranceCompany;
      
      
        try {

          setRecheksData(doc.data().Rechecks);

        } catch (error) {

          console.log("error: ", error)
        }
        

        //Get is LifeLong
        setIsLifeLong(doc.data().isLifeLong)
        console.log("isLifeLong: ", isLifeLong)
        console.log("doc.data().isLifeLong: ", doc.data().isLifeLong)






        /* FİRST RECHECK START AREA  */
      
        setIsLoading(false)
      
         //Get info first recheck
        //..
   

        /* SECOND RECHECK START AREA  */

        if(true){

       
         

        } 
      }
    }).then(() => {

    }).catch((err) => {
      console.log(err)

    })
  };

  useEffect(  () => {
    setGlobalState("userPanelNavIndex", 1);

    const auth = getAuth();
    const user = auth.currentUser;

    getInfo()
    
  
    

    if (user) {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        userPassword
      );

      reauthenticateWithCredential(user, credential)
        .then(() => {
          // User re-authenticated.
        })
        .catch((error) => {
          // An error ocurred
          // ...
        });
    }

    return () => {};
  }, [user]);

  //get email when user changes email
  const onChangeEmail = (e) => {
    setChangedEmail(e.target.value);
  };
  //update email when user clicks update email button
  const ChangeEmail = async () => {
    const cityRef = doc(db, "Mitrua", `${user.email}`);

    setDoc(cityRef, { MailAddress: changedEmail }, { merge: true });

    updateEmail(user, changedEmail)
      .then(() => {
        toast.success("Email updated successfully", {
          position: "bottom-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setVal(() => "");
        setChangedEmail("");
      })
      .catch((error) => {
        toast.error("This e-mail address is used by another user.", {
          position: "bottom-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const onChangePassword = (e) => {
    setChangedPassword(e.target.value);
  };
  //update password when user clicks update password button
  const updateUserPassword = async () => {
    await setDoc(
      doc(db, "Mitrua", `${user.email}`),
      {
        FirstRecheck: { Password: changedPassword },
      },
      { merge: true }
    );

    updatePassword(user, changedPassword)
      .then(() => {
        toast.success("Password updated successfully", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const changePhone = (e) => {
    setChangedPhone(e.target.value);
  };

  const updatePhoneNumber = async () => {
    await setDoc(
      doc(db, "Mitrua", `${user.email}`),
      {
        FirstRecheck: { phoneNumber: changedPhone },
      },
      { merge: true }
    )
      .then(() => {
        toast.success("Phone updated successfully", {
          position: "bottom-right",
          autoClose: 400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const SelfExamEnrollButton = async () => {
    await setDoc(
      doc(db, "Mitrua", `${user.email}`),
      {
        FirstRecheck: {
          remindMe: true,
        },
      },
      { merge: true }
    )
      .then((e) => {
        console.log("deleted");

        toast.success("Enroll Successed", {
          position: "bottom-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [userPanelNavIndex] = useGlobalState("userPanelNavIndex");

  return (
    <>
      <Navbar mobileMenuText={"Menu"} mobileMenuTo={"/MobileNavMenu"} />

      <div className="userPanel-mobile">
        <div className="userPanel-mobile__header ">
       
          <p className="userPanel-mobile__header__title flex gap-2 "> <p>Hi,</p> {false ? <p className=" h-12 mt-2 bg-[#00000044] w-[40vw] rounded-lg animate-pulse"> </p>  :   user.displayName.split(" ")[0]  } </p>  
           
           
          <TabsMenu />
          { (userPanelNavIndex === 4 || userPanelNavIndex === 5 || userPanelNavIndex === 6 || userPanelNavIndex === 7 || userPanelNavIndex === 8   )  && <TabsMenu isMore={true} />}
          
         
          <div className="userPanel-mobile__header__line"></div>
          </div>

        <div className="userPanel-mobile-hero">


          {userPanelNavIndex === 1 && (
         
         
         true 
         
          ?
         <div className="flex flex-col">

             
          
              {
                    recheckData && 
                    recheckData.map((item, index) => {
                      return(
                       
                    
                     <div>
                        <CustomizedAccordions
                        totalRecheck={index}
                        userActiveStep={item.activeStep}
                        userCreateDay={item.createDay}
                        userCreateMonth={item.createMonth}
                        userCreateYear={item.createYear}
                        payType={"secondRecheck"}
                      />
                     </div>
                   
                      )

                    })

                  }

             


            
            </div>
        
        : 

          /* No Recheck Users Area */
          <div className="w-[90vw] mt-4 relative left-3 self-center flex flex-col gap-4 font-product text-[#000000]  h-screen">
                  
          <div className="dropdown-page-header__yellow">
            <div className="flex gap-1">
              <p> We recheck </p>
              {count == 0 && <p>mammograms.</p>}
              {count == 1 && <p>ultrasounds.</p>}
              {count == 2 && <p>breast MRIs</p>}
              {count == 3 && <p>mammograms.</p>}
              {count == 4 && <p>ultrasounds.</p>}
              {count == 5 && <p>breast MRIs.</p>}
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <p>
              Every year in the United States, radiologists miss more
              than 40,000 breast cancer cases in women as a result of
              human error.
            </p>
            <p>
              In less than 24 hours, our checks will ensure that you
              will not be one of these missed cases.
            </p>
          </div>

          <div className="relative">
            {isHover && (
              <BiRadsDropdown
                onMouseLeave={() => setIsHover(false)}
                top={gV.mq.matches ? "-80%" : "-30%"}
                left={gV.mq.matches ? "0%" : "-1%"}
              />
            )}
            <PrimaryButton
              color={gV.mq.matches ? null : "white"}
              bg={gV.mq.matches ? null : "#000000"}
              width="210px"
              height={gV.mq.matches ? "42px" : "40px"}
              onMouse={() => setIsHover(true)}
            />
          </div>
       
       
        </div>
        )}

          {
          userPanelNavIndex === 2 &&
          <div> 
            {userTotalRecheck === 2 && <CustomizedAccordions2  totalRecheck={2} />}
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
                  onClick={SelfExamEnrollButton}
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
                    <p>{user.displayName}</p>
                  </div>

                  <div>
                    <p>Date of the Birth</p>
                    <p> {2022 - userAge}</p>
                  </div>

                  <div>
                    <p>E-mail address</p>
                    <p>{user?.email}</p>
                  </div>

                  <div>
                    <p>Phone Number</p>
                    <p>{userPhone}</p>
                  </div>

                  <div>
                    <p>Last Bi-rads Score</p>
                    <p>{userTotalRecheck == 2 ? userBiRads2 : userBiRads}</p>
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
                    onChange={onChangeEmail}
                    className="nameİnput"
                  />
                  <div onClick={ChangeEmail}> Update E-mail</div>
                </div>

                <div className="userPanel-main-body-info-right-child">
                  <p> Change your phone number</p>
                  <input onChange={changePhone} className="nameİnput" />
                  <div onClick={updatePhoneNumber}> Update Phone Number</div>
                </div>

                <div className="userPanel-main-body-info-right-child">
                  <p> Change your password</p>
                  <input
                    onChange={onChangePassword}
                    type="password"
                    className="nameİnput"
                  />
                  <div onClick={updateUserPassword}> Update Password</div>
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

export default UserPanelMobile;