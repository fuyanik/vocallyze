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

    const [left, setLeft] = useState(0)
    const [isImage, setIsImage] = useState(false)

  return (
    <>
      <Navbar mobileMenuText={"Menu"} />

      <div className="w-screen h-auto flex flex-col items-center gap-3 font-product ">
        <img
          src="https://vitamu.imgix.net/codioful-formerly-gradienta-rKv4HduvzIE-unsplash.jpg"
          className="w-screen h-full absolute -z-20 opacity-20"
          alt="vitamu"
        />

        <div className="mt-12"></div>

        <Stack sx={{ width: "106%" }} spacing={5}>
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


        {activeStep == 0 && (
          
          <section className="w-[92vw]  flex flex-col h-auto pt-0 px-2">
          
          <div className="flex flex-col gap-2">
              <header className="gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] ">
                <p className="text-[26px] font-bold text-[#142b6f]">
                  Contact Details
                </p>
            
                <p className="text-[18px] font-bold text-[#142b6f]">
                  {" "}
                  Step {activeStep} of 5
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
                placeholder=""
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
                  setName(e.target.value);
                }}
                type="text"
                className={`w-[96%] lg:w-[40%] h-[6vh] lg:pt-2 px-4 py-2 flex items-center justify-center  ${
                  name != "" ? " border-none" : "border-none  "
                }  duration-500 rounded-3xl border-2  border-[#142b6f] outline-none`}
                placeholder=""
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
                  setName(e.target.value);
                }}
                type="text"
                className={`w-[96%] lg:w-[40%] h-[6vh] lg:pt-2 px-4 py-2 flex items-center justify-center  ${
                  name != "" ? " border-none" : "border-none  "
                }  duration-500 rounded-3xl border-2  border-[#142b6f] outline-none`}
                placeholder=""
              />
            </div>

           
          </section>
        )}

        {activeStep == 1 && (
          
          <section className="w-[92vw]  flex flex-col h-auto pt-0 px-2">
          
            <header className="flex flex-col gap-2">
              
              <div className="gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] ">
                <p className="text-[26px] font-bold text-[#142b6f]">
                  Medical Images
                </p>
            
                <p className="text-[18px] font-bold text-[#142b6f]">
                  {" "}
                  Step {activeStep} of 5
                </p>
            
                
              </div>

              <p className="text-[16px] leading-[22px] mt-2  text-[#142b6f90]">
              {" "}
              We respect your privacy. Your contact details will not be shared
              with anyone.
            </p>
            </header>

          

            {/* Do You Have Medical Images */}
           <div className="flex flex-col gap-3">
           
            <p className="text-[17px] text-[#142b6f] font-bold mt-4 lg:w-[55%] w-[96%]">
              How do you want to share your medical images?
            </p>
      
            <div className="  lg:w-[16vw] w-[80vw] h-[7vh] gap-4 lg:h-[6vh] rounded-2xl flex items-center relative cursor-pointer">
            
      
              <div
                onClick={() => {
                  setIsImage(true);
                  setLeft("left-[1%]");
                }}
                className="h-[96%] w-[120%] text-[#142b6f] justify-between bg-white flex items-center px-4 rounded-full z-10 duration-200 ease-in-out "
              >
                <p> Choose your answer.</p>
                <p >{"v"}</p>
              </div>

              <div className="absolute w-full"></div>


          
            </div>
           </div>


         

           

            
          </section>
        )}
       
     
     
       <div
              onClick={() => {
                setActiveStep(activeStep + 1);
              }}
              className="bg-[#ff4949] w-[85vw] mt-10 absolute  bottom-5 flex items-center justify-center  py-3 rounded-3xl text-white"
            >
              Next
       </div>

       
     
      </div>
    </>
  );
}
