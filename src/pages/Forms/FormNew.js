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
import React, { useState } from "react";
import Navbar from "../../homeComponents/1.Navbar/navbar";
import CardHaveInsurance from '../../formComponents/CardHaveInsurance/cardHaveInsurance.js'
import Card9 from "../../formComponents/Card9/card9";
import SwiperPage from "../Swiper/swiper";
import { setGlobalState, useGlobalState } from "../../hookState";
import PayScreen from "../PayScreen/payScreen";
import Popup from "../Popup/popup";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import gV from "../../gV";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#142b6f"
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#142b6f"
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
    color: "#142b6f"
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#142b6f",
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




export default function FormNew() {

  const auth = getAuth();
  const user = auth.currentUser;

  const [isDropdownSet] = useGlobalState("isDropdownSet")
  const [activeStep] = useGlobalState("activeStep")
  const [bodyParts] = useGlobalState("bodyParts")
  const [scanType] = useGlobalState("scanType")

  
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [phone, setPhone] = useState("")
    const [question, setQuestion] = useState("")


    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [isDropdown, setDropdown] = useState(false)
    const [dropdownText, setDropdownText] = useState("Choose your answer.")
    


    {/* Start Step Contents */}

     const contactInputStyle = "w-[96%] lg:w-[40%] h-[6vh] lg:pt-2 px-4 py-2 flex items-center justify-center border border-white rounded-2xl duration-1000 outline-none  focus:border-sec focus:ring-1 focus:ring-sec "
     
     
    
    {/* Contact Detail */}
    const ContactDetail =  
    <section className="w-[92vw] animate-fadeIn flex flex-col h-auto pt-0 px-2">
              
      <header className="flex flex-col gap-2">
        <header className="gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] ">
          <p className="text-[22px] font-bold text-pri">
            Contact Details
          </p>
      
          <p className="text-[16px] mt-1 font-bold text-pri">
            {" "}
            Step {activeStep + 1} of 5
          </p>
      
          
        </header>

        <p className="text-[16px] leading-[22px] mt-2  text-priTrans">
        {" "}
        We respect your privacy. Your contact details will not be shared
        with anyone.
      </p>
      </header>

    

      {/* Name */}
      <div className="flex flex-col gap-1 mt-2">
        
        <p className="text-lg text-pri font-bold mt-4">
          {" "}
          What is your name?
        </p>
       
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            gV.MailAddres = e.target.value;
          }}
          type="text"
          className={contactInputStyle}
          placeholder="Type your name here."
        />

      </div>

      {/* Mail */}
      <div className="flex flex-col gap-1">
        <p className="text-lg text-pri font-bold mt-4">
          {" "}
          Mail Address
        </p>
        <input
          value={mail}
          onChange={(e) => {
            setMail(e.target.value);
          }}
          type="text"
          className={contactInputStyle}
          placeholder="Type your name email here."
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1">
        <p className="text-lg text-pri font-bold mt-4">
          {" "}
          Phone Number
        </p>
        <input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="phone"
          className={contactInputStyle}
          placeholder="Type your phone number here."
        />
      </div>

     
    </section>


    {/* Radiologist */}
    const Radiologist = 
        <section className="w-[92vw] animate-fadeIn flex flex-col h-auto pt-0 px-2">
        
         <div className="flex flex-col gap-2">
          <header className="gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] ">
            <p className="text-[22px] font-bold text-pri">
              Radiologists
            </p>

            <p className="text-[16px] mt-1 font-bold text-pri">
              {" "}
              Step {activeStep + 1} of 5
            </p>
          </header>

     
         </div>

       
       {/* Doctors Cards */}
       <div className="flex flex-col gap-4 mt-3">


         {/* Doctor Card 1 */}
         <div className="w-full h-34 bg-white rounded-xl py-4 px-3 gap-8  flex items-center shadow-2xl "> 
          
           <div className="flex flex-col ">
           
            <p className="font-bold">Elizabeth H. Asch</p>
            <p>Harvard Medical School'09 <i className="text-[#142b6fdb]">15 Years of Experience</i></p>
           
            <div className="flex items-center gap-2">
             <div className="w-1 h-1 rounded-full bg-priTrans"></div>
             <p className="text-priTrans">Breast Screening </p>
            </div>
           
            <div className="flex items-center gap-2">
             <div className="w-1 h-1 rounded-full bg-priTrans"></div>
             <p className="text-priTrans">Diagnostic Radiology</p>
            </div>
         
           </div>
         
          <img className="w-20 h-20 rounded-xl" src="https://vitamu.imgix.net/radiologyRe/Elizabeth%20H.%20Asch-Mobile.png"/>
         
         </div>
        
         {/* Doctor Card 2 */}
         <div className="w-full h-34 bg-white rounded-xl py-4 px-3 gap-8  flex items-center shadow-2xl "> 
          
           <div className="flex flex-col ">
           
            <p className="font-bold">Elizabeth H. Asch</p>
            <p>Harvard Medical School'09 <i className="text-[#142b6fdb]">15 Years of Experience</i></p>
           
            <div className="flex items-center gap-2">
             <div className="w-1 h-1 rounded-full bg-priTrans"></div>
             <p className="text-priTrans">Breast Screening </p>
            </div>
           
            <div className="flex items-center gap-2">
             <div className="w-1 h-1 rounded-full bg-priTrans"></div>
             <p className="text-priTrans">Diagnostic Radiology</p>
            </div>
         
           </div>
         
          <img className="w-20 h-20 rounded-xl" src="https://vitamu.imgix.net/radiologyRe/Pamela%20J.%20DiPiro-Mobile.png"/>
         
         </div>
         
        
       </div>
        </section>
    


    {/* Medical Images */}
    const MedicalImages = (
      <section className="w-[92vw] animate-fadeIn  flex flex-col h-auto pt-0 px-2">
      
        <header className="flex flex-col gap-2">
          <div className="gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] ">
            <p className="text-[22px] font-bold text-pri">
              Medical Images
            </p>

            <p className="text-[16px] mt-1 font-bold text-pri">
              {" "}
              Step {activeStep + 1} of 5
            </p>
          </div>

          <p className="text-[16px] hidden leading-[22px] mt-2  text-priTrans">
            {" "}
            We respect your privacy. Your contact details will not be shared
            with anyone.
          </p>
        </header>

        {/* Do You Have Medical Images */}
        <div className="flex flex-col gap-5 ">
          {/* Medical Images Question with Dropdown */}
          <div className="flex flex-col gap-2">
            <p className="text-[17px] text-pri font-bold mt-4 lg:w-[55%] w-[96%]">
              How do you want to share your medical images?
            </p>


            {/* Dropdown Select Area */}
            <div className="  lg:w-[16vw] w-[84vw] h-[7vh] lg:h-[6vh] rounded-2xl flex items-center relative cursor-pointer">
              <div
                onClick={() => {
                  setDropdown(!isDropdown);
                }}
                className="h-[96%] w-[120%] text-pri justify-between bg-white flex items-center px-4 rounded-full z-10 duration-200 ease-in-out "
              >
                <p> {dropdownText}</p>
                <img  className={`absolute   right-6 lg:right-1 text-[13px] ${!isDropdown ? "rotate-180" : "rotate-270 "} duration-500`} width="18" height="18" src="https://img.icons8.com/ios-filled/50/142b6f/collapse-arrow.png" alt="collapse-arrow"/>

              </div>

              {/* Dropdown White Area */}
              {isDropdown && (
                <div className="absolute z-40 flex flex-col gap-3 items-start py-2  text-pri w-full h-auto overflow-y-auto bg-white top-[9vh] animate-fadeIn rounded-2xl shadow-xl">
                  {medicalSendType.map((name, idx) => (
                    <p
                      className={` py-[3px] px-3   w-full text-left `}
                      onClick={() => {
                        setDropdown(false);
                        setDropdownText(name);
                      }}
                    >
                      {name}
                    </p>
                  ))}
                </div>
              )}

             
            </div>
          </div>

        
        
          {/* All Medical Images Options Start Here */}

          {/* Image Upload */}
          {dropdownText == "I can upload the images now or later." && (
            <div className="flex flex-col gap-3 text-pri animate-fadeIn ">
              <p className=" text-[#142b6fb7]  border-t-2  border-[#142b6fbe]">
              </p>
            
              <div className="relative bottom-1">
                <Card9
                  totalRecheck={1}
                  displayText={"none"}
                  buttonText={"Upload Image"}
                  itemsScrollType={""}
                />
              </div>
             
            </div>
          )}

          {/* Shipping CD or USB */}
          {dropdownText == "I prefer to ship the CD or USB stick." && (
            <div className="flex flex-col gap-3 text-pri animate-fadeIn ">
              <p className=" text-[#142b6fb7] border-t-2  border-pri pt-2">
                Kazanıyoruz oylarınızı bölmeyin. Bu iş dansla müzikle
                olmaz.Kazanıyoruz oylarınızı bölmeyin. Bu iş dansla m
              </p>

              <div className="flex flex-col border bg-slate-50 px-2 py-1 gap-1 rounded-lg ">
                <p className="mt-2">Vitamu, Inc.</p>
                <p>169 Madison Ave #2305 New York, NY 10016</p>
                <p>+1 646 820 1932</p>
              </div>
            </div>
          )}

          {/* Share Acces Code */}
          {dropdownText == "I will share an access code." && (
            <div className="flex flex-col gap-3 text-pri animate-fadeIn ">
              <p className=" text-[#142b6fb7] border-t-2  border-pri pt-2">
                Email adresi yazma. Email adresi yazma Email adresi yazma Email
                adresi yazma
              </p>

              <div className="flex flex-col bg-slate-50 px-3 py-2 gap-1 border rounded-lg ">
                <p className="">acceasdss@mitrua.com</p>
              </div>
            </div>
          )}

          {/* Authorize */}
          {dropdownText == "I authorize you to acquire my images." && (
            <div className="flex flex-col gap-3 text-pri animate-fadeIn ">
              <p className=" text-[#142b6fb7] border-t-2  border-pri pt-2">
                No problem, we will acquire your medical files on your behalf.
                Please type the name of the medical center where you got your
                screening.
              </p>

              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className={contactInputStyle}
                placeholder="Type the name of your medical center"
              />
            </div>
          )}
        </div>
      </section>
    );
        
    
   {/* History Symptoms */}
    const HistorySymptoms = 
         <section className="w-[92vw] animate-fadeIn flex flex-col h-auto pt-0 px-2 text-pri">
          
        <div className="flex flex-col gap-2">
            
            <header className="gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] ">
              <p className="text-[22px] font-bold text-pri">
              History and Symptoms
              </p>
          
              <p className="text-[16px] mt-1 font-bold text-pri">
                {" "}
                Step {activeStep + 1} of 5
              </p>
          
              
            </header>

            <p className="text-[16px] leading-[22px] mt-2  text-priTrans">
             {" "}
             We respect your privacy. Your contact details will not be shared
            with anyone.
            </p>

          <textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            type="text"
            className="w-[96%] lg:w-[65%] mt-1 lg:h-[24vh] shadow-2xl h-[41vh] p-4  border border-white rounded-2xl duration-1000 outline-none  focus:border-sec focus:ring-1 focus:ring-sec "
            placeholder="Type your question here."
          />
        
       
       
       
       
       
        </div>

        

      

         
         </section>


    {/* Insurance */}
    const Insurance = 
        <section className="w-[92vw] animate-fadeIn flex flex-col h-auto pt-0 px-2 ">
        
         <header className="flex flex-col gap-2">
          <header className="gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] ">
            <p className="text-[22px] font-bold text-pri">
              Insurances
            </p>

            <p className="text-[16px] mt-1 font-bold text-pri">
              {" "}
              Step {activeStep + 1} of 5
            </p>
          </header>

        
         </header>

        {/* Name */}
        <div className="flex flex-col gap-1 mt-0">
          <p className="text-lg text-pri font-bold mt-4">
            {" "}
            What is your insurance?
          </p>

          <CardHaveInsurance/>
         
        </div>

       <div className="relative right-[23px]">
       { isDropdownSet &&  <SwiperPage/>}
       </div>
        
        </section>


     {/* Payment */}
    const Payment = 
        <section className=" hidden flex-col h-[72vh]">

       < header className="hidden w-[92vw] self-center  flex-col gap-2">
          <header className="gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a070700] ">
            <p className="text-[22px] font-bold text-pri">
              Payment
            </p>

            <p className="text-[16px] mt-1 font-bold text-pri">
              {" "}
              Step {activeStep + 1} of 5
            </p>
          </header>

          <p className="text-[16px] hidden leading-[22px] mt-2  text-priTrans">
            {" "}
            We respect your privacy. Your contact details will not be shared
            with anyone.
          </p>
         </header>

      { false && <SwiperPage/> }
        </section>
     

        //Close popup page
   //...
   function onDismiss() {
    setIsPopupOpen(false);
  }

   //Sing up user
  //...
  const handleSignup = async  () => {

    try {

        await createUserWithEmailAndPassword(auth, mail, "313131").then((userCredential) => {
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
      contents={<PayScreen/>}
      close={false}
      />

       
      <div className="w-screen h- flex flex-col items-center gap-3 font-product ">
      
        <img
          src="https://vitamu.imgix.net/codioful-formerly-gradienta-rKv4HduvzIE-unsplash.jpg"
          className="w-screen  h-full absolute -z-20 opacity-20"
          alt="vitamu"
        />

        <div className="mt-12"></div>
          
          {/*  Stepper */}
        <Stack sx={{ width: "100%" }} spacing={5}>
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


        {activeStep == 0 &&  ContactDetail }
        {activeStep == 1 &&  Radiologist }
        {activeStep == 2 &&  HistorySymptoms  }
        {activeStep == 3 &&  MedicalImages  }
        {activeStep == 4 &&  Insurance  }
       

     
       {/* Bottom Buttons */}
       <div className= {`absolute ${isPopupOpen && "hidden"} w-[85vw] justify-between  bottom-3 mt-10  flex items-center font-product animate-fadeIn`} >
        

         {/* Back Button */}
         { activeStep !=0 && <button  onClick={() => {
                   setGlobalState("activeStep", activeStep - 1);
                }} className="w-11 h-11 absolute z-20   animate-leftToRight rounded-full bg-sec flex items-center justify-center  text-white"> <img width="20" height="20" src="https://img.icons8.com/metro/26/FFFFFF/chevron-left.png" alt="chevron-left"/></button>}
       

        {true && <div> </div> }
        {/* Next Button */}
      

          <button onClick={() => {

                /* Sıgn Up Step*/

                activeStep == 1 &&  handleSignup()
               
                 /* Payment Step States */
                 activeStep != 4 &&  setGlobalState("activeStep", activeStep + 1);
                 activeStep == 4 && setIsPopupOpen(true)

                 if (activeStep == 4) {
                  setDoc(
                    doc(db, "Mitrua", `${user.email}`),
                    {
                        Rechecks: arrayUnion({
                          activeStep: 3,
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
                          insurance: gV.insuranceCompany,
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
                Next
          </button>
    
       </div>

       
     
      </div>
    </>
  );
}
