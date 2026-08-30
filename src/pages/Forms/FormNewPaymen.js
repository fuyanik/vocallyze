import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses
} from "@mui/material/StepConnector";
import React, { useEffect, useState } from "react";
import Navbar from "../../homeComponents/1.Navbar/navbar";
import CardHaveInsurance from '../../formComponents/CardHaveInsurance/cardHaveInsurance.js'
import Card9 from "../../formComponents/Card9/card9";
import SwiperPage from "../Swiper/swiper";
import { setGlobalState, useGlobalState } from "../../hookState";
import Popup from "../Popup/popup";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import gV from "../../gV";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Timestamp } from "firebase/firestore";

import Insurance from "./components/Insurance";
import AvailableRadiologists from "./components/availableRadiologists";
import emailjs from 'emailjs-com';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#000000"
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#000000"
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#000000"
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#000000",
    zIndex: 1,
    fontSize: 18
  },
  "& .QontoStepIcon-circle": {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  }
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool
};


const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  })
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node
};

const steps = ["", "", "", "", "",];

const medicalSendType = [
  "I can upload the images now or later.",
  "I prefer to ship the CD or USB stick.",
  "I will share an access code.",
  "I authorize you to acquire my images."
  
];




export default function FormNewPayment() {

    //All amount variables and *Global* variables are set here
   //...
   const AmountCalculator = (mainPay) => {

    if(gV.insuranceCompany === "United Healthcare" ) {

       gV.discountPercent = 20

       //Insurance discount
       //...
       gV.discountAmount = (mainPay * (gV.discountPercent / 100))
       
      

       
       //Total amount user see pay plans page
       //...
       gV.payTotal = mainPay - gV.discountAmount
       
       
       return gV.payTotal;
      }

    if(gV.insuranceCompany === "Oscar") {

      gV.discountPercent = 45

      //Insurance discount
      //...
      gV.discountAmount = (mainPay * (gV.discountPercent / 100))
      
      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount
      
      
      return gV.payTotal;
    }

    if(gV.insuranceCompany === "Aetna" ) {

      gV.discountPercent = 35

      //Insurance discount
      //...
      gV.discountAmount = (mainPay * (gV.discountPercent / 100))
      
      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount
      
      
      return gV.payTotal;
    }

    if(gV.insuranceCompany ===  "Molina Healthcare" ) {
        
        gV.discountPercent = 40

        //Insurance discount
        //...
        gV.discountAmount = (mainPay * (gV.discountPercent / 100))
        
        //Total amount user see pay plans page
        //...
        gV.payTotal = mainPay - gV.discountAmount
        
        
        return gV.payTotal;
    }

    if(gV.insuranceCompany === "Humana" ) {
        
      gV.discountPercent = 45;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
     
    }

    if(gV.insuranceCompany === "Cigna" ) {
     
      gV.discountPercent = 35;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }
    
    if(gV.insuranceCompany ===  "Magellan" ) {
     
      gV.discountPercent = 30;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }
    
    if(gV.insuranceCompany ===  "Anthem") {
     
      gV.discountPercent = 35;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if(gV.insuranceCompany === "Blue California" ) {
       gV.discountPercent = 45;

          //Insurance discount
          //...
          gV.discountAmount = mainPay * (gV.discountPercent / 100);

          //Total amount user see pay plans page
          //...
          gV.payTotal = mainPay - gV.discountAmount;

          return gV.payTotal;
    }

    if(gV.insuranceCompany === "Blue Shield" ) {
     
      gV.discountPercent = 40;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if(gV.insuranceCompany === "Care Plus" ) {
     
      gV.discountPercent = 35;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if(gV.insuranceCompany === "Freedom Health" ) {
     
      gV.discountPercent = 30;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if(gV.insuranceCompany === "WellCare" ) {
      gV.discountPercent = 25;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if(gV.insuranceCompany === "United American" ) {
      gV.discountPercent = 35;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if(gV.insuranceCompany === "Caresource" ) {
      gV.discountPercent = 35;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if(gV.insuranceCompany === "I do not have an active insurance plan." || gV.insuranceCompany === "My insurance is not listed." || gV.insuranceCompany === "none"   ){
    
      gV.discountPercent = 0;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }
 
 
 }

  const auth = getAuth();
  const user = auth.currentUser;


  const [isOpenPaymentPopup, setIsOpenPaymentPopup] = useState(false)

 
  const  activeStep = 4;
  const [mainPayAmount] = useGlobalState("mainPayAmount")
  const [doctors] = useGlobalState("doctors")
  const [paymentPlan] = useGlobalState("paymentPlan")
 

  
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [phone, setPhone] = useState("")
    const [question, setQuestion] = useState("")
    const [medicalCenter, setMedicalCenter] = useState("")


    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [isDropdown, setDropdown] = useState(false)
    const [dropdownText, setDropdownText] = useState("Choose your answer.")


    useEffect(() => {
    //Create random password
    //...
    gV.password = Math.random().toString(36).slice(-10);
    }, [])



    
    


    {/* Start Step Contents */}

     const contactInputStyle = "w-[96%] lg:w-[70%] h-[6vh] lg:pt-2 px-4 py-2 flex items-center justify-center border border-white rounded-2xl duration-1000 outline-none  focus:border-priTrans  bg-slate-100 "
     

     

    //Close popup page
   //...
   function onDismiss() {
    setIsPopupOpen(false);
  }

   //Sing up user
  //...
  const handleSignup = async  () => {

    var templateParams = {
      user_name: name,
      user_email: mail,
      password: gV.password,
    };
    //send email

      !user && emailjs.send('service_8ey3p9f', 'template_ut7vege', templateParams, 'xBTh1qYqTM9n5L1_P')

    try {

        await createUserWithEmailAndPassword(auth, mail, gV.password).then((userCredential) => {
          // Signed in 
          console.log("SIGN UP SUCCESS")


        });
        updateProfile(auth.currentUser, { displayName: name });
      
       
    } catch (error) {
     
      if (error.code === 'auth/email-already-in-use') {
        setGlobalState("isFormPopUp", true);
        console.log("SIGN UP ERROR")
        return;
        
      }
      if (error.code === 'auth/invalid-email') {
        
        console.log("SIGN UP ERROR")
        return;
        
      }


    }
  };

    

  return (
    <>
      <Navbar mobileMenuText={"Menu"} />

      <Popup
      open={isPopupOpen}
      onDismiss={onDismiss}
      contents={ 
        <div>
          <h1 onClick={()=>{setIsPopupOpen(false)}} className="absolute z-50 right-6 top-0 bg-black text-white px-3 py-1 rounded-full"> Close</h1>
          <p className="p-6">Payment is currently unavailable. Please contact us at hello@medifyre.com.</p>
        </div>}
      close={false}
      />

       
      <div className="w-screen  flex flex-col items-center gap-3 lg:gap-6 font-product ">
      
      

        <div className="mt-12 lg:mt-16 "></div>
          
          {/*  Stepper */}
        <Stack sx={ gV.mq.matches ? { width: "100%" }  : { width: "55%" } } spacing={5}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
          >
            {steps.map((label,idx) => (
              <Step key={idx}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>


       
        {activeStep == 4 &&  <Insurance/>   }  
       

     
       {/* Bottom Buttons */}
       <div className= {`absolute ${isPopupOpen && "hidden"} w-[85vw] lg:w-[45vw] justify-between  bottom-3 mt-10  flex items-center font-product animate-fadeIn`} >
        

         {/* Back Button */}
         { activeStep !=0 && <button  onClick={() => {
                   setGlobalState("activeStep", activeStep - 1);
                }} className="w-11 h-11 absolute z-20   animate-leftToRight rounded-full bg-sec flex items-center justify-center  text-white"> <img width="20" height="20" src="https://img.icons8.com/metro/26/FFFFFF/chevron-left.png" alt="chevron-left"/></button>}
       

        {true && <div> </div> }

        {/* Next Buttonn */}
      

          <button onClick={() => {

                /* Sıgn Up Step*/

                 activeStep == 1 &&  handleSignup()
               
                 /* Payment Step States */
                 activeStep != 4 &&  setGlobalState("activeStep", activeStep + 1);
                 activeStep == 4 &&  setIsPopupOpen(true)

                 if (activeStep != 4) {
                  
                  setDoc(
                    doc(db, "MitruaPartial", `${user.email}`),
                    {
                        Rechecks: {
                          formStep: activeStep,
                          activeStep: 0,
                          createDay: new Date().getDate(),
                          createMonth: new Date().getMonth(),
                          createYear: new Date().getFullYear(),
                          bodyParts: gV.bodyParts,
                          scanType: gV.scanType,
                          name: name,
                          mail: mail,
                          phone: phone,
                          question: question,
                          medicalSendType: dropdownText,
                          medicalCenter: medicalCenter,
                          insurance: gV.insuranceCompany,
                          isPay: false,
                          createdAt: Timestamp.now().toDate(),
                          doctors: doctors,
                          paymentPlan: paymentPlan,
                          password: gV.password,
                          
                        },
                    },
                    { merge: true }
                  );

                 }
                 

                 /* Payment Step */
                 if (activeStep == 4) {

                 


                  AmountCalculator(mainPayAmount);
                  setDoc(
                    doc(db, "Mitrua", `${user.email}`),
                    {
                        Rechecks: arrayUnion({
                          formStep: activeStep,
                          activeStep: 1,
                          createDay: new Date().getDate(),
                          createMonth: new Date().getMonth(),
                          createYear: new Date().getFullYear(),
                          bodyParts: gV.bodyParts,
                          scanType: gV.scanType,
                          name: name,
                          mail: mail,
                          phone: phone,
                          question: question,
                          medicalSendType: dropdownText,
                          medicalCenter: medicalCenter,
                          insurance: gV.insuranceCompany,
                          isPay: false,
                          createdAt: Timestamp.now().toDate(),
                          doctors: doctors,
                          paymentPlan: paymentPlan,
                          payTotalWithoutTax: gV.payTotal,
                          password: gV.password,
                          
                        }),
                    },
                    { merge: true }
                  );
                 }


                 /* User and Info Logs */
                 console.log("BodyParts", gV.bodyParts )
                 console.log("ScanType", gV.scanType )
                 console.log("activeStep", activeStep, "name", name, "mail", mail, "phone", phone, )
                 user && console.log("user", user.email)

               }}
               className={`bg-sec ${activeStep == 0 ? "w-full" : "w-[82%]" } z-20  relative duration-500 font-bold self-end right-0 float-right flex items-center justify-center  py-[9px] rounded-3xl text-white`} >
                Continue to {activeStep == 0 && "Radiologist Selection"} {activeStep == 1 && " History"}  {activeStep == 2 && "Medical Images"} {activeStep == 3 && "Insurance"} {activeStep == 4 && "Payment"}
          </button>
    
       </div>

       
     
      </div>
    </>
  );
}
