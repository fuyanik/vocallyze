import "./style/userPanel.css";
import vitamuLogo from "./images/vitamuLogo.png";
import {useEffect, useState} from 'react';
import CustomizedAccordions from "./components/accordion";
import CustomizedAccordions2 from "./components/accordion2";
import SelectLabels from "./components/select";
import SelectLabels2 from "./components/select2";
import { Link, useNavigate } from "react-router-dom";
import SelectLabels3 from "./components/select3";
import SelectLabels4 from "./components/select4";
import SelectLabels5 from "./components/select5";
import UserPanelMobile from "./userPanelMobile";
import { ToastContainer, toast } from 'react-toastify';
//FİRE BASE İMPORTS
import {arrayUnion, doc, setDoc,  } from "firebase/firestore"; 
import {db } from "../../firebase";
import { getAuth,onAuthStateChanged,updateEmail,reauthenticateWithCredential, EmailAuthProvider, updatePassword} from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import gV from "../../gV";
import SplashPage from "../SplashPage/splashPage";
import { getDoc } from "firebase/firestore";
import { Helmet } from "react-helmet";
import Card9 from "../../formComponents/Card9/card9";
import ChatScreen from "./components/chatScreen";
import Faq from "../DropdownPages/Faq/faq";
import PayPlans from "../PayPlans/payPlans";
import AskRadiologist from "../AskRadiologist/askRadiologist";
import BiRadsDropdown from "../../homeComponents/BiRadsDropdown/biRadsDropdown";
import PrimaryButton from "../../homeComponents/microComponents/primaryButton/primaryButton";


