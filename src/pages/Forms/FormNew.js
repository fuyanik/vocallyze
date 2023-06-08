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

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[100] : "#eaeaf0",
    borderRadius: 1
  }
}));

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

const steps = ["", "", "", "", "",] ;







export default function FormNew() {

    const [activeStep, setActiveStep] = useState(0);
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [phone, setPhone] = useState("")
    const [question, setQuestion] = useState("")

    const [left, setLeft] = useState(0)

    const [isDropdown, setDropdown] = useState(false)
    const [dropdownText, setDropdownText] = useState("Choose your answer.")

    const ContactDetail = () => {
      return (
        <section className="w-[92vw] animate-fadeIn flex flex-col h-auto pt-0 px-2">
              
        <div className="flex flex-col gap-2">
            <header className="gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] ">
              <p className="text-[22px] font-bold text-[#142b6f]">
                Contact Details
              </p>
          
              <p className="text-[16px] mt-1 font-bold text-[#142b6f]">
                {" "}
                Step {activeStep + 1} of 5
              </p>
          
              
            </header>
    
            <p className="text-[16px] leading-[22px] mt-2  text-[#142b6f90]">
            {" "}
            We respect your privacy. Your contact details will not be shared
            with anyone.
          </p>
        </div>
    
        
    
          {/* Name */}
          <div className="flex flex-col gap-1 mt-3">
            <p className="text-lg text-[#142b6f] font-bold mt-4">
              {" "}
              What is your name?
            </p>
            <textarea
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              className={`w-[96%] lg:w-[40%] h-[6vh] lg:pt-2 px-4 py-2 flex items-center justify-center  ${
                name != "" ? " border-none" : "border-none  "
              }  duration-500 rounded-3xl border-2  border-[#142b6f] outline-none`}
              placeholder="Type your name here."
            />
          </div>
    
          {/* Mail */}
          <div className="flex flex-col gap-1">
            <p className="text-lg text-[#142b6f] font-bold mt-4">
              {" "}
              Mail Address
            </p>
            <textarea
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
              }}
              type="text"
              className={`w-[96%] lg:w-[40%] h-[6vh] lg:pt-2 px-4 py-2 flex items-center justify-center  ${
                name != "" ? " border-none" : "border-none  "
              }  duration-500 rounded-3xl border-2  border-[#142b6f] outline-none`}
              placeholder="Type your name email here."
            />
          </div>
    
          {/* Phone */}
          <div className="flex flex-col gap-1">
            <p className="text-lg text-[#142b6f] font-bold mt-4">
              {" "}
              Phone Number
            </p>
            <textarea
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              type="text"
              className={`w-[96%] lg:w-[40%] h-[6vh] lg:pt-2 px-4 py-2 flex items-center justify-center  ${
                name != "" ? " border-none" : "border-none  "
              }  duration-500 rounded-3xl border-2  border-[#142b6f] outline-none`}
              placeholder="Type your phone number here."
            />
          </div>
    
         
        </section>
      );
    };

    const MedicalImages = () => {
      return (
        <section className="w-[92vw] animate-fadeIn  flex flex-col h-auto pt-0 px-2">
          
            <header className="flex flex-col gap-2">
              
              <div className="gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] ">
                <p className="text-[22px] font-bold text-[#142b6f]">
                  Medical Images
                </p>
            
                <p className="text-[16px] mt-1 font-bold text-[#142b6f]">
                  {" "}
                  Step {activeStep + 1} of 5
                </p>
            
                
              </div>

              <p className="text-[16px] hidden leading-[22px] mt-2  text-[#142b6f90]">
              {" "}
              We respect your privacy. Your contact details will not be shared
              with anyone.
              </p>
            </header>

          

            {/* Do You Have Medical Images */}
           <div className="flex flex-col gap-5 ">
            
            <div className="flex flex-col gap-2">
              <p className="text-[17px] text-[#142b6f] font-bold mt-4 lg:w-[55%] w-[96%]">
                How do you want to share your medical images?
              </p>
            
              {/* Medical Images Question */}
              <div className="  lg:w-[16vw] w-[80vw] h-[7vh] lg:h-[6vh] rounded-2xl flex items-center relative cursor-pointer">
              
            
                <div
                  onClick={() => {
                    setDropdown(!isDropdown);
                   
                  }}
                  className="h-[96%] w-[120%] text-[#142b6f] justify-between bg-white flex items-center px-4 rounded-full z-10 duration-200 ease-in-out "
                >
                  <p> {dropdownText}</p>
                  <p >{"v"}</p>
                </div>
            
               { isDropdown && 
                  <div className="absolute z-40 flex flex-col justify-around  text-[#142b6f] w-full h-[20vh] bg-white top-[8vh] animate-fadeIn rounded-3xl shadow-xl">
                      <p onClick={()=>{setDropdownText("I can upload the images now or later."); setDropdown(false)}} className="border-b px-5 py-1 ">I can upload the images now or later.</p>
                      <p onClick={()=>{setDropdownText("I prefer to ship the CD or USB stick."); setDropdown(false)}} className="border-b px-5 py-1 ">I prefer to ship the CD or USB stick.</p>
                      <p onClick={()=>{setDropdownText("I will share an access code."); setDropdown(false)}} className="border-b px-5 py-1 ">I will share an access code. </p>
                      <p onClick={()=>{setDropdownText("I authorize you to acquire my images."); setDropdown(false)}} className="px-5 py-1 ">I authorize you to acquire my images.</p>
                  
                  </div>}
            
                  
            
            
            
              </div>
            </div>

          { dropdownText == "I prefer to ship the CD or USB stick." && 
          
          <div className="flex flex-col gap-3 text-[#142b6f] animate-fadeIn ">
            <p className=" text-[#142b6fb7] border-t-2  border-[#142b6f] pt-2">Kazanıyoruz oylarınızı bölmeyin. Bu iş dansla müzikle olmaz.Kazanıyoruz oylarınızı bölmeyin. Bu iş dansla m</p>
            
            <div className="flex flex-col bg-slate-50 px-2 py-1 gap-1 rounded-lg shadow-3xl">
              <p className="mt-2">Vitamu, Inc.</p>
              <p>169 Madison Ave #2305 New York, NY 10016</p>
              <p>+1 646 820 1932</p>
            </div>
          
           </div>}

           { dropdownText == "I will share an access code." && 
          
          <div className="flex flex-col gap-3 text-[#142b6f] animate-fadeIn ">
            <p className=" text-[#142b6fb7] border-t-2  border-[#142b6f] pt-2">Email adresi yazma. Email adresi yazma Email adresi yazma Email adresi yazma</p>
            
            <div className="flex flex-col bg-slate-50 px-2 py-1 gap-1 rounded-lg shadow-3xl">
              <p className="">access@mitrua.com</p>
              
            </div>
          
           </div>}

           { dropdownText == "I authorize you to acquire my images." && 
          
          <div className="flex flex-col gap-3 text-[#142b6f] animate-fadeIn ">
            <p className=" text-[#142b6fb7] border-t-2  border-[#142b6f] pt-2">No problem, we will acquire your medical files on your behalf. Please type the name of the medical center where you got your screening.</p>
            
            <textarea
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className={`w-[96%] lg:w-[40%] h-[6vh] lg:pt-2 px-4 py-2 flex items-center justify-center  ${
                  name != "" ? " border-none" : "border-none  "
                }  duration-500 rounded-3xl border-2  border-[#142b6f] outline-none`}
                placeholder="Type the name of your medical center"
              />
            
          
           </div>}


            
          
          
          
          
          
           </div>


         

           

            
          </section>
        
      )
    };

    const HistorySymptoms = () => {
      return(
        <section className="w-[92vw] animate-fadeIn flex flex-col h-auto pt-0 px-2 text-[#142b6f]">
          
        <div className="flex flex-col gap-2">
            
            <header className="gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] ">
              <p className="text-[22px] font-bold text-[#142b6f]">
              History and Symptoms
              </p>
          
              <p className="text-[16px] mt-1 font-bold text-[#142b6f]">
                {" "}
                Step {activeStep + 1} of 5
              </p>
          
              
            </header>

            <p className="text-[16px] leading-[22px] mt-2  text-[#142b6f90]">
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
            className="w-[96%] lg:w-[65%] mt-1 lg:h-[24vh] h-[41vh] py-4  rounded-3xl  px-4 outline-none"
            placeholder="Type your question here."
          />
        
       
       
       
       
       
        </div>

        

      

         
        </section>
      )
    };

    

  return (
    <>
      <Navbar mobileMenuText={"Menu"} />

      <div className="w-screen h-auto  flex flex-col items-center gap-3 font-product ">
      
        <img
          src="https://vitamu.imgix.net/codioful-formerly-gradienta-rKv4HduvzIE-unsplash.jpg"
          className="w-screen h-full absolute -z-20 opacity-20"
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
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>


        {activeStep == 0 && ( <ContactDetail/>  )}
        {activeStep == 1 && (  <div> radiologists </div>  )}
        {activeStep == 2 && (  <HistorySymptoms/>)  }
        {activeStep == 3 && ( <MedicalImages/>   )}
        {activeStep == 4 && (  <div> insurance </div>  )}

        
       
     
       {/* Next Button */}
       <div className="absolute w-[85vw] justify-between  bottom-5 mt-10  flex items-center ">
        { activeStep !=0 && <div   onClick={() => {
                 setActiveStep(activeStep - 1);
               }} className="w-12 h-12 animate-fadeIn rounded-full bg-[#ff4949a5] flex items-center justify-center rotate-90 text-white"> V</div>}
       
        <div
               onClick={() => {
                 setActiveStep(activeStep + 1);
               }}
               className={`bg-[#ff4949] ${activeStep == 0 ? "w-full" : "w-[82%]" }  relative duration-300 self-end right-0 float-right  flex items-center justify-center  py-3 rounded-3xl text-white`}
             >
               Next
        </div>
       </div>

       
     
      </div>
    </>
  );
}