const UserPanel = () => { 


  
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

    const [isSlect1, setIsSelect1] = useState(true);
    const [isSlect2, setIsSelect2] = useState(false);
    const [isSlect3, setIsSelect3] = useState(false);
    const [isSlect4, setIsSelect4] = useState(false);
    const [isSlect5, setIsSelect5] = useState(false);
    const [isSlect6, setIsSelect6] = useState(false);
    const [isSlect7, setIsSelect7] = useState(false);




    var mq = window.matchMedia( "(max-width: 1080px)" );
    gV.navigation = "userPanel";



     const [changedEmail, setChangedEmail] = useState("");
     const [changedPassword, setChangedPassword] = useState(null);
     const [changedPhone, setChangedPhone] = useState("");


     //LifeLong Area Info
     //...
     const [isLifeLong, setIsLifeLong] = useState(false)
     const [imagingName, setImagingName] = useState("Breast")
     const [imagingNum, setImagingNum] = useState(0)
     const [symptomsNotes, setSymptomsNotes] = useState("")
    
     const [isLoading, setIsLoading] = useState(true)
    
     // it helps in reset input field after update email
     //...
     const [val, setVal] = useState();

     //Total Recheck
     //..
     const [userTotalRecheck, setUserTotalRecheck] = useState(1);

    //..
    const [userBiRads, setUserBiRads] = useState("");
    const [userBiRads2, setUserBiRads2] = useState("");
    const [userAge, setUserAge] = useState(1);
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPhone, setUserPhone] = useState("");

    //Acordions info
    //..
    const [userActiveStep, setUserActiveStep] = useState(0);
    const [userCreateDay, setUserCreateDay] = useState("");
    const [userCreateMonth, setUserCreateMonth] = useState();
    const [userCreateYear, setUserCreateYear] = useState();

    
    //Accordion info for second recheck
    //..
    const [userActiveStep2, setUserActiveStep2] = useState(0);
    const [userCreateDay2, setUserCreateDay2] = useState("");
    const [userCreateMonth2, setUserCreateMonth2] = useState();
    const [userCreateYear2, setUserCreateYear2] = useState();

    const [isAskQuestion, setIsAskQuestion] = useState(false);

    //Recheck data
    //..
    const [recheckData, setRecheksData] = useState(null);



    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const [firstRecheck, setFirstRecheck] = useState({});


    const [isHover, setIsHover] = useState(false);


    const [count, setCount] = useState(0);
 
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
    

    const docRef = doc(db, "VitamuUsersREAL", `${user.email}`);

    //Paying users
    await getDoc(docRef).then((doc) => {
      if (doc.exists()) {

        console.log("Current data: ", doc.data());
        console.log( doc.data().isAskQuestion);


           
        //Get is Ask Question
        setIsAskQuestion(doc.data().isAskQuestion)

        if(doc.data().isAskQuestion){ 

            setIsSelect1(false); setIsSelect2(false); setIsSelect3(true); setIsSelect4(false); setIsSelect5(false); setIsSelect6(false); setIsSelect7(false);

        }
       
        setFirstRecheck(doc.data().FirstRecheck);

        console.log("isAskQuestion: ", isAskQuestion)
        console.log("doc.data().isAskQuestion: ", doc.data().isAskQuestion)

        //Get insurance company
        //..
        gV.insuranceCompany = doc.data().FirstRecheck.insuranceCompany;

       
        try {

          setRecheksData(doc.data().LifeLong.rechecks.reverse());

        } catch (error) {

          console.log("error: ", error)
        }
        

        //Get is LifeLong
        setIsLifeLong(doc.data().isLifeLong)
        console.log("isLifeLong: ", isLifeLong)
        console.log("doc.data().isLifeLong: ", doc.data().isLifeLong)

    

       
       
       
       
        //Get total recheck
        //..
        setUserTotalRecheck(doc.data().TotalRechecks );

   
        /* FİRST RECHECK START AREA  */

        setIsLoading(false);

        //Get info first recheck
        //..
        setUserBiRads(doc.data().FirstRecheck.BiRads);
        setUserAge(doc.data().FirstRecheck.UserAge);
        setUserName(doc.data().FirstRecheck.Name);
        setUserPassword(doc.data().FirstRecheck.Password);
        setUserPhone(doc.data().FirstRecheck.phoneNumber);


        //Get info first recheck for accordions
        //..
        setUserActiveStep(doc.data().FirstRecheck.activeStep);
        setUserCreateDay(doc.data().FirstRecheck.currentDate.day);
        setUserCreateMonth(doc.data().FirstRecheck.currentDate.month);
        setUserCreateYear(doc.data().FirstRecheck.currentDate.year);



        /* SECOND RECHECK START AREA  */

        //Get birads info second recheck
        //..
        setUserBiRads2(doc.data().SecondRecheck.BiRads);

        //Get info second recheck for accordions
        //..
        setUserActiveStep2(doc.data().SecondRecheck.activeStep);
        setUserCreateDay2(doc.data().SecondRecheck.currentDate.day);
        setUserCreateMonth2(doc.data().SecondRecheck.currentDate.month);
        setUserCreateYear2(doc.data().SecondRecheck.currentDate.year);


      }
    });
   }

      //Get month name for first recheck
      //..
      const returnAccordionMonth = () => {

        if(userCreateMonth === 0){
          return "January"
        }
        if(userCreateMonth === 1){
          return "February"
        }
        if(userCreateMonth === 2){
          return "March"
        }
        if(userCreateMonth === 3){
          return "April"
        }
        if(userCreateMonth === 4){
          return "May"
        }
        if(userCreateMonth === 5){
          return "June"
        }
        if(userCreateMonth === 6){
          return "July"
        }
        if(userCreateMonth === 7){
          return "August"
        }
        if(userCreateMonth === 8){
          return "September"
        }
        if(userCreateMonth === 9 ){
          return "October"
        }
        if(userCreateMonth === 10 ){
          return "November"
        }
        if(userCreateMonth === 11 ){
          return "December"
        }
      
        
       }

      //Get month name for first recheck
      //..
      const returnAccordionMonth2 = () => {


        if(userCreateMonth2 === 0){
          return "January"
        }
        if(userCreateMonth2 === 1){
          return "February"
        }
        if(userCreateMonth2 === 2){
          return "March"
        }
        if(userCreateMonth2 === 3){
          return "April"
        }
        if(userCreateMonth2 === 4){
          return "May"
        }
        if(userCreateMonth2 === 5){
          return "June"
        }
        if(userCreateMonth2 === 6){
          return "July"
        }
        if(userCreateMonth2 === 7){
          return "August"
        }
        if(userCreateMonth2 === 8){
          return "September"
        }
        if(userCreateMonth2 === 9 ){
          return "October"
        }
        if(userCreateMonth2 === 10 ){
          return "November"
        }
        if(userCreateMonth2 === 11 ){
          return "December"
        }
      
        
       }
      
       gV.currentDate = ` ${returnAccordionMonth()} ${userCreateDay} , ${userCreateYear}`
       gV.currentDate2 = ` ${returnAccordionMonth2()} ${userCreateDay2} , ${userCreateYear2}`
   
   
        useEffect(() => {

      const auth = getAuth();
      const user = auth.currentUser;

      const listener = onAuthStateChanged(auth, async (user) => {
        setIsAuthenticated(!!user);
      });

      //Get All User Info and set to hooks
      //..
       user &&  getInfo();




      if(user) {

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
    
      return () => {
        listener();
      };


    }, [user]);


    //Change email
    //..
    const onChangeEmail = (e) => {
      setChangedEmail(e.target.value);
    }
    const  ChangeEmail = async () => {
 
      const cityRef = doc(db, "VitamuUsersREAL", `${user.email}`);

    setDoc(cityRef,
      { MailAddress: changedEmail}, 
      { merge: true }
      );



      updateEmail(user, changedEmail).then(() => {
         
        toast.success("Email updated successfully", {
          position: "bottom-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setVal(() => "")
        setChangedEmail("");

      }).catch((error) => {

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
      
      
    }

    //Change password
    //..
    const onChangePassword = (e) =>{
      setChangedPassword(e.target.value);
    } 
    const updateUserPassword = async  () => {
      await setDoc(doc(db, "VitamuUsersREAL", `${user.email}`), {
        FirstRecheck: {Password: changedPassword}, 
      },
      {merge: true}
     );

      updatePassword(user, changedPassword).then(() => {
        toast.success("Password updated successfully", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }).catch((error) => {
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

   

    
    
    }

     //Change phone number
     //..
     const changePhone = (e) => {
        setChangedPhone(e.target.value);
     }

     const updatePhoneNumber = async () => {

       await setDoc(doc(db, "VitamuUsersREAL", `${user.email}`), {
            FirstRecheck: {phoneNumber: changedPhone}, 
          },
          {merge: true}
         ).then(() => {

          toast.success("Phone updated successfully", {
            position: "bottom-right",
            autoClose: 400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

        }).catch((error) => {

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
     }

     //Self exam enroll
     //..
     const SelfExamEnrollButton = async () =>{

      await setDoc(
        doc(db, "VitamuUsersREAL", `${user.email}`),
        {
          FirstRecheck: {
            remindMe: true
          },
         
        },
        { merge: true }
      ).then((e) => {
        console.log("deleted"); 
        
        toast.success('Enroll Successed', {
          position: "bottom-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
       }).catch(error => {
        console.log(error);
       })
  
     }


return (
  <>
    <Helmet>
      <title>Vitamu - User Panel</title>
      <meta name="description" content="User Panel" />
    </Helmet>

    {!isAuthenticated ? (
      <SplashPage />
    ) : mq.matches ? (
      <UserPanelMobile />
    ) : (
      <div className="userPanel">
        <div className="userPanel-main">
          <ToastContainer />

          <div className="userPanel-main-header">
            <Link to="/">
              <img
                alt="img"
                className="userPanel-main-header-logo"
                src="https://vitamu.imgix.net/Group%202.png?auto=undefined%2Ccompress"
              />
            </Link>

            <Link className="style-none" to="/">
              <p className="userPanel-main-header-text">Go to Vitamu.com</p>
            </Link>
          </div>

          <div className="userPanel-main-body  flex flex-col items-center ">
            {/* Header */}
            <div className="w-[64%]  text-[#142b6f] flex gap-5 flex-col border-b border-[#0202023e] pb-2">
              <div className="text-[4.125rem] font-semibold  self-start ">
                <p className=" flex gap-2 ">
                  {" "}
                  <p>Hi,</p>
                  {false ? (
                    <p className=" h-14 mt-6 bg-[#142b6f44] w-[20vw] rounded-lg animate-pulse">
                      {" "}
                    </p>
                  ) : (
                    user.displayName.split(" ")[0]
                  )}{" "}
                </p>
              </div>

              <div className="w-full text-[#142b6f95] justify-between text-[1.23rem] font-medium tracking-wide  flex">
                <div className="flex gap-9  ">
                  <p
                    onClick={() => {
                      setIsSelect1(true);
                      setIsSelect2(false);
                      setIsSelect3(false);
                      setIsSelect4(false);
                      setIsSelect5(false);
                      setIsSelect6(false);
                      setIsSelect7(false);
                    }}
                    className={`${
                      isSlect1 && "text-[#142b6f]"
                    } cursor-pointer hover:text-[#142b6f] duration-200`}
                  >
                    Rechecks
                  </p>

                  <p
                    onClick={() => {
                      setIsSelect1(false);
                      setIsSelect2(true);
                      setIsSelect3(false);
                      setIsSelect4(false);
                      setIsSelect5(false);
                      setIsSelect6(false);
                      setIsSelect7(false);
                    }}
                    className={`${
                      isSlect2 && "text-[#142b6f]"
                    } cursor-pointer hover:text-[#142b6f] duration-200`}
                  >
                    Images
                  </p>

                  <p
                    onClick={() => {
                      setIsSelect1(false);
                      setIsSelect2(false);
                      setIsSelect3(true);
                      setIsSelect4(false);
                      setIsSelect5(false);
                      setIsSelect6(false);
                      setIsSelect7(false);
                    }}
                    className={`${
                      isSlect3 && "text-[#142b6f]"
                    } cursor-pointer hover:text-[#142b6f] duration-200`}
                  >
                    {" "}
                    Messages
                  </p>

                  <p
                    onClick={() => {
                      setIsSelect1(false);
                      setIsSelect2(false);
                      setIsSelect3(false);
                      setIsSelect4(true);
                      setIsSelect5(false);
                      setIsSelect6(false);
                      setIsSelect7(false);
                    }}
                    className={`${
                      isSlect4 && "text-[#142b6f]"
                    } cursor-pointer hover:text-[#142b6f] duration-200`}
                  >
                    Self - Exam
                  </p>

                  <p
                    onClick={() => {
                      setIsSelect1(false);
                      setIsSelect2(false);
                      setIsSelect3(false);
                      setIsSelect4(false);
                      setIsSelect5(true);
                      setIsSelect6(false);
                      setIsSelect7(false);
                    }}
                    className={`${
                      isSlect5 && "text-[#142b6f]"
                    } cursor-pointer hover:text-[#142b6f] duration-200`}
                  >
                    Upgrade
                  </p>

                  <p
                    onClick={() => {
                      setIsSelect1(false);
                      setIsSelect2(false);
                      setIsSelect3(false);
                      setIsSelect4(false);
                      setIsSelect5(false);
                      setIsSelect6(true);
                      setIsSelect7(false);
                    }}
                    className={`${
                      isSlect6 && "text-[#142b6f]"
                    } cursor-pointer hover:text-[#142b6f] duration-200`}
                  >
                    Get Help
                  </p>

                  <p
                    onClick={() => {
                      setIsSelect1(false);
                      setIsSelect2(false);
                      setIsSelect3(false);
                      setIsSelect4(false);
                      setIsSelect5(false);
                      setIsSelect6(false);
                      setIsSelect7(true);
                    }}
                    className={`${
                      isSlect7 && "text-[#142b6f]"
                    } cursor-pointer hover:text-[#142b6f] duration-200`}
                  >
                    Info
                  </p>
                </div>

                <Link to="/">
                  <p
                    onClick={() => {
                      auth.signOut();
                    }}
                    className=" cursor-pointer hover:text-[#142b6f] duration-200"
                  >
                    Sign Out
                  </p>
                </Link>
              </div>
            </div>

            {/* Changable Area */}

            {/* My Recheck*/}
            {isSlect1 &&
              (firstRecheck ? (
                <div className="userPanel-main-body-right-MyRechecks">
                  <div className="panel-accordion flex flex-col gap-4">
                    {/* LifeLong New Recheck Area */}
                    {isLifeLong && (
                      <div
                        className={`flex  flex-col gap-6 border-b border-[#142b6f] pb-16`}
                      >
                        {/* New Recheck Header */}
                        <div className="flex flex-col gap-4  w-[40vw]">
                          <p className="text-[21px] text-[#142b6f] font-bold">
                            {" "}
                            New Recheck
                          </p>

                          <p className="text-[17px] text-[#142b6f]">
                            You are on Lifelong plan and you have 4 free
                            rechecks left for 2023.
                          </p>
                          <p className="text-[17px] text-[#142b6f] ">
                            Choose the type of imaging you had, add your
                            personal notes, and upload medical images.
                          </p>
                          <p className="text-[17px] text-[#142b6f] ">
                            You may upload multiple scans (such as mammograms
                            and ultrasound) for one recheck.
                          </p>
                        </div>

                        {/* Select Imaging*/}
                        <div className="flex flex-col gap-4">
                          <p className="text-[17px] text-[#142b6f] font-bold mt-4">
                            {" "}
                            Type of Imaging{" "}
                          </p>

                          <div className="flex flex-col ">
                            <div className=" h-14 rounded-2xl flex gap-4 px-2 items-center">
                              <div
                                onClick={() => {
                                  setImagingNum(0);
                                  setImagingName("Breast");
                                }}
                                className={`w-[20%] h-[80%] duration-500 border  ${
                                  imagingNum == 0
                                    ? "text-[#fff] bg-[#142b6f] "
                                    : "text-[#142b6f]"
                                }  cursor-pointer  border-[#142b6f] rounded-3xl flex items-center justify-center`}
                              >
                                {" "}
                                Breast{" "}
                              </div>
                              <div
                                onClick={() => {
                                  setImagingNum(1);
                                  setImagingName("Whole Body");
                                }}
                                className={`w-[20%] h-[80%] duration-500 border  ${
                                  imagingNum == 1
                                    ? "text-[#fff] bg-[#142b6f] "
                                    : "text-[#142b6f]"
                                }  cursor-pointer  border-[#142b6f] rounded-3xl flex items-center justify-center`}
                              >
                                {" "}
                                Whole Body{" "}
                              </div>
                              <div
                                onClick={() => {
                                  setImagingNum(2);
                                  setImagingName("Head/Brain");
                                }}
                                className={`w-[20%] h-[80%] duration-500 border  ${
                                  imagingNum == 2
                                    ? "text-[#fff] bg-[#142b6f] "
                                    : "text-[#142b6f]"
                                }  cursor-pointer  border-[#142b6f] rounded-3xl flex items-center justify-center`}
                              >
                                {" "}
                                Head/Brain{" "}
                              </div>
                              <div
                                onClick={() => {
                                  setImagingNum(3);
                                  setImagingName("Liver");
                                }}
                                className={`w-[20%] h-[80%]  duration-500  border  ${
                                  imagingNum == 3
                                    ? "text-[#fff] bg-[#142b6f] "
                                    : "text-[#142b6f]"
                                }  cursor-pointer  border-[#142b6f] rounded-3xl flex items-center justify-center`}
                              >
                                {" "}
                                Liver{" "}
                              </div>
                              <div
                                onClick={() => {
                                  setImagingNum(4);
                                  setImagingName("Chest");
                                }}
                                className={`w-[20%] h-[80%] duration-500  border  ${
                                  imagingNum == 4
                                    ? "text-[#fff] bg-[#142b6f] "
                                    : "text-[#142b6f]"
                                }  cursor-pointer  border-[#142b6f] rounded-3xl flex items-center justify-center`}
                              >
                                {" "}
                                Chest{" "}
                              </div>
                            </div>

                            <div className=" h-14 rounded-2xl flex gap-4 px-2 items-center justify-center">
                              <div
                                onClick={() => {
                                  setImagingNum(5);
                                  setImagingName("Abdomen");
                                }}
                                className={`w-[20%] h-[80%] duration-500  border  ${
                                  imagingNum == 5
                                    ? "text-[#fff] bg-[#142b6f] "
                                    : "text-[#142b6f]"
                                }  cursor-pointer  border-[#142b6f] rounded-3xl flex items-center justify-center`}
                              >
                                {" "}
                                Abdomen{" "}
                              </div>
                              <div
                                onClick={() => {
                                  setImagingNum(6);
                                  setImagingName("Pelvic");
                                }}
                                className={`w-[20%] h-[80%]  duration-500 border  ${
                                  imagingNum == 6
                                    ? "text-[#fff] bg-[#142b6f] "
                                    : "text-[#142b6f]"
                                }  cursor-pointer  border-[#142b6f] rounded-3xl flex items-center justify-center`}
                              >
                                {" "}
                                Pelvic{" "}
                              </div>
                              <div
                                onClick={() => {
                                  setImagingNum(7);
                                  setImagingName("Urinary");
                                }}
                                className={`w-[20%] h-[80%]  duration-500 border  ${
                                  imagingNum == 7
                                    ? "text-[#fff] bg-[#142b6f] "
                                    : "text-[#142b6f]"
                                }  cursor-pointer  border-[#142b6f] rounded-3xl flex items-center justify-center`}
                              >
                                {" "}
                                Urinary{" "}
                              </div>
                              <div
                                onClick={() => {
                                  setImagingNum(8);
                                  setImagingName("Extremity");
                                }}
                                className={`w-[20%] h-[80%] duration-500  border  ${
                                  imagingNum == 8
                                    ? "text-[#fff] bg-[#142b6f] "
                                    : "text-[#142b6f]"
                                }  cursor-pointer  border-[#142b6f] rounded-3xl flex items-center justify-center`}
                              >
                                {" "}
                                Extremity{" "}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Select */}
                        <div className="flex flex-col gap-4">
                          <p className="text-[17px] text-[#142b6f] font-bold mt-4">
                            {" "}
                            Story, signs, symptoms and notes{" "}
                          </p>
                          <textarea
                            value={symptomsNotes}
                            onChange={(e) => {
                              setSymptomsNotes(e.target.value);
                            }}
                            type="text"
                            className="w-full h-[19vh] pt-2  rounded-2xl border-2 border-dotted border-[#142b6f] px-4 outline-none"
                            placeholder=""
                          />
                          <p className="text-[17px] relative top-2 text-[#142b6f] font-bold mt-4">
                            {" "}
                            Upload Images and Reports
                          </p>
                        </div>

                        {/* Upload Image */}
                        <div className=" items-start flex flex-col justify-start mr-[20vw] relative right-[12vw]">
                          <Card9
                            imagingName={imagingName}
                            totalRecheck={0}
                            displayText={"none"}
                            buttonText={"Upload Image"}
                            itemsScrollType={""}
                            userMailAddress={user.email}
                          />
                        </div>

                        {/* Recheck Now */}
                        <div
                          onClick={() => {
                            if (symptomsNotes === "") {
                              toast.error(
                                "Please fill the required fields",
                                {}
                              );
                            } else {
                              setDoc(
                                doc(db, "VitamuUsersREAL", `${user.email}`),
                                {
                                  LifeLong: {
                                    rechecks: arrayUnion({
                                      activeStep: 3,
                                      createDay: new Date().getDate(),
                                      createMonth: new Date().getMonth(),
                                      createYear: new Date().getFullYear(),
                                      imagingName: imagingName,
                                      imagingNum: imagingNum,
                                      symptomsNotes: symptomsNotes,
                                    }),
                                  },
                                },
                                { merge: true }
                              );
                              setSymptomsNotes("");
                              setImagingNum(0);
                              toast.success(
                                "Your request has been sent successfully",
                                {}
                              );

                              //refresh page
                              setTimeout(() => {
                                window.location.reload();
                              }, 440);
                            }
                          }}
                          className="flex  gap-4 border text-[#fff] bg-[#142b6f] relative bottom-5 cursor-pointer rounded-3xl px-8 py-2 w-fit"
                        >
                          {" "}
                          <p>Recheck Now</p> <p>➔</p>{" "}
                        </div>
                      </div>
                    )}

                    {recheckData &&
                      recheckData.map((item, index) => {
                        return (
                          isLifeLong && (
                            <div>
                              <p className="ml-5 text-[#142b6f] font-bold border-b-2">
                                {item.imagingName}
                              </p>
                              <CustomizedAccordions
                                totalRecheck={0}
                                userActiveStep={item.activeStep}
                                userCreateDay={item.createDay}
                                userCreateMonth={item.createMonth}
                                userCreateYear={item.createYear}
                                payType={"secondRecheck"}
                              />
                            </div>
                          )
                        );
                      })}

                    {userTotalRecheck === 2 && (
                      <CustomizedAccordions
                        totalRecheck={2}
                        userActiveStep={userActiveStep2}
                        userCreateDay={userCreateDay2}
                        userCreateMonth={userCreateMonth2}
                        userCreateYear={userCreateYear2}
                        payType={"secondRecheck"}
                      />
                    )}

                    <CustomizedAccordions
                      totalRecheck={1}
                      userActiveStep={userActiveStep}
                      userCreateDay={userCreateDay}
                      userCreateMonth={userCreateMonth}
                      userCreateYear={userCreateYear}
                      payType={"firstRecheck"}
                    />
                  </div>
                </div>
              ) : (
                
                
                 /* No Recheck Users Area */
                <div className="w-[64vw] flex flex-col gap-6 font-product text-[#142b6f]  h-screen">
                  
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

                  <div className="w-[60%] flex flex-col gap-2">
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
                        top={gV.mq.matches ? "20%" : "-30%"}
                        left={gV.mq.matches ? "0%" : "-1%"}
                      />
                    )}
                    <PrimaryButton
                      color={gV.mq.matches ? null : "white"}
                      bg={gV.mq.matches ? null : "#142b6f"}
                      width="220px"
                      height={gV.mq.matches ? "50px" : "40px"}
                      onMouse={() => setIsHover(true)}
                    />
                  </div>
               
               
                </div>
            
            
            ))}

            {/* My Images*/}
            {isSlect2 && (
              <div className="userPanel-main-body-right-MyRechecks">
                <div className="panel-accordion">
                  {userTotalRecheck === 2 && (
                    <CustomizedAccordions2 totalRecheck={2} />
                  )}

                  <CustomizedAccordions2 totalRecheck={1} />
                </div>
              </div>
            )}

            {isSlect3 && (
              <div>
                
                  <ChatScreen />
               
              </div>
            )}
            {/* Self-Exam Reminder*/}
            {isSlect4 && (
              <div className="userPanel-main-body-right-MyRechecks">
                <div className="self-exam">
                  <div className="self-exam-header">
                    <p>
                      According to the John Hopkins University, 40% of breast
                      cancer is diagnosed by women who feel a lump. This
                      explains why breast-self exams are so important. The
                      National Breast Cancer Foundation recommends conducting a
                      breast self-exam once a month.{" "}
                    </p>
                    <p>
                      However, a recent survey has indicated only 12% of women
                      conduct a self-breast exam regularly, which is extremely
                      low considering the cost of a late diagnosis and treatment
                      in advance.{" "}
                    </p>
                    <p>
                      Here is a new reminder for you. Once you enroll, we will
                      remind your self-exam every month via phone, e-mail, or
                      both.
                    </p>
                    <hr className="userPanel-solid" />
                  </div>

                  <div className="self-exam-body">
                    <div className="self-exam-body-child">
                      <p> Remind me day </p> <SelectLabels />{" "}
                      <p> of every month. </p>
                    </div>

                    <div className="self-exam-body-child">
                      <p> I want to be reminded by </p> <SelectLabels2 />
                    </div>

                    <div
                      onClick={SelfExamEnrollButton}
                      className="self-exam-body-button"
                    >
                      Enroll Today
                    </div>
                    <hr className="userPanel-solid2" />
                  </div>

                  <div className="self-exam-footer">
                    <p>
                      We also have a visual guide that will help you learn how
                      to conduct breast-self exam.
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
              </div>
            )}

            {isSlect5 && (
              <div className="transform">
                {" "}
                <PayPlans isOutside={true} />{" "}
              </div>
            )}

            {isSlect6 && (
              <div className="relative left-[4vw] bottom-[3vh] -z-0">
                {" "}
                <Faq isOutside={true} />{" "}
              </div>
            )}

            {isSlect7 && (
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
                      <p className="w-[10vw] ">{user.email}</p>
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
                </div>

                <ToastContainer />
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </>
);

}

export default UserPanel;


